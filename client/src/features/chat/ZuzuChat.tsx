import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, MessageSquare } from 'lucide-react';
import { Button, Card, cn } from '../../components/ui';
import { aiService } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const ZuzuChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'zuzu' }[]>([
    { text: "Hi! I'm Zuzu, your AI event guide. How can I help you today?", sender: 'zuzu' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setIsTyping(true);

    try {
      const data = await aiService.chatWithZuzu(userMsg);
      setMessages(prev => [...prev, { text: data.response, sender: 'zuzu' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again.", sender: 'zuzu' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-80 md:w-96 h-[500px] flex flex-col overflow-hidden shadow-2xl border-indigo-100">
              {/* Header */}
              <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Zuzu 2.0</h3>
                    <p className="text-[10px] opacity-80">AI Event Intelligence</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                      msg.sender === 'user' 
                        ? "bg-indigo-600 text-white rounded-tr-none" 
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about events..."
                  className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <Button size="sm" onClick={handleSend} className="rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110 active:scale-95",
          isOpen ? "bg-slate-800 rotate-90" : "bg-indigo-600"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ZuzuChat;
