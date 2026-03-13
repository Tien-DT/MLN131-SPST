"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Shield,
  Flag,
  Zap,
  BookOpen,
  CheckCircle,
  Circle,
  Swords,
  Vote,
  Landmark,
  Wheat,
  TrendingUp,
  Scale,
  Award,
  Target,
  ArrowRight,
  Sparkles,
  Trophy,
  RotateCcw,
  X,
  Calendar,
  MapPin,
  Info,
  Link as LinkIcon,
} from "lucide-react";

import { Milestone, PHASE_1, PHASE_2 } from "./data/milestones";
import { QuizItem, quizData } from "./data/quiz";
import { MilestoneCard } from "./components/MilestoneCard";
import { InlineQuiz } from "./components/InlineQuiz";
import { MilestoneDetailModal } from "./components/MilestoneDetailModal";
import Museum3D from "./components/Museum3D";

/* ═══════════════════════════════════════════════════════════════════ */
/*  COMPONENTS                                                        */
/* ═══════════════════════════════════════════════════════════════════ */

/** Animated number counter */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/** Section divider with gradient */
function Divider({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-4 my-16">
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Wrapper() {
  return <Suspense fallback={null}><Page /></Suspense>;
}

function Page() {
  const sp = useSearchParams();
  const [tab, setTab] = useState<1 | 2 | 3 | 4>(1);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    const t = sp.get("topic");
    if (t === "2") setTab(2);
    else if (t === "3") setTab(3);
    else setTab(1);
  }, [sp]);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">

      {/* Detail Modal */}
      <MilestoneDetailModal
        m={selectedMilestone}
        isOpen={selectedMilestone !== null}
        onClose={() => setSelectedMilestone(null)}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-[#F5E6D3] min-h-[600px] border-b-4 border-double border-[#2C2A29]">
        {/* Decorative background textures */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        
        {/* Newspaper Borders */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#2C2A29]" />
        <div className="absolute top-2 left-0 right-0 h-[2px] bg-[#2C2A29]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Masthead Header */}
            <div className="flex items-center justify-between border-b-2 border-[#2C2A29] pb-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[.3em] text-[#2C2A29] font-sans">Số đặc biệt: 1975-1986</span>
              <span className="text-xl font-serif-heading font-black text-[#DA251D] uppercase tracking-tighter">KIẾN THIẾT QUỐC GIA</span>
              <span className="text-[10px] font-bold uppercase tracking-[.3em] text-[#2C2A29] font-sans">Chương 3.1</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-heading font-black text-[#2C2A29] leading-[0.95] mb-8 uppercase tracking-tight">
              Hành trình<br />
              <span className="text-[#DA251D] drop-shadow-[2px_2px_0px_#FAF3EB]">Bảo vệ Tổ quốc</span>
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex-1 max-w-md border-y border-[#2C2A29]/20 py-4 italic text-lg font-serif-body text-[#5C554E] leading-relaxed">
                "Đất nước bước ra khỏi khói lửa chiến tranh, đón nhận hòa bình và thống nhất. Nhưng hành trình quá độ lên CNXH mở đầu với vô vàn thách thức."
              </div>
            </div>
          </motion.div>

          {/* Stamped Stats Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { n: 11, s: " năm", l: "1975 – 1986", label: "Thời gian" },
              { n: 3, s: " đột phá", l: "Tư duy kinh tế", label: "Bước tiến" },
              { n: 23, s: " triệu", l: "Cử tri bầu cử", label: "Thống nhất" },
              { n: 774, s: "%", l: "Lạm phát đỉnh", label: "Kinh tế" },
            ].map((s, i) => (
              <div 
                key={i} 
                className="relative bg-[#FAF3EB] border-2 border-[#2C2A29] p-4 flex flex-col items-center justify-center overflow-hidden group hover:bg-[#E8D9C5] transition-colors shadow-[4px_4px_0px_0px_#2C2A29]"
              >
                {/* Vintage Badge */}
                <div className="absolute top-0 left-0 bg-[#2C2A29] text-[#FAF3EB] text-[8px] font-bold uppercase px-2 py-0.5">
                  {s.label}
                </div>
                
                <p className="text-3xl font-black text-[#DA251D] mt-2">
                  <Counter value={s.n} suffix={s.s} />
                </p>
                <div className="w-full h-[1px] bg-[#2C2A29] my-2" />
                <p className="text-[10px] text-[#2C2A29] font-bold uppercase tracking-wider">{s.l}</p>
                
                {/* Decorative textures overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ NAV TABS ═══ */}
      <div className="sticky top-[72px] z-30 bg-[#FAF3EB]/90 backdrop-blur-xl border-y border-[#2C2A29]/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex">
          {([
            { id: 1 as const, label: "1975 – 1981", sub: "Bước chuyển mình" },
            { id: 2 as const, label: "1982 – 1986", sub: "Vượt khủng hoảng" },
            { id: 3 as const, label: "Tổng kết", sub: "11 năm nhìn lại" },
            { id: 4 as const, label: "Không gian 3D", sub: "Bảo tàng ký ức" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-5 md:py-6 text-center relative transition-all duration-300 ${tab === t.id ? "text-[#DA251D] scale-105" : "text-[#5C554E] hover:text-[#2C2A29]"}`}
            >
              <span className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-black block font-sans mb-1">{t.label}</span>
              <span className="text-[13px] md:text-[16px] font-bold font-serif-heading italic">{t.sub}</span>
              {tab === t.id && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-[10%] right-[10%] h-[3px] bg-[#DA251D] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <AnimatePresence mode="wait">
        {tab === 1 && (
          <motion.section key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-4 py-16">
            {/* Newspaper Masthead for Phase 1 */}
            <div className="relative mb-16 border-4 border-double border-[#2C2A29] p-8 bg-[#FAF3EB] shadow-[10px_10px_0px_0px_rgba(44,42,41,1)] overflow-hidden">
               {/* Background Texture */}
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
               
               <div className="relative z-10">
                 <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-[#2C2A29] pb-4 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#DA251D]">Giai đoạn 1: 1975 — 1981</span>
                    <span className="text-sm font-serif-heading italic font-bold text-[#5C554E]">Tập san Đặc biệt</span>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#DA251D]">Kỳ I: Kiến thiết & Vệ quốc</span>
                 </div>

                 <div className="text-center mb-10">
                    <h2 className="text-5xl md:text-7xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase tracking-tighter leading-[0.85]">
                       Bước Chuyển Mình<br />
                       <span className="text-[#DA251D]">Đầu Tiên</span>
                    </h2>
                    <div className="w-32 h-[2px] bg-[#DA251D] mx-auto mb-6" />
                    <p className="font-serif-body text-[#333] max-w-2xl mx-auto text-xl italic leading-relaxed">
                       "Thống nhất non sông, bảo vệ biên giới, và những 'đốm lửa' đổi mới đầu tiên."
                    </p>
                 </div>

                 {/* Timeline Summary Box */}
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border-t-2 border-[#2C2A29]">
                    {[
                      { year: "1975", date: "30/4", event: "Giải phóng miền Nam" },
                      { year: "1975", date: "Tháng 8", event: "Hội nghị TW 24" },
                      { year: "1975", date: "Tháng 11", event: "Hiệp thương Bắc-Nam" },
                      { year: "1976", date: "25/4", event: "Tổng tuyển cử lịch sử" },
                      { year: "1976", date: "Đại hội IV", event: "Chiến lược xây dựng" },
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 flex flex-col items-center justify-center text-center ${idx !== 4 ? 'md:border-r border-b md:border-b-0 border-[#2C2A29]/20' : ''} hover:bg-[#DA251D]/5 transition-colors group`}>
                         <div className="text-[10px] font-bold text-[#2C2A29] opacity-40 group-hover:opacity-100 mb-1">{item.year}</div>
                         <div className="text-lg font-serif-heading font-black text-[#DA251D] leading-none mb-2">{item.date}</div>
                         <div className="text-[9px] font-bold uppercase tracking-wider text-[#2C2A29] leading-tight">{item.event}</div>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
            <div className="space-y-12">
              {PHASE_1.map((m, i) => <MilestoneCard key={i} m={m} index={i} onClick={() => setSelectedMilestone(m)} />)}
            </div>
          </motion.section>
        )}

        {tab === 2 && (
          <motion.section key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-[#FAF3EB] bg-[#1a5276] mb-4">Giai đoạn 2</span>
              <h2 className="text-3xl md:text-4xl font-serif-heading font-bold text-[#2C2A29] mb-3">Tìm Đường Vượt Khủng Hoảng</h2>
              <p className="font-serif-body text-[#5C554E] max-w-lg mx-auto text-sm leading-relaxed">
                Từ khủng hoảng kinh tế – xã hội đến ba bước đột phá thai nghén Đổi Mới.
              </p>
            </div>
            <div className="space-y-12">
              {PHASE_2.map((m, i) => <MilestoneCard key={i} m={m} index={i} onClick={() => setSelectedMilestone(m)} />)}
            </div>
          </motion.section>
        )}

        {tab === 3 && (
          <motion.section key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto px-6 py-16">
            {/* Newspaper Header for Conclusion */}
            <div className="text-center mb-16 border-b-2 border-[#2C2A29] pb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-[1px] flex-1 bg-[#2C2A29]/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DA251D]">SỐ ĐẶC BIỆT: TỔNG KẾT KỶ NGUYÊN</span>
                <div className="h-[1px] flex-1 bg-[#2C2A29]/30" />
              </div>
              <h2 className="text-6xl md:text-8xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase tracking-tighter leading-[0.8]">
                11 Năm<br />
                <span className="text-[#DA251D]">Nhìn Lại</span>
              </h2>
              <div className="max-w-2xl mx-auto border-t border-[#2C2A29]/10 pt-4 italic font-serif-body text-[#5C554E] text-xl">
                "Từ khói lửa chiến tranh đến bình minh Đổi mới — nền tảng cho một Việt Nam hùng cường năm 2026."
              </div>
            </div>

            {/* Key achievements - Column Layout */}
            <div className="grid md:grid-cols-2 gap-12 mb-20 relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#2C2A29]/20 -translate-x-1/2" />
              
              {[
                { 
                  icon: <Flag size={20} />, 
                  title: "Thống nhất pháp lý và hành chính", 
                  desc: "Sau 1975, thách thức lớn nhất không chỉ là địa lý mà là sự hòa hợp hai hệ thống hành chính khác biệt hoàn toàn. Tổng tuyển cử 25/4/1976 đã khai sinh nước CHXHCN Việt Nam, thống nhất quốc kỳ, quốc hiệu và đặc biệt là hệ thống luật pháp xuyên suốt từ Bắc vào Nam. Bài học về sự tập trung thống nhất này chính là nền tảng để năm 2026, Việt Nam thực hiện thành công 'Chính phủ số', nơi dữ liệu dân cư được số hóa đồng bộ, không còn ranh giới hành chính rườm rà." 
                },
                { 
                  icon: <Shield size={20} />, 
                  title: "Bảo vệ chủ quyền trong vòng vây", 
                  desc: "Giai đoạn 1975-1986 là thời điểm thử thách cực độ của quốc phòng. Vừa cầm súng bảo vệ biên giới Tây Nam và phía Bắc năm 1979, vừa chịu lệnh cấm vận nghiệt ngã. Tinh thần độc lập, tự chủ thời bấy giờ đã hun đúc nên chiến lược 'Ngoại giao Cây tre' lừng lẫy của năm 2026 — giúp Việt Nam giữ vững chủ quyền Biển Đảo (Hoàng Sa, Trường Sa) và duy trì hòa bình, là điểm đến an toàn nhất khu vực cho dòng vốn công nghệ cao." 
                },
                { 
                  icon: <Sparkles size={20} />, 
                  title: "Khởi nguồn tư duy kinh tế thị trường", 
                  desc: "Những 'đốm lửa' từ Khoán 100 năm 1981 hay việc bù giá vào lương tại Long An đã dũng cảm xé rào cơ chế cũ. Đó là sự thừa nhận quy luật giá trị khách quan sau thời gian dài duy ý chí. Tinh thần 'xé rào' đó đang tiếp nối mạnh mẽ ở năm 2026 thông qua các 'Sandbox' pháp lý cho AI và Blockchain, đưa Việt Nam từ một nước thiếu đói năm 1986 trở thành mắt xích không thể thiếu trong chuỗi cung ứng bán dẫn toàn cầu." 
                },
                { 
                  icon: <Star size={20} />, 
                  title: "Bản lề lịch sử cho Đại hội VI", 
                  desc: "11 năm 'thai nghén' đầy đau thương và mất mát đã tôi luyện nên một thế hệ lãnh đạo dám nhìn thẳng vào sự thật. Đại hội VI (12/1986) không phải là sự ngẫu nhiên, mà là kết quả tất yếu của trí tuệ tập thể. Bước sang năm 2026, chúng ta đang đứng trước vận hội mới — 'Kỷ nguyên vươn mình' của dân tộc, nơi sức mạnh nội lực từ công cuộc 'Đốt lò' làm trong sạch bộ máy đã tạo ra niềm tin tuyệt đối để toàn dân đồng lòng phấn đấu vì mục tiêu nước phát triển." 
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#DA251D] flex items-center justify-center text-[#DA251D] shrink-0">
                      {item.icon}
                    </div>
                    <h3 className="font-serif-heading font-black text-2xl text-[#2C2A29] uppercase tracking-tighter leading-none">{item.title}</h3>
                  </div>
                  <p className="font-serif-body text-[#333] text-[15px] leading-relaxed text-justify indent-8">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Link to 2026 - Modern Newspaper Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="col-span-full border-t-4 border-[#2C2A29] pt-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#2C2A29]">PHÂN TÍCH CHUYÊN SÂU: VIỆT NAM 2026</span>
              </div>
              
              {[
                { 
                  label: "CÔNG NGHỆ SỐ", 
                  title: "Kế thừa 'Khoán' số", 
                  desc: "Nếu năm 1981 ta 'khoán' sản phẩm đến tay người lao động, thì năm 2026 ta 'khoán' trách nhiệm số hóa đến từng công dân. Toàn bộ hạ tầng dữ liệu quốc gia là thành quả của sự thống nhất bền vững suốt 50 năm qua." 
                },
                { 
                  label: "NĂNG LƯỢNG XANH", 
                  title: "Nền kinh tế tuần hoàn", 
                  desc: "Từ bài học tiết kiệm thời bao cấp, Việt Nam 2026 chuyển mình mạnh mẽ thành trung tâm năng lượng tái tạo của ASEAN, hiện thực hóa cam kết Net Zero bằng trí tuệ và công nghệ xanh." 
                },
                { 
                  label: "QUẢN TRỊ QUỐC GIA", 
                  title: "Minh bạch là sức mạnh", 
                  desc: "Phương châm 'Dân biết, dân bàn, dân làm, dân kiểm tra' từ thời kỳ tiền Đổi mới đã được nâng tầm bởi công nghệ giám sát trực tuyến, giúp bộ máy chính trị 2026 sạch và mạnh hơn bao giờ hết." 
                },
              ].map((box, i) => (
                <div key={i} className="bg-[#FAF3EB] border border-[#2C2A29]/20 p-6 flex flex-col items-center text-center shadow-inner group hover:border-[#DA251D] transition-colors">
                  <span className="text-[9px] font-bold text-[#DA251D] tracking-widest mb-3">{box.label}</span>
                  <h4 className="font-serif-heading font-black text-lg text-[#2C2A29] mb-3 uppercase tracking-tight">{box.title}</h4>
                  <p className="font-serif-body text-xs text-[#5C554E] leading-loose">{box.desc}</p>
                </div>
              ))}
            </div>

            {/* Lessons - Editorial Box */}
            <div className="bg-[#E8D9C5] border-2 border-[#2C2A29] p-8 md:p-12 mb-16 relative shadow-[10px_10px_0px_0px_#2C2A29]">
              <div className="absolute -top-4 left-10 bg-[#DA251D] text-[#FAF3EB] px-8 py-1.5 text-sm font-bold uppercase tracking-[0.2em] shadow-lg skew-x-[-12deg]">
                Bài học cho tương lai
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 mt-4">
                {[
                  { tag: "Tư duy", text: "Thực tiễn là thước đo duy nhất của chân lý. Năm 2026, mọi chính sách đều phải dựa trên dữ liệu thực và nhu cầu thực của nhân dân." },
                  { tag: "Ý chí", text: "Khó khăn là động lực cho sự sáng tạo. Cuộc khủng hoảng 1985 đã cho thấy người Việt càng bị dồn vào đường cùng càng bứt phá mạnh mẽ." },
                  { tag: "Chiến lược", text: "Nội lực là quyết định, ngoại lực là quan trọng. Giữ vững chủ quyền để hội nhập sâu rộng là kim chỉ nam từ 1975 đến nay." },
                  { tag: "Công tác cán bộ", text: "Dũng cảm nhận sai và sửa sai là phẩm chất của một Đảng mạnh. Đây là bài học sống còn để duy trì niềm tin bền vững đến 2026." },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <span className="inline-block text-[10px] font-black uppercase text-[#DA251D] underline decoration-2 underline-offset-4">{item.tag}</span>
                    <p className="text-[14px] font-serif-body text-[#2C2A29] leading-relaxed text-justify italic">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull quote - Stamped Style */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative py-16 px-10 border-4 border-double border-[#2C2A29] text-center rounded-sm bg-[#FAF3EB] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
              <div className="absolute -left-10 -top-10 text-[120px] font-black text-[#2C2A29]/5 select-none font-serif">"</div>
              
              <div className="relative z-10">
                <div className="text-[#DA251D] mb-8">
                  <Trophy size={48} className="mx-auto" />
                </div>
                <h4 className="text-3xl md:text-5xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter mb-6 px-4 leading-[0.9]">
                  "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật."
                </h4>
                <div className="w-24 h-[3px] bg-[#DA251D] mx-auto mb-6" />
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#5C554E] max-w-lg mx-auto leading-relaxed">
                  Phương châm Đại hội VI (12/1986) — Ngọn đuốc soi đường cho Việt Nam vươn mình trong thế kỷ 21.
                </p>
              </div>
              
              <div className="absolute -right-10 -bottom-10 text-[120px] font-black text-[#2C2A29]/5 select-none font-serif">"</div>
            </motion.div>
          </motion.section>
        )}

        {tab === 4 && (
          <motion.section key="p4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-4 py-16">
            <Museum3D />
          </motion.section>
        )}
      </AnimatePresence>

      <Divider color="#DA251D" />

      {/* ═══ QUIZ ═══ */}
      <section id="quiz-on-tap" className="scroll-mt-28 max-w-2xl mx-auto px-4 pb-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DA251D] to-[#e74c3c] text-[#F5E6D3] shadow-lg mb-4">
            <Trophy size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif-heading font-black text-[#2C2A29] mb-2">Quiz Ôn Tập</h2>
          <p className="font-serif-body text-sm text-[#5C554E]">10 câu trắc nghiệm — Chương 3.1 (1975 – 1986)</p>
        </div>
        <div className="bg-[#FAF3EB] rounded-sm p-6 md:p-8 border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)]">
          <InlineQuiz data={quizData.slice(0, 10)} />
        </div>
      </section>
    </div>
  );
}
