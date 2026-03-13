'use client';

import { motion } from 'framer-motion';
import { Book, Flag, TrendingUp, Shield, Anchor, Award, Zap } from 'lucide-react';

const sections = [
  {
    id: '3.1.1',
    title: '3.1.1. Xây dựng CNXH và bảo vệ Tổ quốc 1975 - 1981',
    subtitle: 'Hàn gắn vết thương chiến tranh và Thống nhất về mặt Nhà nước',
    content: [
      {
        type: 'editorial',
        text: 'Sau đại thắng 1975, đất nước bước vào kỷ nguyên mới với niềm tin mãnh liệt. Tuy nhiên, thực tế lịch sử đặt ra 4 thử thách nghiệt ngã: (1) Hậu quả chiến tranh tàn khốc; (2) Di sản kinh tế nghèo nàn, lạc hậu của chế độ cũ; (3) Thiên tai liên tiếp (1977-1978); (4) Bao vây, cấm vận và chiến tranh biên giới. Những khó khăn này đòi hỏi một quyết tâm sắt đá để vừa tái thiết vừa giữ vững độc lập.'
      },
      {
        type: 'points',
        items: [
          'Thống nhất bộ máy chính quyền, quốc kỳ, quốc ca và hệ thống pháp luật (Đại hội IV).',
          'Khôi phục sản xuất nông nghiệp và công nghiệp nhẹ để giải quyết nhu cầu cấp thiết.',
          'Tiến hành cải tạo XHCN ở miền Nam, thiết lập quan hệ sản xuất mới.',
          'Chiến đấu bảo vệ chủ quyền biên giới Tây Nam và phía Bắc (1978-1979).'
        ]
      },
      {
        type: 'editorial',
        text: 'Đại hội IV của Đảng (12/1976) đã vạch ra con đường tiến lên CNXH thông qua 3 cuộc cách mạng: Cách mạng quan hệ sản xuất, Cách mạng khoa học - kỹ thuật (là then chốt) và Cách mạng tư tưởng - văn hóa. Đây là kim chỉ nam cho toàn bộ quá trình xây dựng đất nước trong giai đoạn này.'
      }
    ],
    breakthroughs: [
      { year: '1979', event: 'Hội nghị TW 6 (Khóa IV)', goal: 'Đột phá đầu tiên: "Bung ra" sản xuất, bước đầu điều chỉnh các rào cản hành chính.' }
    ],
    flashcard: {
      title: 'Ghi nhớ nhanh 3.1.1',
      items: ['Đại hội IV (1976): Thống nhất rực rỡ.', '3 Cuộc Cách mạng: KH-KT là then chốt.', 'Thử thách: 4 khó khăn chồng chất.']
    },
    highlight: 'Dân tộc ta đã chứng minh sức mạnh đoàn kết không thể lay chuyển khi vừa tái thiết, vừa bảo vệ từng tấc đất biên cương.'
  },
  {
    id: '3.1.2',
    title: '3.1.2. Đại hội V và các bước đột phá tiếp tục đổi mới kinh tế (1982 - 1986)',
    subtitle: 'Nhận diện sai lầm và Tìm đường thoát khỏi khủng hoảng',
    content: [
      {
        type: 'editorial',
        text: 'Giai đoạn 1976-1980, dù có những thành tựu nhất định, nhưng nền kinh tế rơi vào khủng hoảng trầm trọng. Nguyên nhân chủ yếu là do sai lầm chủ quan duy ý chí, cơ chế tập trung quan liêu bao cấp và sự nóng vội trong việc xóa bỏ các thành phần kinh tế phi XHCN. Đại hội V (3/1982) là một bước nhìn thẳng vào sự thật để điều chỉnh chiến lược.'
      },
      {
        type: 'points',
        items: [
          'Chỉ thị 100-CT/TW (1981): "Khoán 100" - luồng gió mới cho nông nghiệp.',
          'Hội nghị Trung ương 8 (Khóa V - 1985): Quyết tâm xóa bỏ bao cấp trong Giá - Lương - Tiền.',
          'Kết luận Bộ Chính trị (1986): Chốt hạ 3 chương trình kinh tế lớn (Lương thực - Thực phẩm, Hàng tiêu dùng, Hàng xuất khẩu).',
          'Bài học quan trọng: Phải tôn trọng quy luật khách quan và thực tiễn sản xuất.'
        ]
      }
    ],
    breakthroughs: [
      { year: '1985', event: 'Hội nghị TW 8 (Khóa V)', goal: 'Đột phá thứ 2: Quyết định xóa bỏ cơ chế tập trung quan liêu bao cấp.' },
      { year: '1986', event: 'Kết luận Bộ Chính trị', goal: 'Đột phá thứ 3: Hình thành mô hình kinh tế mới cho Đổi mới.' }
    ],
    flashcard: {
      title: 'Ghi nhớ nhanh 3.1.2',
      items: ['Đại hội V (1982): Hai nhiệm vụ chiến lược.', 'Khoán 100: Luồng gió mới trong nông nghiệp.', '1986: Chốt hạ 3 chương trình kinh tế lớn.']
    },
    highlight: 'Những bước "xé rào" lịch sử chính là tiền đề sống còn cho sự thành công của công cuộc Đổi mới sau này.'
  },
  {
    id: '3.2',
    title: '3.2. Đại hội VI và Công cuộc Đổi mới toàn diện (12/1986)',
    subtitle: 'Cột mốc lịch sử vĩ đại - Mở đầu kỷ nguyên mới',
    content: [
      {
        type: 'editorial',
        text: 'Đại hội VI là Đại hội của tinh thần "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật". Đây là lúc Đảng chính thức khởi xướng công cuộc Đổi mới toàn diện, lấy dân làm gốc.'
      },
      {
        type: 'points',
        items: [
          'Phê phán sai lầm chủ quan duy ý chí và cơ chế bao cấp lỗi thời.',
          'Đề ra đường lối đổi mới: Phát triển kinh tế nhiều thành phần, mở rộng quan hệ quốc tế.',
          'Nâng cao năng lực lãnh đạo và sức chiến đấu của Đảng trong tình hình mới.'
        ]
      }
    ],
    flashcard: {
      title: 'Ghi nhớ nhanh 3.2',
      items: ['Tháng 12/1986: Khởi xướng Đổi mới.', 'Tư duy mới: Kinh tế nhiều thành phần.', 'Lấy dân làm gốc: Sức mạnh của Đổi mới.']
    },
    highlight: 'Đại hội VI là sự kết tinh của 11 năm tìm tòi, sáng tạo và dũng cảm đối diện với thực tế.'
  }
];

export default function SequentialHistory() {
  return (
    <div className="space-y-16 py-12">
      {sections.map((section, index) => (
        <motion.div 
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="relative group"
        >
          {/* Section Header with Newspaper Style */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-[#2C2A29] text-[#FAF3EB] flex items-center justify-center font-black text-xl border-2 border-[#DA251D] shadow-[4px_4px_0px_0px_#DA251D]">
              {index + 1}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tight">
                {section.title}
              </h2>
              <p className="text-[#DA251D] font-sans font-bold text-xs uppercase tracking-widest mt-1">
                {section.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Article Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#FAF3EB] border-2 border-[#2C2A29] p-8 shadow-[6px_6px_0px_0px_#2C2A29] hover:shadow-[10px_10px_0px_0px_#DA251D] transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
                   {index === 0 ? <Flag size={96} /> : <TrendingUp size={96} />}
                </div>
                
                {section.content.map((block, bIdx) => (
                  <div key={bIdx}>
                    {block.type === 'editorial' ? (
                      <p className="font-serif-body text-[#333] leading-relaxed text-lg mb-6 text-justify italic border-l-2 border-[#D1C2A5] pl-6">
                        {block.text}
                      </p>
                    ) : (
                      <ul className="space-y-4 font-serif-body text-sm text-[#2C2A29]">
                        {block.items?.map((item, iIdx) => (
                          <li key={iIdx} className="flex gap-3 items-start">
                            <span className="text-[#DA251D] font-black mt-1">✦</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Breakthroughs Section */}
                {section.breakthroughs && (
                  <div className="mt-8 pt-8 border-t-2 border-dashed border-[#2C2A29]/20">
                    <h4 className="font-serif-heading font-black text-[#DA251D] uppercase text-sm mb-4 flex items-center gap-2">
                      <Zap size={16} /> Các bước đột phá tư duy
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.breakthroughs.map((bt, btIdx) => (
                        <div key={btIdx} className="bg-white/50 p-3 border border-[#D1C2A5] rounded-sm relative group/bt">
                          <span className="absolute top-2 right-2 text-[10px] font-bold text-[#DA251D] opacity-20 group-hover/bt:opacity-100 transition-opacity">{bt.year}</span>
                          <p className="font-sans font-bold text-[10px] uppercase text-[#5C554E] mb-1">{bt.event}</p>
                          <p className="font-serif-body text-xs text-[#2C2A29] leading-tight">{bt.goal}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Flashcard Study Aid */}
              {section.flashcard && (
                <div className="mt-4 bg-[#2C2A29] text-[#FAF3EB] p-4 border-l-8 border-[#DA251D] shadow-md flex flex-col md:flex-row items-center gap-6">
                  <div className="shrink-0 flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#DA251D] flex items-center justify-center rounded-sm">
                       <Award size={20} className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-serif-heading font-black uppercase text-sm leading-none">{section.flashcard.title}</h5>
                      <p className="text-[10px] font-sans font-bold text-[#D1C2A5] mt-1">Ghi nhớ nhanh</p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                    {section.flashcard.items.map((tip, tipIdx) => (
                      <div key={tipIdx} className="bg-white/10 px-3 py-2 rounded-sm text-[11px] font-serif-body italic leading-tight flex items-center">
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar "Pull Quote" Style */}
            <div className="lg:col-span-4 flex flex-col justify-start pt-2">
               <div className="p-6 border-2 border-dashed border-[#2C2A29] bg-white transform -rotate-1 hover:rotate-0 transition-transform">
                  <Quote size={24} className="text-[#DA251D] mb-4" />
                  <p className="font-serif-heading font-black text-xl text-[#2C2A29] leading-snug">
                    "{section.highlight}"
                  </p>
                  <div className="mt-4 flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-[#5C554E]">
                    <span>Tư liệu tham khảo</span>
                    <Book size={12} />
                  </div>
               </div>
               
               <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                 <div className="w-12 h-[1px] bg-[#2C2A29]"></div>
                 <div className="flex gap-2 text-[#2C2A29]">
                    {index === 0 ? <Shield size={16} /> : <TrendingUp size={16} />}
                 </div>
                 <div className="w-12 h-[1px] bg-[#2C2A29]"></div>
               </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Quote({ className, size }: { className?: string; size: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V11H14.017V6H20.017V16L18.017 21H14.017ZM4.01709 21L4.01709 18C4.01709 16.8954 4.91252 16 6.01709 16H9.01709V11H4.01709V6H10.0171V16L8.01709 21H4.01709Z" />
    </svg>
  );
}
