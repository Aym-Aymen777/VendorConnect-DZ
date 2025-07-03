import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  User,
  ArrowLeft,
  MoreVertical,
  Smile,
  CheckCheck,
  Check,
  Shield,
  AlertTriangle,
} from "lucide-react";
import Header from "../components/common/Header";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";

// Security utility functions
const sanitizeHTML = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const validateMessage = (message) => {
  if (!message || typeof message !== "string") return false;
  if (message.length > 5000) return false; // Max message length
  if (message.trim().length === 0) return false;
  return true;
};

const isValidChatParticipant = (user, chatInfo) => {
  if (!user || !chatInfo) return false;

  // Check if user is either sender or receiver
  const isParticipant =
    chatInfo.sender?._id === user._id || chatInfo.receiver?._id === user._id;

  return isParticipant;
};

const rateLimit = {
  messages: [],
  isRateLimited: function () {
    const now = Date.now();
    const oneMinute = 60 * 1000;

    // Remove messages older than 1 minute
    this.messages = this.messages.filter((time) => now - time < oneMinute);

    // Allow max 30 messages per minute
    if (this.messages.length >= 30) {
      return true;
    }

    this.messages.push(now);
    return false;
  },
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastMessageTime = useRef(0);

  const { id: chatId } = useParams();
  const { user } = useAuthStore();

  // Validate chat ID format
  const isValidChatId = useCallback((id) => {
    if (!id) return false;
    // MongoDB ObjectId validation (24 hex characters)
    return /^[0-9a-fA-F]{24}$/.test(id);
  }, []);

  // Get the other participant in the chat
  const getOtherParticipant = useCallback((chatInfo, currentUserId) => {
    if (!chatInfo || !currentUserId) return null;

    if (chatInfo.sender?._id === currentUserId) {
      return chatInfo.receiver;
    } else if (chatInfo.receiver?._id === currentUserId) {
      return chatInfo.sender;
    }
    return null;
  }, []);

  // Secure message formatting
  const formatMessage = useCallback((msg, currentUserId) => {
    if (!msg || !currentUserId) return null;

    return {
      id: msg._id,
      sender: msg.sender._id === currentUserId ? "user" : "support",
      text: sanitizeHTML(msg.message || ""),
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: msg.seen ? "read" : "delivered",
      type: "text",
      senderId: msg.sender._id,
      createdAt: msg.createdAt,
    };
  }, []);

  // Auto-scroll with security check
  useEffect(() => {
    const scrollContainer = document.getElementById("message-scroll-container");
    if (!scrollContainer || !isAuthorized) return;

    const isNearBottom =
      scrollContainer.scrollHeight -
        scrollContainer.scrollTop -
        scrollContainer.clientHeight <
      100;

    if (!isNearBottom) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, isAuthorized]);

  // Secure chat loading with authorization
  useEffect(() => {
    const getChatDetails = async () => {
      try {
        setIsLoading(true);
        setConnectionStatus("connecting");

        // Validate chat ID
        if (!isValidChatId(chatId)) {
          toast.error("Invalid chat ID");
          setConnectionStatus("error");
          return;
        }

        // Validate user authentication
        if (!user?._id) {
          toast.error("Please log in to access this chat");
          setConnectionStatus("error");
          return;
        }

        const res = await axios.get(`/api/v1/chat/details/${chatId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        const chatData = res.data;

        // Verify user is participant in this chat
        if (!isValidChatParticipant(user, chatData)) {
          toast.error("You are not authorized to access this chat");
          setConnectionStatus("unauthorized");
          return;
        }

        setChatInfo(chatData);
        setIsAuthorized(true);
        setConnectionStatus("connected");

        // Format messages securely
        const formattedMessages =
          chatData.messages
            ?.map((msg) => formatMessage(msg, user._id))
            .filter((msg) => msg !== null) || [];

        setMessages(formattedMessages);
      } catch (err) {
        console.error("Failed to fetch chat:", err);

        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          setConnectionStatus("unauthorized");
        } else if (err.response?.status === 403) {
          toast.error("Access denied to this chat");
          setConnectionStatus("unauthorized");
        } else if (err.response?.status === 404) {
          toast.error("Chat not found");
          setConnectionStatus("error");
        } else {
          toast.error("Failed to load chat");
          setConnectionStatus("error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (chatId && user?._id) {
      getChatDetails();
    }
  }, [chatId, user, isValidChatId, formatMessage]);

  // Secure typing indicator
  useEffect(() => {
    if (!isAuthorized) return;

    if (
      messages.length > 0 &&
      messages[messages.length - 1]?.sender === "user"
    ) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages, isAuthorized]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!isAuthorized) {
      toast.error("Not authorized to send messages");
      return;
    }

    if (sendingMessage) return;

    const messageText = input.trim();

    // Validate message
    if (!validateMessage(messageText)) {
      toast.error("Please enter a valid message (max 5000 characters)");
      return;
    }

    // Rate limiting
    if (rateLimit.isRateLimited()) {
      toast.error("Too many messages. Please wait a moment.");
      return;
    }

    // Prevent message flooding
    const now = Date.now();
    if (now - lastMessageTime.current < 1000) {
      toast.error("Please wait before sending another message");
      return;
    }
    lastMessageTime.current = now;

    // Get the other participant (receiver)
    const otherParticipant = getOtherParticipant(chatInfo, user._id);
    if (!otherParticipant) {
      toast.error("Unable to identify message recipient");
      return;
    }

    setSendingMessage(true);
    const tempId = `temp_${Date.now()}_${Math.random()}`;

    // Add temporary message with sanitized content
    const tempMessage = {
      id: tempId,
      sender: "user",
      text: sanitizeHTML(messageText),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sending",
      type: "text",
      senderId: user._id,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInput("");

    try {
      const res = await axios.post(
        `/api/v1/chat/send`,
        {
          chatId: chatId, // Include chatId to identify the chat
          receiverId: otherParticipant._id, // Send to the other participant
          type: chatInfo.type || "supplier", // Use the chat type
          message: messageText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const savedMessage = res.data.data?.newMessage || res.data;

      // Update the temporary message with the real message data
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...msg,
                id: savedMessage._id || savedMessage.id,
                status: "delivered",
                time: new Date(
                  savedMessage.createdAt || Date.now()
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                createdAt: savedMessage.createdAt,
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Message sending failed:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please refresh the page.");
        setIsAuthorized(false);
      } else if (error.response?.status === 403) {
        toast.error("Not authorized to send messages in this chat");
      } else {
        toast.error("Failed to send message. Please try again.");
      }

      // Remove failed message
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setInput(messageText); // Restore input
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const MessageStatus = ({ status }) => {
    switch (status) {
      case "sending":
        return (
          <div className="w-3 h-3 border border-white/50 border-t-transparent rounded-full animate-spin"></div>
        );
      case "sent":
        return <Check size={12} className="text-white/70" />;
      case "delivered":
        return <CheckCheck size={12} className="text-white/70" />;
      case "read":
        return <CheckCheck size={12} className="text-blue-400" />;
      case "failed":
        return <AlertTriangle size={12} className="text-red-400" />;
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
            <div
              className="w-2 h-2 bg-[#e1a95f] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}></div>
            <div
              className="w-2 h-2 bg-[#e1a95f] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}></div>
          </div>
          <span className="text-xs text-[#1f3b73]/60 ml-2">
            {getOtherParticipant(chatInfo, user?._id)?.name || "Other user"} is
            typing...
          </span>
        </div>
      </div>
    </div>
  );

  const ConnectionStatus = () => {
    const statusConfig = {
      connecting: {
        color: "text-yellow-600",
        icon: "⏳",
        text: "Connecting...",
      },
      connected: {
        color: "text-green-600",
        icon: "🔒",
        text: "Secure Connection",
      },
      unauthorized: { color: "text-red-600", icon: "🚫", text: "Unauthorized" },
      error: { color: "text-red-600", icon: "⚠️", text: "Connection Error" },
    };

    const status = statusConfig[connectionStatus] || statusConfig.error;

    return (
      <div className={`flex items-center gap-1 text-sm ${status.color}`}>
        <span>{status.icon}</span>
        <span>{status.text}</span>
      </div>
    );
  };

  // Get the other participant for display
  const otherParticipant = getOtherParticipant(chatInfo, user?._id);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex flex-col flex-1 items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#e1a95f]"></div>
          <p className="mt-4 text-[#1f3b73]">Loading secure chat...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#f4f2ed] flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex flex-col flex-1 items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-[#1f3b73] mb-2">
              Access Denied
            </h2>
            <p className="text-[#1f3b73]/70 mb-4">
              You are not authorized to access this chat.
            </p>
            <Link
              to="/account/messages"
              className="bg-[#e1a95f] text-white px-6 py-2 rounded-lg hover:bg-[#d4953f] transition-colors">
              Back to Messages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f2ed] flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col flex-1">
        <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl border border-[#1f3b73]/10 flex flex-col h-[80vh] overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#e1a95f]/20 bg-gradient-to-r from-white to-[#f4f2ed]/30">
            <div className="flex items-center gap-4">
              <Link to="/account/messages" className="w-fit">
                <div className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors cursor-pointer">
                  <ArrowLeft className="text-[#e1a95f]" size={20} />
                </div>
              </Link>
              <div className="relative">
                {otherParticipant?.profile?.avatar ? (
                  <img
                    src={otherParticipant.profile.avatar}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-[#e1a95f] rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                )}
                <div className="absolute -bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="font-bold text-[#1f3b73] text-lg">
                  {sanitizeHTML(
                    otherParticipant?.name ||
                      otherParticipant?.username ||
                      "Anonymous"
                  )}
                </div>
                <ConnectionStatus />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center  gap-1 text-sm text-[#1f3b73]/60">
                <Shield size={16} className="text-green-600" />
                <span>End-to-end secured</span>
              </div>
              <button className="p-2 hover:bg-[#f4f2ed] rounded-xl transition-colors">
                <MoreVertical className="text-[#1f3b73]" size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            id="message-scroll-container"
            className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-[#f4f2ed]/20 to-[#f4f2ed]/40">
            {messages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex w-full ${
                    isUser ? "justify-end" : "justify-start"
                  } my-2 animate-in slide-in-from-bottom-2 duration-300`}
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <div
                    className={`flex items-end gap-2 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}>
                    {/* Optional: Receiver Avatar */}
                    {!isUser && (
                      <img
                        src={otherParticipant.profile.avatar || "/default-avatar.png"} // optional avatar
                        alt="Avatar"
                        className="w-8 h-8 rounded-full border border-[#e1a95f]/30"
                      />
                    )}

                    <div
                      className={`max-w-[75%] text-wrap px-5 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] ${
                        isUser
                          ? "bg-gradient-to-r from-[#e1a95f] to-[#d4953f] text-white rounded-br-md"
                          : "bg-white text-[#1f3b73] rounded-bl-md border border-[#e1a95f]/10"
                      }`}>
                      <div
                        className="leading-relaxed max-w-[400px] break-words"
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />
                      <div
                        className={`flex items-center gap-1 mt-2 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}>
                        <div
                          className={`text-xs opacity-70 ${
                            isUser ? "text-white/80" : "text-[#1f3b73]/60"
                          }`}>
                          {msg.time}
                        </div>
                        {isUser && <MessageStatus status={msg.status} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#e1a95f]/20 bg-white">
            <form onSubmit={handleSend} className="flex items-end gap-3">
              <div className="flex-1 relative">
                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-[#e1a95f]/30 bg-[#f4f2ed]/50 focus-within:border-[#e1a95f] focus-within:bg-white transition-all duration-300">
                  <button
                    type="button"
                    className="p-1 hover:bg-[#e1a95f]/10 rounded-lg transition-colors"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    disabled={sendingMessage}>
                    <Smile className="text-[#e1a95f]" size={18} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none text-[#1f3b73] placeholder:text-[#1f3b73]/50 text-base"
                    disabled={sendingMessage}
                    maxLength={5000}
                  />
                  <div className="text-xs text-[#1f3b73]/40">
                    {input.length}/5000
                  </div>
                </div>
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-2 p-4 bg-white border border-[#e1a95f]/20 rounded-2xl shadow-2xl">
                    <div className="grid grid-cols-8 gap-2">
                      {[
                        "😊",
                        "😂",
                        "😍",
                        "🤔",
                        "😢",
                        "😮",
                        "👍",
                        "❤️",
                        "🎉",
                        "🔥",
                        "💯",
                        "🙏",
                        "😎",
                        "🚀",
                        "💪",
                        "✨",
                      ].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className="text-xl hover:bg-[#f4f2ed] p-2 rounded-lg transition-colors"
                          onClick={() => {
                            setInput((prev) => prev + emoji);
                            setShowEmojiPicker(false);
                            inputRef.current?.focus();
                          }}>
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || sendingMessage}
                className="bg-gradient-to-r from-[#e1a95f] to-[#d4953f] hover:from-[#d4953f] hover:to-[#c8874b] text-white rounded-2xl p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {sendingMessage ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
