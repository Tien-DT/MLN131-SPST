'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';

const events = [
  {
    year: '8/1975',
    title: 'Hội nghị lần thứ 24 BCH Trung ương Đảng',
    desc: 'Đề ra nhiệm vụ hoàn thành thống nhất đất nước về mặt nhà nước nhằm phát huy sức mạnh tổng hợp của cả nước.',
    color: 'border-[#DA251D]',
    image: '/images/wiki/tw24.jpg',
  },
  {
    year: '11/1975',
    title: 'Hội nghị Hiệp thương chính trị',
    desc: 'Hai đoàn đại biểu Bắc - Nam họp tại Sài Gòn, khẳng định sự nhất trí hoàn toàn về yêu cầu thống nhất nước nhà trên mọi lĩnh vực.',
    color: 'border-[#4A5D23]',
    image: '/images/wiki/hiep-thuong.jpg',
  },
  {
    year: '25/4/1976',
    title: 'Tổng tuyển cử bầu Quốc hội chung',
    desc: 'Tiến hành thành công rực rỡ với sự tham gia của hơn 23 triệu cử tri (đạt tỉ lệ 98,77%), bầu ra 492 đại biểu đại diện cho nhân dân.',
    color: 'border-[#DA251D]',
    image: '/images/wiki/tong-tuyen-cu.png',
  },
  {
    year: '6-7/1976',
    title: 'Kỳ họp thứ nhất Quốc hội chung',
    desc: 'Quyết định tên nước là Cộng hòa Xã hội Chủ nghĩa Việt Nam, Thủ đô Hà Nội, Quốc ca là Tiến quân ca, đổi tên Sài Gòn thành TP.Hồ Chí Minh.',
    color: 'border-[#4A5D23]',
    image: '/images/wiki/quoc-hoi.png',
  },
  {
    year: '12/1976',
    title: 'Đại hội Đại biểu toàn quốc lần thứ IV',
    desc: 'Xác định đường lối chung của cách mạng XHCN, tiến hành đồng thời 3 cuộc cách mạng. Đổi tên Đảng thành Đảng Cộng sản Việt Nam.',
    color: 'border-[#DA251D]',
    image: '/images/wiki/le-duan.jpg',
  },
  {
    year: '1/1979',
    title: 'Bảo vệ biên giới Tây Nam',
    desc: 'Quân dân ta tham gia chiến đấu và đánh bại sự xâm lược của tập đoàn Pol Pot, giải phóng Phnôm Pênh vào ngày 7/1/1979.',
    color: 'border-[#F4D03F]',
    image: '/images/wiki/tay-nam.jpg',
  },
  {
    year: '2/1979',
    title: 'Bảo vệ biên giới phía Bắc',
    desc: 'Bắt đầu từ 17/2/1979, quân và dân ta kiên cường chống lại cuộc chiến tranh xâm lược quy mô lớn, bảo vệ chủ quyền lãnh thổ quốc gia.',
    color: 'border-[#DA251D]',
    image: '/images/wiki/phia-bac.jpg',
  },
  {
    year: '8/1979',
    title: 'Đột phá đầu tiên: Hội nghị TW 6',
    desc: 'Chủ trương khắc phục khuyết điểm cơ chế quản lý kinh tế, cho phép "sản xuất bung ra", là bước đột phá mở đầu quá trình đổi mới.',
    color: 'border-[#4A5D23]',
    image: '/images/wiki/tw6-bung-ra.jpg',
  },
  {
    year: '1/1981',
    title: 'Chỉ thị 100 (Khoán 100)',
    desc: 'Ban Bí thư ra Chỉ thị 100-CT/TW về khoán sản phẩm đến nhóm và người lao động trong nông nghiệp, tạo ra động lực sản xuất mới.',
    color: 'border-[#F4D03F]',
    image: '/images/timeline/1981.jpg',
  },
  {
    year: '3/1982',
    title: 'Đại hội V của Đảng',
    desc: 'Xác định nước ta đang ở "chặng đường đầu tiên" quá độ. Đề ra 2 nhiệm vụ chiến lược: Xây dựng CNXH và Bảo vệ Tổ quốc, ưu tiên nông nghiệp.',
    color: 'border-[#4A5D23]',
    image: '/images/timeline/1982.jpg',
  },
  {
    year: '6/1985',
    title: 'Đột phá thứ hai: Hội nghị TW 8',
    desc: 'Quyết định dứt khoát xóa bỏ cơ chế tập trung quan liêu bao cấp, lấy mũi nhọn giá - lương - tiền để chuyển sang hạch toán kinh doanh.',
    color: 'border-[#DA251D]',
    image: '/images/wiki/gia-luong-tien.jpg',
  },
  {
    year: '8/1986',
    title: 'Đột phá thứ ba: Hội nghị Bộ Chính trị',
    desc: 'Nhấn mạnh đổi mới cơ cấu sản xuất, cải tạo XHCN và cơ chế quản lý; đưa ra kết luận định hướng soạn thảo Báo cáo chính trị Đại hội VI.',
    color: 'border-[#F4D03F]',
    image: '/images/timeline/1986.jpg',
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
            Dòng thời gian Kỷ nguyên mới
          </h2>
          <p className="font-serif-body text-lg text-[var(--text-secondary)] max-w-2xl mx-auto italic">
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
                    <h3 className="font-serif-heading text-xl md:text-2xl font-bold mb-2 text-[var(--text-primary)]">
                      {event.title}
                    </h3>
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
                        alt={event.title} 
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
