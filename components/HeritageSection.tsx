'use client';

import { motion } from 'framer-motion';
import { BookOpen, Star, Sparkles, Quote, ArrowRight, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function HeritageSection() {
  return (
    <section className="bg-[#F5E6D3] py-24 relative overflow-hidden border-b-4 border-[#2C2A29]">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      
      <div className="container-custom relative mx-auto px-6">
        {/* Newspaper Masthead */}
        <div className="text-center mb-16 border-b-4 border-double border-[#2C2A29] pb-8">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C2A29] mb-4">
            <span>SỐ CHUYÊN ĐỀ: GIẢI MÃ VĂN KIỆN</span>
            <span className="hidden md:block">TƯ DUY ĐỔI MỚI - GEN Z CONNECT</span>
            <span>VIỆT NAM 2026</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter leading-none mb-4">
            Góc Nhìn <span className="text-[#DA251D]">Di Sản</span>
          </h2>
          <p className="font-serif-body text-xl italic text-[#5C554E] max-w-2xl mx-auto">
            "Khi những dòng Nghị quyết khô khan trở thành kim chỉ nam cho tinh thần Startup và Khát vọng vươn mình."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column - Editorial */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative p-8 border-2 border-[#2C2A29] bg-[#FAF3EB] shadow-[8px_8px_0px_0px_#2C2A29]">
              <div className="absolute -top-4 -left-2 bg-[#DA251D] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest -rotate-2">
                GIẢI MÃ GEN Z
              </div>
              <h3 className="text-3xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase leading-tight">
                Văn Kiện Đảng: "Source Code" Của Công Cuộc Đổi Mới
              </h3>
              <div className="columns-1 md:columns-2 gap-8 font-serif-body text-[#333] text-sm leading-relaxed text-justify">
                <p className="mb-4">
                  <span className="text-4xl font-black float-left mr-2 mt-1 leading-none text-[#DA251D]">V</span>
                  ới nhiều bạn trẻ, "Văn kiện" nghe có vẻ xa vời, nhưng thực chất đó là những bản "thiết kế hệ thống" (System Design) định hình nên diện mạo đất nước. Nếu xem Việt Nam là một Startup khổng lồ, thì các Nghị quyết Đại hội Đảng chính là những bản Roadmap chiến lược giúp con thuyền quốc gia vượt qua "thung lũng chết" của khủng hoảng kinh tế những năm 80.
                </p>
                <p className="mb-4">
                  Ví dụ, Chỉ thị 100 (Khoán 100) năm 1981 không chỉ là một văn bản hành chính, mà là một cú "Update" cực mạnh vào tư duy quản lý, trao quyền tự chủ cho người nông dân — tinh thần 'Decentralization' (phi tập trung) đầu tiên giúp giải phóng sức sản xuất thần kỳ.
                </p>
                <p>
                  Đến Hội nghị Trung ương 8 (Khóa V) năm 1985, việc quyết định xóa bỏ bao cấp, chuyển sang hạch toán kinh doanh chính là bước "Pivot" (chuyển hướng) vĩ đại, dọn đường cho quy luật thị trường — nền tảng để thế hệ trẻ năm 2026 có thể tự do khởi nghiệp và hội nhập toàn cầu.
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border-t border-[#2C2A29]/10 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#2C2A29] flex items-center justify-center text-[#FAF3EB]">
                    <Zap size={18} />
                  </div>
                  <span className="text-xs font-bold italic text-[#5C554E]">Trend "Xé Rào" Lịch Sử</span>
                </div>
                <Link href="/noi-dung-chinh" className="flex items-center gap-2 text-[#DA251D] font-black uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Đọc thêm về các văn kiện <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Sub-articles */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-[#2C2A29] pl-6 hover:bg-[#2C2A29]/5 p-4 transition-colors group">
                <h4 className="font-serif-heading font-black text-xl text-[#2C2A29] mb-2 uppercase group-hover:text-[#DA251D]">Đại hội IV (1976)</h4>
                <p className="font-serif-body text-xs text-[#5C554E] leading-relaxed">
                  Bản "văn kiện thống nhất" lịch sử, xác lập chủ quyền nhà nước duy nhất. Đây là bước "Setup" nền móng vững chắc cho một quốc gia độc lập, thống nhất mà chúng ta đang sống ngày nay.
                </p>
              </div>
              <div className="border-l-4 border-[#2C2A29] pl-6 hover:bg-[#2C2A29]/5 p-4 transition-colors group">
                <h4 className="font-serif-heading font-black text-xl text-[#2C2A29] mb-2 uppercase group-hover:text-[#DA251D]">Tư duy Đại hội VI</h4>
                <p className="font-serif-body text-xs text-[#5C554E] leading-relaxed">
                  Phương châm "Nhìn thẳng vào sự thật" chính là tinh thần "Keep it real" mạnh mẽ nhất, giúp Đảng và nhân dân dũng cảm sửa sai, mở ra kỷ nguyên Đổi mới huy hoàng.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Stamped Cards/Badge */}
          <div className="space-y-8">
            <div className="bg-[#FAF3EB] border-2 border-dashed border-[#2C2A29] p-6 text-center rotate-1 shadow-sm">
              <div className="text-[#DA251D] mb-4">
                <Target size={32} className="mx-auto" />
              </div>
              <h4 className="font-serif-heading font-black text-xl text-[#2C2A29] mb-2 uppercase tracking-tighter">
                Key Takeaways
              </h4>
              <ul className="text-left space-y-3 font-serif-body text-xs text-[#333]">
                <li className="flex items-start gap-2">
                  <Star size={12} className="mt-1 shrink-0 text-[#DA251D]" />
                  <span>Văn kiện là kim chỉ nam cho mọi bước đi chiến lược của dân tộc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={12} className="mt-1 shrink-0 text-[#DA251D]" />
                  <span>Tinh thần "xé rào" từ các văn bản chính trị là bài học về sự sáng tạo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star size={12} className="mt-1 shrink-0 text-[#DA251D]" />
                  <span>Hiểu lịch sử qua văn kiện giúp giới trẻ nắm vững "luật chơi" toàn cầu.</span>
                </li>
              </ul>
            </div>

            {/* "Clipping" Style Call to Action */}
            <div className="relative group overflow-hidden">
               <div className="absolute inset-0 bg-[#2C2A29] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
               <div className="relative bg-[#DA251D] border-2 border-[#2C2A29] p-6 text-[#FAF3EB]">
                 <BookOpen size={24} className="mb-4" />
                 <h4 className="text-xl font-serif-heading font-black uppercase mb-2">Bạn đã sẵn sàng?</h4>
                 <p className="text-xs font-serif-body italic mb-6 opacity-90">Cùng lật lại những trang hồ sơ "quyền lực" nhất lịch sử dân tộc.</p>
                 <Link href="/noi-dung-chinh" className="inline-block bg-[#FAF3EB] text-[#2C2A29] px-6 py-2 font-black text-xs uppercase tracking-widest hover:bg-[#F4D03F] transition-colors">
                   Khám phá ngay
                 </Link>
               </div>
            </div>

            <div className="pt-4 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2C2A29]/40">
                — Antigravity History Lab —
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
