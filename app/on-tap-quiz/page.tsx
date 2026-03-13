import PageHeader from '../components/PageHeader';

export default function OnTapQuiz() {
  return (
    <div className="min-h-screen py-12 bg-[#F5E6D3] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 mt-12">
        <div className="bg-[#FAF3EB] rounded-sm shadow-[6px_6px_0px_0px_rgba(44,42,41,1)] py-8 border-2 border-[#D1C2A5] p-8 mb-8 text-center">
          <p className="font-sans text-xs uppercase tracking-[.3em] font-bold text-[#5C554E] mb-2">Tài liệu tham khảo</p>
          <h1 className="text-3xl md:text-5xl font-serif-heading font-black text-[#2C2A29] mb-4 uppercase tracking-wider">
            Video Tổng Hợp Kiến Thức
          </h1>
          <div className="w-16 h-1 bg-[#DA251D] mx-auto mb-4"></div>
          <p className="font-serif-body text-[#5C554E] text-base max-w-2xl mx-auto italic">
            Video tổng hợp kiến thức về Hành trình dân chủ xã hội chủ nghĩa và Thời kỳ quá độ lên Chủ nghĩa xã hội tại Việt Nam.
          </p>
        </div>

        <div className="bg-[#FAF3EB] border-2 border-[#D1C2A5] rounded-sm p-8 shadow-[6px_6px_0px_0px_rgba(44,42,41,1)]">
          <div className="aspect-video w-full relative">
            {/* Vintage TV Frame Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none border-8 border-[#2C2A29] rounded-sm z-10 shadow-inner"></div>
            <video 
              className="w-full h-full rounded-sm object-cover filter sepia-[0.3] contrast-[1.1]"
              controls
              preload="metadata"
            >
              <source src="/video.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
