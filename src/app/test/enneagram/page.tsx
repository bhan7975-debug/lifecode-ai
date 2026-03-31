"use client";
import { useState, useEffect, Suspense } from "react";
import { RefreshCw, Lock, ChevronRight, ChevronLeft, Brain, Target, Activity, Zap, Compass, Heart } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";
// [추가] 전문 가이드 컴포넌트 임포트
import SpecialistGuide from "@/components/SpecialistGuide";

const TYPE_ORDER = [2, 3, 4, 5, 6, 7, 8, 9, 1];
const TYPE_LABELS: Record<number, string> = {
  1: "REFORMER", 2: "HELPER", 3: "ACHIEVER", 4: "INDIVIDUALIST", 5: "INVESTIGATOR", 6: "LOYALIST", 7: "ENTHUSIAST", 8: "CHALLENGER", 9: "PEACEMAKER"
};

const GROWTH_STRESS_MAP: Record<number, { growth: number, stress: number }> = {
  1: { growth: 7, stress: 4 }, 2: { growth: 4, stress: 8 }, 3: { growth: 6, stress: 9 },
  4: { growth: 1, stress: 2 }, 5: { growth: 8, stress: 7 }, 6: { growth: 9, stress: 3 },
  7: { growth: 5, stress: 1 }, 8: { growth: 2, stress: 5 }, 9: { growth: 3, stress: 6 }
};

function ConstellationChart({ scores, primaryType }: { scores: Record<number, string>, primaryType: number }) {
  const width = 900;
  const height = 280;
  const paddingX = 50;
  const paddingY = 40;
  const maxScore = 45;
  const minScore = 9;

  const points = TYPE_ORDER.map((type, index) => {
    const s = parseInt(scores[type] || "9", 10);
    const x = paddingX + (index * ((width - paddingX * 2) / (TYPE_ORDER.length - 1)));
    const y = height - paddingY - (((s - minScore) / (maxScore - minScore)) * (height - paddingY * 2));
    return { type, score: s, x, y };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="w-full overflow-x-auto bg-[#111111]/80 backdrop-blur-md border border-zinc-700 rounded-[30px] p-4 shadow-2xl mb-8">
      <div className="min-w-[600px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-2xl">
          <line x1={paddingX} y1={paddingY} x2={width-paddingX} y2={paddingY} stroke="#333" strokeDasharray="4 4" />
          <line x1={paddingX} y1={height-paddingY} x2={width-paddingX} y2={height-paddingY} stroke="#333" strokeDasharray="4 4" />
          <polyline points={polylinePoints} fill="none" stroke="#CFA356" strokeWidth="3" style={{ filter: "drop-shadow(0px 0px 8px rgba(207,163,86,0.8))" }} />
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={p.type === primaryType ? "8" : "5"} fill={p.type === primaryType ? "#FFF" : "#CFA356"} style={{ filter: "drop-shadow(0px 0px 6px rgba(255,255,255,0.8))" }} />
              <text x={p.x} y={p.y - 15} textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="bold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>{p.score}</text>
              <text x={p.x} y={height - 10} textAnchor="middle" fill={p.type === primaryType ? "#CFA356" : "#888"} fontSize="14" fontWeight="bold">T{p.type}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function EnneagramEngine() {
  const [step, setStep] = useState("input");
  const [scores, setScores] = useState<Record<number, string>>({});
  const [result, setResult] = useState<any>(null);
  const [reportPage, setReportPage] = useState(1);

  const handleScoreChange = (type: number, value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    if (numValue.length > 2) return;
    setScores(prev => ({ ...prev, [type]: numValue }));
  };

  const runEngine = () => {
    for (const t of TYPE_ORDER) {
      const s = parseInt(scores[t] || "0", 10);
      if (isNaN(s) || s < 9 || s > 45) return alert(`[입력 오류] TYPE ${t}의 점수를 9~45 사이로 정확히 입력해주십시오.`);
    }

    let maxType = 1;
    let maxScore = -1;
    for (const t of TYPE_ORDER) {
      const s = parseInt(scores[t], 10);
      if (s > maxScore) { maxScore = s; maxType = t; }
    }

    const w1 = maxType === 1 ? 9 : maxType - 1;
    const w2 = maxType === 9 ? 1 : maxType + 1;
    const scoreW1 = parseInt(scores[w1], 10);
    const scoreW2 = parseInt(scores[w2], 10);
    const wing = scoreW1 > scoreW2 ? w1 : w2;

    const reportData = generateDeepEnneagramReport(maxType, wing);
    setResult({ primaryType: maxType, wing, scores, reportData });
    setStep("analyzing");
  };

  useEffect(() => { if (step === "analyzing") setTimeout(() => setStep("result"), 2000); }, [step]);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden pb-24 relative">
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] -z-10"></div>
      <GNB />
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-48">
        {step === "input" ? (
          <div className="space-y-12 animate-in fade-in">
            <header className="text-center space-y-3">
               <h2 className="text-4xl md:text-5xl font-black text-[#CFA356] italic uppercase drop-shadow-lg tracking-tighter">Enneagram</h2>
               <p className="text-zinc-400 text-sm tracking-widest">내면 동기와 성격적 고착 패턴 분석</p>
               <p className="text-[#CFA356] text-xs pt-4 font-bold">각 유형별로 9~45점 사이의 점수를 입력하십시오.</p>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
               {TYPE_ORDER.map((t) => (
                 <div key={t} className="bg-[#111111]/80 backdrop-blur-md border border-zinc-700 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xl transition-all hover:border-[#CFA356]/50">
                    <div className="text-center">
                        <h3 className="text-[#CFA356] font-black text-2xl md:text-3xl">TYPE {t}</h3>
                        <p className="text-zinc-400 text-[10px] tracking-[0.2em] mt-1 font-bold">{TYPE_LABELS[t]}</p>
                    </div>
                    <input type="number" placeholder="9~45" className="w-full text-center bg-white text-black font-black text-3xl py-4 rounded-2xl outline-none focus:ring-4 focus:ring-[#CFA356]/40 transition-all placeholder-zinc-300 shadow-inner" value={scores[t] || ''} onChange={(e) => handleScoreChange(t, e.target.value)} />
                 </div>
               ))}
            </div>
            <button onClick={runEngine} className="w-full py-6 mt-8 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-2xl rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all">심리 데이터 분석 가동</button>
          </div>
        ) : step === "analyzing" ? (
          <div className="py-40 flex flex-col items-center gap-6"><RefreshCw className="w-16 h-16 text-[#CFA356] animate-spin" /><p className="font-black italic animate-pulse tracking-widest uppercase">Analyzing Psyche Codes...</p></div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700 mt-8">
             <ConstellationChart scores={result.scores} primaryType={result.primaryType} />
             <div className="flex justify-between items-center bg-zinc-900 rounded-full p-2 border border-zinc-700 shadow-xl">
               {[1, 2, 3].map((num) => (
                 <button key={num} onClick={() => setReportPage(num)} className={`flex-1 py-3 mx-1 rounded-full text-sm font-black transition-all ${reportPage === num ? 'bg-[#CFA356] text-black shadow-lg' : 'bg-white text-black opacity-80 hover:opacity-100'}`}>PAGE 0{num}</button>
               ))}
             </div>
             <div className="min-h-[400px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-zinc-700 rounded-[40px] p-8 md:p-10 shadow-2xl">
               {reportPage === 1 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title={`1. 주 유형 (TYPE ${result.primaryType}) 본질`} icon={<Brain />} body={result.reportData.p1.core} />
                   <Section title="2. 근원적 두려움과 욕망" icon={<Target />} body={result.reportData.p1.fearDesire} />
                   <Section title="3. 행동 패턴 및 방어기제" icon={<Activity />} body={result.reportData.p1.behavior} />
                 </div>
               )}
               {reportPage === 2 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title={`4. 서브 유형 (날개 ${result.wing})의 영향`} icon={<Zap />} body={result.reportData.p2.wing} />
                   <Section title={`5. 통합의 방향 (TYPE ${GROWTH_STRESS_MAP[result.primaryType].growth})`} icon={<Compass />} body={result.reportData.p2.growth} />
                   <Section title={`6. 분열의 방향 (TYPE ${GROWTH_STRESS_MAP[result.primaryType].stress})`} icon={<Activity />} body={result.reportData.p2.stress} />
                 </div>
               )}
               {reportPage === 3 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="7. 대인관계 패턴 및 갈등 요소" icon={<Heart />} body={result.reportData.p3.relationship} />
                   <Section title="8. 내면의 영적 맹점 (Blind Spot)" icon={<Brain />} body={result.reportData.p3.blindSpot} />
                   <Section title="9. 영적 성장을 위한 통찰" icon={<Target />} body={result.reportData.p3.spiritual} />
                 </div>
               )}
             </div>

             <div className="flex justify-between gap-4">
                <button disabled={reportPage === 1} onClick={() => setReportPage(prev => prev - 1)} className="flex-1 py-5 rounded-[20px] bg-white text-black flex justify-center items-center disabled:opacity-30 shadow-xl transition-all"><ChevronLeft className="w-6 h-6" /></button>
                <button disabled={reportPage === 3} onClick={() => setReportPage(prev => prev + 1)} className="flex-1 py-5 rounded-[20px] bg-white text-black flex justify-center items-center disabled:opacity-30 shadow-xl transition-all"><ChevronRight className="w-6 h-6" /></button>
             </div>

             {/* [핵심 이식 지점] 상담사 전용 영적 가이드 컴포넌트 */}
             <div className="mt-4">
                <SpecialistGuide type="enneagram" value={result.primaryType.toString()} />
             </div>

             <Link href="/private" className="group flex items-center justify-between p-10 bg-gradient-to-r from-zinc-950/90 to-[#111]/90 backdrop-blur-xl border border-[#CFA356]/40 rounded-[30px] shadow-2xl mt-8">
                <div className="flex items-center gap-6"><Lock className="w-8 h-8 text-[#CFA356]" /><div><p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Expert Only</p><p className="text-xl font-bold text-white group-hover:text-[#CFA356] transition-colors">상담사 전용 심화 해석</p></div></div>
                <ChevronRight className="w-6 h-6 text-zinc-500 group-hover:translate-x-1 transition-all" />
             </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function Section({ title, icon, body }: { title: string, icon: any, body: string }) {
  return (
    <section className="space-y-4">
      <h4 className="text-lg font-black text-[#CFA356] flex items-center gap-3 border-b border-zinc-800 pb-3">{icon} {title}</h4>
      <p className="text-zinc-200 text-[16px] leading-relaxed font-light break-keep">{body}</p>
    </section>
  );
}

function generateDeepEnneagramReport(pt: number, wing: number) {
  const titles = { 1: "개혁가", 2: "조력가", 3: "성취자", 4: "개인주의자", 5: "탐구자", 6: "충실한 사람", 7: "열정적인 사람", 8: "도전자", 9: "평화주의자" };
  const growth = GROWTH_STRESS_MAP[pt].growth;
  const stress = GROWTH_STRESS_MAP[pt].stress;
  
  return {
    p1: {
      core: `당신의 주 유형은 TYPE ${pt} (${titles[pt as keyof typeof titles]})입니다. 이 유형은 무의식적으로 세상의 특정 측면을 통제하거나 적응하려는 고유의 에너지를 지니고 있습니다. 스스로의 신념과 논리가 매우 뚜렷하며, 환경에 휘둘리기보다는 자신만의 원칙으로 세상을 규정하려는 성향이 강합니다.`,
      fearDesire: `내면 깊은 곳에는 '무가치해지거나 결함이 있는 존재가 되는 것'에 대한 근원적인 두려움이 도사리고 있습니다. 이를 극복하기 위해 끊임없이 '완전함' 혹은 '영향력'을 추구(Basic Desire)하게 되며, 이것이 당신 인생의 모든 선택을 이끄는 핵심 동력입니다.`,
      behavior: `스트레스 상황에 직면하면 특유의 방어기제가 작동합니다. 타인에게 의존하기보다 스스로 벽을 치고 문제를 해결하려 하거나, 반대로 강박적으로 상황을 통제하려 들 수 있습니다. 이러한 패턴은 나를 보호하기 위한 뇌의 생존 알고리즘입니다.`
    },
    p2: {
      wing: `당신은 ${wing}번 날개를 강하게 사용하고 있습니다. 주 유형의 경직성을 ${wing}번의 성향이 보완하여, 보다 유연하고 다채로운 성격적 변주를 만들어냅니다. ${wing}번 날개의 영향으로 당신은 목표 지향적이면서도 상황에 따라 현실적인 타협점을 찾는 통찰력을 발휘합니다.`,
      growth: `심리적 안정감을 느끼고 건강해질 때, 당신은 TYPE ${growth} (${titles[growth as keyof typeof titles]})의 긍정적인 특성을 통합합니다. 기존의 좁은 시야에서 벗어나, 타인에 대한 수용성이 극대화되며 내면의 직관과 창의성이 폭발적으로 발현되는 상태에 이르게 됩니다.`,
      stress: `반면 극도의 스트레스 상황에서는 TYPE ${stress} (${titles[stress as keyof typeof titles]})의 부정적인 패턴으로 분열합니다. 평소의 이성적인 태도를 잃고 감정적으로 예민해지거나, 타인을 통제하고 비판하는 공격적인 성향이 무의식적으로 표출될 수 있으니 경계해야 합니다.`
    },
    p3: {
      relationship: `대인관계에서 당신은 명확하고 투명한 소통을 선호합니다. 애매모호한 태도나 비합리적인 요구를 견디지 못하며, 신뢰가 깨지면 관계 단절도 불사하는 결단력도 지니고 있습니다. 타인에게는 다소 차갑거나 까다로운 사람으로 비칠 수 있는 맹점이 존재합니다.`,
      blindSpot: `스스로 완벽하게 통제하고 있다고 믿는 순간이 가장 위험합니다. 당신의 가장 큰 영적 맹점은 '나침반의 오류'입니다. 내가 정한 원칙이 절대적인 선(善)이라는 무의식적 교만함이 타인을 정죄하거나 스스로를 고립시키는 원인이 됩니다.`,
      spiritual: `이 고착 패턴을 끊어내는 영적 해결책은 '자기 부인(Self-Denial)'입니다. 내면의 두려움을 내 힘으로 해결하려는 시도를 멈추고, 절대자의 섭리에 삶의 주도권을 내어드릴 때 비로소 진정한 평안과 해방을 경험할 수 있습니다.`
    }
  };
}

export default function Page() { return <Suspense fallback={null}><EnneagramEngine /></Suspense>; }