import React, { useState } from 'react';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';

export const Stage3_Ruler: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string>('点击刻度上的数字，看看它离谁更近？');

  // Hardcoded problems to simulate the "questions" from the book
  const problems = [12, 18, 15];

  const handleNumberSelect = (num: number) => {
    setTargetNumber(num);
    
    const distTo10 = Math.abs(num - 10);
    const distTo20 = Math.abs(num - 20);

    let text = "";
    if (distTo10 < distTo20) {
      text = `${num} 离 10 只需要走 ${distTo10} 步，离 20 要走 ${distTo20} 步。所以它更接近 10。`;
    } else if (distTo20 < distTo10) {
      text = `${num} 离 20 只需要走 ${distTo20} 步，离 10 要走 ${distTo10} 步。所以它更接近 20。`;
    } else {
      text = `${num} 在 10 和 20 的正中间！距离都是 ${distTo10} 步。`;
    }
    setExplanation(text);
  };

  const getArcPath = (start: number, end: number, height: number, color: string) => {
    // Basic SVG arc path
    // Assuming each unit is 40px wide + gap
    const startX = start * 40 + 20; 
    const endX = end * 40 + 20;
    const midX = (startX + endX) / 2;
    // M startX 50 Q midX (50-height) endX 50
    // Adjust y=60 as baseline
    return (
        <path 
            d={`M ${startX} 60 Q ${midX} ${60 - height} ${endX} 60`} 
            fill="none" 
            stroke={color} 
            strokeWidth="3" 
            strokeDasharray="4"
            className="animate-[dash_1s_linear_infinite]"
        />
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-2">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
           📏 数学好帮手：尺子
        </h2>
        
        <div className="bg-blue-50 p-4 rounded-lg text-center text-lg font-medium text-blue-800 mb-6 min-h-[4rem] flex items-center justify-center">
            {explanation}
        </div>

        {/* Ruler Container - Scrollable on mobile */}
        <div className="overflow-x-auto pb-8 no-scrollbar w-full">
            <div className="relative min-w-[850px] h-40 pt-10 select-none">
                {/* Visual Arcs */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <style>{`
                        @keyframes dash {
                            to { stroke-dashoffset: -8; }
                        }
                    `}</style>
                    {targetNumber !== null && (
                        <>
                            {/* Arc to 10 */}
                            {getArcPath(Math.min(10, targetNumber), Math.max(10, targetNumber), Math.abs(10-targetNumber)*10 + 20, '#ef4444')}
                            {/* Arc to 20 */}
                            {getArcPath(Math.min(20, targetNumber), Math.max(20, targetNumber), Math.abs(20-targetNumber)*10 + 20, '#3b82f6')}
                        </>
                    )}
                </svg>

                {/* Ruler Body */}
                <div className="absolute top-[60px] left-0 right-0 h-16 bg-yellow-100 border-2 border-yellow-600 rounded-lg flex items-end px-[20px]">
                    {Array.from({ length: 21 }).map((_, i) => (
                        <div key={i} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${i * 40 + 20}px`, transform: 'translateX(-50%)' }}>
                            {/* Tick Marks */}
                            <div className={`w-1 bg-gray-600 ${i % 5 === 0 ? 'h-8' : 'h-4'}`}></div>
                            {/* Numbers */}
                            <button 
                                onClick={() => handleNumberSelect(i)}
                                className={`
                                    mt-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                    ${i === targetNumber ? 'bg-green-500 text-white scale-125 z-10' : 'text-gray-700 hover:bg-gray-200'}
                                    ${(i === 10 || i === 20) ? 'text-red-600 text-lg' : ''}
                                `}
                            >
                                {i}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Challenge Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {problems.map(num => (
           <button
             key={num}
             onClick={() => handleNumberSelect(num)}
             className={`
                p-4 rounded-xl border-2 flex items-center justify-between shadow-sm hover:shadow-md transition-all
                ${targetNumber === num ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}
             `}
           >
             <div className="flex flex-col text-left">
                <span className="text-gray-500 text-xs font-bold">挑战</span>
                <span className="text-xl font-bold text-gray-800">{num}</span>
             </div>
             <div className="text-right text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <span className="text-red-500 font-bold">10</span>
                    <ArrowLeftRight size={12} />
                    <span className="text-blue-500 font-bold">20</span>
                </div>
                谁更近?
             </div>
           </button>
        ))}
      </div>

    </div>
  );
};