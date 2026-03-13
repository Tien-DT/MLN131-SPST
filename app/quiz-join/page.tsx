'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizData: QuizItem[] = [
  { question: "Hội nghị nào chốt chủ trương thống nhất đất nước về mặt Nhà nước?", options: ["Hội nghị TW 21", "Hội nghị TW 24 (8/1975)", "Hội nghị TW 6 (8/1979)", "Đại hội V (3/1982)"], correctIndex: 1, explanation: "Tháng 8/1975, Hội nghị Trung ương 24 chốt chủ trương cấp bách: thống nhất đất nước về mặt Nhà nước." },
  { question: "Tổng tuyển cử bầu Quốc hội chung diễn ra ngày nào?", options: ["2/9/1975", "25/4/1976", "24/6/1976", "30/4/1975"], correctIndex: 1, explanation: "Ngày 25/4/1976, hơn 23 triệu cử tri (98,77%) tham gia Tổng tuyển cử bầu Quốc hội chung." },
  { question: "Quốc hội khóa VI đổi tên Sài Gòn thành gì?", options: ["TP. Giải Phóng", "TP. Hồ Chí Minh", "TP. Thống Nhất", "TP. Sài Gòn Mới"], correctIndex: 1, explanation: "Quốc hội khóa VI quyết định đổi tên Sài Gòn – Gia Định thành TP. Hồ Chí Minh." },
  { question: "Đại hội IV (12/1976) đổi tên Đảng thành gì?", options: ["Đảng Lao động VN", "Đảng Cộng sản VN", "Đảng Nhân dân CM", "Đảng Xã hội VN"], correctIndex: 1, explanation: "Đại hội IV chính thức đổi tên thành Đảng Cộng sản Việt Nam." },
  { question: "\"Khoán 100\" thuộc bước đột phá nào?", options: ["Đột phá thứ 2", "Đột phá thứ 1", "Đột phá thứ 3", "Không thuộc đột phá nào"], correctIndex: 1, explanation: "Khoán 100 thuộc Bước đột phá thứ 1 (8/1979 – 1/1981), gắn với \"sản xuất bung ra\" của TW 6." },
  { question: "Giải phóng Phnôm Pênh diễn ra ngày nào?", options: ["17/2/1979", "7/1/1979", "30/4/1975", "25/4/1976"], correctIndex: 1, explanation: "Chiến thắng biên giới Tây Nam: giải phóng Phnôm Pênh ngày 7/1/1979." },
  { question: "Đại hội V (3/1982) xác định mặt trận hàng đầu là gì?", options: ["Công nghiệp nặng", "Nông nghiệp", "Quốc phòng", "Thương mại"], correctIndex: 1, explanation: "Đại hội V xác định nông nghiệp là mặt trận hàng đầu." },
  { question: "TW 8 (6/1985) chọn khâu đột phá nào xóa bao cấp?", options: ["Giáo dục – Y tế", "Giá – Lương – Tiền", "Sản xuất – Xuất khẩu", "Công – Nông – Dịch vụ"], correctIndex: 1, explanation: "TW 8 chọn \"Giá – Lương – Tiền\" làm khâu đột phá xóa bao cấp." },
  { question: "Đột phá thứ 3 (8/1986) định hình tư duy cho Đại hội nào?", options: ["Đại hội IV", "Đại hội V", "Đại hội VI", "Đại hội VII"], correctIndex: 2, explanation: "Hội nghị Bộ Chính trị (8/1986) định hình tư duy cho Đại hội VI — Đại hội Đổi Mới." },
  { question: "1975–1986 là giai đoạn «thai nghén» cho đường lối nào?", options: ["Kháng chiến", "Đổi mới toàn diện", "Ngoại giao đa phương", "Công nghiệp hóa"], correctIndex: 1, explanation: "11 năm (1975–1986) là giai đoạn thai nghén cho Đường lối Đổi mới toàn diện." },
  { question: "Lạm phát Việt Nam đạt bao nhiêu % vào năm 1986?", options: ["200%", "450%", "774%", "1.000%"], correctIndex: 2, explanation: "Lạm phát phi mã lên tới 774%, đây là áp lực buộc phải Đổi mới." },
  { question: "Phương châm Đại hội VI (12/1986) là gì?", options: ["\"Đoàn kết, đại đoàn kết\"", "\"Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật\"", "\"Tất cả vì dân\"", "\"Dĩ bất biến, ứng vạn biến\""], correctIndex: 1, explanation: "Đại hội VI: \"Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.\"" },
];

export default function QuizJoinPage() {
  const [playerName, setPlayerName] = useState('');
  const [joined, setJoined] = useState(false);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setJoined(true);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    setSelectedAnswer(idx);
    if (idx === quizData[currentIdx].correctIndex) {
      setScore(s => s + 1);
    }
    
    setTimeout(() => {
      if (currentIdx + 1 < quizData.length) {
        setCurrentIdx(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };
  
  const handleRestart = () => {
    setJoined(false);
    setIsFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setPlayerName('');
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="w-full max-w-sm p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-wider">Trạm Kết Nối</h2>
            <div className="w-12 h-1 bg-[#DA251D] mx-auto mt-2"></div>
            <p className="mt-3 text-sm font-serif-body text-[#5C554E] italic">Chế độ đào tạo cá nhân</p>
          </div>
          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest mb-1 ml-1">Tên Điểm Danh</label>
              <input
                type="text"
                placeholder="Ví dụ: Lê Văn Lợi"
                className="w-full p-4 text-lg font-serif-heading font-bold text-center text-[#2C2A29] bg-white border-2 border-[#D1C2A5] rounded-sm focus:outline-none focus:border-[#DA251D] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] placeholder-[#D1C2A5]"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 font-serif-heading font-black text-[#FAF3EB] bg-[#DA251D] border-2 border-[#2C2A29] rounded-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] transition-all uppercase tracking-widest text-lg"
            >
              Bắt Đầu Thi
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const pct = Math.round((score / quizData.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#F5E6D3] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="w-full max-w-md p-8 bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] relative z-10 text-center">
          <div className="text-3xl font-serif-heading font-black text-[#DA251D] uppercase tracking-wider mb-2">Bế Mạc Khóa Thi</div>
          <div className="w-12 h-1 bg-[#D1C2A5] mx-auto mb-6"></div>
          
          <div className="text-lg font-serif-body text-[#5C554E] italic mb-6">
            Kết quả của đồng chí <span className="font-bold text-[#2C2A29] not-italic">{playerName}</span>
          </div>

          <div className="inline-block relative mb-8">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="62" fill="none" stroke="#e5e5e5" strokeWidth="8" />
              <motion.circle
                cx="70" cy="70" r="62" fill="none"
                stroke={pct >= 70 ? "#4A5D23" : "#DA251D"} strokeWidth="8"
                strokeLinecap="round" strokeDasharray={390}
                initial={{ strokeDashoffset: 390 }}
                animate={{ strokeDashoffset: 390 - (390 * pct) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black" style={{ color: pct >= 70 ? "#4A5D23" : "#DA251D" }}>{pct}%</span>
              <span className="text-xs text-[#5C554E] font-medium font-sans">{score}/{quizData.length}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold font-serif-heading text-[#2C2A29] mb-1">
              {pct >= 90 ? "Xuất sắc!" : pct >= 70 ? "Tốt lắm!" : pct >= 50 ? "Khá ổn!" : "Cần cố gắng thêm!"}
            </h3>
            <p className="text-sm text-[#5C554E] font-serif-body italic">
              {pct >= 70 ? "Đồng chí đã nắm vững lịch sử hào hùng." : "Hãy ôn tập lại tài liệu nhé."}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-4 font-serif-heading font-black text-[#2C2A29] bg-[#E3D6C1] border-2 border-[#2C2A29] rounded-sm hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] transition-all uppercase tracking-widest text-lg"
          >
            Làm lại từ đầu
          </button>
        </div>
      </div>
    );
  }

  const q = quizData[currentIdx];
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F5E6D3] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
      
      {/* Header */}
      <div className="p-4 bg-[#FAF3EB] border-b-2 border-[#D1C2A5] relative z-10 flex justify-between items-center shadow-sm shrink-0">
         <span className="px-3 py-1 bg-[#2C2A29] text-[#FAF3EB] font-sans font-bold text-xs uppercase tracking-widest rounded-sm">
           Câu {currentIdx + 1} / {quizData.length}
         </span>
         <span className="font-sans font-bold text-[#5C554E] text-sm uppercase tracking-widest px-2">
           {playerName}
         </span>
      </div>
      
      {/* Question */}
      <div className="flex-none p-6 md:p-8 flex flex-col items-center justify-center relative z-10">
         <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-serif-heading font-black text-[#2C2A29] leading-snug lg:leading-normal max-w-4xl drop-shadow-sm">
           {q.question}
         </h2>
      </div>

      <AnimatePresence>
        {hasAnswered && (
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mx-6 p-4 mb-4 text-center border-2 border-[#2C2A29] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] relative z-10 bg-[#eef5e6]">
             <div className="text-xl font-serif-heading font-black mb-1 text-[#4A5D23]">
                {selectedAnswer === q.correctIndex ? 'Chính xác!' : 'Chưa đúng!'}
             </div>
             <div className="text-sm font-serif-body text-[#5C554E]">Mã giải thích: {q.explanation}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 bg-[#F5E6D3] relative z-10 flex-1 overflow-y-auto">
        {q.options.map((opt, idx) => {
          const isSelected = idx === selectedAnswer;
          const isCorrectOpt = idx === q.correctIndex;
          
          let bgColorClass = "bg-white hover:bg-[#FAF3EB]";
          let textColorClass = "text-[#5C554E]";
          let borderColorClass = "border-[#D1C2A5]";
          let opacityClass = hasAnswered ? "opacity-60" : "";
          let iconColorClass = "bg-[#FAF3EB] text-[#2C2A29] border-[#D1C2A5]";

          if (hasAnswered) {
             if (isCorrectOpt) {
               bgColorClass = "bg-[#eef5e6] scale-[1.02] z-10";
               textColorClass = "text-[#4A5D23]";
               borderColorClass = "border-[#4A5D23]";
               opacityClass = "opacity-100";
               iconColorClass = "bg-[#4A5D23] text-white border-[#4A5D23]";
             } else if (isSelected && !isCorrectOpt) {
               bgColorClass = "bg-[#fdf0f0]";
               textColorClass = "text-[#DA251D]";
               borderColorClass = "border-[#DA251D]";
               opacityClass = "opacity-100";
               iconColorClass = "bg-[#DA251D] text-white border-[#DA251D]";
             }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={hasAnswered}
              className={`relative rounded-sm border-2 ${borderColorClass} ${bgColorClass} ${opacityClass} shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] ${!hasAnswered ? 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] hover:border-[#DA251D] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(44,42,41,1)]' : ''} transition-all flex items-center p-4 min-h-[100px] text-left gap-4 group cursor-pointer`}
            >
              <span className={`w-12 h-12 flex-shrink-0 flex justify-center items-center rounded-sm font-black text-xl border-2 transition-colors ${iconColorClass}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className={`font-serif-heading font-bold leading-tight w-full text-lg md:text-xl ${textColorClass}`}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
