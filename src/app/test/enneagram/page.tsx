"use client";
import { useState } from "react";
import { Hexagon, Lock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

export default function Page() {
  const [step, setStep] = useState("input");

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center">
      <GNB />
      <main className="w-full max-w-lg px-6 pt-28 pb-32 flex flex-col items-center gap-10 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-gold italic uppercase">Enneagram</h2>
          <p className="text-zinc-500">내면 동기와 성격적 고착 패턴을 분석합니다.</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 w-full">
          {[1,2,3,4,5,6,7,8,9].map(type => (
            <button key={type} className="aspect-square luxury-card rounded-2xl flex flex-col items-center justify-center gap-2 border border-zinc-800 hover:border-gold transition-all">
              <span className="text-2xl font-black text-gold">{type}</span>
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Type</span>
            </button>
          ))}
        </div>

        <div className="w-full p-10 luxury-card rounded-[40px] text-left space-y-6">
          <h3 className="text-xl font-bold text-white">진단 방식 선택</h3>
          <p className="text-zinc-400 font-light">정밀 검사지를 통해 당신의 핵심 유형과 날개, 통합/불통합 방향성을 데이터로 도출합니다.</p>
          <button className="w-full py-5 bg-gold text-black font-black rounded-2xl">정밀 진단 시작</button>
        </div>

        <Link href="/private" className="w-full bg-gradient-to-r from-zinc-900 to-black p-10 rounded-[40px] border border-gold/30 flex justify-between items-center group">
          <div className="flex items-center gap-6 text-left">
            <Lock className="w-8 h-8 text-gold" />
            <div>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Deep Profile</p>
              <p className="text-xl font-bold text-white group-hover:text-gold transition-colors">상담사 전용 성격 교정</p>
            </div>
          </div>
          <ChevronLeft className="w-8 h-8 text-zinc-800 rotate-180" />
        </Link>
      </main>
    </div>
  );
}