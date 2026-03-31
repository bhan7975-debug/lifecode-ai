"use client";
import { useState } from "react";
import { Lock, Brain, Compass, BookOpen, HeartPulse, TrendingUp } from "lucide-react";

// 가이드 데이터베이스 (이전의 SESSION_GUIDES 내용을 이곳으로 이동)
const GUIDE_DB: any = {
  enneagram: { /* 에니어그램 데이터 */ },
  saju: { /* 사주 데이터 */ },
  shape: { /* 도형 데이터 */ },
  tarot: { /* 타로 데이터 */ }
};

export default function SpecialistGuide({ type, value }: { type: string, value: string }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");

  const handleUnlock = () => {
    if (pin === "0000" || pin === "7777") setUnlocked(true);
    else alert("인가되지 않은 접근입니다.");
  };

  const guide = GUIDE_DB[type]?.[value];

  return (
    <div className="mt-20 border-t-2 border-dashed border-zinc-800 pt-10">
      {!unlocked ? (
        <div className="bg-[#111] p-10 rounded-[40px] text-center border border-zinc-800">
          <Lock className="w-10 h-10 text-[#CFA356] mx-auto mb-4" />
          <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">상담사 전용 영적 가이드</h3>
          <div className="flex gap-2 max-w-xs mx-auto">
            <input 
              type="password" 
              value={pin} 
              onChange={e=>setPin(e.target.value)}
              placeholder="PIN" 
              className="flex-1 bg-black border border-zinc-700 rounded-lg p-2 text-center"
            />
            <button onClick={handleUnlock} className="bg-[#CFA356] text-black px-4 py-2 rounded-lg font-bold">확인</button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
           <header className="flex items-center gap-3 text-[#CFA356]">
             <div className="p-2 bg-[#CFA356]/10 rounded-lg"><Compass /></div>
             <h3 className="text-2xl font-black italic uppercase">Specialist Insight: {value}</h3>
           </header>
           
           {/* 가이드 내용 출력부 (이전 설계와 동일) */}
           <div className="grid grid-cols-1 md:col-span-2 gap-6">
              <section className="bg-zinc-900/50 p-8 rounded-3xl border-l-4 border-[#CFA356]">
                <h4 className="text-[#CFA356] font-black text-[11px] uppercase flex items-center gap-2 mb-4"><Brain className="w-4 h-4"/> Information Interpretation</h4>
                <p className="text-zinc-300 leading-relaxed font-light">{guide?.analysis || "데이터를 준비 중입니다."}</p>
              </section>

              <section className="bg-white p-8 rounded-3xl text-black">
                <h4 className="text-zinc-400 font-black text-[11px] uppercase flex items-center gap-2 mb-4"><Compass className="w-4 h-4"/> Client Direct Script</h4>
                <p className="text-xl font-bold leading-snug">"{guide?.script || "준비된 스크립트가 없습니다."}"</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-zinc-800">
                  <BookOpen className="text-[#CFA356] mb-3" />
                  <p className="text-xs text-zinc-300">{guide?.prescription.gospel}</p>
                </div>
                {/* ... 나머지 처방 UI ... */}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}