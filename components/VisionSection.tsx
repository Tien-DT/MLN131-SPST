'use client';

import Image from 'next/image';
import { useTheme } from '@/app/components/ThemeProvider';

export default function VisionSection() {
  const { isDarkMode } = useTheme();

  const visionItems = [
    {
      year: '2030',
      content:
        'Hoàn thiện cơ bản cơ chế bảo đảm quyền làm chủ của nhân dân; thượng tôn pháp luật trở thành chuẩn mực ứng xử chung; hoàn thành xây dựng nền hành chính phục vụ và tư pháp chuyên nghiệp.'
    },
    {
      year: '2045',
      content:
        'Việt Nam trở thành quốc gia phát triển, thu nhập cao; Nhà nước pháp quyền XHCN hoạt động hiệu lực, hiệu quả, quyền con người được bảo vệ tối ưu.'
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden border-b-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] border-[#DA251D]/30' : 'bg-[#F5E6D3] border-[#2C2A29]'}`}>
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="container-custom relative mx-auto px-6">
        <div className={`text-center mb-16 border-b-4 border-double pb-8 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/20' : 'border-[#2C2A29]'}`}>
          <h2 className={`text-4xl md:text-6xl font-serif-heading font-black uppercase tracking-tight leading-none mb-4 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
            Tầm Nhìn Chiến Lược <span className="text-[#DA251D]">2030 - 2045</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {visionItems.map((item, index) => (
            <div
              key={item.year}
              className={`relative border-4 border-double shadow-[8px_8px_0px_0px_var(--text-primary)] overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#141414] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}
            >
              <div className={`px-6 pt-5 pb-4 border-b-2 transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]/30' : 'bg-[#F5E6D3] border-[#D1C2A5]'}`}>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center text-xs font-black border-2 border-[#DA251D] text-[#DA251D] bg-white/80">
                    {index + 1}
                  </span>
                  <span className={`text-[11px] font-black uppercase tracking-[0.18em] ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>
                    Mốc tầm nhìn
                  </span>
                </div>
                <h3 className={`text-2xl md:text-3xl font-serif-heading font-black leading-tight transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                  Năm {item.year}
                </h3>
              </div>

              <div className="px-6 py-5">
                <p className={`font-serif-body text-sm md:text-base leading-relaxed text-justify transition-colors ${isDarkMode ? 'text-[#E8D9C5]/75' : 'text-[#5C554E]'}`}>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`max-w-5xl mx-auto mt-10 border-4 border-double shadow-[8px_8px_0px_0px_var(--text-primary)] overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#141414] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}>
          <div className={`relative aspect-[11/6] ${isDarkMode ? 'opacity-95' : 'opacity-100'}`}>
            <Image
              src="/images/vision/17489359243.jpg"
              alt="Hình minh họa tầm nhìn phát triển Nhà nước pháp quyền Việt Nam"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
