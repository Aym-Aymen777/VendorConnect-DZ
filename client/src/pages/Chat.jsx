import { useState, useRef, useEffect } from "react";
import { Send, User, ArrowLeft, MoreVertical, Phone, Video, Search, Paperclip, Smile, Mic, CheckCheck, Check } from "lucide-react";
import Header from "../components/common/Header";
import { Link } from "react-router-dom";

const mockMessages = [
  {
    id: 1,
    sender: "support",
    text: "Hello! How can we help you today? 👋",
    time: "09:00 AM",
    status: "read",
    type: "text"
  },
  {
    id: 2,
    sender: "user",
    text: "Hi, I have a question about my order. It was supposed to arrive yesterday but I haven't received it yet.",
    time: "09:01 AM",
    status: "read",
    type: "text"
  },
  {
    id: 3,
    sender: "support",
    text: "I'm sorry to hear about the delay! Let me help you track your order. Could you please provide your order number?",
    time: "09:02 AM",
    status: "read",
    type: "text"
  },
  {
    id: 4,
    sender: "user",
    text: "Sure, it's #ORD-2024-1234",
    time: "09:03 AM",
    status: "delivered",
    type: "text"
  },
  {
    id: 5,
    sender: "support",
    text: "Thank you! I can see your order here. It looks like there was a delay at the shipping facility, but it's now out for delivery and should arrive today between 2-4 PM. You'll receive a tracking notification shortly.",
    time: "09:05 AM",
    status: "read",
    type: "text"
  },
  {
    id: 6,
    sender: "user",
    text: "That's great news! Thank you for the quick response 😊",
    time: "09:06 AM",
    status: "sent",
    type: "text"
  }
];

export default function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (messages[messages.length - 1]?.sender === "user") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
      type: "text"
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const MessageStatus = ({ status }) => {
    switch (status) {
      case "sending":
        return <div className="w-3 h-3 border border-white/50 border-t-transparent rounded-full animate-spin"></div>;
      case "sent":
        return <Check size={12} className="text-white/70" />;
      case "delivered":
        return <CheckCheck size={12} className="text-white/70" />;
      case "read":
        return <CheckCheck size={12} className="text-blue-400" />;
      default:
        return null;
    }
  };

  const TypingIndicator = () => (
    <div className="flex justify-start">
      <div className="max-w-[70%] px-4 py-3 rounded-2xl rounded-bl-none bg-white border border-[#e1a95f]/10 shadow-sm">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#e1a95f] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#e1a95f] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#e1a95f] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-xs text-[#1f3b73]/60 ml-2">Support Team is typing...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f2ed] flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col flex-1">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl border border-[#1f3b73]/10 flex flex-col h-[80vh] overflow-hidden">
          {/* Enhanced Chat Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#e1a95f]/20 bg-gradient-to-r from-white to-[#f4f2ed]/30">
            <div className="flex items-center gap-4">
              <Link to="/account/messages" className="w-fit">
                <div className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors cursor-pointer">
                  <ArrowLeft className="text-[#e1a95f]" size={20} />
                </div>
              </Link>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e1a95f] to-[#d4953f] rounded-2xl flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="font-bold text-[#1f3b73] text-lg">Support Team</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Online • Typically replies in minutes
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors">
                <Phone className="text-[#1f3b73]" size={20} />
              </button>
              <button className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors">
                <Video className="text-[#1f3b73]" size={20} />
              </button>
              <button className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors">
                <Search className="text-[#1f3b73]" size={20} />
              </button>
              <button className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors">
                <MoreVertical className="text-[#1f3b73]" size={20} />
              </button>
            </div>
          </div>

          {/* Enhanced Chat Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-[#f4f2ed]/20 to-[#f4f2ed]/40">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#e1a95f] to-[#d4953f] text-white rounded-br-md transform hover:scale-[1.02]"
                      : "bg-white text-[#1f3b73] rounded-bl-md border border-[#e1a95f]/10 transform hover:scale-[1.02]"
                  }`}
                >
                  <div className="leading-relaxed">{msg.text}</div>
                  <div className="flex items-center justify-end gap-1 mt-2">
                    <div className={`text-xs opacity-70 ${msg.sender === "user" ? "text-white/80" : "text-[#1f3b73]/60"}`}>
                      {msg.time}
                    </div>
                    {msg.sender === "user" && (
                      <MessageStatus status={msg.status} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Chat Input */}
          <div className="p-4 border-t border-[#e1a95f]/20 bg-white">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-[#e1a95f]/30 bg-[#f4f2ed]/50 focus-within:border-[#e1a95f] focus-within:bg-white transition-all duration-300">
                  <button
                    type="button"
                    className="p-1 hover:bg-[#e1a95f]/10 rounded-lg transition-colors"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="text-[#e1a95f]" size={18} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none text-[#1f3b73] placeholder:text-[#1f3b73]/50 text-base"
                  />
                  <button
                    type="button"
                    className="p-1 hover:bg-[#e1a95f]/10 rounded-lg transition-colors"
                  >
                    <Paperclip className="text-[#e1a95f]" size={18} />
                  </button>
                </div>
                
                {/* Emoji Picker Placeholder */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-2 p-4 bg-white border border-[#e1a95f]/20 rounded-2xl shadow-2xl">
                    <div className="grid grid-cols-8 gap-2">
                      {['😊', '😂', '😍', '🤔', '😢', '😮', '👍', '❤️', '🎉', '🔥', '💯', '🙏', '😎', '🚀', '💪', '✨'].map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          className="text-xl hover:bg-[#f4f2ed] p-2 rounded-lg transition-colors"
                          onClick={() => {
                            setInput(prev => prev + emoji);
                            setShowEmojiPicker(false);
                            inputRef.current?.focus();
                          }}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Voice/Send Button */}
              {input.trim() ? (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#e1a95f] to-[#d4953f] hover:from-[#d4953f] hover:to-[#c8874b] text-white rounded-2xl p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              ) : (
                <button
                  type="button"
                  className={`rounded-2xl p-3 transition-all duration-300 ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                      : "bg-[#e1a95f] hover:bg-[#d4953f] text-white"
                  } shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`}
                  onClick={() => setIsRecording(!isRecording)}
                  aria-label={isRecording ? "Stop recording" : "Start voice message"}
                >
                  <Mic size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto w-full mt-4 flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f4f2ed] border border-[#e1a95f]/20 rounded-2xl text-[#1f3b73] transition-all duration-300 hover:shadow-lg">
            <span className="text-sm font-medium">📋 Order Status</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f4f2ed] border border-[#e1a95f]/20 rounded-2xl text-[#1f3b73] transition-all duration-300 hover:shadow-lg">
            <span className="text-sm font-medium">🚚 Track Package</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#f4f2ed] border border-[#e1a95f]/20 rounded-2xl text-[#1f3b73] transition-all duration-300 hover:shadow-lg">
            <span className="text-sm font-medium">💬 FAQ</span>
          </button>
        </div>
      </div>
    </div>
  );
}