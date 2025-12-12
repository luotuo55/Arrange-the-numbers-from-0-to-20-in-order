import React, { useState } from 'react';
import { Stage } from './types';
import { Stage1_Ordering } from './components/Stage1_Ordering';
import { Stage2_Neighbors } from './components/Stage2_Neighbors';
import { Stage3_Ruler } from './components/Stage3_Ruler';
import { Stage4_Practice } from './components/Stage4_Practice';
import { Home, Users, Ruler, PenTool, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.Intro);

  const renderStage = () => {
    switch (currentStage) {
      case Stage.Intro:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8 animate-fade-in">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 drop-shadow-sm">
              数序与大小
            </h1>
            <p className="text-2xl text-gray-600 font-medium">玩转 0 - 20</p>
            <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center text-6xl shadow-xl animate-bounce">
              🔢
            </div>
            <button 
              onClick={() => setCurrentStage(Stage.Ordering)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl font-bold shadow-lg transform transition hover:scale-105 flex items-center gap-2"
            >
              开始上课 <ArrowRight />
            </button>
          </div>
        );
      case Stage.Ordering:
        return <Stage1_Ordering />;
      case Stage.Neighbors:
        return <Stage2_Neighbors />;
      case Stage.Ruler:
        return <Stage3_Ruler />;
      case Stage.Practice:
        return <Stage4_Practice />;
      default:
        return <div>Unknown Stage</div>;
    }
  };

  const navItems = [
    { id: Stage.Ordering, label: '排排队', icon: <Users size={20} />, color: 'bg-yellow-500' },
    { id: Stage.Neighbors, label: '比大小', icon: <Home size={20} />, color: 'bg-purple-500' },
    { id: Stage.Ruler, label: '看尺子', icon: <Ruler size={20} />, color: 'bg-blue-500' },
    { id: Stage.Practice, label: '做一做', icon: <PenTool size={20} />, color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Bar */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div 
            className="text-lg font-bold flex items-center gap-2 cursor-pointer text-gray-700"
            onClick={() => setCurrentStage(Stage.Intro)}
          >
            <span className="bg-blue-100 p-1 rounded">1️⃣</span> 数学一年级
          </div>
          <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            第78页
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-start py-8 w-full">
        {renderStage()}
      </main>

      {/* Bottom Navigation (Sticky) */}
      {currentStage !== Stage.Intro && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 pb-safe">
          <div className="max-w-xl mx-auto flex justify-around p-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentStage(item.id)}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl w-16 sm:w-20 transition-all duration-200
                  ${currentStage === item.id ? 'bg-gray-100 scale-105' : 'opacity-70 hover:opacity-100'}
                `}
              >
                <div className={`p-2 rounded-full text-white shadow-sm ${item.color} mb-1`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-bold ${currentStage === item.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      )}
       <style>{`
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default App;