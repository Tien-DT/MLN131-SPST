'use client';

import HeroVintage from '@/components/HeroVintage';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import BorderAndSubsidySection from '@/components/BorderAndSubsidySection';
import HeritageSection from '@/components/HeritageSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <HeroVintage />
      <InteractiveTimeline />
      <BorderAndSubsidySection />
      <HeritageSection />

      {/* Footer Vintage Style */}
      <footer className="bg-[#2C2A29] text-[#F5E6D3] py-12 text-center border-t-8 border-[#DA251D]">
        <div className="container-custom">
          <h2 className="font-serif-heading text-2xl mb-4 text-[#F4D03F]">Kỷ nguyên Độc lập (1975 - 1981)</h2>
          <p className="font-serif-body text-[#D1C2A5] max-w-xl mx-auto mb-8">
            Học phần: Lịch sử Đảng Cộng Sản Việt Nam<br/>
            Đề tài: Đảng lãnh đạo cả nước xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc
          </p>
          <div className="w-24 h-1 bg-[#D1C2A5] mx-auto opacity-30"></div>
          <p className="mt-8 font-sans text-xs tracking-widest text-[#D1C2A5]/50 uppercase">
            Designed for History & Education
          </p>
        </div>
      </footer>
    </div>
  );
}