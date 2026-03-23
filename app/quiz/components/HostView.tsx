'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { clientDb } from '@/lib/firebaseClient';
import { doc, onSnapshot } from 'firebase/firestore';
import type { QuizQuestion } from '@/lib/quizTypes';
import {
  PDF_QUESTION_BANK,
  createQuestionSessionSeed,
  sampleQuestionsDeterministic,
} from '@/lib/pdfQuestionBank';

interface QuestionEvent {
  question: {
    index: number;
    total: number;
    prompt: string;
    options: string[];
    correctIndex?: number;
    deadline?: number;
    durationMs?: number;
  };
}

interface LeaderboardEvent {
  leaderboard: Array<{ id: string; name: string; score: number }>;
  answeredCount: number;
  playerCount: number;
}

function createRoomQuizPayload() {
  const seed = createQuestionSessionSeed('quiz-room');
  return sampleQuestionsDeterministic(PDF_QUESTION_BANK, 10, seed).map<QuizQuestion>((item) => ({
    question: item.question,
    options: [...item.options],
    correctIndex: item.correctIndex,
  }));
}

export default function HostView() {
  const [loading, setLoading] = useState(true);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [hostSecret, setHostSecret] = useState<string | null>(null);
  const [playerCount, setPlayerCount] = useState(0);
  const [players, setPlayers] = useState<string[]>([]);
  const [question, setQuestion] = useState<QuestionEvent['question'] | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEvent['leaderboard']>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [status, setStatus] = useState<'lobby' | 'in-progress' | 'finished'>('lobby');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const resultTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resultTriggeredRef = useRef(false);
  const rehydrateAttemptedRef = useRef(0);
  const lastQuestionIndexRef = useRef<number>(-1);

  const readJsonSafe = useCallback(async (res: Response) => {
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { __raw: text } as any;
    }
    try {
      return JSON.parse(text);
    } catch {
      return { __raw: text } as any;
    }
  }, []);

  const getErrorMessage = useCallback((data: any, fallback: string) => {
    if (typeof data?.error === 'string' && data.error.trim()) return data.error;
    if (typeof data?.message === 'string' && data.message.trim()) return data.message;
    if (typeof data?.__raw === 'string' && data.__raw.trim()) {
      const snippet = data.__raw.replace(/<[^>]*>/g, '').trim();
      return snippet ? snippet.slice(0, 200) : fallback;
    }
    return fallback;
  }, []);

  const createRoom = useCallback(async () => {
    setError(null);
    setLoading(true);
    setPlayers([]);
    setPlayerCount(0);
    setQuestion(null);
    setLeaderboard([]);
    setAnsweredCount(0);
    setStatus('lobby');
    setTimeLeft(null);
    setShowingResult(false);
    setCorrectIndex(null);
    resultTriggeredRef.current = false;
    rehydrateAttemptedRef.current = 0;
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    try {
      const quiz = createRoomQuizPayload();
      const res = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz }),
      });
      const data = await readJsonSafe(res);
      if (!res.ok) throw new Error(getErrorMessage(data, 'Không tạo được phòng'));
      setRoomCode(data.roomCode);
      setHostSecret(data.hostSecret);
      localStorage.setItem('quiz-host-room', JSON.stringify({ roomCode: data.roomCode, hostSecret: data.hostSecret }));
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || 'Không tạo được phòng');
      setLoading(false);
    }
  }, [readJsonSafe, getErrorMessage]);

  const rehydrateRoom = useCallback(
    async (code: string, secret: string) => {
      try {
        const res = await fetch('/api/rooms/rehydrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomCode: code, hostSecret: secret }),
        });
        if (!res.ok) return false;
        localStorage.setItem('quiz-host-room', JSON.stringify({ roomCode: code, hostSecret: secret }));
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const fetchRoomState = useCallback(async (code: string) => {
    const res = await fetch(`/api/rooms/${code}/state`);
    const data = await readJsonSafe(res);
    if (res.ok) {
      setStatus(data.status ?? 'lobby');
      setPlayerCount(data.playerCount ?? 0);
      setPlayers(Array.isArray(data.players) ? data.players : []);
      if (Array.isArray(data.leaderboard)) {
        setLeaderboard(data.leaderboard);
      }
      if (typeof data.answeredCount === 'number') {
        setAnsweredCount(data.answeredCount);
      }
    }
    return { ok: res.ok, status: res.status };
  }, [readJsonSafe]);

  useEffect(() => {
    const restoreRoom = async () => {
      try {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('quiz-host-room') : null;
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.roomCode && parsed?.hostSecret) {
            const state = await fetchRoomState(parsed.roomCode);
            if (state.ok) {
              setRoomCode(parsed.roomCode);
              setHostSecret(parsed.hostSecret);
              setLoading(false);
              return;
            }
            if (state.status === 404) {
              const rehydrated = await rehydrateRoom(parsed.roomCode, parsed.hostSecret);
              if (rehydrated) {
                setRoomCode(parsed.roomCode);
                setHostSecret(parsed.hostSecret);
                setError(null);
                const refreshed = await fetchRoomState(parsed.roomCode);
                if (refreshed.ok) {
                  setLoading(false);
                  return;
                }
              }
              // Phòng cũ không tìm thấy, xóa localStorage và tạo phòng mới
              localStorage.removeItem('quiz-host-room');
            }
          }
        }
      } catch (err) {
        console.warn('Restore room failed', err);
      }

      // Nếu không có phòng đã lưu hoặc không khôi phục được thì tạo phòng mới
      createRoom();
    };

    restoreRoom();
  }, [createRoom, fetchRoomState, rehydrateRoom]);

  useEffect(() => {
    if (!roomCode) return;

    const roomRef = doc(clientDb, 'rooms', roomCode);
    const unsubscribe = onSnapshot(roomRef, (snap) => {
      if (!snap.exists()) {
        setError('Phòng đã mất. Vui lòng bấm "Làm mới mã" để tạo phòng mới.');
        return;
      }

      const room = snap.data() as any;
      setStatus(room.status ?? 'lobby');
      const playersMap = room.players || {};
      setPlayerCount(Object.keys(playersMap).length);
      setPlayers(Object.values(playersMap).map((p: any) => p.name));
      setLeaderboard(
        Object.entries(room.leaderboard || {})
          .map(([id, entry]: any) => ({ id, ...entry }))
          .sort((a: any, b: any) => b.score - a.score || (a.lastAnswerAt || 0) - (b.lastAnswerAt || 0))
      );
      setAnsweredCount(Array.isArray(room.answeredThisRound) ? room.answeredThisRound.length : 0);

      if (room.status === 'finished') {
        setQuestion(null);
        setTimeLeft(null);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        return;
      }

      if (room.status === 'in-progress' && room.currentQuestionIndex >= 0 && room.currentQuestionIndex < room.quiz.length) {
        const q = room.quiz[room.currentQuestionIndex];
        if (room.currentQuestionIndex !== lastQuestionIndexRef.current) {
          lastQuestionIndexRef.current = room.currentQuestionIndex;
          setQuestion({
            index: room.currentQuestionIndex,
            total: room.quiz.length,
            prompt: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            deadline: room.questionDeadline ?? undefined,
            durationMs: room.questionDurationMs ?? undefined,
          });
          setShowingResult(false);
          setCorrectIndex(null);
          resultTriggeredRef.current = false;
          if (resultTimerRef.current) {
            clearTimeout(resultTimerRef.current);
            resultTimerRef.current = null;
          }
        }

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (room.questionDeadline && room.questionDurationMs) {
          const tick = () => {
            const msLeft = Math.max(0, room.questionDeadline - Date.now());
            setTimeLeft(Math.ceil(msLeft / 1000));
          };
          tick();
          timerRef.current = setInterval(tick, 500);
        } else {
          setTimeLeft(null);
        }
      }
    });

    return () => {
      unsubscribe();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [roomCode]);

  const startNextQuestion = async () => {
    if (!roomCode || !hostSecret) return;
    setError(null);
    setShowingResult(false);
    setCorrectIndex(null);
    const sendRequest = async () => {
      try {
        const response = await fetch(`/api/rooms/${roomCode}/next-question`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hostSecret, code: roomCode }),
        });
        const payload = await readJsonSafe(response);
        return { response, payload };
      } catch (err: any) {
        return { response: null, payload: { error: err?.message || 'Network error' } } as any;
      }
    };

    let { response: res, payload: data } = await sendRequest();

    if (!res) {
      setError(getErrorMessage(data, 'Không gửi được câu hỏi (mạng)'));
      return;
    }
    if (!res.ok && res.status === 404) {
      const rehydrated = await rehydrateRoom(roomCode, hostSecret);
      if (rehydrated) {
        const retry = await sendRequest();
        res = retry.response;
        data = retry.payload;
      }
    }

    if (!res.ok) {
      setError(getErrorMessage(data, 'Không gửi được câu hỏi'));
      return;
    }

    // Nếu game kết thúc
    if (data.done) {
      setStatus('finished');
      setQuestion(null);
      setLeaderboard(data.leaderboard || []);
      setTimeLeft(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Fallback: nếu realtime không đẩy được, dùng ngay dữ liệu trả về để hiển thị câu hỏi
    if (data?.question) {
      setStatus('in-progress');
      setQuestion(data.question);
      setAnsweredCount(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (data.question.deadline && data.question.durationMs) {
        const tick = () => {
          const msLeft = Math.max(0, data.question.deadline - Date.now());
          setTimeLeft(Math.ceil(msLeft / 1000));
        };
        tick();
        timerRef.current = setInterval(tick, 500);
      } else {
        setTimeLeft(null);
      }
    }
  };

  // Tự động hiển thị kết quả và chuyển câu tiếp theo khi hết giờ
  useEffect(() => {
    if (status !== 'in-progress' || timeLeft === null) return;
    if (timeLeft <= 0 && question) {
      const correct = typeof question.correctIndex === 'number' ? question.correctIndex : null;
      setCorrectIndex(correct);
      setShowingResult(true);
      if (!resultTriggeredRef.current) {
        resultTriggeredRef.current = true;
        // Hiển thị kết quả 3 giây rồi tự động chuyển câu tiếp
        resultTimerRef.current = setTimeout(() => {
          resultTimerRef.current = null;
          startNextQuestion();
        }, 3000);
      }
      return () => {
        if (resultTimerRef.current) {
          clearTimeout(resultTimerRef.current);
          resultTimerRef.current = null;
        }
      };
    }
  }, [timeLeft, status, question]);

  // Kết thúc câu hỏi sớm (nút dừng thời gian)
  const endQuestionEarly = async () => {
    if (!roomCode || !hostSecret) return;
    setError(null);
    let success = false;
    try {
      const res = await fetch(`/api/rooms/${roomCode}/end-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostSecret, code: roomCode }),
      });
      const data = await readJsonSafe(res);
      if (!res.ok) {
        setError(getErrorMessage(data, 'Không kết thúc được câu hỏi'));
        return;
      }
      success = true;
    } catch (err: any) {
      setError(err?.message || 'Không kết thúc được câu hỏi (mạng)');
      return;
    }
    if (success) {
      // Đưa đồng hồ về 0 để kích hoạt hiển thị kết quả 3 giây, sau đó useEffect sẽ tự gọi câu tiếp
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeLeft(0);
      if (question) {
        const correct = typeof question.correctIndex === 'number' ? question.correctIndex : null;
        setCorrectIndex(correct);
      }
      setShowingResult(true);
      if (!resultTriggeredRef.current) {
        resultTriggeredRef.current = true;
        resultTimerRef.current = setTimeout(() => {
          resultTimerRef.current = null;
          startNextQuestion();
        }, 3000);
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-xl font-serif-heading bg-[#F5E6D3] text-[#2C2A29]">Đang chuẩn bị phiên hỏi đáp...</div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-[#F5E6D3]">
      <div className="text-xl font-serif-heading font-bold text-[#DA251D] border-2 border-[#DA251D] bg-[#fdf0f0] p-4 rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)]">{error}</div>
      <button
        onClick={createRoom}
        className="px-8 py-4 text-lg font-serif-heading font-black text-[#FAF3EB] bg-[#2C2A29] transition-all border-2 border-[#2C2A29] shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] rounded-sm active:translate-y-1 active:shadow-none uppercase tracking-widest"
      >
        Làm mới tín hiệu
      </button>
    </div>
  );
  if (!roomCode) return <div className="flex items-center justify-center min-h-screen text-xl font-serif-heading bg-[#F5E6D3] text-[#2C2A29]">Không có phòng</div>;

  // Màn hình tuyên dương khi kết thúc
  if (status === 'finished') {
    const top3 = leaderboard.slice(0, 3);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="mb-8 text-4xl md:text-5xl font-serif-heading font-black text-[#DA251D] drop-shadow-sm uppercase tracking-wider relative z-10">Bảng Vàng Danh Dự</div>
        <div className="w-24 h-1 bg-[#2C2A29] mx-auto mb-10 relative z-10"></div>
        
        <div className="flex items-end justify-center gap-4 md:gap-8 mb-12 relative z-10 w-full max-w-2xl px-4">
          {/* Hạng 2 */}
          {top3[1] && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-3 text-2xl font-serif-heading font-black text-[#4A5D23] bg-[#FAF3EB] border-2 border-[#4A5D23] rounded-full shadow-[4px_4px_0px_0px_rgba(74,93,35,1)]">
                {top3[1].name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col items-center justify-center w-24 md:w-28 h-28 md:h-32 bg-[#FAF3EB] border-2 border-[#D1C2A5] border-b-0 rounded-t-sm shadow-[4px_-4px_0px_0px_rgba(44,42,41,0.2)]">
                <span className="text-3xl mb-1 text-[#5C554E]">Á Khoa</span>
                <span className="font-serif-heading font-bold text-[#2C2A29] truncate w-full text-center px-2">{top3[1].name}</span>
                <span className="text-lg font-black text-[#DA251D]">{top3[1].score}</span>
              </div>
            </div>
          )}
          
          {/* Hạng 1 */}
          {top3[0] && (
            <div className="flex flex-col items-center -mt-8">
              <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-3 text-3xl font-serif-heading font-black text-[#FAF3EB] bg-[#DA251D] border-2 border-[#2C2A29] rounded-full shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] z-10 relative">
                <span className="absolute -top-6 text-4xl">👑</span>
                {top3[0].name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col items-center justify-center bg-[#E3D6C1] border-2 border-[#2C2A29] border-b-0 w-28 md:w-32 h-40 md:h-44 rounded-t-sm shadow-[6px_-6px_0px_0px_rgba(44,42,41,1)] relative z-0">
                <span className="text-4xl mb-2 font-serif-heading font-black text-[#DA251D] uppercase">Trạng Nguyên</span>
                <span className="text-lg font-serif-heading font-bold text-[#2C2A29] truncate w-full text-center px-2">{top3[0].name}</span>
                <span className="text-2xl font-black text-[#DA251D]">{top3[0].score}</span>
              </div>
            </div>
          )}
          
          {/* Hạng 3 */}
          {top3[2] && (
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 mb-3 text-xl font-serif-heading font-black text-[#e67e22] bg-[#FAF3EB] border-2 border-[#e67e22] rounded-full shadow-[4px_4px_0px_0px_rgba(230,126,34,1)]">
                {top3[2].name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col items-center justify-center w-20 md:w-24 h-20 md:h-24 bg-[#FAF3EB] border-2 border-[#D1C2A5] border-b-0 rounded-t-sm shadow-[4px_-4px_0px_0px_rgba(44,42,41,0.2)]">
                <span className="text-2xl mb-1 text-[#5C554E]">Bảng Nhãn</span>
                <span className="text-sm font-serif-heading font-bold text-[#2C2A29] truncate w-full text-center px-2">{top3[2].name}</span>
                <span className="font-black text-[#DA251D]">{top3[2].score}</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-md p-6 border-2 border-[#D1C2A5] bg-[#FAF3EB] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] relative z-10">
          <div className="mb-4 text-xl font-serif-heading font-bold text-[#2C2A29] border-b-2 border-[#D1C2A5] pb-2">Danh sách sĩ tử thăng hạng</div>
          <div className="space-y-3 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
            {leaderboard.map((entry, idx) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-white border border-[#D1C2A5] rounded-sm">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 flex items-center justify-center text-sm font-sans font-bold text-[#FAF3EB] rounded-sm bg-[#5C554E]">{idx + 1}</span>
                  <span className="font-serif-heading font-bold text-[#2C2A29] text-lg">{entry.name}</span>
                </div>
                <span className="font-sans font-black text-[#DA251D]">{entry.score} đ</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={createRoom}
          className="px-8 py-4 mt-10 text-lg font-serif-heading font-black text-[#FAF3EB] bg-[#DA251D] transition-all border-2 border-[#2C2A29] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] rounded-sm active:translate-y-1 active:shadow-none uppercase tracking-widest relative z-10"
        >
          Mở Khoá Thi Mới
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5E6D3] relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
      
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-[#FAF3EB] border-b-4 border-[#2C2A29] relative z-10 gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto text-center md:text-left">
          <div className="bg-[#2C2A29] text-[#FAF3EB] px-6 py-3 rounded-sm border-2 border-[#D1C2A5] shadow-[4px_4px_0px_0px_rgba(218,37,29,1)]">
            <div className="text-xs uppercase tracking-widest text-[#D1C2A5] font-bold mb-1">Mã phòng thu</div>
            <div className="text-4xl md:text-5xl font-mono font-black tracking-[0.2em] leading-none">{roomCode}</div>
          </div>
          <div className="text-sm font-serif-body italic text-[#5C554E] max-w-[200px]">
             Viết mã này lên bảng đen để các đồng chí cùng tham gia
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3 w-full md:w-auto">
          <div className="px-5 py-2.5 text-base font-serif-heading font-bold text-[#2C2A29] bg-white border-2 border-[#D1C2A5] rounded-sm shadow-[2px_2px_0px_0px_rgba(44,42,41,1)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Sĩ số: {playerCount}
          </div>
          
          <button
            onClick={createRoom}
            disabled={loading}
            className="px-4 py-2 text-sm font-sans font-bold text-[#5C554E] bg-[#E3D6C1] transition-all border-2 border-[#D1C2A5] rounded-sm hover:bg-[#D1C2A5] hover:text-[#2C2A29] disabled:opacity-50"
          >
            Tạo phòng mới
          </button>
          
          {status === 'in-progress' && timeLeft !== null && timeLeft > 0 && (
            <button
              onClick={endQuestionEarly}
              className="px-5 py-2.5 text-sm font-sans font-bold text-[#FAF3EB] transition-all bg-[#DA251D] border-2 border-[#2C2A29] rounded-sm shadow-[2px_2px_0px_0px_rgba(44,42,41,1)] active:translate-y-1 active:shadow-none hover:bg-[#b01e18]"
            >
              Cắt thời gian
            </button>
          )}
          
          <button
            onClick={startNextQuestion}
            disabled={!playerCount || (status === 'in-progress' && timeLeft !== null && timeLeft > 0)}
            className="px-6 py-3 text-base font-serif-heading font-black text-[#FAF3EB] transition-all rounded-sm border-2 border-[#2C2A29] shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] bg-[#4A5D23] active:translate-y-1 active:shadow-none disabled:bg-[#D1C2A5] disabled:border-[#999] disabled:shadow-none disabled:text-[#999] uppercase tracking-wider"
          >
            {status === 'in-progress' && timeLeft !== null && timeLeft > 0 ? 'Đang phát sóng...' : 'Bắt Đầu / Câu Tiếp'}
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative z-10">
        {question ? (
          <main className="flex-1 p-4 md:p-8 flex flex-col overflow-y-auto">
            <div className="p-6 md:p-10 mb-6 bg-[#FAF3EB] border-2 border-[#D1C2A5] shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-[#D1C2A5]">
                <div className="inline-block px-3 py-1 bg-[#2C2A29] text-[#FAF3EB] text-sm font-sans font-bold uppercase tracking-widest rounded-sm">
                  Câu hỏi {question.index + 1} / {question.total}
                </div>
                {timeLeft !== null && !showingResult && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#5C554E] font-serif-heading italic">Thời gian:</span>
                    <div className="text-3xl font-mono font-black text-[#DA251D] bg-white px-3 py-1 border-2 border-[#DA251D] rounded-sm shrink-0 w-16 text-center">
                      {timeLeft}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-2xl md:text-4xl font-serif-heading font-black text-[#2C2A29] leading-tight mb-4">
                {question.prompt}
              </div>
              
              {showingResult && correctIndex !== null && (
                <div className="mt-6 p-4 bg-[#eef5e6] border-2 border-[#4A5D23] rounded-sm inline-block">
                  <span className="font-serif-heading font-bold text-[#4A5D23] flex items-center gap-2 text-lg">
                    <span className="text-2xl">✓</span> Đáp án chính xác: <span className="underline decoration-2 underline-offset-4">{question.options[correctIndex]}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-auto">
              {question.options.map((opt, idx) => {
                const colors = ['bg-[#DA251D]', 'bg-[#1a5276]', 'bg-[#e67e22]', 'bg-[#4A5D23]'];
                let bgColor = colors[idx % colors.length];
                let opacityClass = "";
                let borderColor = "#2C2A29";
                
                if (showingResult) {
                  if (idx === correctIndex) {
                    bgColor = "bg-[#4A5D23]";
                  } else {
                    bgColor = "bg-white";
                    opacityClass = "opacity-50 grayscale gap";
                    borderColor = "#D1C2A5";
                  }
                }
                
                return (
                  <div
                    key={idx}
                    className={`${bgColor} ${opacityClass} border-2 rounded-sm p-5 md:p-6 text-[#FAF3EB] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] transition-all flex items-center min-h-[100px]`}
                    style={{ borderColor }}
                  >
                     <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white/20 rounded-sm mr-4 text-2xl font-black">
                       {idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D'}
                     </div>
                     <span className={`text-xl md:text-2xl font-serif-heading font-bold ${showingResult && idx !== correctIndex ? 'text-[#5C554E]' : 'text-[#FAF3EB]'}`}>
                       {opt}
                     </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between p-4 bg-white border-2 border-[#D1C2A5] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)]">
              <div className="text-lg font-serif-heading font-bold text-[#5C554E]">
                Số bài thu được: <span className="text-[#DA251D] font-black">{answeredCount}/{playerCount}</span>
              </div>
              <div className="flex -space-x-2">
                {players.slice(0, 8).map((name, idx) => (
                  <div key={`${name}-${idx}`} className="flex items-center justify-center w-10 h-10 text-xs font-sans font-bold text-[#FAF3EB] bg-[#5C554E] border-2 border-[#FAF3EB] rounded-full shadow-sm z-10" style={{ zIndex: 10 - idx }} title={name}>
                    {name.slice(0,2).toUpperCase()}
                  </div>
                ))}
                {players.length > 8 && (
                   <div className="flex items-center justify-center w-10 h-10 text-xs font-sans font-bold text-[#2C2A29] bg-[#E3D6C1] border-2 border-[#FAF3EB] rounded-full shadow-sm z-0">
                     +{players.length - 8}
                   </div>
                )}
              </div>
            </div>
          </main>
        ) : (
          <main className="flex flex-col items-center justify-center flex-1 gap-6 p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
            <div className="p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] max-w-2xl w-full">
              <div className="w-16 h-1 bg-[#DA251D] mx-auto mb-6"></div>
              <div className="text-4xl md:text-5xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase tracking-wider">Phòng Chờ Sĩ Tử</div>
              <div className="text-lg font-serif-body text-[#5C554E] italic mb-8">Khi các đồng chí đã đông đủ, Nhấn nút "Bắt Đầu" trên trạm điều khiển để phát câu hỏi.</div>
              
              <div className="bg-white border-2 border-[#D1C2A5] rounded-sm p-6 min-h-[200px]">
                <div className="text-sm font-sans font-bold uppercase tracking-widest text-[#999] mb-4 text-left border-b border-[#eee] pb-2">Danh sách điểm danh ({players.length})</div>
                {players.length === 0 ? (
                  <div className="text-[#999] italic mt-10">Chưa có ai tham gia lớp học...</div>
                ) : (
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {players.map((name, idx) => (
                      <div key={`${name}-${idx}`} className="px-4 py-2 text-sm font-serif-heading font-bold text-[#2C2A29] bg-[#F5E6D3] border border-[#D1C2A5] rounded-sm shadow-sm">{name}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        )}

        {/* Sidebar Bảng điểm */}
        <aside className="w-full lg:w-80 bg-[#E3D6C1] border-t-4 lg:border-t-0 lg:border-l-4 border-[#2C2A29] flex flex-col h-64 lg:h-auto shrink-0">
          <div className="p-4 bg-[#2C2A29] text-[#FAF3EB]">
            <h2 className="text-xl font-serif-heading font-black uppercase tracking-wider text-center">Bảng Phong Thần</h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
            {leaderboard.length === 0 ? (
              <div className="text-[#5C554E] font-serif-body italic text-center mt-4">Kỳ thi chưa bắt đầu.</div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, idx) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-white border-2 border-[#D1C2A5] rounded-sm shadow-[2px_2px_0px_0px_rgba(44,42,41,0.5)]">
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-7 h-7 font-sans font-bold text-xs text-center border-2 rounded-sm ${idx === 0 ? 'bg-[#DA251D] text-white border-[#DA251D]' : idx === 1 ? 'bg-[#4A5D23] text-white border-[#4A5D23]' : idx === 2 ? 'bg-[#e67e22] text-white border-[#e67e22]' : 'bg-[#F5E6D3] text-[#5C554E] border-[#D1C2A5]'}`}>
                        {idx + 1}
                      </span>
                      <span className="font-serif-heading font-bold text-[#2C2A29] truncate max-w-[120px]">{entry.name}</span>
                    </div>
                    <span className="text-lg font-mono font-black text-[#DA251D]">{entry.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
