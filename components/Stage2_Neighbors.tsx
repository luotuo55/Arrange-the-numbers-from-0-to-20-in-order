import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const Stage2_Neighbors: React.FC = () => {
  const [centerNum, setCenterNum] = useState(14);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleNumberChange = (delta: number) => {
    const newNum = centerNum + delta;
    // Limit range to 1-19 so neighbors stay within 0-20
    if (newNum >= 1 && newNum <= 19) {
      setCenterNum(newNum);
      setShowPrev(false); // Reset to question mark
      setShowNext(false); // Reset to question mark
    }
  };

  const prevNum = centerNum - 1;
  const nextNum = centerNum + 1;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl border-4 border-purple-200 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">谁是我的邻居？</h2>
        <p className="text-gray-500 mb-8">点击问号，找出住在 <span className="text-blue-600 font-bold text-xl">{centerNum}</span> 旁边的好朋友！</p>

        <div className="flex items-center justify-center gap-2 sm:gap-6">
          {/* Previous Number */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 font-bold mb-1">前一个数</span>
            <button 
              onClick={() => setShowPrev(true)}
              className={`
                w-20 h-24 sm:w-24 sm:h-32 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-md transition-all duration-500
                ${showPrev ? 'bg-purple-100 text-purple-600 rotate-0' : 'bg-gray-200 text-gray-400 rotate-6 hover:bg-gray-300'}
              `}
            >
              {showPrev ? prevNum : '?'}
            </button>
            <span className={`text-sm font-bold transition-opacity ${showPrev ? 'opacity-100 text-purple-600' : 'opacity-0'}`}>
              比{centerNum}小
            </span>
          </div>

          {/* Center Number with Controls */}
          <div className="flex flex-col items-center z-10 mx-2 sm:mx-4">
            <div className="relative flex items-center">
                {/* Decrease Button */}
                <button 
                    onClick={() => handleNumberChange(-1)}
                    disabled={centerNum <= 1}
                    className="p-2 mr-2 sm:mr-4 bg-white rounded-full shadow-md text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 transition-all hover:scale-110 active:scale-95"
                    aria-label="Decrease number"
                >
                    <ChevronLeft size={28} />
                </button>

                <div className="w-24 h-28 sm:w-32 sm:h-40 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-6xl font-bold shadow-xl transform scale-105 transition-all">
                  {centerNum}
                </div>

                {/* Increase Button */}
                <button 
                    onClick={() => handleNumberChange(1)}
                    disabled={centerNum >= 19}
                    className="p-2 ml-2 sm:ml-4 bg-white rounded-full shadow-md text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 transition-all hover:scale-110 active:scale-95"
                    aria-label="Increase number"
                >
                    <ChevronRight size={28} />
                </button>
            </div>
            
            <div className="mt-4 bg-blue-50 px-3 py-1 rounded-full text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1">
               点箭头换个数字试试
            </div>
          </div>

          {/* Next Number */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 font-bold mb-1">后一个数</span>
            <button 
              onClick={() => setShowNext(true)}
              className={`
                w-20 h-24 sm:w-24 sm:h-32 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-md transition-all duration-500
                ${showNext ? 'bg-purple-100 text-purple-600 rotate-0' : 'bg-gray-200 text-gray-400 -rotate-6 hover:bg-gray-300'}
              `}
            >
              {showNext ? nextNum : '?'}
            </button>
             <span className={`text-sm font-bold transition-opacity ${showNext ? 'opacity-100 text-purple-600' : 'opacity-0'}`}>
              比{centerNum}大
            </span>
          </div>
        </div>

        {/* Concept Visualization */}
        <div className="mt-12 bg-gray-50 p-4 rounded-xl">
           <div className="flex items-center justify-between text-gray-600 font-medium text-sm sm:text-base">
             <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${showPrev ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-400'}`}>
                    {showPrev ? prevNum : '?'}
                </div>
                <ArrowLeft size={16} />
             </div>
             <div className="flex items-center gap-2 px-2 sm:px-4 py-1 bg-white rounded shadow-sm border border-gray-100">
                <Star className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>右边的总比左边大</span>
                <Star className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 fill-current" />
             </div>
             <div className="flex items-center gap-2">
                <ArrowRight size={16} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${showNext ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-400'}`}>
                    {showNext ? nextNum : '?'}
                </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};