import React, { useState, useEffect, useRef } from 'react';
import { ELEPHANT_POINTS } from '../constants';
import { Check, RefreshCw } from 'lucide-react';

export const Stage4_Practice: React.FC = () => {
  // --- Game 1: Connect Dots ---
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [completedDots, setCompletedDots] = useState<number[]>([]);
  
  const handleDotClick = (index: number) => {
    if (index === currentDotIndex) {
      setCompletedDots([...completedDots, index]);
      setCurrentDotIndex(index + 1);
    }
  };
  
  const resetDots = () => {
    setCurrentDotIndex(0);
    setCompletedDots([]);
  };

  const isElephantComplete = currentDotIndex >= ELEPHANT_POINTS.length;

  // --- Game 2: Sequence ---
  // Sequence 1: 11, _, 13, _, _, 16 (Ascending)
  // Sequence 2: 20, _, 18, _, _, 12 (Descending)
  const [seq1, setSeq1] = useState<{val: string, correct: number}[]>([
      {val: '11', correct: 11}, 
      {val: '', correct: 12}, 
      {val: '13', correct: 13}, 
      {val: '', correct: 14}, 
      {val: '', correct: 15}, 
      {val: '16', correct: 16}
  ]);
  const [seq2, setSeq2] = useState<{val: string, correct: number}[]>([
    {val: '20', correct: 20}, 
    {val: '', correct: 19}, 
    {val: '18', correct: 18}, 
    {val: '', correct: 17}, 
    {val: '', correct: 16},
    {val: '15', correct: 15}
  ]);

  const handleInput = (
    value: string, 
    idx: number, 
    seqState: typeof seq1, 
    setSeqState: React.Dispatch<React.SetStateAction<typeof seq1>>
  ) => {
    const newSeq = [...seqState];
    newSeq[idx].val = value;
    setSeqState(newSeq);
  };

  const checkSeq1 = seq1.every(item => parseInt(item.val) === item.correct);
  const checkSeq2 = seq2.every(item => parseInt(item.val) === item.correct);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      
      {/* Game 1: Connect Dots */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border-l-8 border-pink-400">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">1. 连线寻宝</h3>
            <button onClick={resetDots} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <RefreshCw size={20} className="text-gray-600"/>
            </button>
        </div>
        <div className="relative w-full h-[400px] bg-gray-50 rounded-xl border overflow-hidden touch-none">
           <svg className="absolute w-full h-full pointer-events-none">
              {/* Draw Lines */}
              <polyline 
                points={completedDots.map(idx => {
                    const p = ELEPHANT_POINTS[idx];
                    return `${p.x}%,${p.y}%`;
                }).join(' ')}
                fill="none"
                stroke="#ec4899"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
           </svg>
           
           {/* Draw Dots */}
           {ELEPHANT_POINTS.map((p, idx) => {
               const isNext = idx === currentDotIndex;
               const isDone = idx < currentDotIndex;
               return (
                   <div 
                     key={p.id}
                     onClick={() => handleDotClick(idx)}
                     className={`
                        absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer transition-all duration-300
                        ${isDone ? 'bg-pink-500 text-white scale-75' : ''}
                        ${isNext ? 'bg-yellow-400 text-black scale-110 animate-pulse ring-4 ring-yellow-200 z-10' : ''}
                        ${!isDone && !isNext ? 'bg-gray-300 text-gray-500' : ''}
                     `}
                     style={{ left: `${p.x}%`, top: `${p.y}%` }}
                   >
                       {p.id}
                   </div>
               );
           })}

           {isElephantComplete && (
               <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                   <div className="text-center animate-bounce">
                       <span className="text-6xl">🐘</span>
                       <h2 className="text-3xl font-bold text-pink-600 mt-2">是大象！</h2>
                   </div>
               </div>
           )}
        </div>
      </div>

      {/* Game 2: Sequence Filling */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border-l-8 border-green-400">
        <h3 className="text-xl font-bold text-gray-800 mb-6">2. 按顺序填数</h3>
        
        {/* Row 1 */}
        <div className="mb-6">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 no-scrollbar">
                {seq1.map((item, idx) => (
                    <input 
                        key={`s1-${idx}`}
                        type="number" 
                        value={item.val}
                        disabled={item.correct === 11 || item.correct === 13 || item.correct === 16} // Disable pre-filled
                        onChange={(e) => handleInput(e.target.value, idx, seq1, setSeq1)}
                        className={`
                            w-12 h-12 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-lg border-2
                            focus:outline-none focus:ring-2 focus:ring-green-300
                            ${parseInt(item.val) === item.correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-gray-300'}
                            ${(item.correct === 11 || item.correct === 13 || item.correct === 16) ? 'bg-gray-100 text-gray-500' : ''}
                        `}
                    />
                ))}
                {checkSeq1 && <Check className="text-green-500 w-10 h-10 self-center" />}
            </div>
        </div>

         {/* Row 2 (Reverse) */}
         <div className="mb-2">
            <p className="text-sm text-red-500 font-bold mb-2">注意：这是一个倒计时队伍哦！</p>
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 no-scrollbar">
                {seq2.map((item, idx) => (
                    <input 
                        key={`s2-${idx}`}
                        type="number" 
                        value={item.val}
                        disabled={item.correct === 20 || item.correct === 18 || item.correct === 15}
                        onChange={(e) => handleInput(e.target.value, idx, seq2, setSeq2)}
                        className={`
                            w-12 h-12 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-lg border-2
                            focus:outline-none focus:ring-2 focus:ring-green-300
                            ${parseInt(item.val) === item.correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-gray-300'}
                            ${(item.correct === 20 || item.correct === 18 || item.correct === 15) ? 'bg-gray-100 text-gray-500' : ''}
                        `}
                    />
                ))}
                 {checkSeq2 && <Check className="text-green-500 w-10 h-10 self-center" />}
            </div>
        </div>
      </div>

    </div>
  );
};