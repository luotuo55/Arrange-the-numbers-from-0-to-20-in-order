import React, { useState, useEffect } from 'react';
import { MISSING_NUMBERS_GAME } from '../constants';
import { CheckCircle, HelpCircle } from 'lucide-react';

export const Stage1_Ordering: React.FC = () => {
  const [items, setItems] = useState(MISSING_NUMBERS_GAME);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("数字宝宝迟到了，帮它们排排队！");

  // Dynamically generate options from the missing items in the game configuration
  // Shuffle them once on component mount so they appear in random order
  const [options] = useState<number[]>(() => {
    return MISSING_NUMBERS_GAME
      .filter(item => item.isMissing)
      .map(item => item.display)
      .sort(() => Math.random() - 0.5);
  });

  const handleOptionClick = (num: number) => {
    if (isComplete) return;
    setSelectedNumber(num);
    setMessage(`你选择了 ${num}，把它放到正确的位置吧！`);
  };

  const handleSlotClick = (index: number, correctVal: number) => {
    if (selectedNumber === null) {
      setMessage("请先点击下方的数字卡片！");
      return;
    }

    if (selectedNumber === correctVal) {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], isMissing: false };
      setItems(newItems);
      setSelectedNumber(null);
      setMessage("太棒了！放对了！");
    } else {
      setMessage("哎呀，位置不对哦，再试一次！");
    }
  };

  useEffect(() => {
    if (items.every(i => !i.isMissing)) {
      setIsComplete(true);
      setMessage("恭喜你！队伍排整齐啦！我们一起读一遍！");
    }
  }, [items]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full border-4 border-yellow-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4 flex items-center justify-center gap-2">
          <span className="text-4xl">🏃</span> 数字宝宝排队
        </h2>
        
        <p className="text-center text-lg text-blue-600 font-medium mb-6 bg-blue-50 p-2 rounded-lg">
          {message}
        </p>

        {/* The Queue */}
        <div className="flex flex-wrap gap-2 justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => item.isMissing ? handleSlotClick(index, item.display) : null}
              className={`
                w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 
                flex items-center justify-center 
                rounded-lg text-xl sm:text-2xl font-bold shadow-sm transition-all duration-300
                ${item.isMissing 
                  ? 'bg-gray-200 border-2 border-dashed border-gray-400 cursor-pointer hover:bg-yellow-100' 
                  : 'bg-yellow-400 text-white border-b-4 border-yellow-600'}
              `}
            >
              {item.isMissing ? <HelpCircle className="text-gray-400 w-6 h-6" /> : item.display}
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      {!isComplete && (
        <div className="flex flex-wrap gap-3 sm:gap-6 mt-8 justify-center max-w-4xl">
          {options.map((num) => {
            // Check if this number is already placed
            const isPlaced = items.find(i => i.display === num && !i.isMissing);
            if (isPlaced) return null;

            return (
              <button
                key={num}
                onClick={() => handleOptionClick(num)}
                className={`
                  w-14 h-18 sm:w-20 sm:h-24 
                  rounded-xl text-2xl sm:text-3xl font-bold shadow-lg transform transition-transform hover:scale-110 active:scale-95
                  flex flex-col items-center justify-center
                  ${selectedNumber === num 
                    ? 'bg-blue-500 text-white ring-4 ring-blue-300 scale-110' 
                    : 'bg-white text-blue-600 border-2 border-blue-100'}
                `}
              >
                {num}
                <span className="text-[10px] sm:text-xs font-normal mt-1">我是{num}</span>
              </button>
            );
          })}
        </div>
      )}

      {isComplete && (
        <div className="animate-bounce bg-green-100 text-green-700 px-6 py-3 rounded-full text-xl font-bold flex items-center gap-2">
          <CheckCircle /> 任务完成！
        </div>
      )}
    </div>
  );
};
