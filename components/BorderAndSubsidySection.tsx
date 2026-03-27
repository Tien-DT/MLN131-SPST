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
import { useTheme } from '@/app/components/ThemeProvider';

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

const HISTORICAL_EVENTS: Record<string, EventDetail> = {
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
  },
  subsidy: {
    id: 'subsidy',
    title: 'Ký ức Thời Bao Cấp (1975-1986)',
    accent: '#DA251D',
    slides: [
      {
        title: 'Khủng hoảng & Tem phiếu',
        subtitle: 'Giai đoạn 1975 - 1985',
        highlight: 'Khó khăn bộn bề',
        image: '/images/lam-phat-bao-cap.jpg',
        imageCaption: 'Cảnh người dân chen chúc mua lương thực bằng tem phiếu thời bao cấp.',
        content: [
          'Sau ngày thống nhất, cả nước bước vào thời kỳ quá độ. Tuy nhiên, việc rập khuôn cơ chế quản lý kinh tế tập trung quan liêu, bao cấp trong thời gian quá dài đã đẩy nền kinh tế vào bế tắc trầm trọng.',
          'Mọi nhu yếu phẩm từ gạo, thịt, vải vóc đến chất đốt đều được phân phối qua hệ thống tem phiếu. Cơ chế cứng nhắc này triệt tiêu hoàn toàn động lực lao động, sản xuất đình đốn, lạm phát phi mã, đời sống nhân dân cực kỳ gian khổ.',
        ],
        bullets: [
          'Chế độ tem phiếu chi phối mọi mặt đời sống sinh hoạt.',
          'Sản xuất đình trệ, hàng hóa thiết yếu vô cùng khan hiếm.',
          'Lạm phát phi mã, có lúc lên tới ngưỡng hơn 700% (năm 1986).',
          'Sức ép từ thực tiễn đòi hỏi Đảng phải dũng cảm nhìn thẳng vào sự thật.'
        ]
      },
      {
        title: 'Đột phá Khoán 100',
        subtitle: 'Tháng 1 năm 1981',
        highlight: 'Trói buộc được nới lỏng',
        image: '/images/khoan-100.jpg',
        imageCaption: 'Niềm vui của nông dân khi được tự chủ sản xuất trên mảnh ruộng khoán.',
        content: [
          'Để tháo gỡ khó khăn trong nông nghiệp - mặt trận hàng đầu, Ban Bí thư TW Đảng ban hành Chỉ thị 100 (Khoán 100). Đây là bước đột phá táo bạo từ cơ sở, cho phép khoán sản phẩm trực tiếp đến nhóm và cá nhân người lao động.',
          'Khoán 100 đã khơi dậy mạnh mẽ sự hăng hái lao động của bà con nông dân. Từ chỗ làm chung, hưởng chung dẫn đến ỷ lại, người nông dân nay đã gắn bó máu thịt với sản phẩm mình làm ra, góp phần giải quyết một bước tình trạng thiếu lương thực thiết yếu.',
        ],
        bullets: [
          'Phá vỡ cơ chế làm ăn tập thể kém hiệu quả trong nông nghiệp.',
          'Giao quyền tự chủ một phần cho người lao động.',
          'Tạo ra động lực to lớn, khôi phục lại sinh khí nông thôn.',
          'Bước "xé rào" quan trọng chuẩn bị cho cơ chế Khoán 10 sau này.'
        ]
      },
      {
        title: 'Cú sốc Giá - Lương - Tiền',
        subtitle: 'Năm 1985',
        highlight: 'Bài học xương máu',
        image: '/images/doi-tien.jpg',
        imageCaption: 'Kỳ đổi tiền năm 1985 gây ra nhiều biến động lớn chưa từng có trên thị trường.',
        content: [
          'Tháng 6/1985, Hội nghị TW 8 (khóa V) quyết định dứt khoát xóa bỏ cơ chế bao cấp, lấy Giá - Lương - Tiền làm khâu đột phá. Đây là một chủ trương đúng đắn nhằm bước đầu thừa nhận nền kinh tế hàng hóa, hạch toán kinh doanh.',
          'Tuy nhiên, sai lầm trong các biện pháp thực thi, đặc biệt là cuộc đổi tiền vội vã tháng 9/1985, đã gây phản tác dụng. Lạm phát bùng nổ vượt tầm kiểm soát, vật giá leo thang từng ngày. Bài học xương máu này là cái giá phải trả để đổi lấy tư duy kinh tế mới.',
        ],
        bullets: [
          'Hội nghị TW 8 chính thức quyết định bãi bỏ chế độ bao cấp.',
          'Sự kiện đổi tiền 1985 tạo ra cú sốc lớn cho lưu thông phân phối.',
          'Lạm phát bùng nổ, giá cả leo thang không kiểm soát.',
          'Một bước lùi tạm thời nhưng là chất xúc tác mạnh mẽ cho Đổi Mới.'
        ]
      },
      {
        title: 'Sản xuất bung ra - Mở đường Đổi Mới',
        subtitle: 'Năm 1986',
        highlight: 'Đêm trước Đổi Mới',
        image: '/images/san-xuat-bung-ra.jpg',
        imageCaption: 'Hoạt động kinh tế tư nhân, tiểu thủ công nghiệp bắt đầu nhộn nhịp trở lại.',
        content: [
          'Giữa bóp nghẹt khủng hoảng, Kết luận của Bộ Chính trị (tháng 8/1986) do Cố Tổng Bí thư Trường Chinh chủ trì đã tạo nên bước ngoặt lịch sử. Đảng đã dũng cảm thẳng thắn thừa nhận nền kinh tế nước ta tồn tại cấu trúc hàng hóa nhiều thành phần trong thời kỳ quá độ.',
          'Châm ngôn "Sản xuất bung ra" trở thành luồng sinh khí mới. Sự lột xác toàn diện trong tư duy lý luận kinh tế đã dọn đường trực tiếp cho Đại hội VI (12/1986) - Đại hội của Đổi Mới, chính thức đưa đất nước thoát khỏi đêm dài gian khó.',
        ],
        bullets: [
          'Kết luận Bộ Chính trị (8/1986) là bước lột xác quyết định về tư duy.',
          'Thẳng thắn thừa nhận kinh tế hàng hóa nhiều thành phần.',
          'Cởi trói pháp lý cho các năng lực sản xuất trong xã hội.',
          'Tiền đề trực tiếp dẫn tới Đường lối Đổi Mới toàn diện tại Đại hội VI.'
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
  const { isDarkMode } = useTheme();
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
              className={`w-full max-w-7xl rounded-lg border-4 shadow-[12px_12px_0px_0px_var(--text-primary)] overflow-hidden pointer-events-auto flex flex-col h-[90vh] lg:h-[80vh] transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between px-4 lg:px-6 py-4 border-b-4 flex-shrink-0 transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]' : 'bg-[#E3D6C1] border-[#2C2A29]'}`}>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center text-white border-2 shadow-[2px_2px_0px_0px_var(--text-primary)] flex-shrink-0 transition-colors ${isDarkMode ? 'border-[#DA251D]' : 'border-[#2C2A29]'}`}
                    style={{ background: event.accent }}
                  >
                    <Shield size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-sm lg:text-2xl font-serif-heading font-black uppercase tracking-wider leading-tight truncate transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>{event.title}</h3>
                    <p className={`text-[10px] font-sans font-bold uppercase tracking-[0.1em] transition-colors ${isDarkMode ? 'text-[#E8D9C5]/40' : 'text-[#5C554E]'}`}>Tư liệu lịch sử Việt Nam</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className={`p-1 lg:p-2 rounded-full transition-colors border-2 border-transparent transition-all ${isDarkMode ? 'hover:bg-white/10 hover:border-[#DA251D]' : 'hover:bg-white/50 hover:border-[#2C2A29]'}`}
                >
                  <X size={24} className={isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'} />
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
                    <div className={`w-full lg:w-1/2 h-[200px] lg:h-full relative bg-[#1A1A1A] border-b-2 lg:border-b-0 lg:border-r-4 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]' : 'border-[#2C2A29]'} flex-shrink-0`}>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className={`object-cover transition-all duration-700 ${isDarkMode ? 'opacity-70 grayscale contrast-125 brightness-75' : 'opacity-90'}`}
                        priority={true}
                        sizes="(max-width: 1400px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Caption overlay */}
                      <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8">
                        <p className={`text-[#FAF3EB] text-[10px] lg:text-sm italic font-serif-body leading-relaxed border-l-4 border-[#F4D03F] pl-4 transition-colors`}>
                          {slide.imageCaption}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Text content with vertical scroll */}
                    <div className={`flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-[#FAF3EB]'}`}>
                      <div className="max-w-3xl mx-auto space-y-5 lg:space-y-6">
                        {/* Slide Title & Tag */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 text-white text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'bg-[#DA251D]' : 'bg-[#2C2A29]'}`}>
                              {slide.highlight}
                            </span>
                            <div className={`flex-1 h-[1px] transition-colors ${isDarkMode ? 'bg-[#DA251D]/20' : 'bg-[#D1C2A5]'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-[#E8D9C5]/30' : 'text-[#5C554E]'}`}>Giai đoạn {currentSlide + 1}</span>
                          </div>

                          <h4 className={`text-xl lg:text-4xl font-serif-heading font-extrabold leading-tight uppercase tracking-tight transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                            {slide.title}
                          </h4>

                          <div className={`flex items-center gap-2 font-bold text-xs lg:text-base p-2 border-l-4 transition-colors ${isDarkMode ? 'text-[#E8D9C5]/60 bg-[#DA251D]/10 border-[#DA251D]' : 'text-[#5C554E] bg-[#E3D6C1]/30 border-[#DA251D]'}`}>
                            <Calendar size={18} className="text-[#DA251D]" /> {slide.subtitle}
                          </div>
                        </div>

                        {/* Narrative Content */}
                        <div className="space-y-4 lg:space-y-6">
                          {slide.content.map((p, i) => (
                            <p key={i} className={`text-sm lg:text-lg font-serif-body leading-relaxed text-justify opacity-95 transition-colors ${isDarkMode ? 'text-[#E8D9C5]/80' : 'text-[#2C2A29]'}`}>
                              {p}
                            </p>
                          ))}
                        </div>

                        {/* Key Points Box */}
                        <div className={`p-4 lg:p-8 shadow-[6px_6px_0px_0px_var(--text-primary)] mt-8 border-2 transition-colors duration-500 ${isDarkMode ? 'bg-[#000000] border-[#DA251D]' : 'bg-white border-[#2C2A29]'}`}>
                          <h5 className={`font-sans font-black uppercase text-[10px] lg:text-xs tracking-[0.2em] mb-4 flex items-center gap-2 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                            <Zap size={16} className="text-[#F4D03F] fill-current" /> Điểm cốt lõi trích yếu
                          </h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            {slide.bullets.map((b, i) => (
                              <li key={i} className={`flex gap-3 lg:gap-4 items-start text-xs lg:text-[16px] font-serif-body font-bold transition-colors ${isDarkMode ? 'text-[#E8D9C5]/70' : 'text-[#2C2A29]'}`}>
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
              <div className={`flex items-center justify-between px-4 lg:px-6 py-3 border-t-4 flex-shrink-0 transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]' : 'bg-[#E3D6C1] border-[#2C2A29]'}`}>
                <button 
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 flex items-center justify-center shadow-[3px_3px_0px_0px_var(--text-primary)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_var(--text-primary)] active:translate-y-[1px] active:shadow-none transition-all group ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]' : 'bg-white border-[#2C2A29]'}`}
                >
                  <ChevronLeft size={22} className={`${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'} group-hover:-translate-x-0.5 transition-transform`} />
                </button>

                <div className={`backdrop-blur-sm px-5 py-1.5 rounded-full border-2 text-[10px] lg:text-xs font-black font-sans uppercase tracking-[0.3em] shadow-sm transition-colors ${isDarkMode ? 'bg-[#000000]/80 border-[#DA251D] text-[#DA251D]' : 'bg-white/90 border-[#2C2A29] text-[#2C2A29]'}`}>
                  Slide {currentSlide + 1} / {event.slides.length}
                </div>

                <button 
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 flex items-center justify-center shadow-[3px_3px_0px_0px_var(--bg-color)] hover:translate-y-[-2px] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.3)] active:translate-y-[1px] active:shadow-none transition-all group ${isDarkMode ? 'bg-[#DA251D] border-[#DA251D]' : 'bg-[#2C2A29] border-[#2C2A29]'}`}
                >
                  <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform text-white" />
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
  const { isDarkMode } = useTheme();
  const [activeEvent, setActiveEvent] = useState<EventDetail | null>(null);
  
  return (
    <section className={`py-24 border-b-4 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#051A05] border-[#DA251D]/30' : 'bg-[#4A5D23] border-[#2C2A29]'}`}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-section-title after:bg-[#F4D03F] transition-colors ${isDarkMode ? 'text-[#DA251D]' : 'text-[#F5E6D3]'}`}>
            Khái niệm và bản chất của Nhà nước pháp quyền XHCN Việt Nam
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Concept Card */}
          <div className={`vintage-box p-8 relative transition-colors duration-500 ${isDarkMode ? 'bg-[#141414] border-[#DA251D]' : 'bg-[#FAF3EB]'}`}>
            <h3 className={`text-2xl font-serif-heading border-b-2 transition-colors duration-500 pb-4 mb-6 ${isDarkMode ? 'text-[#E8D9C5] border-[#DA251D]/20' : 'text-[#2C2A29] border-[#D1C2A5]'}`}>
              Khái niệm
            </h3>
            <figure className="mb-6">
              <div className={`relative aspect-[16/9] overflow-hidden border-2 shadow-[4px_4px_0px_0px_var(--text-primary)] transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/40' : 'border-[#2C2A29]/30'}`}>
                <Image
                  src="/images/concept/hq720.jpg"
                  alt="Việt Nam là Nhà nước của dân, do dân, vì dân"
                  fill
                  className="object-cover"
                />
              </div>
            </figure>
            <p className={`font-serif-body text-justify leading-relaxed transition-colors ${isDarkMode ? 'text-[#E8D9C5]/70' : 'text-[#5C554E]'}`}>
              Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam là Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân, do Đảng Cộng sản Việt Nam lãnh đạo. Nhà nước quản lý xã hội bằng Hiến pháp và pháp luật, lấy lợi ích hợp pháp, chính đáng của người dân và doanh nghiệp làm trọng tâm của mọi chính sách.
            </p>
          </div>

          {/* Subsidy Era Mini-interactive */}
          <div className={`vintage-box p-8 flex flex-col justify-between transition-colors duration-500 ${isDarkMode ? 'bg-[#141414] border-[#DA251D]' : 'bg-[#FAF3EB]'}`}>
            <div>
              <h3 className={`text-2xl font-serif-heading border-b-2 transition-colors duration-500 pb-4 mb-6 ${isDarkMode ? 'text-[#E8D9C5] border-[#DA251D]/20' : 'text-[#2C2A29] border-[#D1C2A5]'}`}>
                Bản chất biện chứng
              </h3>
              <ul className={`font-serif-body mb-6 list-disc pl-6 space-y-2 text-justify transition-colors ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>
                <li><span className="font-bold">Tính nhân dân sâu sắc:</span> Pháp luật là biểu hiện của ý chí và nguyện vọng của đại đa số nhân dân. Dân chủ vừa là bản chất, vừa là điều kiện tiền đề; nếu không có dân chủ thực sự, pháp quyền sẽ trở thành "pháp trị" khô cứng.</li>
                <li><span className="font-bold">Tính tối thượng của pháp luật đi đôi với công bằng:</span> Nhà nước đặt mình dưới pháp luật. Pháp luật mang tính nhân đạo, bảo vệ các nhóm yếu thế và hướng tới mục tiêu "dân giàu, nước mạnh, dân chủ, công bằng, văn minh".</li>
                <li><span className="font-bold">Sự lãnh đạo của Đảng Cộng sản:</span> Đây là đặc trưng riêng biệt đảm bảo Nhà nước đi đúng quỹ đạo xã hội chủ nghĩa. Đảng dẫn dắt xã hội bằng chủ trương và nêu gương đạo đức, không đứng trên pháp luật.</li>
              </ul>
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
