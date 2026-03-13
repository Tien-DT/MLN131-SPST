'use client';

import { useState } from 'react';
import Link from 'next/link';

const documents = [
  { id: 1, type: 'Văn kiện', title: 'Nghị quyết Đại hội IV (1976)', keyword: 'Đại hội IV' },
  { id: 2, type: 'Hình ảnh', title: 'Phiếu cung cấp lương thực', keyword: 'Kinh tế' },
  { id: 3, type: 'Văn kiện', title: 'Chỉ thị số 100-CT/TW (Khoán 100)', keyword: 'Kinh tế' },
  { id: 4, type: 'Video', title: 'Thước phim: Giải phóng Phnôm Pênh', keyword: 'Bảo vệ Tổ quốc' },
  { id: 5, type: 'Văn kiện', title: 'Nghị quyết Đại hội V (1982)', keyword: 'Đại hội V' },
  { id: 6, type: 'Văn kiện', title: 'Hội nghị Trung ương 8 (6/1985)', keyword: 'Kinh tế' },
];

export default function DocumentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-[#F5E6D3] py-24 border-b-4 border-[#2C2A29]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-section-title text-[#2C2A29]">
            Hồ sơ Lưu trữ Quốc gia
          </h2>
          <p className="font-serif-body text-[#5C554E] max-w-2xl mx-auto italic">
            Tra cứu các văn kiện Đảng, hình ảnh thời bao cấp, và tư liệu lịch sử quan trọng.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search bar */}
          <div className="flex gap-4 mb-12 flex-col sm:flex-row">
            <input 
              type="text" 
              placeholder='Nhập từ khóa (vd: "Đại hội IV", "Kinh tế", "Khoán 100"...)' 
              className="flex-1 bg-[#FAF3EB] border-4 border-[#2C2A29] p-4 font-sans focus:outline-none focus:ring-4 focus:ring-[#DA251D]/20 text-lg shadow-[4px_4px_0px_0px_#2C2A29]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="red-box px-8 py-4 font-bold font-sans uppercase tracking-widest sm:w-auto w-full flex-shrink-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2C2A29]">
              Tìm Kiếm
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map(doc => (
              <div key={doc.id} className="vintage-box p-6 hover:-translate-y-1 transition-transform cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold uppercase py-1 px-2 border-2 border-[#2C2A29] ${
                    doc.type === 'Văn kiện' ? 'bg-[#4A5D23] text-white' : 
                    doc.type === 'Hình ảnh' ? 'bg-[#F4D03F] text-[#2C2A29]' : 
                    'bg-[#DA251D] text-white'
                  }`}>
                    {doc.type}
                  </span>
                  <span className="text-[#5C554E] text-xs italic">[{doc.keyword}]</span>
                </div>
                <h3 className="font-serif-heading font-bold text-lg text-[#2C2A29] leading-tight group-hover:text-[#DA251D] transition-colors">{doc.title}</h3>
                <div className="mt-4 pt-4 border-t border-[#D1C2A5] text-right">
                  <Link href="#" className="font-sans text-sm font-bold text-[#DA251D] flex items-center justify-end gap-1">
                    Xem hồ sơ <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <div className="text-center py-12 vintage-box mt-4">
              <p className="font-serif-body text-xl text-[#5C554E]">Không tìm thấy hồ sơ lưu trữ nào khớp với từ khóa.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
