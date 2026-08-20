import { useState } from 'react';
import { QUOTES } from '../data/initialData';

export default function QuoteCard() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = QUOTES[quoteIndex % QUOTES.length];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div
      id="quote-card"
      onClick={handleNextQuote}
      className="bg-[#e7f1fb] rounded-2xl py-3.5 px-4 text-center cursor-pointer transition-all hover:bg-[#dbeafe] shadow-sm select-none"
      title="Nhấn để đổi danh ngôn truyền cảm hứng"
    >
      <p className="text-xs sm:text-sm italic text-gray-800 font-serif leading-relaxed">
        "{currentQuote.text}"
      </p>
      <p className="text-xs text-gray-700 font-medium mt-1">
        - {currentQuote.author}
      </p>
    </div>
  );
}
