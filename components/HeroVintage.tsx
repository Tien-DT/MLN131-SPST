'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/app/components/ThemeProvider';

export default function HeroVintage() {
  const { isDarkMode } = useTheme();
  return (
    <section className={`relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b-4 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/40' : 'border-[#2C2A29]'}`}>
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-[var(--bg-color)]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
      </div>
      
      <div className="container-custom relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <div className={`inline-block border px-4 py-1 mb-8 transition-colors ${isDarkMode ? 'border-[#DA251D]' : 'border-[#2C2A29]'}`}>
            <span className="font-sans text-sm font-bold tracking-widest uppercase text-[#DA251D]">Giai đoạn 1975 - 1981</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-hero mb-6 text-[var(--text-primary)]">
            Ký ức <span className="text-[#DA251D]">Thống nhất</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-serif-body italic mb-12 max-w-2xl mx-auto text-[var(--text-secondary)]">
            Hành trình xây dựng Chủ nghĩa xã hội và bảo vệ biên cương Tổ quốc từ những bước đi đột phá đầu tiên.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
        >
          <a
            href="#timeline"
            className="red-box px-8 py-4 font-sans font-bold uppercase tracking-wider hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2C2A29]"
          >
            Khám phá Dòng thời gian
          </a>
          <button
            onClick={() => document.getElementById('chat-bot-btn')?.click()}
            className="vintage-box px-8 py-4 font-sans font-bold uppercase tracking-wider text-[#2C2A29] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2C2A29]"
          >
            Hỏi Cố vấn AI
          </button>
        </motion.div>
      </div>

      {/* Retro decorative corners */}
      <div className={`absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D] opacity-100' : 'border-[#2C2A29] opacity-50'}`}></div>
      <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D] opacity-100' : 'border-[#2C2A29] opacity-50'}`}></div>
      <div className={`absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D] opacity-100' : 'border-[#2C2A29] opacity-50'}`}></div>
      <div className={`absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D] opacity-100' : 'border-[#2C2A29] opacity-50'}`}></div>
    </section>
  );
}
