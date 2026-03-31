"use client";
import { useState } from "react";
import { Sparkles, Hexagon, Component, Layers, RefreshCw, ChevronRight, Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generateLotto = () => {
    setIsLoading(true);
    setTimeout(() => {
      const nums = new Set<number>();
      while(nums.size < 6) nums.add(Math.floor(Math.random() * 45) + 1);
      setNumbers(Array.from(nums).sort((a, b) => a - b));
      setIsLoading(false);
    }, 1000);
  };

  const menuItems = [
    { id: 'saju', title: '사주 명리 분석', icon: <Sparkles className="w-12 h-12" />, desc: '선천적 기질과 시간의 흐름 데이터를 정밀하게 해독합니다.' },
    { id: 'enneagram', title: '에니어그램 진단', icon: <Hexagon className="w-12 h-12" />, desc: '내면 동기와 성격적 고착 패턴을 분석합니다.' },
    { id: 'shape', title: '도형 심리 상담', icon: <Component className="w-12 h-12" />, desc: '무의식적 투영을 통한 현재 심리를 진단합니다.' },
    { id: 'tarot', title: '타로 심리 분석', icon: <Layers className="w-12 h-12" />, desc: '상징 체계와 동시성 기반의 해법을 도출합니다.' }
  ];

  return (
    <main className="min-h-screen bg-transparent text-white">
      {/* 고정 네비게이션 */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-5 flex justify-between items-center">
        <span className="text-2xl font-black italic text-gold tracking-tighter drop-shadow-[0_0_10px_rgba(207,163,86,0.3)]">LifeCode AI</span>
        <div className="p-3 bg-zinc-900 rounded-full text-zinc-500">
          <HomeIcon className="w-6 h-6" />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-48 pb-24 space-y-16 md:space-y-24 flex flex-col items-center">
        
        <header className="text-center space-y-6">
          <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter text-gold">LifeCode AI</h1>
          <p className="text-zinc-500 text-lg md:text-xl font-light tracking-[0.4em] uppercase border-y border-zinc-900 py-4 w-full max-w-lg">Premium Analysis System</p>
        </header>

        {/* 2x2 그리드: 모바일 가독성 최적화 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {menuItems.map((m) => (
            <Link key={m.id} href={`/test/${m.id}`} className="group p-10 md:p-14 rounded-[40px] md:rounded-[60px] luxury-card cursor-pointer">
              <div className="mb-8 md:mb-10 text-[#CFA356] group-hover:scale-110 transition-transform duration-500">{m.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gold group-hover:brightness-125 transition-all">{m.title}</h2>
              <p className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed mb-8 md:mb-10 break-keep max-w-xs">{m.desc}</p>
              <div className="mt-auto flex items-center gap-2 text-[#CFA356] font-bold tracking-widest uppercase text-sm opacity-40 group-hover:opacity-100">
                Start Session <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 로또 섹션 */}
        <section className="luxury-card rounded-[40px] md:rounded-[60px] p-10 md:p-20 w-full max-w-5xl space-y-12 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-gold italic">Fortune Decoder</h3>
            <p className="text-zinc-500 text-lg md:text-xl font-light">에너지 주파수 기반 행운 번호</p>
          </div>
          
          <div className="flex flex-col items-center gap-14 relative z-10">
            <div className="min-h-[80px] flex items-center justify-center">
              {isLoading ? (
                <div className="flex items-center gap-4 text-[#CFA356] font-mono tracking-widest text-xl md:text-2xl animate-pulse">
                  <RefreshCw className="w-8 h-8 animate-spin" /> SYNCHRONIZING
                </div>
              ) : numbers.length > 0 ? (
                <div className="flex gap-4 flex-wrap justify-center">
                  {numbers.map((n, index) => (
                    <div 
                      key={`${n}-${index}`} 
                      className="w-14 h-14 md:w-18 md:h-18 rounded-2xl md:rounded-3xl bg-zinc-950 border-2 border-[#CFA356]/40 flex items-center justify-center font-black text-2xl md:text-4xl text-[#CFA356] shadow-[0_0_30px_rgba(207,163,86,0.3)] animate-number-pop"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-shimmer-text text-xl md:text-2xl tracking-[0.5em] uppercase font-light border-b border-zinc-900 pb-2">Awaiting Calibration</div>
              )}
            </div>
            
            <button onClick={generateLotto} className="px-12 md:px-20 py-5 md:py-7 bg-gradient-to-r from-[#f1d592] to-[#CFA356] text-black font-black text-xl md:text-2xl rounded-2xl md:rounded-3xl hover:shadow-[0_0_40px_rgba(207,163,86,0.4)] active:scale-95 transition-all">
              EXTRACT NUMBERS
            </button>
          </div>
        </section>

        <footer className="text-center pt-10 text-[10px] text-zinc-800 tracking-[0.6em] font-mono uppercase w-full max-w-5xl border-t border-zinc-900">
          © 2026 lifecode ai / premium analysis suite
        </footer>
      </div>
    </main>
  );
}