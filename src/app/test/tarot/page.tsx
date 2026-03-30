"use client";
import { useState, useEffect } from "react";
import { Home, Sparkles, RefreshCw, Lock, ChevronLeft, Layers } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

// 타자기 효과
function Typewriter({ text, speed = 20, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, started]);
  return <span className={started && displayedText.length < text.length ? "typewriter-cursor" : ""}>{displayedText}</span>;
}

export default function Page() {
  const [step, setStep] = useState("input");
  const [deck, setDeck] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [analysisLog, setAnalysisLog] = useState("");

  useEffect(() => {
    setDeck(Array.from({ length: 22 }, (_, i) => i).sort(() => Math.random() - 0.5));
  }, []);

  const tarotDB: { [key: number]: { name: string; desc: string; advice: string } } = {
    0: { name: "The Fool", desc: "자유로운 영혼과 새로운 시작을 의미합니다. 지금 당신은 아무런 속박 없이 새로운 모험을 떠날 준비가 되어 있습니다.", advice: "계산하지 말고 당신의 직관이 이끄는 대로 첫 발을 내디뎌 보십시오." },
    1: { name: "The Magician", desc: "창조적인 능력과 무한한 가능성을 상징합니다. 당신의 손에는 이미 문제를 해결할 모든 도구가 쥐어져 있습니다.", advice: "자신감을 가지고 당신의 능력을 세상에 펼쳐 보일 때입니다." },
    10: { name: "Wheel of Fortune", desc: "운명의 수레바퀴가 돌고 있습니다. 거스를 수 없는 큰 변화의 흐름이 당신을 찾아왔음을 암시합니다.", advice: "흐름에 몸을 맡기되, 그 변화 속에서 당신이 지켜야 할 중심이 무엇인지 고민하십시오." },
    21: { name: "The World", desc: "완성과 통합, 성공적인 마무리를 뜻합니다. 하나의 주기가 끝나고 완벽한 조화의 상태에 도달했음을 알립니다.", advice: "지금을 충분히 만끽하고, 다음 단계로 나아가기 위한 평화로운 휴식을 취하십시오." }
  };

  const handleStart = () => {
    if (selected.length < 3) return alert("운명의 카드 3장을 선택해 주세요.");
    setStep("analyzing");
  };

  useEffect(() => {
    if (step === "analyzing") {
      const logs = ["우주의 동시성 알고리즘 동기화...", "카드 상징 데이터 추출 중...", "과거-현재-미래 타임라인 연결...", "신탁의 메시지 텍스트 치환 완료"];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) { setAnalysisLog(logs[i]); i++; }
        else { clearInterval(interval); setStep("result"); }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center">
      <GNB />
      <main className="w-full max-w-lg px-6 pt-28 pb-32 flex flex-col items-center gap-10 text-center">
        {step === "input" ? (
          <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h2 className="text-4xl font-black text-gold italic uppercase">Tarot Oracle</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {deck.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    if (selected.includes(id)) setSelected(selected.filter(x => x !== id));
                    else if (selected.length < 3) setSelected([...selected, id]);
                  }}
                  className={`aspect-[2/3] border-2 rounded-lg transition-all duration-500 ${selected.includes(id) ? 'border-gold bg-gold/20 -translate-y-4 shadow-lg' : 'border-zinc-800 bg-zinc-950'}`}
                >
                  <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black">?</div>
                </button>
              ))}
            </div>
            <div className="h-8 text-gold font-bold tracking-widest">{selected.length} / 3 CARDS SELECTED</div>
            <button onClick={handleStart} className="w-full py-6 bg-gradient-to-r from-gold to-[#AA7C4D] text-black font-black text-2xl rounded-[30px] active:scale-95 transition-all">운명의 카드 해석</button>
          </div>
        ) : step === "analyzing" ? (
          <div className="py-20 flex flex-col items-center gap-10">
            <Layers className="w-20 h-20 text-gold animate-bounce" />
            <h3 className="text-2xl font-black text-white italic tracking-[0.3em] animate-pulse">SYNCHRONIZING ORACLE</h3>
            <p className="text-zinc-500 font-mono text-sm">{analysisLog}</p>
          </div>
        ) : (
          <div className="w-full space-y-16 animate-in fade-in duration-1000">
            <h2 className="text-4xl font-black text-white italic">당신을 위한 계시</h2>
            <div className="space-y-8">
              {selected.map((id, index) => {
                const card = tarotDB[id % 4 === 0 ? 0 : id % 4 === 1 ? 1 : id % 4 === 2 ? 10 : 21];
                return (
                  <div key={id} className="luxury-card rounded-[40px] p-8 text-left space-y-6">
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{card.name}</h4>
                    <p className="text-zinc-400 text-lg leading-relaxed font-light">
                      <Typewriter text={card.desc} delay={index * 1500} />
                    </p>
                  </div>
                );
              })}
            </div>
            <Link href="/private" className="w-full bg-gradient-to-r from-zinc-900 to-black p-10 rounded-[40px] border border-gold/30 flex justify-between items-center group">
              <span className="text-2xl font-bold text-white group-hover:text-gold transition-colors">상담사 전용 미래 타임라인</span>
              <ChevronLeft className="w-8 h-8 text-zinc-800 rotate-180" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}