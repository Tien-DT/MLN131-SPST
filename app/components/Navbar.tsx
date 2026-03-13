"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define routes - Giữ nguyên object này để không hỏng link
const ROUTES = {
  HOME: "/",
  NOIDUNG: "/noi-dung-chinh",
  ONTAP: "/on-tap-quiz",
  QUIZ_HOST: "/quiz-host",
  QUIZ_JOIN: "/quiz-join",
  THANHVIEN: "/thanh-vien"
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMasthead, setShowMasthead] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setShowMasthead(isHomePage && window.scrollY === 0);
  }, [pathname, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowMasthead(isHomePage && currentScrollY === 0);
    };

    const throttledHandleScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isHomePage]);

  return (
    <motion.nav 
      className="w-full fixed z-50 bg-white/80 backdrop-blur-md border-b-2 border-black"
      initial={false}
    >
      <div className="h-1 w-full bg-[#A61F2B]"></div>
    
      <div className="absolute top-12 left-16 w-32 h-32 bg-[#A61F2B]/10 rounded-full blur-2xl"></div>
      <div className="absolute top-8 right-16 w-24 h-24 bg-black/5 rounded-full blur-xl"></div>
      
      <motion.div
        className="overflow-hidden"
        animate={{ 
          height: showMasthead ? "auto" : 0,
          opacity: showMasthead ? 1 : 0,
        }} 
        transition={{
          height: { duration: 0.35, ease: [0.1, 0.9, 0.2, 1] },
          opacity: { duration: showMasthead ? 0.3 : 0.15 }
        }}
      >
        <div className="container-custom py-6 px-4 border-b-2 border-[#D1C2A5] relative">
          <div className="flex flex-col md:flex-row items-center justify-between text-center relative z-10">
            {/* Thay đổi Label trái */}
            <p className="font-sans text-xs uppercase tracking-widest mb-3 md:mb-0 font-bold text-[#5C554E]">Kỷ nguyên Độc lập</p>

            {/* Centered Title */}
            <Link href="/" className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 group mb-3 md:mb-0">
              <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-wider uppercase text-center inline-block relative">
                <span className="text-[#2C2A29]">KÝ ỨC </span>
                <span className="text-[#DA251D]">THỐNG NHẤT</span>
                <span className="absolute -top-2 -right-3 text-[#DA251D] text-sm">★</span>
              </h1>
            </Link>

            <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#5C554E]">1975 – 1981</p>
          </div>
        </div>
      </motion.div>

      {/* Main navbar content */}
      <motion.div 
        className="container-custom relative z-10"
        animate={{ 
          y: showMasthead ? 0 : 5,
        }}
        transition={{ duration: 0.35, ease: [0.1, 0.9, 0.2, 1] }}
      >
        <div className="flex justify-between items-center h-16 border-b-2 border-[#2C2A29]">
          <div className="hidden md:flex items-center">
            <div className="w-16 h-[2px] bg-[#2C2A29]"></div>
            <motion.div
              className="ml-4 bg-[#DA251D] px-2 py-1"
              animate={{
                opacity: showMasthead ? 0 : 1,
                x: showMasthead ? -20 : 0,
              }}
            >
              <Link href="/" className="group">
                <h1 className="font-serif-heading font-bold text-lg tracking-wider uppercase inline-block relative whitespace-nowrap text-[#F5E6D3]">
                  KÝ ỨC THỐNG NHẤT
                </h1>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation - Giữ nguyên logic Link */}
          <div className="hidden md:flex items-center justify-center space-x-8 mx-auto">
            {[
              { name: "Trang chủ", path: ROUTES.HOME },
              { name: "Nội dung", path: ROUTES.NOIDUNG },
              { name: "Tư liệu", path: ROUTES.ONTAP },
              { name: "Quiz Lịch sử", path: ROUTES.QUIZ_HOST },
              { name: "Tham gia", path: ROUTES.QUIZ_JOIN },
              { name: "Về dự án", path: ROUTES.THANHVIEN }
            ].map((item, index) => (
              <div key={item.name} className="relative flex items-center">
                <Link
                  href={item.path}
                  className={`group relative px-2 py-1 transition-colors font-sans font-bold tracking-widest text-xs uppercase ${
                    pathname === item.path ? 'text-[#DA251D]' : 'text-[#2C2A29] hover:text-[#DA251D]'
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#DA251D] transition-all duration-300 ${
                      pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </span>
                </Link>
                {index < 5 && (
                  <span className="ml-8 text-[#D1C2A5] font-serif-heading font-bold">/</span>
                )}
              </div>
            ))}
          </div>

          {/* Right side elements */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] font-sans font-bold text-[#5C554E] leading-none tracking-widest">VIỆT NAM</span>
                <span className="text-[10px] font-sans font-bold text-[#DA251D] leading-none tracking-widest mt-1">DÂN CHỦ</span>
            </div>
            <div className="w-8 h-6 bg-[#DA251D] flex items-center justify-center border-2 border-[#2C2A29]">
               <span className="text-[#F4D03F] text-xs">★</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-[#2C2A29] hover:text-[#DA251D]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF3EB] border-t-2 border-[#2C2A29] shadow-lg"
          >
            <div className="container-custom py-6">
              <div className="space-y-0">
                {[
                  { name: "Trang chủ", path: ROUTES.HOME },
                  { name: "Nội dung", path: ROUTES.NOIDUNG },
                  { name: "Tư liệu", path: ROUTES.ONTAP },
                  { name: "Quiz Lịch sử", path: ROUTES.QUIZ_HOST },
                  { name: "Tham gia", path: ROUTES.QUIZ_JOIN },
                  { name: "Về dự án", path: ROUTES.THANHVIEN }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center py-4 border-b border-[#D1C2A5] font-sans font-bold ${
                      pathname === item.path ? 'text-[#DA251D]' : 'text-[#2C2A29]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3 text-[#DA251D]">—</span>
                    <span className="uppercase text-sm tracking-widest">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}