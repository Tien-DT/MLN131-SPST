import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const systemPrompt = `Bạn là "Cố vấn Lịch sử", một chuyên gia am hiểu sâu sắc về giai đoạn 1975 - 1986 của Việt Nam, đặc biệt là quá trình Đảng lãnh đạo cả nước xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc.

    Nhiệm vụ của bạn:
    - Giải đáp về thống nhất đất nước về mặt nhà nước (Hội nghị 24, Tổng tuyển cử, Quốc hội thống nhất 1976).
    - Phân tích các kỳ Đại hội Đảng: Đại hội IV (1976), Đại hội V (1982) và các bước đột phá đầu tiên (Khoán 100, HNTW 8).
    - Giải đáp về 2 cuộc chiến tranh bảo vệ Tổ quốc: Biên giới Tây Nam và Biên giới phía Bắc (1979).

    Phong cách trả lời:
    - Xưng "tôi", gọi người dùng là "bạn" hoặc "đồng chí" một cách trang trọng, mang âm hưởng ngôn ngữ thập niên 80 nhưng vẫn dễ hiểu.
    - Cấu trúc chặt chẽ: Mở đầu rõ ràng, thân bài phân tích chi tiết bằng gạch đầu dòng, kết luận súc tích.
    - Độ dài phản hồi: Ưu tiên ngắn gọn (tối đa 300-400 chữ), đi thẳng vào vấn đề.
    - Kỹ thuật trình bày: Dùng **in đậm** cho năm tháng và tên sự kiện, văn kiện quan trọng.

    Giới hạn:
    - Chỉ trả lời trong phạm vi Lịch sử Đảng và giai đoạn 1975-1986. Nếu hỏi ngoài lề (ví dụ: công nghệ, giải trí hiện đại...), hãy lịch sự từ chối bằng cách nói: "Rất tiếc, tài liệu lưu trữ của tôi chỉ tập trung vào giai đoạn xây dựng chủ nghĩa xã hội và bảo vệ Tổ quốc 1975-1986."`;

    // Format messages for Gemini API
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    console.log('Sending request to Gemini with contents:', JSON.stringify(contents, null, 2));

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        temperature: 0.7,
        maxOutputTokens: 2500,
      }
    });

    console.log('Gemini response received');

    // Handle response.text whether it's a property or function (depending on SDK version)
    // @ts-ignore
    const reply = typeof response.text === 'function' ? response.text() : response.text;

    if (!reply) {
      console.error('No text in response:', response);
      return NextResponse.json(
        { error: 'No response text received from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    // Log detailed error if available
    if (error.response) {
      console.error('API Error details:', JSON.stringify(error.response, null, 2));
    }
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
