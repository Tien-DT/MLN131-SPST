import PageHeader from '../components/PageHeader';
import HistoricalReport from '@/components/HistoricalReport';

export default function OnTapQuiz() {
  return (
    <div className="min-h-screen py-12 bg-[#F5E6D3] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 mt-12">
        <div className="bg-[#FAF3EB] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] py-8 border-2 border-[#D1C2A5] p-6 md:p-8 mb-8 text-center mt-8">
          <p className="font-sans text-xs uppercase tracking-[.3em] font-bold text-[#5C554E] mb-3">Hồ sơ chuyên đề</p>
          <h1 className="text-3xl md:text-5xl font-serif-heading font-black text-[#2C2A29] mb-6 uppercase tracking-wider leading-tight">
            Hợp Tuyển Lịch Sử: <br className="md:hidden" /><span className="text-[#DA251D]">Các Đại Án Kỷ Lục</span>
          </h1>
          <div className="w-16 h-1 bg-[#DA251D] mx-auto mb-6"></div>
          <p className="font-serif-body text-[#5C554E] text-sm md:text-base max-w-2xl mx-auto italic leading-relaxed">
            Nhìn lại những biến cố kinh tế - chính trị xuyên suốt các thời kỳ. Từ kỷ nguyên Đổi Mới đến hiện đại, một góc nhìn sâu sắc về những "cơn bão" tham nhũng, những lỗ hổng quản trị và cái giá phải trả để bảo vệ kỷ cương, phép nước. Không có vùng cấm, không có ngoại lệ.
          </p>
        </div>

        {/* Historical Report Section */}
        <div className="mb-12">
           <HistoricalReport />
        </div>
      </div>
    </div>
  );
}

