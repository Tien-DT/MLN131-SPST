'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

interface EventSlide {
  title: string;
  subtitle: string;
  content: string[];
  bullets: string[];
  image: string;
  imageCaption: string;
  highlight: string;
}

interface EventDetail {
  id: string;
  title: string;
  accent: string;
  slides: EventSlide[];
}

const BORDER_EVENTS: Record<string, EventDetail> = {
  north: {
    id: 'north',
    title: 'Biên giới phía Bắc (1979-1989)',
    accent: '#DA251D',
    slides: [
      {
        title: 'Cuộc tấn công bất ngờ',
        subtitle: 'Ngày 17 tháng 2 năm 1979',
        highlight: 'Bảo vệ chủ quyền',
        image: '/images/bien-gioi-phia-bac.jpg',
        imageCaption: 'Quân tấn công huy động lực lượng khổng lồ tràn qua biên giới Việt Nam.',
        content: [
          'Vào 3 giờ sáng ngày 17/02/1979, đối phương bất ngờ huy động hơn 60 vạn quân cùng hàng ngàn xe tăng, pháo binh đồng loạt tấn công trên toàn tuyến biên giới phía Bắc dài hơn 1.200 km.',
          'Mục tiêu của địch là "dạy cho Việt Nam một bài học" sau khi ta giúp nhân dân Campuchia lật đổ tập đoàn Pol Pot. Quân địch tấn công từ Pa Nậm Cúm (Lai Châu) đến Móng Cái (Quảng Ninh), tập trung mạnh nhất vào Cao Bằng, Lạng Sơn và Lào Cai.',
        ],
        bullets: [
          '60 vạn quân địch cùng 400 xe tăng tràn qua biên giới.',
          'Tấn công đồng loạt trên 6 tỉnh biên giới phía Bắc.',
          'Nhiều thị xã, thị trấn bị pháo kích dữ dội ngay từ đầu.',
          'Thế giới kịch liệt phản đối hành động xâm lược thiếu căn cứ.'
        ]
      },
      {
        title: 'Sức kháng cự ngoan cường',
        subtitle: 'Tháng 2 - Tháng 3 năm 1979',
        highlight: 'Sức mạnh dân tộc',
        image: '/images/chien_dau_bien_gioi.png',
        imageCaption: 'Các chiến sĩ bộ đội địa phương và dân quân tự vệ kiên cường bám trụ.',
        content: [
          'Dù bị tấn công bất ngờ và áp đảo về quân số (ta chỉ có khoảng 5 vạn quân tại chỗ), quân và dân các tỉnh biên giới đã chiến đấu vô cùng quả cảm. Các đơn vị dân quân, công an vũ trang đã kìm chân địch từng mét đất.',
          'Những trận đánh ác liệt tại pháo đài Đồng Đăng, thị xã Cao Bằng, Lào Cai đã làm phá sản kế hoạch "đánh nhanh thắng nhanh" của quân xâm lược. Tinh thần "Mỗi người dân là một chiến sĩ" được phát huy cao độ.',
        ],
        bullets: [
          'Kìm chân hàng chục sư đoàn địch bằng lực lượng tại chỗ.',
          'Phá tan âm mưu chiếm đóng nhanh các tỉnh lỵ biên giới.',
          'Gây tổn thất nặng nề cho các đơn vị xe tăng, bộ binh địch.',
          'Khẳng định ý chí sắt đá bảo vệ độc lập, tự do.'
        ]
      },
      {
        title: 'Tổng phản công & Rút quân',
        subtitle: 'Tháng 3 năm 1979',
        highlight: 'Chiến thắng chính nghĩa',
        image: '/images/bo_chinh_tri.png',
        imageCaption: 'Lãnh đạo Đảng và Nhà nước họp bàn chỉ đạo cuộc kháng chiến bảo vệ biên cương.',
        content: [
          'Trước tình hình khẩn thiết, ngày 05/03/1979, Chủ tịch nước công bố lệnh Tổng động viên toàn quốc. Cùng ngày, thấy không thể đạt được mục đích và bị tổn thất quá lớn, phía đối phương tuyên bố rút quân.',
          'Quân đội Việt Nam chuyển sang thế phản công trên toàn mặt trận. Đến ngày 18/03/1979, quân địch cơ bản phải rút về bên kia biên giới. Thắng lợi này khẳng định sức mạnh vô song của khối đại đoàn kết dân tộc.',
        ],
        bullets: [
          'Lệnh Tổng động viên khơi dậy lòng yêu nước nồng nàn.',
          'Đối phương thiệt hại hơn 6 vạn quân, hàng trăm xe tăng bị phá hủy.',
          'Bảo vệ vững chắc chủ quyền cương vực phía Bắc.',
          'Khẳng định sự thất bại của chính sách ngoại giao dùng vũ lực.'
        ]
      },
      {
        title: 'Mặt trận Vị Xuyên khốc liệt',
        subtitle: 'Giai đoạn 1984 - 1989',
        highlight: 'Lò vôi thế kỷ',
        image: '/images/mat_tran_vi_xuyen.png',
        imageCaption: 'Cuộc chiến đấu âm thầm nhưng bền bỉ tại các điểm cao Hà Giang vùng núi đá khốc liệt.',
        content: [
          'Sau năm 1979, xung đột biên giới vẫn kéo dài dưới dạng chiến tranh cục bộ. Khốc liệt nhất là mặt trận Vị Xuyên (Hà Giang) từ năm 1984 đến 1989, nơi được mệnh danh là "lò vôi thế kỷ".',
          'Hàng ngàn chiến sĩ đã hy sinh để giữ vững từng điểm cao như 1509, 772, 685. Cuộc chiến chỉ thực sự chấm dứt vào năm 1989, mở ra quá trình bình thường hóa quan hệ giữa hai nước.',
        ],
        bullets: [
          'Cuộc chiến đấu giữ vững các điểm cao biên giới phía Bắc.',
          'Hàng vạn chiến sĩ trẻ đã ngã xuống vì màu cờ sắc áo.',
          'Biểu tượng cao đẹp của tình yêu Tổ quốc không lay chuyển.',
          'Chấm dứt 10 năm xung đột, lập lại hòa bình năm 1989.'
        ]
      }
    ]
  },
  south: {
    id: 'south',
    title: 'Biên giới Tây Nam (1977-1979)',
    accent: '#1a5276',
    slides: [
      {
        title: 'Sự phản thù của Khmer Đỏ',
        subtitle: 'Năm 1975 - 1977',
        highlight: 'Căng thẳng biên giới',
        image: '/images/bien-gioi-tay-nam-tension.png',
        imageCaption: 'Tình hình biên giới Tây Nam trở nên căng thẳng do các hành động khiêu khích vô lý.',
        content: [
          'Ngay sau khi Việt Nam thống nhất, tập đoàn Pol Pot - Ieng Sary ở Campuchia đã thực hiện chính sách thù địch trắng trợn. Chúng liên tục xua quân đánh chiếm các đảo Thổ Chu, Phú Quốc và lấn chiếm biên giới Tây Nam.',
          'Khmer Đỏ đã tiến hành các vụ thảm sát tàn bạo dọc biên giới, gây ra những đau thương mất mát vô cùng lớn cho nhân dân ta. Những tội ác dã man này đã buộc Việt Nam phải cầm súng để tự vệ chính đáng.',
        ],
        bullets: [
          'Khmer Đỏ phản bội tình đoàn kết, tấn công cương vực Việt Nam.',
          'Gây hấn và tấn công quân sự ngay từ những năm 1975-1977.',
          'Xâm nhập sâu vào lãnh thổ các tỉnh Tây Ninh, An Giang.',
          'Việt Nam kiên trì đàm phán nhưng phía Pol Pot từ chối thiện chí.'
        ]
      },
      {
        title: 'Tổng phản công chính nghĩa',
        subtitle: 'Tháng 12 năm 1978',
        highlight: 'Quyết chiến quyết thắng',
        image: '/images/chien-thang-tay-nam.jpg',
        imageCaption: 'Quân tình nguyện Việt Nam hành quân thần tốc phản công quân xâm lược.',
        content: [
          'Trước sự leo thang chiến tranh của Khmer Đỏ với 19 sư đoàn bộ binh áp sát biên giới, ngày 23/12/1978, Quân đội Việt Nam phối hợp với lực lượng cách mạng Campuchia mở cuộc tổng phản công trên toàn tuyến.',
          'Đáp lời kêu gọi của Mặt trận Đoàn kết cứu nước Campuchia, quân ta đã thực hiện chiến lược tiến công thần tốc, đập tan hệ thống phòng thủ của địch chỉ trong thời gian ngắn.',
        ],
        bullets: [
          'Huy động lực lượng quy mô lớn đáp trả hành động xâm lược.',
          'Phối hợp nhịp nhàng giữa các quân binh chủng hiện đại.',
          'Tiến công thần tốc, chia cắt các cụm quân địch.',
          'Bảo vệ vững chắc biên cương Tây Nam của Tổ quốc.'
        ]
      },
      {
        title: 'Giải phóng Phnom Penh',
        subtitle: 'Ngày 7 tháng 1 năm 1979',
        highlight: 'Hồi sinh một dân tộc',
        image: '/images/giai-phong-phnom-penh.png',
        imageCaption: 'Quân tình nguyện Việt Nam tiến vào Phnom Penh trong sự chào đón của người dân.',
        content: [
          'Ngày 07/01/1979, Quân tình nguyện Việt Nam cùng lực lượng vũ trang cách mạng Campuchia tiến vào giải phóng thủ đô Phnom Penh. Chế độ diệt chủng Khmer Đỏ sụp đổ hoàn toàn.',
          'Sự có mặt của quân tình nguyện Việt Nam được coi là "Đội quân nhà Phật", cứu giúp dân tộc Campuchia khỏi thảm họa diệt vong của Khmer Đỏ. Thế giới bàng hoàng trước những tội ác của Pol Pot vừa được hé lộ.',
        ],
        bullets: [
          'Lật đổ hoàn toàn tập đoàn phản động Pol Pot - Ieng Sary.',
          'Cứu sống hàng triệu người Campuchia khỏi nạn diệt chủng.',
          'Mở ra một kỷ nguyên mới cho đất nước Chùa Tháp.',
          'Khẳng định chính nghĩa sáng ngời của dân tộc Việt Nam.'
        ]
      },
      {
        title: 'Nghĩa vụ quốc tế cao cả',
        subtitle: 'Giai đoạn 1979 - 1989',
        highlight: 'Tình hữu nghị sắt son',
        image: '/images/nghia-vu-quoc-te.png',
        imageCaption: 'Chiến sĩ Việt Nam giúp người dân Campuchia ổn định lại cuộc sống thường nhật.',
        content: [
          'Sau khi giải phóng, Việt Nam tiếp tục duy trì quân tình nguyện để giúp bạn xây dựng chính quyền, phục hồi kinh tế và ngăn chặn Khmer Đỏ quay trở lại. Đây là một sự giúp đỡ chí tình, vô tư và đầy hy sinh.',
          'Năm 1989, Việt Nam hoàn thành nghĩa vụ quốc tế và rút toàn bộ quân tình nguyện về nước. Sự hồi sinh mạnh mẽ của Campuchia ngày nay có sự đóng góp bằng xương máu của biết bao chiến sĩ Việt Nam.',
        ],
        bullets: [
          'Giúp bạn xây dựng hệ thống chính trị và kinh tế từ con số không.',
          'Ngăn chặn sự trỗi dậy của các tàn quân diệt chủng.',
          'Rút quân toàn bộ năm 1989 sau khi bạn đã vững mạnh.',
          'Biểu tượng bất diệt của tình đoàn kết quốc tế cao cả.'
        ]
      }
    ]
  }
};

interface EventDetailModalProps {
  event: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentSlide(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!event) return null;

  const slide = event.slides[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % event.slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + event.slides.length) % event.slides.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 z-[100] backdrop-blur-md"
          />

          <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 lg:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-[#FAF3EB] w-full max-w-7xl rounded-lg border-4 border-[#2C2A29] shadow-[12px_12px_0px_0px_rgba(44,42,41,1)] overflow-hidden pointer-events-auto flex flex-col h-[90vh] lg:h-[80vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b-4 border-[#2C2A29] bg-[#E3D6C1] flex-shrink-0">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div 
                    className="w-10 h-10 flex items-center justify-center text-white border-2 border-[#2C2A29] shadow-[2px_2px_0px_0px_rgba(44,42,41,1)] flex-shrink-0"
                    style={{ background: event.accent }}
                  >
                    <Shield size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm lg:text-2xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-wider leading-tight truncate">{event.title}</h3>
                    <p className="text-[10px] font-sans font-bold text-[#5C554E] uppercase tracking-[0.1em]">Tư liệu lịch sử Việt Nam</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 lg:p-2 hover:bg-white/50 rounded-full transition-colors border-2 border-transparent hover:border-[#2C2A29] flex-shrink-0"
                >
                  <X size={24} className="text-[#2C2A29]" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col lg:flex-row w-full h-full overflow-hidden"
                  >
                    {/* Left Side: Image container */}
                    <div className="w-full lg:w-1/2 h-[200px] lg:h-full relative bg-[#1A1A1A] border-b-2 lg:border-b-0 lg:border-r-4 border-[#2C2A29] flex-shrink-0">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover opacity-90"
                        priority={true}
                        sizes="(max-width: 1400px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Caption overlay */}
                      <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8">
                        <p className="text-[#FAF3EB] text-[10px] lg:text-sm italic font-serif-body leading-relaxed border-l-4 border-[#F4D03F] pl-4">
                          {slide.imageCaption}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Text content with vertical scroll */}
                    <div className="flex-1 overflow-y-auto bg-[#FAF3EB] p-4 lg:p-8 custom-scrollbar">
                      <div className="max-w-3xl mx-auto space-y-5 lg:space-y-6">
                        {/* Slide Title & Tag */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 bg-[#2C2A29] text-white text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
                              {slide.highlight}
                            </span>
                            <div className="flex-1 h-[1px] bg-[#D1C2A5]" />
                            <span className="text-[10px] font-black text-[#5C554E] uppercase tracking-widest">Giai đoạn {currentSlide + 1}</span>
                          </div>

                          <h4 className="text-xl lg:text-4xl font-serif-heading font-extrabold text-[#2C2A29] leading-tight uppercase tracking-tight">
                            {slide.title}
                          </h4>

                          <div className="flex items-center gap-2 text-[#5C554E] font-bold text-xs lg:text-base bg-[#E3D6C1]/30 p-2 border-l-4 border-[#DA251D]">
                            <Calendar size={18} className="text-[#DA251D]" /> {slide.subtitle}
                          </div>
                        </div>

                        {/* Narrative Content */}
                        <div className="space-y-4 lg:space-y-6">
                          {slide.content.map((p, i) => (
                            <p key={i} className="text-sm lg:text-lg font-serif-body text-[#2C2A29] leading-relaxed text-justify opacity-95">
                              {p}
                            </p>
                          ))}
                        </div>

                        {/* Key Points Box */}
                        <div className="bg-white border-2 border-[#2C2A29] p-4 lg:p-8 shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] mt-8">
                          <h5 className="font-sans font-black uppercase text-[10px] lg:text-xs tracking-[0.2em] mb-4 flex items-center gap-2 text-[#2C2A29]">
                            <Zap size={16} className="text-[#F4D03F] fill-current" /> Điểm cốt lõi trích yếu
                          </h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            {slide.bullets.map((b, i) => (
                              <li key={i} className="flex gap-3 lg:gap-4 items-start text-xs lg:text-[16px] font-serif-body font-bold text-[#2C2A29]">
                                <ArrowRight size={18} className="mt-0.5 flex-shrink-0" style={{ color: event.accent }} />
                                <span className="leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Navigation Bar */}
              <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-t-4 border-[#2C2A29] bg-[#E3D6C1] flex-shrink-0">
                <button 
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white border-2 border-[#2C2A29] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(44,42,41,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(44,42,41,1)] active:translate-y-[1px] active:shadow-none transition-all group"
                >
                  <ChevronLeft size={22} className="text-[#2C2A29] group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="bg-white/90 backdrop-blur-sm px-5 py-1.5 rounded-full border-2 border-[#2C2A29] text-[10px] lg:text-xs font-black font-sans uppercase tracking-[0.3em] text-[#2C2A29] shadow-sm">
                  Slide {currentSlide + 1} / {event.slides.length}
                </div>

                <button 
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#2C2A29] text-white border-2 border-[#2C2A29] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(227,214,193,1)] hover:translate-y-[-2px] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] active:translate-y-[1px] active:shadow-none transition-all group"
                >
                  <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function BorderAndSubsidySection() {
  const [activeEvent, setActiveEvent] = useState<EventDetail | null>(null);
  
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
            
            <div className="relative aspect-[3/4] bg-[#E3D6C1] border-2 border-[#2C2A29] p-4 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <Image 
                  src="/images/thong_nhat_1975.png" 
                  alt="map texture" 
                  fill 
                  className="object-cover grayscale sepia"
                />
              </div>
              <div className="w-1/2 h-4/5 border-4 border-[#4A5D23] bg-[#D1C2A5]/80 relative z-0 flex items-center justify-center">
                <span className="text-[#4A5D23]/30 font-serif-heading text-4xl font-black rotate-45">LÃNH THỔ</span>
              </div>
              
              {/* Pulsing dots for borders */}
              <div className="absolute top-[20%] right-[45%] z-10 group">
                <button 
                  className="w-8 h-8 bg-[#DA251D] rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform shadow-lg relative flex items-center justify-center"
                  onClick={() => setActiveEvent(BORDER_EVENTS.north)}
                >
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#DA251D] opacity-75"></span>
                  <MapPin size={16} className="text-white" />
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FAF3EB] text-[#2C2A29] text-[10px] font-black px-2 py-1 border-2 border-[#2C2A29] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]">
                  PHÍA BẮC (1979-1989)
                </div>
              </div>

              <div className="absolute bottom-[20%] left-[40%] z-10 group">
                <button 
                  className="w-8 h-8 bg-[#1a5276] rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform shadow-lg relative flex items-center justify-center"
                  onClick={() => setActiveEvent(BORDER_EVENTS.south)}
                >
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#1a5276] opacity-75"></span>
                  <MapPin size={16} className="text-white" />
                </button>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#FAF3EB] text-[#2C2A29] text-[10px] font-black px-2 py-1 border-2 border-[#2C2A29] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]">
                  TÂY NAM (1977-1979)
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-[#DA251D] text-white text-[9px] font-sans font-black px-2 py-1 flex items-center gap-1">
                <Zap size={10} /> CLICK VÀO ĐIỂM ĐỂ XEM CHI TIẾT
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-[#5C554E] text-xs font-serif-body italic">
              <p>* Bản đồ khái quát các hướng tấn công xâm lược của địch</p>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Subsidy Era Mini-interactive */}
          <div className="vintage-box p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-serif-heading text-[#2C2A29] border-b-2 border-[#D1C2A5] pb-4 mb-6">
                Ký ức Thời Bao Cấp
              </h3>
              <p className="font-serif-body text-[#5C554E] mb-6 text-justify">
                Giai đoạn này đất nước đồng thời thực hiện hai nhiệm vụ chiến lược: Xây dựng CNXH và Bảo vệ Tổ quốc. Tuy nhiên, do hậu quả nặng nề của chiến tranh và các sai lầm chủ quan, nền kinh tế rơi vào khủng hoảng trầm trọng.
              </p>
              
              <div className="bg-[#E3D6C1] border-2 border-[#2C2A29] p-6 text-center transform rotate-1 relative">
                <div className="absolute -top-3 -left-3 bg-[#DA251D] text-white p-2 border-2 border-[#2C2A29] shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]">
                  <Calendar size={16} />
                </div>
                <div className="border border-dashed border-[#5C554E] p-4">
                  <h4 className="font-bold text-xl uppercase tracking-widest text-[#2C2A29] mb-4 border-b border-[#5C554E] inline-block pb-1">Sổ Lương Thực</h4>
                  <p className="text-[10px] font-serif-body mb-4 italic">Kỷ vật minh chứng cho một thời kỳ gian khổ nhưng đầy hy vọng</p>
                  <div className="flex gap-4 justify-center mt-4">
                    <div className="w-16 h-20 bg-[#F5E6D3] border-2 border-[#2C2A29] flex flex-col items-center justify-center font-bold text-[#DA251D] opacity-80 cursor-help hover:opacity-100 hover:scale-105 transition-all shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]" title="Phiếu Mua Gạo">
                      <span className="text-[10px] uppercase">GẠO</span>
                      <span className="text-xs">13kg</span>
                    </div>
                    <div className="w-16 h-20 bg-[#F5E6D3] border-2 border-[#2C2A29] flex flex-col items-center justify-center font-bold text-[#2C2A29] opacity-80 cursor-help hover:opacity-100 hover:scale-105 transition-all shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]" title="Phiếu Mua Vải">
                      <span className="text-[10px] uppercase">VẢI</span>
                      <span className="text-xs">5m</span>
                    </div>
                    <div className="w-16 h-20 bg-[#F5E6D3] border-2 border-[#2C2A29] flex flex-col items-center justify-center font-bold text-[#4A5D23] opacity-80 cursor-help hover:opacity-100 hover:scale-105 transition-all shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]" title="Phiếu Mua Thịt">
                      <span className="text-[10px] uppercase">THỊT</span>
                      <span className="text-xs">0.5kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t-2 border-[#D1C2A5]">
              <p className="text-xs italic text-[#5C554E] leading-relaxed">
                <span className="font-black text-[#DA251D]">CHÚ Ý:</span> Tới Hội nghị TW 8 (6/1985), Đảng đã quyết định xóa bỏ cơ chế tập trung quan liêu bao cấp, lấy Giá - Lương - Tiền làm khâu đột phá, dọn đường cho Đổi Mới.
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Detailed Popup Modal */}
      <EventDetailModal
        event={activeEvent}
        isOpen={activeEvent !== null}
        onClose={() => setActiveEvent(null)}
      />
    </section>
  );
}
