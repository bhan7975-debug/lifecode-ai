"use client";
import { useState } from "react";
import { Sparkles, Hexagon, Component, Layers, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [syncRate, setSyncRate] = useState(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [showAd, setShowAd] = useState(false);

  // 로또 번호 추출 및 동기화 애니메이션 로직
  const handleGenerate = () => {
    setIsGenerating(true);
    setSyncRate(0);
    setNumbers([]);
    setShowAd(false);

    let currentSync = 0;
    const interval = setInterval(() => {
      currentSync += Math.floor(Math.random() * 15) + 5; // 5~20 사이 난수 증가
      if (currentSync >= 100) {
        currentSync = 100;
        clearInterval(interval);
        setIsGenerating(false);
        
        // 1~45 중복 없는 난수 6개 추출
        const nums = new Set<number>();
        while(nums.size < 6) {
          nums.add(Math.floor(Math.random() * 45) + 1);
        }
        setNumbers(Array.from(nums).sort((a, b) => a - b));
        setShowAd(true); // 광고 슬롯 노출 트리거
      }
      setSyncRate(currentSync);
    }, 150); // 0.15초마다 갱신
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            LifeCode AI
          </h1>
          <p className="text-neutral-400 text-lg">데이터로 설계하는 당신의 내일</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="#" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition-all duration-300">
            <Sparkles className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">사주 명리 분석</h2>
            <p className="text-neutral-500">통계적 기질과 다가오는 기회의 타이밍을 확인하세요.</p>
          </Link>

          <Link href="#" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition-all duration-300">
            <Hexagon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">에니어그램 진단</h2>
            <p className="text-neutral-500">9가지 성격 유형을 통해 내면의 동기와 강점을 파악하세요.</p>
          </Link>

          <Link href="#" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300">
            <Component className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">도형 심리 상담</h2>
            <p className="text-neutral-500">무의식적인 선택으로 현재의 결핍과 필요를 진단합니다.</p>
          </Link>

          <Link href="#" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300">
            <Layers className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">타로 심리 분석</h2>
            <p className="text-neutral-500">직관적인 상징을 통해 당면한 문제의 돌파구를 찾습니다.</p>
          </Link>
        </div>

        {/* 로또 번호 추출 모듈 */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* 장식용 배경 이펙트 */}
          <div className="absolute inset-0 bg-cyan-900/10 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>

          <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-bold text-cyan-400">우주적 타이밍 동기화</h3>
            <p className="text-sm text-neutral-400">당신의 현재 기운과 알고리즘을 결합하여 최적의 번호를 추출합니다.</p>
          </div>

          <div className="relative z-10 min-h-[120px] flex flex-col items-center justify-center">
            {isGenerating ? (
              <div className="space-y-4 w-full max-w-xs">
                <div className="flex justify-between text-cyan-400 font-mono text-sm">
                  <span>Data Sync...</span>
                  <span>{syncRate}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-cyan-500 h-2 transition-all duration-150" style={{ width: `${syncRate}%` }}></div>
                </div>
              </div>
            ) : numbers.length > 0 ? (
              <div className="flex gap-2 justify-center flex-wrap">
                {numbers.map((num, idx) => (
                  <div key={idx} className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-xl font-bold text-cyan-300 shadow-[0_0_15px_rgba(8,145,178,0.3)]">
                    {num}
                  </div>
                ))}
              </div>
            ) : (
              <button onClick={handleGenerate} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                행운 번호 추출 시작
              </button>
            )}
          </div>

          {/* 애드센스 광고 노출 영역 (번호 추출 후 렌더링) */}
          {showAd && (
            <div className="relative z-10 mt-6 pt-6 border-t border-neutral-800 animate-in fade-in duration-700">
              <span className="text-[10px] text-neutral-600 block mb-2">Advertisement</span>
              <div className="w-full h-24 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center text-neutral-500 text-sm">
                [ 구글 애드센스 인피드/디스플레이 배너 삽입 영역 ]
              </div>
              <button onClick={handleGenerate} className="mt-4 text-sm text-cyan-500 hover:text-cyan-400 underline underline-offset-4">
                번호 다시 추출하기
              </button>
            </div>
          )}
        </div>

        <footer className="pt-12 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-600 leading-relaxed">
            본 웹페이지는 사주학적 통계와 현대 심리학 데이터를 기반으로 한 라이프 데이터 분석 도구입니다.<br/>
            제공되는 모든 리포트와 분석 멘트는 이용자의 자기계발과 영감을 돕기 위한 재미 및 참고용으로 구성되었습니다.<br/>
            특정 종교와 무관하며, 당신의 잠재력을 발견하는 즐거운 여정으로 활용하시기 바랍니다.
          </p>
        </footer>
      </div>
    </main>
  );
}