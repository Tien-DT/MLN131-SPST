'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';

const events = [
  {
    year: 'Giai đoạn 1945 - 1946',
    
    desc: ' Xác lập nền tảng pháp lý đầu tiên qua Tuyên ngôn Độc lập và Hiến pháp 1946, khẳng định tất cả quyền lực thuộc về nhân dân và tính tối thượng của pháp luật.',
    color: 'border-[#DA251D]',
    image: '/1945.png',
  },
  {
    year: 'Năm 1991',
   
    desc: 'Tại Hội nghị Trung ương 2 (Khóa VII), thuật ngữ "Nhà nước pháp quyền" chính thức xuất hiện trong văn kiện Đảng.',
    color: 'border-[#4A5D23]',
    image: '/19912.jpg',
  },
  {
    year: 'Năm 1994',
    
    desc: 'Khẳng định xây dựng Nhà nước pháp quyền là nhiệm vụ trọng tâm để phát huy dân chủ.',

    color: 'border-[#DA251D]',
    image: '/1994.jpg',
  },
  {
    year: 'Năm 2001',
   
    desc: 'Hiến pháp chính thức ghi nhận Việt Nam xây dựng Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân.',
    color: 'border-[#4A5D23]',
    image: '/2001.jpg',
  },
  {
    year: 'Năm 2013',
    
    desc: 'Hiến pháp hoàn thiện nguyên tắc quyền lực nhà nước là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan.',
    color: 'border-[#DA251D]',
    image: '/20132.jpg',
  },
  {
    year: 'Năm 2022',
    
    desc: 'Nghị quyết số 27-NQ/TW xác lập lộ trình toàn diện về xây dựng Nhà nước pháp quyền đến năm 2030 và tầm nhìn 2045.',
    color: 'border-[#F4D03F]',
    image: '/2022.jpg',
  }
  
];

export default function InteractiveTimeline() {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className={`py-24 border-b-4 transition-colors duration-500 relative ${isDarkMode ? 'bg-[#0A0A0A] border-[#DA251D]/30' : 'bg-[#FAF3EB] border-[#2C2A29]'}`} ref={containerRef}>
      <div className="container-custom">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-section-title text-[var(--text-primary)]">
            Quá trình hình thành và phát triển tư duy lý luận
          </h2>
          <p className="font-serif-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto italic">
            Sự ra đời của mô hình này là kết quả của quá trình tích lũy nhận thức qua nhiều giai đoạn lịch sử
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto mt-12">
          {/* Vertical Line Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-[#D1C2A5] transform md:-translate-x-1/2"></div>
          
          <motion.div 
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-[#DA251D] transform md:-translate-x-1/2 origin-top"
            style={{ scaleY: pathLength }}
          />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center justify-between w-full 
                  ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                `}
              >
                {/* Node */}
                <div className={`absolute left-[12px] md:left-1/2 w-5 h-5 rounded-full border-4 transform -translate-x-1/2 z-10 transition-colors ${isDarkMode ? 'bg-[#000000] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}></div>
                
                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-5/12 ml-4 md:ml-0">
                  <div className={`vintage-box p-6 hover:-translate-y-1 border-l-8 transition-colors duration-500 ${event.color} ${isDarkMode ? 'bg-[#141414] shadow-[4px_4px_0px_0px_var(--accent-color)]' : 'bg-[#FAF3EB]'}`}>
                    <span className="inline-block py-1 px-3 bg-[#2C2A29] text-[#F5E6D3] font-sans font-bold text-lg mb-3">
                      {event.year}
                    </span>
                    {/* <h3 className="font-serif-heading text-xl md:text-2xl font-bold mb-2 text-[var(--text-primary)]">
                      {event.title}
                    </h3> */}
                    <p className="text-[var(--text-secondary)] font-serif-body text-sm md:text-base leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>

                {/* Image Card */}
                <div className="hidden md:block md:w-5/12">
                  {event.image && (
                    <div className={`vintage-box p-2 border-4 rotate-1 hover:-rotate-1 transition-all duration-500 ${isDarkMode ? 'bg-[#000000] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}>
                      <img 
                        src={event.image} 
                        alt={`Mốc thời gian ${event.year}`} 
                        className={`w-full h-[200px] object-cover border-2 transition-all duration-700 ${isDarkMode ? 'border-[#DA251D]/40 grayscale brightness-75 contrast-125' : 'border-[#5C554E] sepia-[0.3]'}`}
                      />
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
