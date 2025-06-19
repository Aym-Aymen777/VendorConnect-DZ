import { useState, useEffect } from 'react';

const FlashDealTimer = () => {
  // 72 hours from now
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => n.toString().padStart(2, '0');
  const hours = pad(Math.floor(timeLeft / 3600));
  const minutes = pad(Math.floor((timeLeft % 3600) / 60));
  const seconds = pad(timeLeft % 60);

  return (
    <span className="flex items-center gap-2 bg-transparent text-red-600 px-4 py-1 rounded-full text-2xl font-semibold ">
      <svg className="w-4 h-4 mr-1 text-[#e1a95f]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#e1a95f" strokeWidth="2" />
        <path stroke="#e1a95f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
      {hours}:{minutes}:{seconds}
    </span>
  );
};

export default FlashDealTimer;