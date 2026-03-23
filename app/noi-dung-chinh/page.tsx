"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Shield,
  Info,
  CheckCircle,
  Zap,
  BookOpen,
  Trophy,
  Scale,
  Handshake,
  Search,
  AlertTriangle,
  FileText,
  UserCheck,
  Folder,
  Stamp,
  ArrowRight,
  Fingerprint,
  Lock,
  Eye,
  Gavel,
  Target
} from "lucide-react";

import { quizData } from "./data/quiz";
import { InlineQuiz } from "./components/InlineQuiz";
import { createQuestionSessionSeed, sampleQuestionsDeterministic } from "@/lib/pdfQuestionBank";
import { useTheme } from "../components/ThemeProvider";
import CorruptionWheel from "./components/CorruptionWheel";

/* ═══════════════════════════════════════════════════════════════════ */
/*  REUSABLE UI COMPONENTS                                            */
/* ═══════════════════════════════════════════════════════════════════ */

/** Section Divider with an ink-line aesthetic */
function InkDivider() {
  const { isDarkMode } = useTheme();
  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-color)]/20 to-transparent" />
      </div>
      <div className="relative z-10 px-6 py-2 border rounded-full shadow-inner scale-75 opacity-50 transition-colors duration-500 bg-[var(--bg-paper)] border-[var(--border-color)]">
        <Fingerprint size={16} className="text-[var(--text-primary)]" />
      </div>
    </div>
  );
}

/** Vintage Image Frame */
function VintageFrame({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const { isDarkMode } = useTheme();
  return (
    <motion.div 
      initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true }}
      className={`relative p-3 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.3)] border transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]/30' : 'bg-white border-[#2C2A29]/10'}`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden grayscale-[0.3] sepia-[0.3] hover:grayscale-0 hover:sepia-0 transition-all duration-700 ${isDarkMode ? 'brightness-75 contrast-125' : ''}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
      {caption && (
        <div className={`mt-4 text-center font-serif-body italic text-xs tracking-tight transition-colors ${isDarkMode ? 'text-[#DA251D]' : 'text-[#5C554E]'}`}>
          — {caption} —
        </div>
      )}
      {/* Decorative Tape */}
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 backdrop-blur-sm -rotate-2 opacity-50 transition-colors ${isDarkMode ? 'bg-[#DA251D]/20' : 'bg-[#D1C2A5]/40'}`} />
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Wrapper() {
  return <Suspense fallback={null}><Page /></Suspense>;
}

function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [inlineQuizData, setInlineQuizData] = useState<any[]>([]);
  const { isDarkMode } = useTheme();
  
  const { scrollYProgress } = useScroll();

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const stampY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    setIsMounted(true);
    setInlineQuizData(sampleQuestionsDeterministic(quizData, 10, createQuestionSessionSeed("noi-dung-chinh")));
  }, []);

  return (
    <motion.div 
      animate={{ 
        backgroundColor: "var(--bg-color)",
        color: "var(--text-primary)"
      }}
      className="min-h-screen selection:bg-[#DA251D]/20 selection:text-[#DA251D]"
    >
      {/* ── BACKGROUND LAYERS ── */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]" />
      </div>

      {/* ── STICKY DECOR ── */}
      <div className={`fixed top-24 left-8 pointer-events-none opacity-5 hidden lg:block ${isDarkMode ? 'invert brightness-200' : ''}`}>
         <Stamp size={200} className="-rotate-12" />
      </div>
      <div className={`fixed bottom-24 right-8 pointer-events-none opacity-5 hidden lg:block ${isDarkMode ? 'invert brightness-200' : ''}`}>
         <Fingerprint size={200} className="rotate-12" />
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="relative pt-32 pb-24 border-b-2 border-[#2C2A29] overflow-hidden">
        <motion.div style={{ y: headerY }} className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-block border-2 border-[#DA251D] px-6 py-1 mb-10 skew-x-[-10deg] shadow-[4px_4px_0px_0px_#2C2A29]">
              <span className="text-[12px] font-black uppercase tracking-[0.5em] text-[#DA251D]">HỒ SƠ LIÊM CHÍNH NO. 03.1</span>
            </div>

            <h1 className={`text-6xl sm:text-8xl md:text-9xl font-serif-heading font-black leading-[0.8] mb-12 uppercase tracking-tighter drop-shadow-sm transition-colors duration-500 ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
              <span className={`block mb-2 text-4xl md:text-5xl font-serif-body italic font-normal normal-case tracking-normal opacity-70 ${isDarkMode ? 'text-[#DA251D]' : 'text-[#5C554E]'}`}>Toàn tập về</span>
              Phòng, Chống<br />
              <span className="text-[#DA251D]">Tham Nhũng</span>
            </h1>

            <div className="max-w-xl mx-auto border-t-2 pt-8 mt-4 relative border-[var(--border-color)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 transition-colors duration-500 bg-[var(--bg-color)]">
                 <Lock size={20} className="text-[var(--accent-color)] opacity-50" />
              </div>
              <p className="font-serif-body text-xl leading-relaxed italic opacity-80 text-[var(--text-primary)]">
                "Kiến thức là vũ khí, liêm chính là lá chắn. <br className="hidden sm:block" /> Bảo vệ tương lai bằng hành động hôm nay."
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Parallax background stamp */}
        <motion.div 
          style={{ y: stampY }}
          className="absolute right-[5%] top-[20%] text-[200px] font-black text-[#2C2A29]/[0.02] select-none font-serif rotate-12 pointer-events-none"
        >
          PCTN
        </motion.div>
      </header>

      {/* ═══ DOSSIER BODY ═══ */}
      <main className="max-w-5xl mx-auto px-6 py-24 relative">
        
        {/* SECTION 1: DEFINITION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-40">
           <div>
             <div className="flex items-center gap-4 mb-10">
               <span className="text-[#DA251D] font-black text-2xl">01/</span>
               <h2 className={`text-4xl font-serif-heading font-black uppercase tracking-tighter ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>Tham nhũng là gì?</h2>
             </div>
             
             <div className="relative mb-12">
               <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-[#DA251D]" />
               <p className={`text-2xl font-serif-body leading-relaxed italic pl-6 ${isDarkMode ? 'text-[#E8D9C5]/90' : 'text-[#2C2A29]'}`}>
                 "Hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi."
               </p>
               <div className={`mt-4 pl-6 text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#DA251D]' : 'text-[#5C554E]'}`}>— Luật Phòng, chống tham nhũng Việt Nam</div>
             </div>

             <div className="space-y-8">
                {[
                  { l: "CHỦ THỂ", t: "Người có chức vụ trong khu vực công hoặc tư nhân.", i: <UserCheck size={18} /> },
                  { l: "HÀNH VI", t: "Lợi dụng, lạm dụng quyền hạn được giao phó.", i: <Gavel size={18} /> },
                  { l: "MỤC ĐÍCH", t: "Mưu cầu lợi ích bất chính (vật chất hoặc tinh thần).", i: <Target size={18} /> },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-5 items-start p-4 hover:bg-[#DA251D]/5 transition-colors rounded-r-lg"
                  >
                    <div className="mt-1 text-[#DA251D]">{item.i}</div>
                    <div>
                      <h4 className="font-serif-heading font-black text-[#2C2A29] text-sm uppercase tracking-wider mb-1">{item.l}</h4>
                      <p className="text-sm font-serif-body text-[#5C554E] leading-relaxed">{item.t}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
           </div>

           <div className="relative">
              <VintageFrame 
                src="/images/anti-corruption/definition.png" 
                alt="Definition Vintage" 
                caption="Biểu tượng Công lý & Pháp luật"
              />
              <div className="absolute -bottom-6 -right-6 scale-75 opacity-20 pointer-events-none">
                 <Stamp size={160} />
              </div>
           </div>
        </section>

        <InkDivider />

        {/* SECTION 2: CORRUPTION WHEEL */}
        <section className="mb-40 relative">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none py-20 grayscale">
            <Image src="/images/anti-corruption/behaviors.png" alt="Bg decor" fill className="object-cover" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <span className="text-[#DA251D] font-black text-xs uppercase tracking-[0.5em] mb-4 block">Mini Game · Nhận Diện Hành Vi</span>
              <h2 className={`text-5xl md:text-7xl font-serif-heading font-black uppercase tracking-tighter mb-6 ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>Vòng quay tham nhũng</h2>
              <div className={`w-24 h-1 mx-auto mb-6 ${isDarkMode ? 'bg-[#DA251D]' : 'bg-[#2C2A29]'}`} />
              <p className="max-w-2xl mx-auto font-serif-body text-lg italic opacity-70">
                Lật mở từng hồ sơ vi phạm và đối mặt với sự thật pháp lý qua vòng quay mô phỏng. Sẵn sàng thử thách kiến thức của bạn?
              </p>
            </div>

            <CorruptionWheel />
          </div>
        </section>

        <InkDivider />

        {/* SECTION 3: CITIZEN ACTION */}
        <section className="mb-40">
           <div className={`p-12 md:p-20 relative overflow-hidden shadow-[20px_20px_0px_0px_var(--accent-color)] transition-colors duration-500 ${isDarkMode ? 'bg-[#000000] border border-[#DA251D]/20' : 'bg-[#1C1C1C] text-[#FAF3EB]'}`}>
              <div className="absolute top-0 right-0 w-[400px] h-full opacity-30 grayscale sepia">
                <Image src="/images/anti-corruption/action.png" alt="Action Unity" fill className="object-cover" />
              </div>
              
              <div className="relative z-10 lg:w-[450px]">
                <h2 className="text-4xl md:text-5xl font-serif-heading font-black uppercase tracking-tighter mb-10 leading-[0.9]">
                  Hành động của <span className="text-[#DA251D]">Cá nhân</span>
                </h2>
                
                <div className="grid gap-10">
                  {[
                    { t: "Hiểu biết về quyền", d: "Chủ động tìm hiểu về quyền tiếp cận thông tin, quyền tố cáo và quyền được bảo vệ pháp lý.", i: <Eye size={22} /> },
                    { t: "Dũng cảm lên tiếng", d: "Từ chối mọi hình thức 'hối lộ' và kiên quyết tố cáo các hành vi sai phạm đến cơ quan chức năng.", i: <Zap size={22} /> },
                    { t: "Sống liêm chính", d: "Đề cao các giá trị đạo đức, sự minh bạch trong lối sống hằng ngày và trong giáo dục gia đình.", i: <Shield size={22} /> },
                    { t: "Tham gia sáng kiến", d: "Ủng hộ và tham gia tích cực các chương trình giáo dục, truyền thông về PCTN tại cộng đồng.", i: <Handshake size={22} /> },
                  ].map((item, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       className="flex gap-6 group"
                    >
                      <div className="shrink-0 w-12 h-12 bg-[#FAF3EB] text-[#1C1C1C] rounded-full flex items-center justify-center group-hover:bg-[#DA251D] group-hover:text-white transition-all">
                        {item.i}
                      </div>
                      <div className="pt-2">
                        <h3 className="text-xl font-serif-heading font-black mb-2 uppercase tracking-tight">{item.t}</h3>
                        <p className="text-sm font-serif-body opacity-70 leading-relaxed text-justify">{item.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
           </div>
        </section>

        <InkDivider />

        {/* SECTION 4: WHISTLEBLOWING */}
        <section className="mb-40 grid lg:grid-cols-2 gap-16 items-start">
           <div className="order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, rotate: 1 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                className={`p-10 relative border-2 transition-colors duration-500 shadow-[8px_8px_0px_0px_var(--text-primary)] ${isDarkMode ? 'bg-[#141414] border-[#DA251D]/30' : 'bg-white border-[#2C2A29]'}`}
              >
                <div className="absolute top-4 right-4 text-[#DA251D] scale-150 rotate-12 opacity-10">
                   <AlertTriangle size={64} />
                </div>
                
                <h2 className="text-4xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter mb-8 bg-[#DA251D] text-white px-4 py-1 inline-block">Hướng dẫn tố cáo</h2>
                
                <div className="space-y-10">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#DA251D] mb-4">Hình thức thực hiện</h4>
                    <ul className="space-y-4">
                      {["Gửi đơn trực tiếp hoặc qua bưu điện.", "Tố cáo trực tiếp tại cơ quan chức năng.", "Qua đường dây nóng hoặc cổng thông tin điện tử."].map((li, i) => (
                        <li key={i} className={`flex gap-3 text-sm font-serif-body font-bold transition-colors ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
                          <ArrowRight size={16} className="shrink-0 text-[#DA251D]" /> {li}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-6 border-l-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#000000] border-[#DA251D]' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}>
                     <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-[#DA251D]' : 'text-[#2C2A29]'}`}>Quyền của bạn</h4>
                     <p className={`text-sm font-serif-body leading-relaxed transition-colors ${isDarkMode ? 'text-[#E8D9C5]/80' : 'text-[#5C554E]'}`}>
                       Được giữ bí mật danh tính (họ tên, địa chỉ, bút tích) và yêu cầu bảo vệ an toàn tính mạng, tài sản khi cần thiết.
                     </p>
                  </div>

                  <div className="p-6 bg-[#1C1C1C] text-[#FAF3EB]">
                     <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#DA251D] mb-3">Nghĩa vụ quan trọng</h4>
                     <p className="text-sm font-serif-body leading-relaxed opacity-80">
                       Phải tố cáo trung thực, cung cấp đầy đủ chứng cứ và chịu trách nhiệm pháp lý về tính xác thực của thông tin.
                     </p>
                  </div>
                </div>
              </motion.div>
           </div>

           <div className="order-1 lg:order-2 space-y-8">
              <VintageFrame 
                src="/images/anti-corruption/whistleblowing.png" 
                alt="Whistleblowing Guide" 
                caption="Kênh thông tin An toàn & Bảo mật"
              />
              <div className={`p-8 border-2 border-double transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/40 bg-[#000000]' : 'border-[#2C2A29] bg-[#E8D9C5]/20'}`}>
                <p className={`text-sm font-serif-body leading-relaxed text-justify transition-colors ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>
                  "Sự im lặng trước cái xấu là đồng khỏa với sự suy đồi. Hãy dùng quyền công dân của mình để xây dựng một xã hội minh bạch thông qua các kênh tố cáo chính thống."
                </p>
              </div>
           </div>
        </section>

        {/* ═══ QUIZ ═══ */}
        <section id="quiz-on-tap" className="scroll-mt-40 bg-[#1C1C1C] rounded-sm p-8 md:p-16 mb-24 shadow-[20px_20px_0px_0px_#DA251D]">
          <div className="text-center mb-16 underline decoration-[#DA251D] decoration-4 underline-offset-8">
            <h2 className="text-5xl md:text-7xl font-serif-heading font-black text-white uppercase tracking-tighter">Bài thi liêm chính</h2>
          </div>
          
          <div className={`rounded-sm p-6 md:p-10 border shadow-inner transition-colors duration-500 ${isDarkMode ? 'bg-[#141414] border-white/5' : 'bg-[#FAF3EB] border-white/10'}`}>
            {inlineQuizData.length > 0 ? (
              <InlineQuiz data={inlineQuizData} />
            ) : (
              <div className="flex flex-col items-center py-24 animate-pulse">
                <div className="w-14 h-14 border-4 border-[#DA251D] border-t-transparent rounded-full animate-spin mb-6" />
                <p className="font-serif-body text-[#DA251D] font-bold tracking-widest uppercase text-xs">Phân tích hồ sơ trắc nghiệm...</p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className={`relative pt-40 pb-20 border-t-2 transition-colors duration-500 overflow-hidden ${isDarkMode ? 'border-[#DA251D]/30 bg-[#000000]' : 'border-[#2C2A29] bg-[#E8D9C5]/20'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="text-[180px] font-black text-[#2C2A29]/5 select-none font-serif leading-none -mb-10">"</div>
           <h4 className={`text-4xl md:text-6xl font-serif-heading font-black uppercase tracking-tighter mb-12 leading-[0.8] max-w-3xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>
             Liêm chính là nền tảng của <span className="text-[#DA251D]">Thịnh vượng</span>
           </h4>
           <div className={`w-24 h-[1px] mx-auto mb-12 ${isDarkMode ? 'bg-[#E8D9C5]/20' : 'bg-[#DA251D]'}`} />
           
           <div className={`grid grid-cols-3 gap-8 max-w-lg mx-auto mb-20 ${isDarkMode ? 'opacity-20' : 'opacity-40'}`}>
              <div className="flex flex-col items-center gap-2">
                 <Lock size={20} />
                 <span className="text-[8px] font-black uppercase tracking-widest">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                 <Shield size={20} />
                 <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                 <Scale size={20} />
                 <span className="text-[8px] font-black uppercase tracking-widest">Justified</span>
              </div>
           </div>

           <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#5C554E] border-t border-[#2C2A29]/10 pt-10">SỨ MỆNH — KIÊM QUYẾT & KIÊN TRÌ — 2026</p>
        </div>
        
        {/* Large Decorative Text background */}
        <div className="absolute left-[-10%] bottom-[-5%] text-[300px] font-black text-[#2C2A29]/[0.02] select-none font-serif pointer-events-none">
          TRUTH
        </div>
      </footer>
    </motion.div>
  );
}
