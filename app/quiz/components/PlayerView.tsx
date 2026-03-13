'use client';

import { useEffect, useRef, useState } from 'react';
import { clientDb } from '@/lib/firebaseClient';
import { doc, onSnapshot } from 'firebase/firestore';
// Dùng màu tailwind mặc định để tránh purge/safelist bị mất màu
const PLAYER_COLORS = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];

interface QuestionEvent {
  question: {
    index: number;
    total: number;
    prompt: string;
    options: string[];
    deadline?: number;
    durationMs?: number;
    correctIndex?: number;
  };
}

interface LeaderboardEvent {
  leaderboard: Array<{ id: string; name: string; score: number }>;
  answeredCount: number;
  playerCount: number;
}

export default function PlayerView() {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [question, setQuestion] = useState<QuestionEvent['question'] | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEvent['leaderboard']>([]);
  const [status, setStatus] = useState<'lobby' | 'in-progress' | 'finished'>('lobby');
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const lastQuestionIndexRef = useRef<number>(-1);
  const showResultTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rejoinAttemptedRef = useRef(false);
  const missingRoomSinceRef = useRef<number | null>(null);

  // Khi hết giờ hoặc host kết thúc, hiển thị kết quả (tô xanh đáp án đúng, đỏ đáp án sai) trong 3s
  useEffect(() => {
    if (!question) return;

    const shouldShowResult = timeLeft === 0 || showingResult;
    if (!shouldShowResult) return;

    // Kích hoạt chế độ hiển thị kết quả
    setShowingResult(true);
    if (question.correctIndex !== undefined) {
      setCorrectIndex(question.correctIndex);
    }

    // Đảm bảo chỉ tạo một timer hiển thị 3s
    if (!showResultTimerRef.current) {
      showResultTimerRef.current = setTimeout(() => {
        showResultTimerRef.current = null;
      }, 3000);
    }

    return () => {
      if (showResultTimerRef.current) {
        clearTimeout(showResultTimerRef.current);
        showResultTimerRef.current = null;
      }
    };
  }, [question, timeLeft, showingResult]);

  // Polling fallback nếu realtime bị gián đoạn
  useEffect(() => {
    if (!joined || !roomCodeInput) return;

    const code = roomCodeInput.toUpperCase();

    const poll = async () => {
      try {
        const res = await fetch(`/api/rooms/${code}/state`);
        const data = await res.json();
        if (res.ok) {
          setStatus(data.status ?? 'lobby');
          // Cập nhật leaderboard
          if (Array.isArray(data.leaderboard)) {
            setLeaderboard(data.leaderboard);
          }
          // Cập nhật trạng thái hiện kết quả
          setShowingResult(data.showingResult ?? false);
          // Nếu có câu hỏi mới
          if (data.currentQuestion && data.currentQuestion.index !== lastQuestionIndexRef.current) {
            lastQuestionIndexRef.current = data.currentQuestion.index;
            setQuestion(data.currentQuestion);
            setHasAnswered(false);
            setSelectedAnswer(null);
            setCorrectIndex(null);
            setShowingResult(false);
            // Cập nhật timer
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            if (data.currentQuestion.deadline && data.currentQuestion.durationMs) {
              const tick = () => {
                const msLeft = Math.max(0, data.currentQuestion.deadline - Date.now());
                setTimeLeft(Math.ceil(msLeft / 1000));
              };
              tick();
              timerRef.current = setInterval(tick, 500);
            } else {
              setTimeLeft(null);
            }
          }
          // Cập nhật đáp án đúng khi hết giờ
          if (data.currentQuestion?.correctIndex !== undefined) {
            setCorrectIndex(data.currentQuestion.correctIndex);
          }
          // Nếu game kết thúc
          if (data.status === 'finished') {
            setQuestion(null);
            setTimeLeft(null);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
          }
        } else if (res.status === 404) {
          if (!rejoinAttemptedRef.current && playerId && playerName) {
            rejoinAttemptedRef.current = true;
            const joinRes = await fetch(`/api/rooms/${code}/join`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ playerId, playerName, code }),
            });
            if (joinRes.ok) {
              setError(null);
              missingRoomSinceRef.current = null;
              return;
            }
          }
          if (!missingRoomSinceRef.current) {
            missingRoomSinceRef.current = Date.now();
          }
          const elapsed = Date.now() - (missingRoomSinceRef.current || Date.now());
          if (elapsed > 5000) {
            setError('Đang chờ host khôi phục phòng... Nếu quá lâu, hãy kiểm tra mã phòng.');
          }
        }
      } catch (err) {
        console.warn('Poll room state failed', err);
      }
    };

    poll();
    pollRef.current = setInterval(poll, 1500); // Poll mỗi 1.5s

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [joined, roomCodeInput]);

  useEffect(() => {
    if (!joined || !roomCodeInput) return;

    const code = roomCodeInput.toUpperCase();
    const roomRef = doc(clientDb, 'rooms', code);
    const unsubscribe = onSnapshot(
      roomRef,
      (snap) => {
        if (!snap.exists()) {
          setError('Phòng không tồn tại hoặc đã hết hạn. Vui lòng kiểm tra mã phòng.');
          return;
        }

      const room = snap.data() as any;
      setStatus(room.status ?? 'lobby');
      setLeaderboard(
        Object.entries(room.leaderboard || {})
          .map(([id, entry]: any) => ({ id, ...entry }))
          .sort((a: any, b: any) => b.score - a.score || (a.lastAnswerAt || 0) - (b.lastAnswerAt || 0))
      );
      setShowingResult(false);
      setError(null);

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
            deadline: room.questionDeadline ?? undefined,
            durationMs: room.questionDurationMs ?? undefined,
            correctIndex: undefined,
          });
          setHasAnswered(false);
          setSelectedAnswer(null);
          setCorrectIndex(null);
          setShowingResult(false);
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

        if (room.questionDeadline && Date.now() > room.questionDeadline) {
          setCorrectIndex(q.correctIndex);
          setShowingResult(true);
        }
      }
    },
      (err) => {
        console.warn('Player snapshot error', err);
        setError('Mất kết nối realtime, đang thử lại...');
      }
    );

    return () => {
      unsubscribe();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [joined, roomCodeInput]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    rejoinAttemptedRef.current = false;
    if (!roomCodeInput.trim() || !playerName.trim()) {
      setError('Nhập mã phòng và tên');
      return;
    }

    const code = roomCodeInput.toUpperCase();
    const id = Math.random().toString(36).slice(2, 9);
    try {
      const res = await fetch(`/api/rooms/${code}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: id, playerName, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Không thể tham gia');
      setPlayerId(id);
      setJoined(true);
      setStatus(data.status || 'lobby');
    } catch (err: any) {
      setError(err?.message || 'Không thể tham gia');
    }
  };

  const handleAnswer = async (index: number) => {
    if (!playerId || !roomCodeInput || hasAnswered || status !== 'in-progress' || showingResult) return;
    setHasAnswered(true);
    setSelectedAnswer(index);
    setError(null);
    const code = roomCodeInput.toUpperCase();
    const res = await fetch(`/api/rooms/${code}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId, playerName, answerIndex: index, code }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || 'Không gửi được đáp án');
    }
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#F5E6D3] relative overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <div className="w-full max-w-sm p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-wider">Trạm Kết Nối</h2>
            <div className="w-12 h-1 bg-[#DA251D] mx-auto mt-2"></div>
          </div>
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest mb-1 ml-1">Mã phòng thu</label>
              <input
                type="text"
                placeholder="Nhập 6 ký tự..."
                className="w-full p-4 text-xl font-mono font-black tracking-widest text-center text-[#2C2A29] bg-white border-2 border-[#D1C2A5] rounded-sm focus:outline-none focus:border-[#DA251D] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] placeholder-[#D1C2A5]"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                maxLength={6}
              />
            </div>
            <div>
              <label className="block text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest mb-1 ml-1">Tên Điểm Danh</label>
              <input
                type="text"
                placeholder="Ví dụ: Lạc Long"
                className="w-full p-4 text-lg font-serif-heading font-bold text-center text-[#2C2A29] bg-white border-2 border-[#D1C2A5] rounded-sm focus:outline-none focus:border-[#DA251D] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] placeholder-[#D1C2A5]"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={12}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 mt-2 font-serif-heading font-black text-[#FAF3EB] bg-[#DA251D] border-2 border-[#2C2A29] rounded-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] transition-all uppercase tracking-widest text-lg"
            >
              Nối Cáp Vào Thi
            </button>
            {error && <div className="text-sm font-sans font-bold text-center text-[#DA251D] mt-4 bg-[#fdf0f0] border border-[#DA251D] p-2 rounded-sm">{error}</div>}
          </form>
        </div>
      </div>
    );
  }

  if (status === 'lobby') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 w-full max-w-md p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] text-center">
          <div className="text-2xl font-serif-heading font-black text-[#4A5D23] mb-2 uppercase tracking-wider">Đã điểm danh!</div>
          <div className="w-12 h-1 bg-[#D1C2A5] mx-auto mb-6"></div>
          <div className="text-lg font-serif-body text-[#5C554E] italic mb-6">Các đồng chí ở lại trạm chờ tin báo từ Chỉ huy (Giáo viên).</div>
          <div className="inline-block px-6 py-4 border-2 border-[#2C2A29] bg-[#E3D6C1] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] mb-4">
             <span className="text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest block mb-1">Mã định danh</span>
             <div className="text-3xl font-serif-heading font-black text-[#2C2A29]">{playerName}</div>
          </div>
          {error && <div className="mt-6 text-sm font-bold text-center text-[#DA251D] bg-[#fdf0f0] border border-[#DA251D] p-2 rounded-sm">{error}</div>}
        </div>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="flex flex-col min-h-screen p-4 bg-[#F5E6D3] relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        <div className="relative z-10 p-6 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] mb-6 text-center">
          <div className="text-3xl font-serif-heading font-black text-[#DA251D] uppercase tracking-wider">Bế mạc kỳ thi!</div>
          <div className="w-12 h-1 bg-[#D1C2A5] mx-auto my-3"></div>
          <div className="text-lg font-serif-body text-[#5C554E] italic">Rất tuyên dương đồng chí <span className="font-bold text-[#2C2A29] not-italic">{playerName}</span> đã có mặt.</div>
        </div>
        <div className="relative z-10 flex-1 p-4 bg-white border-2 border-[#D1C2A5] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)]">
          <div className="text-lg font-serif-heading font-bold text-[#2C2A29] border-b-2 border-[#D1C2A5] pb-2 mb-4">Kết Quả Bảng Vàng</div>
          <div className="space-y-3">
            {leaderboard.map((entry, idx) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-[#FAF3EB] border border-[#D1C2A5] rounded-sm">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 flex items-center justify-center text-sm font-sans font-bold rounded-sm border-2 ${idx === 0 ? 'bg-[#DA251D] text-white border-[#DA251D]' : idx === 1 ? 'bg-[#4A5D23] text-white border-[#4A5D23]' : idx === 2 ? 'bg-[#e67e22] text-white border-[#e67e22]' : 'bg-[#E3D6C1] text-[#2C2A29] border-[#D1C2A5]'}`}>
                    {idx + 1}
                  </span>
                  <span className="font-serif-heading font-bold text-[#2C2A29] truncate max-w-[150px]">{entry.name}</span>
                </div>
                <span className="font-mono font-black text-[#DA251D]">{entry.score} đ</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (question) {
    const renderOptions = (disabled: boolean) => (
      <div className="grid grid-cols-2 grid-rows-2 gap-3 p-4 bg-[#F5E6D3] relative z-10 flex-1 overflow-hidden pointer-events-auto">
        {question.options.map((opt, idx) => {
          const isSelected = idx === selectedAnswer;
          const isCorrectOpt = correctIndex !== null && idx === correctIndex;
          
          let bgColorClass = "";
          let textColorClass = "text-[#FAF3EB]";
          let borderColorClass = "border-[#2C2A29]";
          let opacityClass = "";
          
          if (showingResult) {
            if (isCorrectOpt) {
              bgColorClass = "bg-[#4A5D23]"; // Right answer = Green
            } else if (isSelected && !isCorrectOpt) {
              bgColorClass = "bg-[#DA251D]"; // Wrong answer = Red
            } else {
              bgColorClass = "bg-white"; // Unselected = Faded white
              textColorClass = "text-[#999]";
              borderColorClass = "border-[#D1C2A5]";
            }
          } else {
            // Colors matching HostView
            const colors = ['bg-[#DA251D]', 'bg-[#1a5276]', 'bg-[#e67e22]', 'bg-[#4A5D23]'];
            bgColorClass = colors[idx % colors.length];
          }

          if (disabled && !showingResult && !isSelected) {
            opacityClass = "opacity-50 grayscale border-[#D1C2A5]";
          }
          
          return (
            <button
              key={idx}
              onClick={() => !disabled && handleAnswer(idx)}
              disabled={disabled}
              className={`relative rounded-sm border-2 ${borderColorClass} ${bgColorClass} ${opacityClass} ${textColorClass} shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(44,42,41,1)] transition-all flex flex-col items-center justify-center p-2 min-h-[140px]`}
            >
              <span className="text-3xl font-black mb-1 shrink-0 bg-white/20 w-12 h-12 flex justify-center items-center rounded-sm">
                {idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D'}
              </span>
              <span className="px-2 font-serif-heading font-bold text-center leading-tight line-clamp-3 w-full text-base sm:text-xl md:text-2xl h-[4.5rem] flex items-center justify-center overflow-hidden">{opt}</span>
              {isSelected && showingResult && !isCorrectOpt && <span className="absolute text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">✗</span>}
              {isCorrectOpt && showingResult && <span className="absolute text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none">✓</span>}
            </button>
          );
        })}
      </div>
    );

    // Hiển thị kết quả với đáp án đúng
    if (showingResult && correctIndex !== null) {
      const isCorrect = selectedAnswer === correctIndex;
      return (
        <div className="flex flex-col min-h-[100dvh] bg-[#F5E6D3] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
          <div className={`p-6 m-4 md:m-8 text-center border-2 border-[#2C2A29] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] relative z-10 ${isCorrect ? 'bg-[#eef5e6]' : 'bg-[#fdf0f0]'}`}>
            <div className={`text-3xl font-serif-heading font-black mb-2 uppercase tracking-wider ${isCorrect ? 'text-[#4A5D23]' : 'text-[#DA251D]'}`}>
              {isCorrect ? 'Tuyệt Vời!' : 'Thật Đáng Tiếc!'}
            </div>
            <div className="w-12 h-1 mx-auto mb-4 bg-[#2C2A29]/20"></div>
            <div className="text-sm font-sans font-bold text-[#5C554E] uppercase tracking-widest mb-1">Đáp án đúng:</div>
            <div className="text-xl font-serif-heading font-bold text-[#2C2A29]">{question.options[correctIndex]}</div>
          </div>
          {renderOptions(true)}
          <div className="p-4 text-center font-serif-body text-[#5C554E] italic relative z-10 bg-[#FAF3EB] border-t-2 border-[#D1C2A5]">Đồng chí chờ tổng trạm chuyển bản tin mới...</div>
        </div>
      );
    }

    // Đã chọn câu trả lời, vẫn hiện ô đã chọn với màu
    if (hasAnswered) {
      return (
        <div className="flex flex-col min-h-[100dvh] bg-[#F5E6D3] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
          <div className="p-5 mx-4 mt-6 mb-2 font-serif-heading font-bold text-center text-[#2C2A29] bg-[#E3D6C1] border-2 border-[#2C2A29] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] relative z-10">
            <span className="block text-2xl mb-1">Đã nhận được tín hiệu!</span>
            <span className="text-sm font-serif-body text-[#5C554E] italic">Cùng chờ các đồng chí khác...</span>
          </div>
          {renderOptions(true)}
          {error && <div className="p-2 mb-2 mx-4 text-center text-[#DA251D] bg-[#fdf0f0] border border-[#DA251D] text-sm relative z-10 font-bold rounded-sm">{error}</div>}
        </div>
      );
    }

    // Đang trả lời
    return (
      <div className="flex flex-col min-h-[100dvh] bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        <div className="p-4 bg-[#FAF3EB] border-b-2 border-[#D1C2A5] relative z-10 flex justify-between items-center shadow-sm shrink-0">
           <span className="px-3 py-1 bg-[#2C2A29] text-[#FAF3EB] font-sans font-bold text-xs uppercase tracking-widest rounded-sm">
             Câu {question.index + 1}
           </span>
           {timeLeft !== null && (
             <span className="font-mono font-black text-[#DA251D] text-2xl px-2">
               00:{timeLeft.toString().padStart(2, '0')}
             </span>
           )}
        </div>
        {renderOptions(false)}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5E6D3] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
      <div className="text-center p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] max-w-sm w-full relative z-10 mx-4">
        <div className="w-12 h-1 bg-[#DA251D] mx-auto mb-6"></div>
        <div className="text-2xl font-serif-heading font-black text-[#2C2A29] mb-4">Vui lòng chờ bản tin tiếp theo...</div>
        <div className="text-sm font-serif-body text-[#5C554E] italic">Máy chủ đang chuẩn bị câu hỏi.</div>
        {error && <div className="mt-6 p-3 text-sm font-bold text-[#DA251D] bg-[#fdf0f0] border border-[#DA251D] rounded-sm">{error}</div>}
      </div>
    </div>
  );
}