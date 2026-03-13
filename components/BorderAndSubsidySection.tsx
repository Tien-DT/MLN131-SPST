'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RegionKey = 'north' | 'south' | null;

export default function BorderAndSubsidySection() {
  const [activeRegion, setActiveRegion] = useState<RegionKey>(null);
  
  const regions: Record<string, { title: string; content: string; image: string }> = {
    north: {
      title: 'Biên giới phía Bắc (17/2/1979)',
      content: 'Chống lại cuộc chiến tranh xâm lược quy mô lớn của Trung Quốc. Quân và dân ta đã trực tiếp chiến đấu và giành thắng lợi, bảo vệ vững chắc chủ quyền lãnh thổ.',
      image: '/thichhohap-co-5-1024x494.jpg' 
    },
    south: {
      title: 'Biên giới Tây Nam (1979)',
      content: 'Chống lại sự xâm lược của tập đoàn Pol Pot - Ieng Sary. Ngày 7/1/1979, giải phóng thủ đô Phnôm Pênh, cứu nhân dân Campuchia khỏi thảm họa diệt chủng.',
      image: '/thichhohap-co-5-1024x494.jpg' 
    }
  };

  return (
    <section className="bg-[#4A5D23] py-24 border-b-4 border-[#2C2A29] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-section-title text-[#F5E6D3] after:bg-[#F4D03F]">
            Bảo vệ Tổ Quốc & Xây dựng CNXH
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Border Defense Map Concept */}
          <div className="vintage-box p-8 relative">
            <h3 className="text-2xl font-serif-heading text-[#2C2A29] border-b-2 border-[#D1C2A5] pb-4 mb-6">
              Hai Cuộc Chiến Tranh Bảo Vệ Biên Giới
            </h3>
            
            <div className="relative aspect-[3/4] bg-[#E3D6C1] border-2 border-[#2C2A29] p-4 flex flex-col items-center justify-center">
              {/* Fake Map representation for simplicity */}
              <div className="w-1/2 h-4/5 border-4 border-[#4A5D23] bg-[#D1C2A5] relative opacity-50"></div>
              
              {/* Pulsing dots for borders */}
              <button 
                className="absolute top-[20%] right-[45%] w-6 h-6 bg-[#DA251D] rounded-full border-2 border-white cursor-pointer z-10 hover:scale-125 transition-transform"
                onClick={() => setActiveRegion('north')}
              >
                <span className="absolute inset-0 rounded-full animate-ping bg-[#DA251D] opacity-75"></span>
              </button>
              <div className="absolute top-[12%] right-[10%] bg-[#FAF3EB] text-[#2C2A29] text-xs font-bold px-2 py-1 border border-[#2C2A29] rotate-12">Phía Bắc</div>

              <button 
                className="absolute bottom-[20%] left-[40%] w-6 h-6 bg-[#DA251D] rounded-full border-2 border-white cursor-pointer z-10 hover:scale-125 transition-transform"
                onClick={() => setActiveRegion('south')}
              >
                <span className="absolute inset-0 rounded-full animate-ping bg-[#DA251D] opacity-75"></span>
              </button>
              <div className="absolute bottom-[28%] left-[10%] bg-[#FAF3EB] text-[#2C2A29] text-xs font-bold px-2 py-1 border border-[#2C2A29] -rotate-6">Tây Nam</div>
            </div>

            {/* Info Popup within the box */}
            <AnimatePresence>
              {activeRegion && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-8 left-8 right-8 bg-[#FAF3EB] border-2 border-[#2C2A29] p-4 shadow-lg"
                >
                  <button onClick={() => setActiveRegion(null)} className="absolute top-2 right-2 text-[#DA251D] font-bold">X</button>
                  <h4 className="font-bold text-[#DA251D] mb-2">{regions[activeRegion].title}</h4>
                  <p className="text-sm font-serif-body">{regions[activeRegion].content}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Subsidy Era Mini-interactive */}
          <div className="vintage-box p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif-heading text-[#2C2A29] border-b-2 border-[#D1C2A5] pb-4 mb-6">
                Ký ức Thời Bao Cấp
              </h3>
              <p className="font-serif-body text-[#5C554E] mb-6">
                Giai đoạn này đối mặt với hậu quả nặng nề của chiến tranh và khủng hoảng kinh tế-xã hội. Trải nghiệm một phần đời sống thông qua chế độ &quot;Tem Phiếu&quot;.
              </p>
              
              <div className="bg-[#E3D6C1] border-2 border-[#2C2A29] p-6 text-center transform rotate-1">
                <div className="border border-dashed border-[#5C554E] p-4">
                  <h4 className="font-bold text-xl uppercase tracking-widest text-[#2C2A29] mb-4 border-b border-[#5C554E] inline-block pb-1">Sổ Lương Thực</h4>
                  <div className="flex gap-4 justify-center mt-4">
                    <div className="w-16 h-20 bg-[#F5E6D3] border border-[#2C2A29] flex items-center justify-center font-bold text-[#DA251D] opacity-80 cursor-help hover:opacity-100" title="Phiếu Mua Gạo">Gạo</div>
                    <div className="w-16 h-20 bg-[#F5E6D3] border border-[#2C2A29] flex items-center justify-center font-bold text-[#2C2A29] opacity-80 cursor-help hover:opacity-100" title="Phiếu Mua Vải">Vải</div>
                    <div className="w-16 h-20 bg-[#F5E6D3] border border-[#2C2A29] flex items-center justify-center font-bold text-[#4A5D23] opacity-80 cursor-help hover:opacity-100" title="Phiếu Mua Thịt">Thịt</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-[#D1C2A5]">
              <p className="text-xs italic text-[#5C554E]">Tới Hội nghị TW 8 (6/1985), Đảng đã quyết định xóa bỏ cơ chế tập trung quan liêu bao cấp, lấy Giá - Lương - Tiền làm khâu đột phá.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
