'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const events = [
  {
    year: '1975',
    title: 'Hoàn thành thống nhất đất nước về mặt nhà nước',
    desc: 'Hội nghị lần thứ 24 (8/1975) đề ra nhiệm vụ. Tháng 11/1975, Hội nghị Hiệp thương chính trị tại Sài Gòn. Ngày 25/4/1976 Tổng tuyển cử bầu Quốc hội chung.',
    color: 'border-[#DA251D]',
  },
  {
    year: '1976',
    title: 'Đại hội IV của Đảng',
    desc: 'Xác định đường lối chung: nắm vững chuyên chính vô sản, tiến hành 3 cuộc cách mạng. Đổi tên nước thành CHXHCN Việt Nam.',
    color: 'border-[#4A5D23]',
  },
  {
    year: '1979',
    title: 'Bảo vệ biên giới & Bước đột phá đầu tiên',
    desc: 'Bảo vệ biên giới Tây Nam (7/1/1979) và phía Bắc (17/2/1979). Hội nghị TW 6 (8/1979) khắc phục khuyết điểm quản lý, cho phép "sản xuất bung ra".',
    color: 'border-[#DA251D]',
  },
  {
    year: '1981',
    title: 'Khoán 100',
    desc: 'Chỉ thị số 100-CT/TW (1/1981) về khoán sản phẩm đến nhóm và người lao động trong hợp tác xã nông nghiệp tạo động lực mới.',
    color: 'border-[#F4D03F]',
  },
  {
    year: '1982',
    title: 'Đại hội V',
    desc: 'Đang ở chặng đường đầu tiên quá độ. Hai nhiệm vụ: Xây dựng CNXH và Bảo vệ Tổ quốc. Ưu tiên phát triển nông nghiệp.',
    color: 'border-[#4A5D23]',
  },
  {
    year: '1985-1986',
    title: 'Những bước đột phá tiếp theo',
    desc: 'HNTW 8 (6/1985): Xóa bỏ bao cấp, chuyển sang hạch toán. Hội nghị Bộ Chính trị (8/1986): Định hướng cơ cấu sản xuất, báo cáo tại Đại hội VI.',
    color: 'border-[#DA251D]',
  }
];

export default function InteractiveTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="py-24 bg-[#FAF3EB] border-b-4 border-[#2C2A29] relative" ref={containerRef}>
      <div className="container-custom">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-section-title text-[#2C2A29]">
            Dòng thời gian Kỷ nguyên mới
          </h2>
          <p className="font-serif-body text-lg text-[#5C554E] max-w-2xl mx-auto italic">
            Cuộn xuống để lần theo những bước đi lịch sử từ 1975 đến trước thềm Đổi Mới 1986.
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
                className={`relative flex items-center justify-between md:justify-normal w-full 
                  ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                `}
              >
                {/* Node */}
                <div className="absolute left-[12px] md:left-1/2 w-5 h-5 rounded-full bg-[#FAF3EB] border-4 border-[#2C2A29] transform -translate-x-1/2 z-10"></div>
                
                {/* Content Card */}
                <div className="w-full pl-12 md:pl-0 md:w-5/12 ml-4 md:ml-0">
                  <div className={`vintage-box p-6 hover:-translate-y-1 border-l-8 ${event.color}`}>
                    <span className="inline-block py-1 px-3 bg-[#2C2A29] text-[#F5E6D3] font-sans font-bold text-lg mb-3">
                      {event.year}
                    </span>
                    <h3 className="font-serif-heading text-xl md:text-2xl font-bold mb-2 text-[#2C2A29]">
                      {event.title}
                    </h3>
                    <p className="text-[#5C554E] font-serif-body text-sm md:text-base leading-relaxed">
                      {event.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
