'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/app/components/ThemeProvider';

export default function HeritageSection() {
  const { isDarkMode } = useTheme();
  const [page, setPage] = useState(0);

  const sixFeatures = [
    {
      title: 'Thứ nhất: Xây dựng nhà nước do nhân dân lao động làm chủ, đó là Nhà nước của dân, do dân, vì dân.',
      content: ''
    },
    {
      title: 'Thứ hai: Nhà nước được tổ chức và hoạt động dựa trên cơ sở của Hiến pháp và pháp luật.',
      content: 'Trong tất cả các hoạt động của xã hội, pháp luật được đặt ở vị trí tối thượng để điều chỉnh các quan hệ xã hội.'
    },
    {
      title: 'Thứ ba: Quyền lực nhà nước là thống nhất, có sự phân công rõ ràng, có cơ chế phối hợp nhịp nhàng và kiểm soát giữa các cơ quan: lập pháp, hành pháp và tư pháp.',
      content: ''
    },
    {
      title: 'Thứ tư: Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam phải do Đảng Cộng sản Việt Nam lãnh đạo, phù hợp với Điều 4 Hiến pháp năm 2013.',
      content: 'Hoạt động của Nhà nước được giám sát bởi nhân dân với phương châm: “Dân biết, dân bàn, dân làm, dân kiểm tra” thông qua các tổ chức, các cá nhân được nhân dân ủy nhiệm.'
    },
    {
      title: 'Thứ năm: Nhà nước pháp quyền xã hội chủ nghĩa ở Việt Nam tôn trọng quyền con người, coi con người là chủ thể, là trung tâm của sự phát triển.',
      content: 'Quyền dân chủ của nhân dân được thực hành một cách rộng rãi; “nhân dân có quyền bầu và bãi miễn những đại biểu không xứng đáng”; đồng thời tăng cường thực hiện sự nghiêm minh của pháp luật.'
    },
    {
      title: 'Thứ sáu: Tổ chức và hoạt động của bộ máy nhà nước theo nguyên tắc tập trung dân chủ, có sự phân công, phân cấp, phối hợp và kiểm soát lẫn nhau, nhưng bảo đảm quyền lực nhà nước là thống nhất...',
      content: ''
    }
  ];

  const [sixPage, setSixPage] = useState(0);
  const sixPageSize = 3;
  const sixTotalPages = Math.ceil(sixFeatures.length / sixPageSize);
  const sixCurrentItems = sixFeatures.slice(sixPage * sixPageSize, (sixPage + 1) * sixPageSize);

  const features = [
    {
      title: 'Sự lãnh đạo tuyệt đối của Đảng Cộng sản Việt Nam',
      content:
        'Đảng quyết định bản chất và sự thành công của công cuộc xây dựng Nhà nước pháp quyền. Sự lãnh đạo này đảm bảo tính thống nhất chính trị và tránh tình trạng chia cắt quyền lực dẫn đến bế tắc.'
    },
    {
      title: 'Bản chất Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân',
      content:
        'Nhân dân là chủ thể tối cao của quyền lực nhà nước. Điều này đòi hỏi các cơ chế dân chủ trực tiếp và đại diện phải được thực thi hiệu quả, đặc biệt là dân chủ cơ sở.'
    },
    {
      title: 'Tôn trọng, bảo đảm và bảo vệ quyền con người, quyền công dân',
      content:
        'Quyền con người được cụ thể hóa trong Hiến pháp và các đạo luật. Nhà nước có trách nhiệm tạo hành lang pháp lý để người dân phát huy năng lực và bảo vệ họ trước các hành vi xâm phạm.'
    },
    {
      title: 'Thượng tôn Hiến pháp và pháp luật',
      content:
        'Mọi cơ quan, tổ chức và cá nhân đều phải tôn trọng sự tối thượng của Hiến pháp. Hệ thống pháp luật phải minh bạch, ổn định và dễ tiếp cận.'
    },
    {
      title: 'Quyền lực nhà nước là thống nhất, phân công rành mạch, phối hợp chặt chẽ và kiểm soát hiệu quả',
      content:
        'Quyền lực nhà nước không phân lập mà thống nhất, nhưng có sự chuyên môn hóa giữa quyền lập pháp, hành pháp và tư pháp để ngăn ngừa tha hóa quyền lực.'
    },
    {
      title: 'Hệ thống pháp luật dân chủ, công bằng, nhân đạo và hiện đại',
      content:
        'Pháp luật là đòn bẩy cho sự phát triển bền vững và đổi mới sáng tạo, tạo môi trường công bằng cho mọi thành phần kinh tế thay vì là rào cản hành chính.'
    },
    {
      title: 'Độc lập của Tòa án theo thẩm quyền xét xử',
      content:
        'Tòa án phải độc lập; thẩm phán và hội thẩm nhân dân chỉ tuân theo pháp luật. Đây là chốt chặn cuối cùng bảo vệ công lý và quyền lợi hợp pháp của công dân.'
    },
    {
      title: 'Tôn trọng và thực hiện các điều ước quốc tế',
      content:
        'Nhà nước cam kết tuân thủ các chuẩn mực quốc tế trên cơ sở tôn trọng độc lập, chủ quyền và lợi ích quốc gia - dân tộc.'
    }
  ];

  const pageSize = 3;
  const totalPages = Math.ceil(features.length / pageSize);
  const currentItems = features.slice(page * pageSize, (page + 1) * pageSize);


  return (
    <section className={`py-24 relative overflow-hidden border-b-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#000000] border-[#DA251D]/30' : 'bg-[#F5E6D3] border-[#2C2A29]'}`}>
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      
      <div className="container-custom relative mx-auto px-6">
        {/* Newspaper Masthead */}
        <div className={`text-center mb-16 border-b-4 border-double pb-8 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/20' : 'border-[#2C2A29]'}`}>
          <div className={`flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] mb-4 transition-colors ${isDarkMode ? 'text-[#E8D9C5]/40' : 'text-[#2C2A29]'}`}>
            <span>SỐ CHUYÊN ĐỀ: LÝ LUẬN</span>
            <span className="hidden md:block"></span>
            <span>VIỆT NAM 2026</span>
          </div>
          <h2 className={`text-5xl md:text-7xl font-serif-heading font-black uppercase tracking-tighter leading-none mb-4 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
            Đặc Trưng <span className="text-[#DA251D]">Cơ Bản</span>
          </h2>
          <p className="font-serif-body text-xl italic text-[var(--text-secondary)] max-w-2xl mx-auto">
            "Đây là khung lý luận cốt lõi xác định hình mẫu Nhà nước pháp quyền Việt Nam hiện đại."
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Sáu đặc trưng cơ bản */}
          <div className={`relative border-4 border-double shadow-[8px_8px_0px_0px_var(--text-primary)] overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#0A0A0A] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}>
            <div className={`px-8 pt-6 pb-5 border-b-4 border-double transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]' : 'bg-[#F5E6D3] border-[#2C2A29]'}`}>
              <h3 className={`text-2xl md:text-3xl font-serif-heading font-black uppercase leading-tight mb-2 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                Sáu đặc trưng cơ bản
              </h3>
              <p className="font-serif-body text-sm italic text-[var(--text-secondary)]">
                Đây là các đặc trưng cơ bản của Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.
              </p>
            </div>

            <div className={`divide-y transition-colors ${isDarkMode ? 'divide-[#DA251D]/10' : 'divide-[#2C2A29]/15'}`}>
              {sixCurrentItems.map((item, index) => (
                <div key={item.title} className={`flex gap-5 px-8 py-6 transition-colors ${isDarkMode ? 'hover:bg-[#1C1C1C]' : 'hover:bg-[#F0E7D8]'}`}>
                  <div className="shrink-0 pt-1">
                    <div className={`border-2 overflow-hidden w-14 text-center shadow-[2px_2px_0px_0px_var(--text-primary)] transition-colors ${isDarkMode ? 'border-[#DA251D]' : 'border-[#2C2A29]'}`}>
                      <div className={`text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 transition-colors ${isDarkMode ? 'bg-[#DA251D] text-white' : 'bg-[#2C2A29] text-[#FAF3EB]'}`}>
                        MỤC
                      </div>
                      <div className="font-serif-heading font-black text-lg text-[#DA251D] py-1 leading-none">
                        {sixPage * sixPageSize + index + 1}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-serif-heading font-black text-base md:text-lg leading-tight mb-1.5 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                      {item.title}
                    </h4>
                    {item.content && (
                      <p className={`font-serif-body text-sm leading-relaxed text-justify transition-colors ${isDarkMode ? 'text-[#E8D9C5]/70' : 'text-[#5C554E]'}`}>
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={`px-8 py-4 border-t-2 flex items-center justify-between transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]/20' : 'bg-[#E8D9C5] border-[#2C2A29]/20'}`}>
              <button
                onClick={() => setSixPage((p) => Math.max(0, p - 1))}
                disabled={sixPage === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-all ${sixPage === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-x-0.5'} ${isDarkMode ? 'border-[#DA251D] text-[#E8D9C5]' : 'border-[#2C2A29] text-[#2C2A29]'}`}
              >
                <ChevronLeft size={14} /> Lùi
              </button>

              <div className={`font-serif-body text-xs italic transition-colors ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>
                Trang {sixPage + 1}/{sixTotalPages}
              </div>

              <button
                onClick={() => setSixPage((p) => Math.min(sixTotalPages - 1, p + 1))}
                disabled={sixPage === sixTotalPages - 1}
                className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-all ${sixPage === sixTotalPages - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:translate-x-0.5'} ${isDarkMode ? 'border-[#DA251D] text-[#E8D9C5]' : 'border-[#2C2A29] text-[#2C2A29]'}`}
              >
                Qua <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Tám đặc trưng cơ bản */}
          <div className={`relative border-4 border-double shadow-[8px_8px_0px_0px_var(--text-primary)] overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#0A0A0A] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}>
            <div className={`px-8 pt-6 pb-5 border-b-4 border-double transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]' : 'bg-[#F5E6D3] border-[#2C2A29]'}`}>
              <h3 className={`text-2xl md:text-3xl font-serif-heading font-black uppercase leading-tight mb-2 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                Tám đặc trưng cơ bản (Theo Nghị quyết số 27-NQ/TW)
              </h3>
              <p className="font-serif-body text-sm italic text-[var(--text-secondary)]">
                Đây là khung lý luận cốt lõi xác định hình mẫu Nhà nước pháp quyền Việt Nam hiện đại.
              </p>
            </div>

            <div className={`divide-y transition-colors ${isDarkMode ? 'divide-[#DA251D]/10' : 'divide-[#2C2A29]/15'}`}>
              {currentItems.map((item, index) => (
                <div key={item.title} className={`flex gap-5 px-8 py-6 transition-colors ${isDarkMode ? 'hover:bg-[#1C1C1C]' : 'hover:bg-[#F0E7D8]'}`}>
                  <div className="shrink-0 pt-1">
                    <div className={`border-2 overflow-hidden w-14 text-center shadow-[2px_2px_0px_0px_var(--text-primary)] transition-colors ${isDarkMode ? 'border-[#DA251D]' : 'border-[#2C2A29]'}`}>
                      <div className={`text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 transition-colors ${isDarkMode ? 'bg-[#DA251D] text-white' : 'bg-[#2C2A29] text-[#FAF3EB]'}`}>
                        MỤC
                      </div>
                      <div className="font-serif-heading font-black text-lg text-[#DA251D] py-1 leading-none">
                        {page * pageSize + index + 1}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-serif-heading font-black text-base md:text-lg leading-tight mb-1.5 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                      {item.title}
                    </h4>
                    <p className={`font-serif-body text-sm leading-relaxed text-justify transition-colors ${isDarkMode ? 'text-[#E8D9C5]/70' : 'text-[#5C554E]'}`}>
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`px-8 py-4 border-t-2 flex items-center justify-between transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]/20' : 'bg-[#E8D9C5] border-[#2C2A29]/20'}`}>
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-all ${page === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-x-0.5'} ${isDarkMode ? 'border-[#DA251D] text-[#E8D9C5]' : 'border-[#2C2A29] text-[#2C2A29]'}`}
              >
                <ChevronLeft size={14} /> Lùi
              </button>

              <div className={`font-serif-body text-xs italic transition-colors ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>
                Trang {page + 1}/{totalPages}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className={`inline-flex items-center gap-2 px-4 py-2 border-2 text-xs font-black uppercase tracking-widest transition-all ${page === totalPages - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:translate-x-0.5'} ${isDarkMode ? 'border-[#DA251D] text-[#E8D9C5]' : 'border-[#2C2A29] text-[#2C2A29]'}`}
              >
                Qua <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
