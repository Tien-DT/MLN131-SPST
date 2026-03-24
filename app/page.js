'use client';

import HeroVintage from '@/components/HeroVintage';
import { useTheme } from './components/ThemeProvider';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import BorderAndSubsidySection from '@/components/BorderAndSubsidySection';
import HeritageSection from '@/components/HeritageSection';
import SolutionsSection from '@/components/SolutionsSection';
import VisionSection from '@/components/VisionSection';

export default function Home() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#141414]' : 'bg-[#F5E6D3]'}`}>
      <HeroVintage />
      <InteractiveTimeline />
      <BorderAndSubsidySection />
      <HeritageSection />
      <SolutionsSection />
      <VisionSection />

      {/* Footer Vintage Style */}
      <footer className={`py-12 text-center border-t-8 transition-colors duration-500 ${isDarkMode ? 'bg-[#000000] text-[#E8D9C5] border-[#DA251D]' : 'bg-[#2C2A29] text-[#F5E6D3] border-[#DA251D]'}`}>
        <div className="container-custom">
          <h2 className={`font-serif-heading text-2xl mb-4 transition-colors ${isDarkMode ? 'text-[#DA251D]' : 'text-[#F4D03F]'}`}>Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam</h2>
          <p className={`font-serif-body max-w-xl mx-auto mb-4 transition-colors ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#D1C2A5]'}`}>
            Học phần: Chủ nghĩa xã hội khoa học <br/>
            Half2_GD1813 - Nhóm 5
          </p>
          <div className={`w-24 h-1 mx-auto transition-colors ${isDarkMode ? 'bg-[#DA251D] opacity-40' : 'bg-[#D1C2A5] opacity-30'}`}></div>
          <p className={`mt-8 font-sans text-xs tracking-widest uppercase transition-colors ${isDarkMode ? 'text-[#DA251D]/50' : 'text-[#D1C2A5]/50'}`}>
            Designed for History & Education
          </p>
        </div>
      </footer>
    </div>
  );
}