'use client';

import React, { useState } from 'react';
import HostView from './components/HostView';
import PlayerView from './components/PlayerView';

export default function QuizPage() {
  const [viewMode, setViewMode] = useState<'landing' | 'host' | 'player'>('landing');

  if (viewMode === 'landing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-[#F5E6D3] relative overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <div className="relative z-10 text-center">
          <p className="font-sans text-xs uppercase tracking-[.3em] font-bold text-[#5C554E] mb-2">Đấu trường kiến thức</p>
          <h1 className="mb-4 text-4xl md:text-6xl font-serif-heading font-black text-[#DA251D] uppercase tracking-wider drop-shadow-sm">Trò Chơi Lịch Sử</h1>
          <div className="w-16 h-1 bg-[#2C2A29] mx-auto mb-4"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 relative z-10 mt-8">
          <button 
            onClick={() => setViewMode('player')}
            className="flex flex-col items-center justify-center w-64 h-48 transition-all bg-[#FAF3EB] border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] rounded-sm hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] group"
          >
            <span className="mb-3 text-4xl transition-transform group-hover:scale-110">📱</span>
            <span className="text-2xl font-serif-heading font-bold text-[#2C2A29] uppercase tracking-wider">Người chơi</span>
            <span className="mt-2 text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest">(Điện thoại)</span>
          </button>

          <button 
            onClick={() => setViewMode('host')}
            className="flex flex-col items-center justify-center w-64 h-48 transition-all bg-[#FAF3EB] border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] rounded-sm hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(44,42,41,1)] group"
          >
            <span className="mb-3 text-4xl transition-transform group-hover:scale-110">🖥️</span>
            <span className="text-2xl font-serif-heading font-bold text-[#DA251D] uppercase tracking-wider">Máy chủ</span>
            <span className="mt-2 text-xs font-sans font-bold text-[#5C554E] uppercase tracking-widest">(Giáo viên)</span>
          </button>
        </div>
        
        <div className="max-w-md mt-12 text-sm text-center text-[#5C554E] relative z-10 bg-[#FAF3EB] p-6 border-2 border-[#D1C2A5] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,42,41,1)]">
          <p className="font-serif-heading font-bold text-lg text-[#2C2A29] mb-3 border-b-2 border-[#D1C2A5] pb-2 inline-block">Sổ tay hướng dẫn</p>
          <ul className="mt-2 ml-4 space-y-2 text-left list-decimal font-serif-body">
            <li>Mở 1 thiết bị chọn "Máy chủ" (Giáo viên).</li>
            <li>Học sinh dùng điện thoại chọn "Người chơi" & nhập mã PIN.</li>
            <li>Điền tên và chờ Máy chủ phát lệnh "Bắt đầu".</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
       <button 
         onClick={() => setViewMode('landing')}
         className="fixed z-50 px-2 py-1 text-xs text-white rounded top-2 right-2 bg-black/20 hover:bg-black/40"
       >
         Thoát
       </button>
       
       {viewMode === 'host' ? <HostView /> : <PlayerView />}
    </div>
  );
}