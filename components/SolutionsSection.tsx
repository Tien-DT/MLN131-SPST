'use client';

import { useTheme } from '@/app/components/ThemeProvider';

export default function SolutionsSection() {
  const { isDarkMode } = useTheme();

  const solutionSections = [
    {
      title: 'Kiểm soát quyền lực và phòng chống tham nhũng',
      items: [
        'Cơ chế 3 tầng nấc: Kiểm soát bên trong (giữa các cơ quan quyền lực); Kiểm soát bên ngoài (giám sát từ Mặt trận Tổ quốc và xã hội); Kiểm soát của Nhân dân (quyền khiếu nại, tố cáo, bầu cử).',
        'Ngăn chặn "tham nhũng chính sách": Siết chặt kỷ luật soạn thảo văn bản, thực hiện đánh giá tác động chính sách (RIA) minh bạch và công khai quy trình lập pháp để nhân dân giám sát trực tuyến.'
      ]
    },
    {
      title: 'Cải cách hành chính và Chuyển đổi số',
      items: [
        'Chính phủ số: Minh bạch hóa 100% hồ sơ thủ tục hành chính trên hệ thống thông tin điện tử liên thông.',
        'Số hóa dữ liệu: Nghiêm cấm yêu cầu người dân cung cấp lại thông tin đã được số hóa trong các kho dữ liệu nhà nước.',
        'Lấy người dùng làm trung tâm: Đơn giản hóa quy trình, thực hiện cơ chế "một cửa liên thông" để giảm thời gian và chi phí cho xã hội.'
      ]
    },
    {
      title: 'Cải cách tư pháp quyết liệt',
      items: [
        'Độc lập xét xử: Thẩm phán không lệ thuộc vào sự chỉ đạo hành chính của địa phương.',
        'Thúc đẩy tranh tụng: Phán quyết của tòa án phải dựa trên kết quả tranh tụng công khai và bình đẳng tại phiên tòa.',
        'Hiện đại hóa tư pháp: Xây dựng "Tòa án điện tử", công khai bản án trên cổng thông tin để nhân dân giám sát.'
      ]
    },
    {
      title: 'Phát huy vai trò của Mặt trận Tổ quốc',
      items: [
        'Phản biện xã hội: Tổ chức phản biện đối với các dự án luật và đề án kinh tế lớn.',
        'Giám sát cán bộ: Tập trung giám sát đạo đức, lối sống của cán bộ, đặc biệt là người đứng đầu.'
      ]
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden border-b-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#051A05] border-[#DA251D]/30' : 'bg-[#4A5D23] border-[#2C2A29]'}`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="container-custom relative mx-auto px-6">
        <div className={`text-center mb-16 border-b-4 border-double pb-8 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/20' : 'border-[#F4D03F]/40'}`}>
          <h2 className={`text-4xl md:text-6xl font-serif-heading font-black uppercase tracking-tight leading-none mb-4 transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#F5E6D3]'}`}>
            Giải Pháp <span className="text-[#F4D03F]">Hoàn Thiện</span>
          </h2>
          <p className={`font-serif-body text-lg italic max-w-3xl mx-auto transition-colors ${isDarkMode ? 'text-[#E8D9C5]/70' : 'text-[#F5E6D3]/90'}`}>
             Giải pháp hoàn thiện Nhà nước pháp quyền hiện nay
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionSections.map((section, index) => (
            <div
              key={section.title}
              className={`relative border-4 border-double shadow-[8px_8px_0px_0px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#0A0A0A] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}
            >
              <div className={`px-6 pt-5 pb-4 border-b-2 transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]/30' : 'bg-[#F5E6D3] border-[#D1C2A5]'}`}>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center text-xs font-black border-2 border-[#DA251D] text-[#DA251D] bg-white/80">
                    {index + 1}
                  </span>
                  <span className={`text-[11px] font-black uppercase tracking-[0.18em] ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>
                    Nhóm giải pháp
                  </span>
                </div>
                <h3 className={`text-xl md:text-2xl font-serif-heading font-black leading-tight transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                  {section.title}
                </h3>
              </div>

              <div className="px-6 py-5">
                <ul className={`list-disc pl-6 space-y-3 font-serif-body text-sm md:text-base leading-relaxed text-justify transition-colors ${isDarkMode ? 'text-[#E8D9C5]/75' : 'text-[#5C554E]'}`}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
