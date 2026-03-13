'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, X, Send, Minimize2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Xin chào đồng chí! Tôi là **Cố vấn Lịch sử**. Đồng chí cần tìm hiểu tư liệu gì về gian đoạn 1975 - 1986?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', content: data.reply }]);
      } else {
        throw new Error(data.error || 'Có lỗi xảy ra khi kết nối đài phát đài.');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: `Rất tiếc, đường truyền tín hiệu đang gặp sự cố: ${error.message}. Xin đồng chí liên lạc lại sau.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chat-bot-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#DA251D] text-white rounded-full shadow-[4px_4px_0px_0px_#2C2A29] border-2 border-[#2C2A29] flex items-center justify-center hover:bg-[#B51B15] transition-colors z-50 group"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            
            <span className="absolute -top-12 right-0 bg-[#FAF3EB] text-[#2C2A29] px-3 py-1 text-xs font-bold border-2 border-[#2C2A29] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Cố vấn Lịch sử
              <div className="absolute -bottom-2 right-4 w-0 h-0 border-t-8 border-t-[#2C2A29] border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[400px] h-[580px] bg-[#FAF3EB] border-2 border-[#2C2A29] shadow-[8px_8px_0px_0px_#2C2A29] flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#4A5D23] text-[#F5E6D3] p-4 flex justify-between items-center border-b-2 border-[#2C2A29]">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <h3 className="font-serif-heading font-bold text-lg">Cố vấn Lịch sử</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-[#38471A] p-1 rounded transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-[#DA251D] p-1 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-opacity-10">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 text-sm md:text-base ${
                      message.role === 'user' 
                        ? 'bg-[#E3D6C1] border border-[#2C2A29] text-[#2C2A29] rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                        : 'bg-white border border-[#2C2A29] text-[#2C2A29] rounded-tl-lg rounded-tr-lg rounded-br-lg'
                    } shadow-sm`}
                  >
                    {message.role === 'model' ? (
                      <div className="prose prose-sm font-serif-body prose-p:leading-snug prose-li:my-0 max-w-none text-[#2C2A29] prose-strong:text-[#DA251D]">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="font-sans whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#2C2A29] text-[#2C2A29] p-3 rounded-tl-lg rounded-tr-lg rounded-br-lg shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#4A5D23] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#4A5D23] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-[#4A5D23] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#F5E6D3] border-t-2 border-[#2C2A29]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập câu hỏi tại đây..."
                  className="flex-1 border-2 border-[#2C2A29] bg-white p-2 font-sans focus:outline-none focus:ring-2 focus:ring-[#DA251D]/30"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-[#DA251D] text-white p-2 border-2 border-[#2C2A29] hover:bg-[#B51B15] disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
