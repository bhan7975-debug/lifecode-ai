"use client";
import { useState, useEffect } from "react";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

// 간이 검사 문항 DB
const QUESTIONS = [
  { id: 1, text: "새로운 프로젝트를 시작할 때 당신의 첫 번째 반응은?" },
  { id: 2, text: "예상치 못한 위기 상황이 발생했을 때 주로 취하는 태도는?" },
  { id: 3, text: "당신이 가장 성취감을 느끼는 순간은 언제입니까?" }
];

export default function MiniTestPage() {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState<number[]>([]);

  // 문항 선택 핸들러
  const handleAnswer = (score: number) => {
    setAnswers([...answers, score]);
    setStep(step + 1);
  };

  // 로딩(광고) 단계 처리
  useEffect(() => {
    if (step === QUESTIONS.length) {
      const timer = setTimeout(() => {
        setStep(step + 1); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 프로그레스 바 계산 로직 (명시적 분리)
  const progressPercent = Math.round(((step + 1) / QUESTIONS.length) * 100);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 font-sans selection:bg-cyan-500/30">
      <div className="max-w-xl w-full">
        
        {/* 진행 상태 바 (두께 h-2 및 대비 상향) */}
        {step < QUESTIONS.length && (
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-xs text-neutral-500 font-mono">
              <span>진행률</span>
              <span>{step + 1} / {QUESTIONS.length}</span>
            </div>
            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 transition-all duration-300 ease-out" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* 문항 단계 */}
        {step < QUESTIONS.length && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl md:text-3xl font-bold leading-snug">
              <span className="text-cyan-500 mr-2">Q{step + 1}.</span>
              {QUESTIONS[step].text}
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((choice) => (
                <button 
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  className="w-full p-4 md:p-5 text-left bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/50 rounded-xl transition-all group flex justify-between items-center"
                >
                  <span className="text-neutral-300 group-hover:text-cyan-400 transition-colors">
                    선택지 {choice} (동적 데이터 바인딩 예정)
                  </span>
                  <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-cyan-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 로딩 및 전면 광고 단계 */}
        {step === QUESTIONS.length && (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-cyan-400">데이터 동기화 및 기질 분석 중...</h2>
              <p className="text-sm text-neutral-500">잠시만 기다려 주십시오. 알고리즘이 결과를 계산하고 있습니다.</p>
            </div>
            
            {/* 가상 전면 광고 슬롯 */}
            <div className="w-full h-[250px] bg-neutral-900 border-2 border-dashed border-neutral-800 rounded-xl flex items-center justify-center text-neutral-600">
              [ AdSense Interstitial Banner (전면 광고 영역) ]
            </div>
          </div>
        )}

        {/* 결과 단계 */}
        {step > QUESTIONS.length && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-cyan-900 p-8 rounded-2xl text-center space-y-6 shadow-[0_0_30px_rgba(8,145,178,0.1)]">
              <AlertCircle className="w-10 h-10 text-cyan-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-sm tracking-[0.2em] text-cyan-600 font-bold">ANALYSIS RESULT</h3>
                <h2 className="text-3xl font-bold text-neutral-100">잠재적 '성취 지향형' 기질</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed text-sm">
                간이 검사 결과, 당신은 목표를 향해 직선으로 나아가는 강력한 에너지를 지니고 있습니다. 
                그러나 이 기질이 완성되기 위해서는 보이지 않는 이면의 '설계도'를 이해해야 합니다.
              </p>
              
              <div className="pt-6 border-t border-neutral-800 space-y-4">
                <p className="text-xs text-neutral-500 mb-4">
                  * 본 결과는 통계적 경향성을 나타내는 약식 리포트입니다. 보다 심층적인 원리와 '창조주의 매뉴얼' 코드를 해독하려면 전문가의 오프라인 상담이 필요합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/article/enneagram-leader" className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg transition-colors text-center text-sm">
                    관련 칼럼 읽기
                  </Link>
                  <Link href="/" className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors text-center text-sm shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                    메인으로 돌아가기
                  </Link>
                </div>
              </div>
            </div>

            {/* 하단 광고 슬롯 */}
            <div className="w-full h-[100px] bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center text-neutral-600 text-xs">
              [ AdSense Bottom Banner ]
            </div>
          </div>
        )}

      </div>
    </main>
  );
}