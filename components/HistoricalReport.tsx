'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Globe, Info, CheckCircle2, AlertCircle, Bookmark } from 'lucide-react';

export default function HistoricalReport() {
  return (
    <section className="mt-16 space-y-12">
      {/* Masthead for the Special Report */}
      <div className="border-t-4 border-b-4 border-[#2C2A29] py-4 bg-[#FAF3EB]/50">
        <div className="flex justify-between items-center px-4 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-[#5C554E]">
          <span>PHỤ TRƯƠNG ĐẶC BIỆT</span>
          <span className="hidden md:block">BỐI CẢNH QUỐC TẾ 1975 - 1981</span>
          <span>LƯU HÀNH NỘI BỘ</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editorial Section */}
        <div className="lg:col-span-2 bg-[#FAF3EB] border-2 border-[#2C2A29] p-8 shadow-[8px_8px_0px_0px_#2C2A29] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#DA251D]/5 rounded-bl-full pointer-events-none"></div>
          
          <h2 className="text-4xl font-serif-heading font-black text-[#2C2A29] mb-6 uppercase leading-tight border-b-2 border-dashed border-[#2C2A29] pb-4">
            Giải Mã "Vòng Vây" & Nghĩa Vụ Quốc Tế
          </h2>
          
          <div className="prose prose-sm max-w-none font-serif-body text-[#333] leading-relaxed">
            <p className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:text-[#DA251D]">
              Giai đoạn 1975 - 1981 là một trong những chương đầy thử thách nhất của ngoại giao Việt Nam. Ngay sau khi vừa bước ra khỏi cuộc kháng chiến chống Mỹ cứu nước, chúng ta lại phải đối mặt với một cục diện quốc tế cực kỳ phức tạp: bị bao vây cấm vận, bị phương Tây lên án và đặc biệt là sự thù địch từ chính quyền Pol Pot và các lực lượng phản động quốc tế.
            </p>

            <div className="my-8 bg-[#2C2A29]/5 p-6 border-l-4 border-[#DA251D] italic">
              "Lịch sử Đảng Cộng sản Việt Nam khẳng định: Cuộc chiến đấu bảo vệ biên giới Tây Nam và phía Bắc, cũng như việc giúp dân tộc Campuchia thoát khỏi họa diệt chủng là những hành động tự vệ chính đáng và nghĩa vụ quốc tế cao cả."
            </div>

            <h3 className="text-2xl font-serif-heading font-bold text-[#2C2A29] mt-8 mb-4">Cái nhìn đa chiều về vấn đề Campuchia</h3>
            <p>
              Nhiều thế lực lúc bấy giờ đã bẻ lái dư luận, cho rằng Việt Nam "xâm lược" Campuchia. Tuy nhiên, nếu lật lại hồ sơ lịch sử 2026, chúng ta thấy rõ: Chính quyền Pol Pot đã tiến hành các cuộc thảm sát tàn bạo dọc biên giới Tây Nam Việt Nam ngay từ năm 1975. Việt Nam đã kiềm chế đến mức tối đa và chỉ hành động khi không còn lựa chọn nào khác để bảo vệ tính mạng người dân và đáp lại lời kêu gọi khẩn thiết của Mặt trận Đoàn kết dân tộc cứu nước Campuchia.
            </p>
          </div>

          {/* Fact-Check Table */}
          <div className="mt-12 bg-white border-2 border-[#2C2A29] overflow-hidden">
            <div className="bg-[#2C2A29] text-white p-3 font-sans font-bold uppercase tracking-widest text-center text-xs">
              Bảng Đối Chiếu: Luận Điệu vs. Sự Thật Lịch Sử
            </div>
            <table className="w-full text-sm font-serif-body border-collapse">
              <thead>
                <tr className="bg-[#F5E6D3] border-b-2 border-[#2C2A29]">
                  <th className="p-4 border-r-2 border-[#2C2A29] w-1/2 text-[#DA251D]">Cáo Buộc (Dư luận phương Tây/TQ)</th>
                  <th className="p-4 text-[#4A5D23]">Sự Thật Lịch Sử (Lịch sử Đảng)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#D1C2A5]">
                  <td className="p-4 border-r-2 border-[#2C2A29] align-top italic">
                    "Việt Nam đưa quân sang Campuchia là hành động xâm lược, đơn phương thay đổi chính quyền."
                  </td>
                  <td className="p-4 align-top">
                    <strong>Hành động tự vệ & Nhân đạo:</strong> Quân tình nguyện Việt Nam sang giúp Campuchia lật đổ tập đoàn Pol Pot - Ieng Sary, chấm dứt chế độ diệt chủng khiến 2 triệu người dân vô tội chết oan.
                  </td>
                </tr>
                <tr className="border-b border-[#D1C2A5] bg-[#F9F6F2]">
                  <td className="p-4 border-r-2 border-[#2C2A29] align-top italic">
                    "Việt Nam vi phạm luật pháp quốc tế, cần bị bao vây cấm vận kinh tế để bị trừng phạt."
                  </td>
                  <td className="p-4 align-top">
                    <strong>Nghĩa vụ cao cả:</strong> Đây là sự kết hợp giữa quyền tự vệ chính đáng (Điều 51 Hiến chương LHQ) và nghĩa vụ hỗ trợ đồng minh thoát lực diệt chủng. Sự cấm vận là đòn ép chính trị thiếu công bằng.
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-r-2 border-[#2C2A29] align-top italic">
                    "Trung Quốc tấn công biên giới phía Bắc (1979) là để dạy cho Việt Nam một bài học."
                  </td>
                  <td className="p-4 align-top">
                    <strong>Cuộc chiến vệ quốc:</strong> Quân và dân Việt Nam đã anh dũng chiến đấu đập tan âm mưu bành trướng, bảo vệ từng tấc đất thiêng liêng ở 6 tỉnh biên giới phía Bắc trước sự tấn công của hơn 60 vạn quân địch.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar - Context & Analysis */}
        <div className="space-y-8">
          <div className="p-6 bg-[#2C2A29] text-[#FAF3EB] border-2 border-[#DA251D] shadow-[8px_8px_0px_0px_rgba(44,42,41,1)]">
            <div className="flex items-center gap-3 mb-8 text-[#DA251D]">
              <ShieldAlert size={32} />
              <h4 className="font-serif-heading font-black text-2xl uppercase tracking-tighter leading-none border-b-2 border-[#DA251D] pb-2">
                Bối Cảnh Vây Hãm
              </h4>
            </div>
            <ul className="space-y-8 text-sm font-serif-body">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DA251D]/20 flex items-center justify-center shrink-0 border border-[#DA251D]">
                  <span className="text-[#DA251D] font-black text-xs">01</span>
                </div>
                <span className="leading-relaxed">
                  <strong className="text-white block mb-1 uppercase text-[11px] tracking-widest font-sans">Ngoại giao</strong>
                  Hoa Kỳ và các đồng minh phương Tây ngưng viện trợ, áp đặt lệnh trừng phạt thương mại khắc nghiệt nhằm cô lập kinh tế Việt Nam.
                </span>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DA251D]/20 flex items-center justify-center shrink-0 border border-[#DA251D]">
                  <span className="text-[#DA251D] font-black text-xs">02</span>
                </div>
                <span className="leading-relaxed">
                  <strong className="text-white block mb-1 uppercase text-[11px] tracking-widest font-sans">Kinh tế</strong>
                  Thiếu hụt lương thực, lạm phát phi mã, tài nguyên kiệt quệ sau 30 năm chiến tranh. Phụ thuộc lớn vào khối SEV.
                </span>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DA251D]/20 flex items-center justify-center shrink-0 border border-[#DA251D]">
                  <span className="text-[#DA251D] font-black text-xs">03</span>
                </div>
                <span className="leading-relaxed">
                  <strong className="text-white block mb-1 uppercase text-[11px] tracking-widest font-sans">An ninh</strong>
                  Chạy đua vũ trang bắt buộc để bảo vệ biên giới Tây Nam và phía Bắc trước các cuộc tấn công vũ trang quy mô lớn.
                </span>
              </li>
            </ul>
          </div>

          <div className="border-2 border-[#2C2A29] p-6 bg-white rotate-1 shadow-md">
            <Bookmark className="text-[#DA251D] mb-4" />
            <h4 className="font-serif-heading font-black text-lg text-[#2C2A29] mb-3 uppercase">Lời Nhắn Cho Thế Hệ Trẻ</h4>
            <p className="font-serif-body text-xs text-[#5C554E] leading-relaxed italic">
              "Hiểu đúng về giai đoạn này là để biết trân trọng hòa bình hôm nay. Chúng ta không 'xâm lược', chúng ta đã sống sót và chiến đấu vì lẽ phải, vì sự tồn vong của chính mình và của người anh em láng giềng."
            </p>
            <div className="mt-4 pt-4 border-t border-[#D1C2A5] flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#2C2A29]">
               <span>PHÂN TÍCH</span>
               <CheckCircle2 size={14} className="text-[#4A5D23]" />
            </div>
          </div>

          <div className="p-4 text-center">
            <Globe size={40} className="mx-auto text-[#2C2A29]/20 mb-2" />
            <p className="text-[10px] font-serif-body italic text-[#5C554E]">Nguồn: Giáo trình Lịch sử Đảng Cộng sản Việt Nam & Tư liệu lưu trữ 2026.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
