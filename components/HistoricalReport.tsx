'use client';

import { useRef, useState, useEffect } from 'react';
import { ShieldAlert, Globe, Bookmark, FileText, Scale, ChevronLeft, ChevronRight, ArrowRight, X, Stamp, Search, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { historicalCases as cases } from '../app/noi-dung-chinh/data/historicalCases';


export default function HistoricalReport() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCase(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="mt-16 space-y-12 mb-16 relative">
      {/* Header Info */}
      <div className="bg-[#FAF3EB] border-2 border-[#2C2A29] p-6 lg:p-10 shadow-[8px_8px_0px_0px_#2C2A29] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#DA251D]/5 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif-heading font-black text-[#2C2A29] uppercase tracking-tighter leading-none mb-6 border-b-4 border-double border-[#2C2A29] pb-6">
          Hồ Sơ Các Đại Án: <br/><span className="text-[#DA251D] text-2xl md:text-5xl tracking-normal">Sự Tha Hóa & Lỗ Hổng Quản Trị</span>
        </h2>
        <div className="prose prose-sm max-w-none font-serif-body text-[#333] leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[#DA251D] text-justify md:text-lg">
            Nhìn lại chặng đường phát triển kinh tế, bên cạnh những bước tiến thần tốc, quốc gia cũng đối diện với những sự kiện tham nhũng chấn động. Từ các âm mưu "thổi giá" bằng đất đai của thời kỳ Tamexco, đến liên minh lũng đoạn dòng tiền ngân hàng ở Vạn Thịnh Phát. Gõ vào từng hồ sơ để khám phá cặn kẽ chân tướng của những kỷ lục đáng buồn nhất.
          </p>
        </div>
      </div>

      {/* Horizontal Timeline Container */}
      <div className="relative pt-12 pb-4 -mx-4 md:mx-0 px-4 md:px-0">
        <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-30 bg-[#2C2A29] text-[#FAF3EB] p-4 rounded-full hover:bg-[#DA251D] hover:scale-110 transition-all shadow-[4px_4px_0px_0px_rgba(218,37,29,0.4)] border-2 border-[#FAF3EB]"
        >
            <ChevronLeft size={28} />
        </button>
        <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-30 bg-[#2C2A29] text-[#FAF3EB] p-4 rounded-full hover:bg-[#DA251D] hover:scale-110 transition-all shadow-[4px_4px_0px_0px_rgba(218,37,29,0.4)] border-2 border-[#FAF3EB]"
        >
            <ChevronRight size={28} />
        </button>

        <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-10 pb-16 pt-10 px-4 md:px-8 snap-x snap-mandatory hide-scrollbar relative scroll-smooth bg-white/40 border-y-2 border-[#2C2A29] shadow-inner"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="absolute top-[52px] left-0 right-0 h-1 bg-[#2C2A29]/20 border-t-2 border-dashed border-[#2C2A29]/40 z-0 hidden md:block"></div>

            {cases.map((c, index) => (
                <div 
                  key={index} 
                  className="relative w-[300px] min-w-[300px] md:w-[420px] md:min-w-[420px] shrink-0 snap-center flex flex-col group mt-10 md:mt-0 cursor-pointer"
                  onClick={() => setSelectedCase(c)}
                >
                    <div className="absolute -top-[45px] md:-top-[28px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10 group-hover:-translate-y-3 transition-transform duration-300">
                        <div className="w-5 h-5 rounded-full bg-[#DA251D] border-4 border-[#FAF3EB] shadow-[0_0_0_2px_#2C2A29] mb-3 group-hover:scale-125 transition-transform"></div>
                        <div className="bg-[#2C2A29] text-[#FAF3EB] font-sans font-black text-sm lg:text-base px-5 py-1 border-2 border-[#2C2A29] shadow-[3px_3px_0px_0px_#DA251D]">
                           {c.year}
                        </div>
                    </div>

                    {/* Basic Card Overview */}
                    <div className="bg-[#FAF3EB] border-2 border-[#2C2A29] h-full shadow-[6px_6px_0px_0px_#2C2A29] flex-1 flex flex-col mt-4 group-hover:bg-[#FDF9F3] transition-all relative overflow-hidden group-hover:-translate-y-2 duration-300">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 border border-white/50 rotate-3 z-20 shadow-sm backdrop-blur-sm"></div>
                        
                        <div className="p-6 md:p-8 flex-1 flex flex-col border-b-4 border-double border-[#2C2A29]/10">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText size={16} className="text-[#DA251D]" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#5C554E] border-b border-[#2C2A29]/20 pb-1 flex-1">
                                  {c.category}
                                </span>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-serif-heading font-black text-[#2C2A29] uppercase mb-4 leading-tight group-hover:text-[#DA251D] transition-colors">
                                {c.name}
                            </h3>

                            <p className="font-serif-body text-sm text-[#5C554E] italic mb-6 line-clamp-2">{c.context}</p>

                            {/* Added Image Thumbnail logic in the preview card */}
                            {c.image && (
                              <div className="h-24 md:h-32 bg-[#2C2A29] mb-4 border border-[#2C2A29] relative overflow-hidden group-hover:shadow-inner transition-all flex items-center justify-center">
                                 <img src={c.image} alt={c.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity sepia" />
                                 <div className="absolute inset-0 bg-[#DA251D]/10 pattern-diagonal-lines mix-blend-overlay"></div>
                              </div>
                            )}

                            <div className="mt-auto mb-2 flex items-center gap-2">
                              <span className="bg-[#2C2A29] text-white text-[10px] font-sans font-bold uppercase px-3 py-1.5 shadow-[2px_2px_0px_0px_#DA251D] group-hover:bg-[#DA251D] group-hover:shadow-[2px_2px_0px_0px_#2C2A29] transition-all flex items-center gap-1">
                                <Search size={14} /> Wiki: Mở chi tiết
                              </span>
                            </div>
                        </div>

                        <div className="bg-[#2C2A29] p-4 px-6 text-[#FAF3EB] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#DA251D]/10 pattern-diagonal-lines opacity-20"></div>
                            <span className="relative z-10 font-sans font-black uppercase text-[10px] tracking-widest text-[#DA251D] mb-1 flex items-center gap-2">
                                <ShieldAlert size={14} /> Án Tuyên
                            </span>
                            <p className="relative z-10 text-xs italic opacity-90 truncate">{c.consequence}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="text-center mt-6 flex items-center justify-center gap-3 text-[#5C554E] font-sans text-xs uppercase tracking-widest font-bold bg-[#F5E6D3] inline-flex mx-auto px-6 py-2 rounded-full border border-[#D1C2A5] left-1/2 -translate-x-1/2 absolute bottom-0 shadow-sm pointer-events-none">
            <span className="md:hidden">Vuốt sang ngang & chạm vào hồ sơ</span>
            <span className="hidden md:inline">Click vào từng hồ sơ để mở định dạng Wikipedia</span>
            <ArrowRight size={14} className="animate-pulse text-[#DA251D]" />
        </div>
      </div>

      {/* POPUP MODAL - NEWSPAPER STYLE */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 lg:p-12 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0, rotateX: 10 }}
              animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ y: 20, scale: 0.95, opacity: 0, rotateX: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-6xl max-h-[95vh] flex flex-col relative overflow-hidden bg-[#FAF3EB] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[12px] border-double border-[#2C2A29]"
              onClick={e => e.stopPropagation()}
            >
               {/* Vintage Newspaper Texture Overlay */}
               <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('/images/paper-texture.png')] bg-repeat z-0" style={{ backgroundImage: "linear-gradient(to right, rgba(200,180,150,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,180,150,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
               
               {/* Close Button */}
               <button 
                 onClick={() => setSelectedCase(null)}
                 className="absolute top-4 right-4 z-50 bg-[#2C2A29] text-[#FAF3EB] p-2 rounded-full hover:bg-[#DA251D] hover:scale-110 transition-all shadow-[4px_4px_0px_0px_rgba(218,37,29,0.4)] border-2 border-[#FAF3EB]"
               >
                 <X size={24} />
               </button>

               {/* SCROLLABLE CONTENT AREA */}
               <div className="flex-1 overflow-y-auto z-10 p-6 md:p-10 lg:p-14 custom-scrollbar">
                  
                  {/* NEWSPAPER MASTHEAD */}
                  <div className="border-b-[6px] border-double border-[#2C2A29] pb-6 mb-8 text-center relative">
                     <div className="absolute top-0 left-0 flex items-center gap-2">
                        <Stamp className="text-[#DA251D] opacity-80" size={32} />
                        <span className="font-sans text-xs tracking-widest font-bold text-[#2C2A29] uppercase border border-[#2C2A29] px-2 py-1 hidden sm:inline-block">Hồ sơ Cật Lực</span>
                     </div>
                     <p className="font-sans text-xs tracking-widest uppercase text-[#5C554E] font-bold mb-2 pt-2 md:pt-0">Lưu trữ Đặc biệt Số {selectedCase.year}</p>
                     <h1 className="font-serif-heading text-4xl md:text-6xl lg:text-7xl font-black text-[#2C2A29] uppercase leading-[0.9] tracking-tighter mix-blend-multiply">
                        {selectedCase.name}
                     </h1>
                     <div className="flex justify-center items-center gap-4 mt-6">
                        <div className="h-[2px] w-16 bg-[#2C2A29] hidden sm:block"></div>
                        <span className="font-serif-body italic text-[#DA251D] font-bold text-lg md:text-xl">Đại án {selectedCase.category}</span>
                        <div className="h-[2px] w-16 bg-[#2C2A29] hidden sm:block"></div>
                     </div>
                  </div>

                  {/* TWO COLUMN NEWSPAPER LAYOUT */}
                  <div className="lg:flex gap-12">
                     
                     {/* LEFT COLUMN: TEXT CONTENT */}
                     <div className="flex-1 lg:w-3/5">
                        
                        {/* Lead Paragraph with Drop Cap */}
                        <p className="font-serif-body text-base md:text-lg leading-relaxed text-[#2C2A29] text-justify mb-8 first-letter:text-7xl md:first-letter:text-8xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:text-[#DA251D] first-letter:leading-[0.8]">
                          {selectedCase.context} {selectedCase.details}
                        </p>

                        {/* Detailed Sections */}
                        <div className="space-y-8">
                          {selectedCase.fullDetails.map((detail, idx) => (
                             <div key={idx} className="relative">
                               <h3 className="font-serif-heading font-black text-2xl uppercase text-[#2C2A29] mb-3 border-b-2 border-dashed border-[#2C2A29]/30 pb-2">
                                 {detail.title}
                               </h3>
                               <p className="font-serif-body text-[15px] md:text-base leading-relaxed text-[#333] text-justify">
                                 {detail.content}
                               </p>
                             </div>
                          ))}
                        </div>
                     </div>

                     {/* RIGHT COLUMN: MEDIA & CALLOUTS */}
                     <div className="lg:w-2/5 mt-10 lg:mt-0 space-y-8">
                        
                        {/* Main Featured Image */}
                        {selectedCase.image && (
                          <div className="p-2 bg-white shadow-md border border-[#ccc] rotate-1 hover:rotate-0 transition-transform duration-500 relative group">
                             <div className="relative overflow-hidden bg-neutral-200">
                                <img 
                                  src={selectedCase.image!} 
                                  alt={selectedCase.name} 
                                  className="w-full h-auto object-cover grayscale sepia-[0.3] contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 mix-blend-multiply"
                                />
                                <div className="absolute inset-0 bg-[#2C2A29]/10 pointer-events-none mix-blend-overlay pattern-diagonal-lines opacity-50"></div>
                             </div>
                             <div className="border-t border-dashed border-[#ccc] mt-3 pt-2">
                                <p className="text-center font-serif-body italic text-[11px] text-[#444] px-2 leading-tight">
                                  Bức ảnh tư liệu hiếm hoi ghi lại từ hồ sơ trinh sát hoặc hiện trường vụ án {selectedCase.year}.
                                </p>
                             </div>
                             <div className="absolute -bottom-3 -right-3">
                                <Scale size={32} className="text-[#DA251D] opacity-20 -rotate-12" />
                             </div>
                          </div>
                        )}

                        {/* Callout Info Box */}
                        <div className="border-[4px] border-[#2C2A29] p-5 bg-[#FDF9F3] shadow-[6px_6px_0px_0px_#2C2A29] relative overflow-hidden">
                           <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#DA251D] rotate-45 flex items-end justify-center pb-1">
                              <Bookmark size={16} className="text-white -rotate-45" />
                           </div>
                           
                           <h4 className="font-sans font-black uppercase tracking-widest text-[#DA251D] text-sm mb-4 border-b border-[#2C2A29]/20 pb-2">Thông cáo Pháp lý</h4>
                           
                           <div className="space-y-4 font-serif-body">
                             <div>
                               <p className="text-[11px] text-[#5C554E] uppercase font-sans font-bold mb-1">Quyết định của Tòa án</p>
                               <p className="text-base font-bold text-[#2C2A29] leading-tight border-l-4 border-[#DA251D] pl-3 py-1 bg-white/50">{selectedCase.consequence}</p>
                             </div>
                           </div>
                        </div>

                     </div>
                  </div>

                  {/* MEDIA GALLERY SECTION */}
                  {selectedCase.gallery && selectedCase.gallery.length > 0 && (
                     <div className="mt-16 border-t-[4px] border-[#2C2A29] pt-8">
                       <div className="flex items-center justify-center gap-4 mb-8">
                         <div className="h-[2px] flex-1 bg-[#2C2A29]"></div>
                         <h3 className="text-2xl md:text-3xl font-serif-heading font-black uppercase text-[#2C2A29] flex items-center gap-2 tracking-widest">
                           <ImageIcon className="text-[#DA251D]" size={28} /> Phóng Sự Ảnh
                         </h3>
                         <div className="h-[2px] flex-1 bg-[#2C2A29]"></div>
                       </div>
                       
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                         {selectedCase.gallery.map((imgSrc, idx) => (
                           <div key={idx} className={`bg-white p-2 border border-[#ccc] shadow-sm transform transition-all duration-300 hover:scale-[1.03] hover:z-20 ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                             <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                                <img 
                                  src={imgSrc} 
                                  alt={`Tư liệu ${idx + 1}`} 
                                  className="w-full h-full object-cover grayscale sepia-[0.3] contrast-125 hover:grayscale-0 hover:sepia-0 transition-all duration-500 mix-blend-multiply" 
                                />
                                <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay pattern-diagonal-lines opacity-30"></div>
                             </div>
                             <div className="text-center mt-2 font-serif-body italic text-[10px] text-[#444] border-t border-dashed border-[#ccc] pt-1">
                                Tài liệu lưu trữ #{idx + 1}
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                  )}

                  <div className="border-t-[6px] border-double border-[#2C2A29] mt-16 pt-4 flex flex-col items-center">
                    <p className="font-serif-body text-xs italic text-[#5C554E]">— Lưu trữ bởi Văn khố Lịch sử Việt Nam —</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
