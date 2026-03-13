import PageHeader from '../components/PageHeader';
import HistoricalReport from '@/components/HistoricalReport';
import SequentialHistory from '@/components/SequentialHistory';

export default function OnTapQuiz() {
  return (
    <div className="min-h-screen py-12 bg-[#F5E6D3] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 mt-12">
        <div className="bg-[#FAF3EB] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] py-8 border-2 border-[#D1C2A5] p-8 mb-8 text-center">
          <p className="font-sans text-xs uppercase tracking-[.3em] font-bold text-[#5C554E] mb-2">Hồ sơ chuyên đề</p>
          <h1 className="text-3xl md:text-5xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase tracking-wider">
            Hợp Tuyển Lịch Sử Đảng
          </h1>
          <div className="w-16 h-1 bg-[#DA251D] mx-auto mb-4"></div>
          <p className="font-serif-body text-[#5C554E] text-base max-w-2xl mx-auto italic">
            Hệ thống hóa kiến thức Chương 3: Đảng lãnh đạo cả nước xây dựng CNXH và tiến hành công cuộc Đổi mới (1975 - 1986).
          </p>
        </div>

        {/* Sequential Content Section */}
        <SequentialHistory />

        {/* Historical Report Section */}
        <div className="mt-24 mb-8">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] flex-1 bg-[#2C2A29]/20"></div>
              <h2 className="font-serif-heading font-black text-2xl uppercase text-[#2C2A29]">Phân Tích Chuyên Sâu</h2>
              <div className="h-[2px] flex-1 bg-[#2C2A29]/20"></div>
           </div>
           <HistoricalReport />
        </div>
      </div>
    </div>
  );
}
