"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// Define routes - Giữ nguyên object này để không hỏng link
const ROUTES = {
  HOME: "/",
  NOIDUNG: "/noi-dung-chinh",
  ONTAP: "/on-tap-quiz",
  QUIZ_HOST: "/quiz-host",
  QUIZ_JOIN: "/quiz-join",
  GAME: "/game",
  THANHVIEN: "/thanh-vien"
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMasthead, setShowMasthead] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { isDarkMode, toggleTheme } = useTheme();

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
      className={`w-full fixed z-50 transition-all duration-500 backdrop-blur-md border-b-2 ${isDarkMode ? 'bg-[#1C1C1C]/90 border-[#DA251D]/30' : 'bg-white/80 border-black'}`}
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
        <div className={`container-custom py-4 md:py-5 px-4 border-b-2 relative transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/20' : 'border-[#D1C2A5]'}`}>
          <div className="flex items-center justify-center text-center relative z-10">
            <Link href="/" className="group max-w-6xl">
              <h1 className="font-serif-heading font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-wide uppercase text-center inline-block relative leading-tight">
                <span className={`block transition-colors duration-500 ${isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]'}`}>NHÀ NƯỚC PHÁP QUYỀN</span>
                <span className="block text-[#DA251D]">XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
              </h1>
            </Link>
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
        <div className={`flex justify-between items-center h-20 border-b-2 transition-colors duration-500 ${isDarkMode ? 'border-[#DA251D]/20' : 'border-[#2C2A29]'}`}>
          <div className="hidden xl:flex items-center">
            <div className={`w-8 xl:w-16 h-[2px] transition-colors ${isDarkMode ? 'bg-[#DA251D]/30' : 'bg-[#2C2A29]'}`}></div>
            <motion.div
              className="ml-2 xl:ml-4 bg-[#DA251D] px-3 py-1.5"
              animate={{
                opacity: showMasthead ? 0 : 1,
                x: showMasthead ? -20 : 0,
              }}
            >
              <Link href="/" className="group">
                <h1 className="font-serif-heading font-bold text-sm xl:text-base tracking-wider uppercase inline-block relative whitespace-nowrap text-[#F5E6D3]">
                  NHÀ NƯỚC PHÁP QUYỀN 
                </h1>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6 xl:space-x-8 mx-auto flex-wrap">
            {[
              { name: "Trang chủ", path: ROUTES.HOME },
              { name: "Tham nhũng", path: ROUTES.NOIDUNG },
              { name: "Tư liệu", path: ROUTES.ONTAP },
              { name: "Ôn Tập Quiz", path: ROUTES.QUIZ_JOIN },
              { name: "Mini Game", path: ROUTES.GAME },
              { name: "Về dự án", path: ROUTES.THANHVIEN }
            ].map((item, index) => (
              <div key={item.name} className="relative flex items-center">
                <Link
                  href={item.path}
                  className={`group relative px-2 lg:px-3 py-2 transition-colors font-sans font-bold tracking-widest text-xs lg:text-sm uppercase whitespace-nowrap ${
                    pathname === item.path ? 'text-[#DA251D]' : (isDarkMode ? 'text-[#E8D9C5] hover:text-[#DA251D]' : 'text-[#2C2A29] hover:text-[#DA251D]')
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
                  <span className={`ml-4 lg:ml-6 xl:ml-8 font-serif-heading font-bold transition-colors ${isDarkMode ? 'text-[#DA251D]/30' : 'text-[#D1C2A5]'}`}>/</span>
                )}
              </div>
            ))}
          </div>

          {/* Right side elements */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
                isDarkMode ? 'bg-[#2C2A29] text-[#F4D03F] border-[#F4D03F]/30' : 'bg-[#FAF3EB] text-[#2C2A29] border-[#2C2A29]/10'
              } hover:scale-110 active:scale-95 shadow-sm`}
              title={isDarkMode ? "Chuyển sang Chế độ Nghiên cứu" : "Chuyển sang Chế độ Điều tra"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="hidden lg:flex flex-col items-end mr-1 xl:mr-2">
              <span className={`text-[9px] xl:text-[10px] font-sans font-bold leading-tight tracking-wide text-right whitespace-nowrap ${isDarkMode ? 'text-[#E8D9C5]/60' : 'text-[#5C554E]'}`}>NHÀ NƯỚC PHÁP QUYỀN</span>
              <span className="text-[9px] xl:text-[10px] font-sans font-bold text-[#DA251D] leading-tight tracking-wide mt-1 text-right whitespace-nowrap">XHCN VIỆT NAM</span>
            </div>
            <div className="w-8 h-6 lg:w-10 lg:h-8 bg-[#DA251D] flex items-center justify-center border-2 border-[#2C2A29] flex-shrink-0">
               <span className="text-[#F4D03F] text-xs lg:text-sm">★</span>
            </div>
          </div>

          {/* Mobile navigation header when collapsed */}
          <div className="md:hidden flex items-center w-full justify-between">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-[#DA251D] border-2 border-[#2C2A29] flex items-center justify-center mr-2">
                 <span className="text-[#F4D03F] text-[10px]">★</span>
              </div>
              {!showMasthead && (
                <span className="font-serif-heading font-bold text-base text-[#2C2A29] uppercase">Nhà nước Pháp quyền Xã hội Chủ nghĩa Việt Nam</span>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center p-2 transition-colors ${isDarkMode ? 'text-[#E8D9C5] hover:text-[#DA251D]' : 'text-[#2C2A29] hover:text-[#DA251D]'}`}
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t-2 shadow-lg transition-colors duration-500 ${isDarkMode ? 'bg-[#1C1C1C] border-[#DA251D]/30' : 'bg-[#FAF3EB] border-[#2C2A29]'}`}
          >
            <div className="container-custom py-6">
              <div className="space-y-0">
                {[
                  { name: "Trang chủ", path: ROUTES.HOME },
                  { name: "Tham nhũng", path: ROUTES.NOIDUNG },
                  { name: "Tư liệu", path: ROUTES.ONTAP },
                  { name: "Tham gia", path: ROUTES.QUIZ_JOIN },
                  { name: "Mini Game", path: ROUTES.GAME },
                  { name: "Về dự án", path: ROUTES.THANHVIEN }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center py-4 border-b font-sans font-bold transition-colors ${
                      isDarkMode ? 'border-[#DA251D]/10' : 'border-[#D1C2A5]'
                    } ${
                      pathname === item.path ? 'text-[#DA251D]' : (isDarkMode ? 'text-[#E8D9C5]' : 'text-[#2C2A29]')
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-3 text-[#DA251D]">—</span>
                    <span className="uppercase text-base tracking-widest">{item.name}</span>
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
