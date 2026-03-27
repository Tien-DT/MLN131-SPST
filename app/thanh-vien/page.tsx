"use client";

import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { Users, Bot, Sparkles, Code, Video, MessageSquare } from "lucide-react";

const members = [
  { id: "1", name: "Trương Nguyễn Ngọc Thạch", role: "Member" },
  { id: "2", name: "Hoàng Hồng Quân", role: "Member" },
  { id: "3", name: "Đào Trọng Tiến", role: "Member" },
  { id: "4", name: "Phạm Thị Thanh Ngân", role: "Member" },
  { id: "5", name: "Nguyễn Hồng Quân", role: "Member" },
  { id: "6", name: "Nguyễn Tống Thanh An", role: "Member" },
];

const aiTools = [
  {
    name: "NotebookLM",
    description: "",
    icon: Video,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "ChatGPT",
    description: "Hỗ trợ lên kế hoạch thiết kế trang web",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    name: "GitHub Copilot",
    description: "Hỗ trợ trong việc thiết kế và phát triển trang Web",
    icon: Code,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  // {
  //   name: "Gemini AI",
  //   description: "Hỗ trợ chức năng chat box AI của trang Web",
  //   icon: Sparkles,
  //   color: "text-yellow-500",
  //   bg: "bg-yellow-50",
  // },
];

export default function ThanhVienPage() {
  return (
    <div className="min-h-screen py-12 bg-[#F5E6D3] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 mt-12">
        <div className="bg-[#FAF3EB] rounded-sm p-8 mb-12 border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] text-center">
          <p className="font-sans text-xs uppercase tracking-[.3em] font-bold text-[#5C554E] mb-2">Thông tin Dự án</p>
          <h1 className="text-3xl md:text-5xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase tracking-wider">
            Nhóm thực hiện <span className="text-[#DA251D]">&</span> Báo cáo AI
          </h1>
          <div className="w-16 h-1 bg-[#DA251D] mx-auto mb-4"></div>
          <p className="font-serif-body text-[#5C554E] text-base max-w-2xl mx-auto italic">
            Danh sách thành viên phát triển "Nhà nước Pháp quyền Xã hội Chủ nghĩa Việt Nam" và các công cụ Trí tuệ Nhân tạo tham gia hỗ trợ dự án.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Members Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#FAF3EB] rounded-sm p-8 border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)]"
          >
            <div className="flex items-center gap-4 mb-8 border-b-2 border-[#D1C2A5] pb-4">
              <div className="p-3 bg-[#DA251D] border-2 border-[#2C2A29] rounded-sm shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]">
                <Users className="text-[#F5E6D3]" size={24} />
              </div>
              <h2 className="text-2xl font-serif-heading font-bold text-[#2C2A29] uppercase tracking-wider">Ban Biên Tập</h2>
            </div>
            
            <div className="space-y-4">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-5 rounded-sm bg-white border-2 border-[#D1C2A5] hover:bg-[#F5E6D3] hover:border-[#4A5D23] hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(44,42,41,1)] transition-all"
                >
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-[#2C2A29]">{member.name}</h3>
                  </div>
                  {member.role === "Leader" && (
                    <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-[#FAF3EB] bg-[#DA251D] rounded-sm border border-[#2C2A29]">
                      Chỉ huy
                    </span>
                  )}
                  {member.role === "Member" && (
                    <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-[#4A5D23] bg-[#eef5e6] rounded-sm border border-[#4A5D23]">
                      Thành viên
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Report Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#FAF3EB] rounded-sm p-8 border-2 border-[#D1C2A5] shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] flex flex-col h-full"
          >
            <div className="flex items-center gap-4 mb-8 border-b-2 border-[#D1C2A5] pb-4">
              <div className="p-3 bg-[#1a5276] border-2 border-[#2C2A29] rounded-sm shadow-[2px_2px_0px_0px_rgba(44,42,41,1)]">
                <Bot className="text-[#F5E6D3]" size={24} />
              </div>
              <h2 className="text-2xl font-serif-heading font-bold text-[#2C2A29] uppercase tracking-wider">Trợ Lý Công Nghệ</h2>
            </div>

            <div className="space-y-4 flex-1">
              {aiTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-5 rounded-sm bg-white border-2 border-[#D1C2A5] hover:bg-[#F5E6D3] hover:border-[#1a5276] transition-all hover:shadow-[2px_2px_0px_0px_rgba(44,42,41,1)] hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 border-2 border-[#2C2A29] bg-[#E3D6C1] rounded-sm shrink-0">
                      <tool.icon className="text-[#2C2A29]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif-heading text-lg font-bold text-[#2C2A29] mb-1">{tool.name}</h3>
                      {tool.description && (
                        <p className="text-sm font-serif-body text-[#5C554E] leading-relaxed">
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Footer note area that existed in the design */}
        <div className="mt-16 text-center pb-8">
           <div className="inline-block px-4 py-2 border-y border-[#D1C2A5]">
             <p className="font-serif-heading text-sm text-[#5C554E] italic">"Tất cả vì sự nghiệp xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc"</p>
           </div>
        </div>
      </div>
    </div>
  );
}
