"use client";
import { useState, useEffect } from "react";
import { Home, Upload, Image as ImageIcon, Sparkles, RefreshCw, Lock, ChevronLeft, Circle, Square, Triangle, Move } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

// 타자기 효과 컴포넌트
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
  const [step, setStep] = useState("input"); // input | analyzing | result
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [analysisLog, setAnalysisLog] = useState("");

  const shapeDB: { [key: string]: { title: string; trait: string; social: string; stress: string } } = {
    circle: {
      title: "원형(Circle): 조화와 관계의 수호자",
      trait: "당신은 본능적으로 주변과의 화합을 가장 중요하게 생각합니다. 타인의 감정에 민감하며, 갈등을 중재하고 평화를 유지하려는 에너지가 매우 강력합니다. 무의식은 '우리'라는 공동체 의식을 지향하며, 치유와 돌봄의 기질을 타고났습니다.",
      social: "관계에서의 헌신도가 매우 높습니다. 하지만 때로는 타인의 거절에 과도한 상처를 받거나, 자신의 욕구를 뒤로 미루는 경향이 있습니다. 당신의 따뜻함은 조직의 접착제 역할을 하지만, 독립적인 자기 결정권을 강화할 필요가 있습니다.",
      stress: "현재 당신의 에너지는 '정서적 지지'의 부족을 느끼고 있을 가능성이 큽니다. 타인을 돌보는 만큼 자신을 위한 '정서적 방어벽'을 세우는 연습이 필요합니다."
    },
    triangle: {
      title: "삼각형(Triangle): 성취와 리더십의 파이오니어",
      trait: "당신은 목표를 향해 직선으로 돌진하는 강력한 추진력을 가졌습니다. 명확한 의사결정과 결단력은 당신의 무기이며, 무의식은 항상 '상향 발전'과 '승리'를 꿈꾸고 있습니다. 논리적이고 전략적인 사고방식이 발달되어 있습니다.",
      social: "리더로서의 카리스마가 돋보입니다. 효율성을 최우선으로 하기에 다소 냉철해 보일 수 있지만, 결과로 증명하는 스타일입니다. 경쟁을 즐기며, 난관이 닥칠수록 에너지가 증폭되는 전형적인 개척자 타입입니다.",
      stress: "실패에 대한 공포가 주된 스트레스 원인입니다. 완벽해야 한다는 압박감을 내려놓고, 과정 자체의 가치를 인정할 때 당신의 주파수는 비로소 안정됩니다."
    },
    square: {
      title: "사각형(Square): 신뢰와 안정을 구축하는 설계자",
      trait: "당신은 흔들리지 않는 질서와 체계를 구축하는 능력이 탁월합니다. 꼼꼼하고 세밀하며, 데이터와 근거를 바탕으로 세상을 바라봅니다. 무의식은 '안전'과 '예측 가능성'을 추구하며, 약속과 원칙을 생명처럼 여깁니다.",
      social: "조직에서 가장 신뢰받는 존재입니다. 당신이 맡은 일은 반드시 완벽하게 마무리된다는 믿음을 주변에 줍니다. 보수적인 성향이 있을 수 있으나, 위기 상황에서 가장 흔들림 없이 중심을 잡는 기둥입니다.",
      stress: "급격한 변화나 규칙이 없는 혼란스러운 상황에서 극심한 에너지 소모를 겪습니다. 유연성을 확보하기 위해 '계획 없는 휴식'을 의도적으로 배치해야 합니다."
    },
    zigzag: {
      title: "S형(Curve): 창의와 영감의 예술가",
      trait: "당신은 정형화된 틀을 거부하고 끊임없이 새로운 자극과 변화를 모색합니다. 무의식은 '자유'와 '직관'의 세계를 유영하며, 남들이 보지 못하는 이면의 아름다움과 가능성을 읽어내는 통찰력을 지녔습니다.",
      social: "독특하고 매력적인 개성으로 주변에 영감을 줍니다. 지루한 반복 업무보다는 창의적인 프로젝트에서 빛을 발하며, 대인 관계에서도 깊은 정신적 교감을 원합니다. 예측 불허의 매력이 당신의 코드입니다.",
      stress: "억압적인 환경이나 자유가 제한된 상황에서 주파수가 급격히 불안정해집니다. 당신의 창의성을 발산할 수 있는 독립적인 시간과 공간이 절대적으로 필요합니다."
    }
  };

  const handleStart = () => {
    if (!selectedShape) return alert("당신의 기질을 가장 잘 나타내는 도형을 선택하세요.");
    setStep("analyzing");
  };

  useEffect(() => {
    if (step === "analyzing") {
      const logs = ["도형의 기하학적 벡터 추출 중...", "무의식 투영 주파수 패턴 매핑...", "상징 체계 기반 성격 코드 분석...", "최종 심리 프로파일 데이터 치환 완료"];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) { setAnalysisLog(logs[i]); i++; }
        else { clearInterval(interval); setStep("result"); }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center">
      <GNB />
      <main className="w-full max-w-lg px-6 pt-28 pb-32 flex flex-col items-center gap-10 text-center">
        {step === "input" ? (
          <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gold italic uppercase">Shape Projection</h2>
              <p className="text-zinc-500 text-lg font-light">무의식이 선택한 기하학적 주파수를 스캔합니다.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'circle', icon: <Circle className="w-12 h-12" />, label: '원형' },
                { id: 'triangle', icon: <Triangle className="w-12 h-12" />, label: '삼각형' },
                { id: 'square', icon: <Square className="w-12 h-12" />, label: '사각형' },
                { id: 'zigzag', icon: <Move className="w-12 h-12 rotate-45" />, label: 'S형' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShape(s.id)}
                  className={`p-10 rounded-[30px] border-2 transition-all flex flex-col items-center gap-4 ${selectedShape === s.id ? 'border-gold bg-gold/10' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}
                >
                  <div className={selectedShape === s.id ? 'text-gold' : 'text-zinc-600'}>{s.icon}</div>
                  <span className={`font-bold ${selectedShape === s.id ? 'text-gold' : 'text-zinc-600'}`}>{s.label}</span>
                </button>
              ))}
            </div>

            <button onClick={handleStart} className="w-full py-6 bg-gradient-to-r from-gold to-[#AA7C4D] text-black font-black text-2xl rounded-[30px] shadow-2xl active:scale-95 transition-all btn-ripple">무의식 스캔 시작</button>
          </div>
        ) : step === "analyzing" ? (
          <div className="py-20 flex flex-col items-center gap-10">
            <RefreshCw className="w-20 h-20 text-gold animate-spin" />
            <h3 className="text-2xl font-black text-white italic tracking-[0.3em] animate-pulse">SCANNING GEOMETRY</h3>
            <p className="text-zinc-500 font-mono text-sm">{analysisLog}</p>
          </div>
        ) : (
          <div className="w-full space-y-16 animate-in fade-in duration-1000">
            <header className="space-y-4">
              <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">Projective Analysis Report</span>
              <h2 className="text-4xl font-black text-white italic leading-tight">{shapeDB[selectedShape!].title}</h2>
            </header>

            <div className="luxury-card rounded-[40px] p-8 md:p-12 space-y-12 text-left">
              <div className="space-y-12 text-zinc-400 text-lg leading-relaxed font-light selectable-text">
                <section className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 underline decoration-gold underline-offset-8">1. 핵심 기질 분석</h4>
                  <p><Typewriter text={shapeDB[selectedShape!].trait} delay={500} /></p>
                </section>

                <div className="w-full h-24 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center text-zinc-800 text-[10px] tracking-widest uppercase">AD SLOT [SHAPE-RESULT-1]</div>

                <section className="space-y-4 border-t border-zinc-900 pt-10">
                  <h4 className="text-white font-bold flex items-center gap-2 underline decoration-gold underline-offset-8">2. 사회적 관계 및 소통 방식</h4>
                  <p><Typewriter text={shapeDB[selectedShape!].social} delay={2500} /></p>
                </section>

                <section className="space-y-4 border-t border-zinc-900 pt-10">
                  <h4 className="text-white font-bold flex items-center gap-2 underline decoration-gold underline-offset-8">3. 현재 스트레스 및 보완점</h4>
                  <p><Typewriter text={shapeDB[selectedShape!].stress} delay={4500} /></p>
                </section>
              </div>
            </div>

            <div className="w-full h-40 bg-zinc-950 border border-zinc-900 rounded-[40px] flex items-center justify-center text-zinc-800 text-[10px] tracking-[0.5em] uppercase">AD SLOT [SHAPE-BOTTOM]</div>

            <Link href="/private" className="w-full bg-gradient-to-r from-zinc-900 to-black p-10 rounded-[40px] border border-gold/30 flex justify-between items-center group">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-zinc-950 rounded-2xl border border-gold/30 group-hover:bg-gold/10 transition-colors">
                  <Lock className="w-8 h-8 text-gold" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] mb-1">Expert Deep Scan</p>
                  <p className="text-2xl font-bold text-white group-hover:text-gold transition-colors">상담사 전용 무의식 교정</p>
                </div>
              </div>
              <ChevronLeft className="w-8 h-8 text-zinc-800 rotate-180" />
            </Link>

            <button onClick={() => window.location.reload()} className="w-full py-6 bg-zinc-900 text-white font-bold rounded-[30px]">다른 도형으로 분석하기</button>
          </div>
        )}
      </main>
    </div>
  );
}