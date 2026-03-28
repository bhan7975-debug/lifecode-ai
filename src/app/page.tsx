import { Sparkles, Hexagon, Component, Layers } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* 헤더 섹션 */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            LifeCode AI
          </h1>
          <p className="text-neutral-400 text-lg">데이터로 설계하는 당신의 내일</p>
        </header>

        {/* 4대 진단 모듈 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/saju" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition-all duration-300">
            <Sparkles className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">사주 명리 분석</h2>
            <p className="text-neutral-500">통계적 기질과 다가오는 기회의 타이밍을 확인하세요.</p>
          </Link>

          <Link href="/enneagram" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition-all duration-300">
            <Hexagon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">에니어그램 진단</h2>
            <p className="text-neutral-500">9가지 성격 유형을 통해 내면의 동기와 강점을 파악하세요.</p>
          </Link>

          <Link href="/shape" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300">
            <Component className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">도형 심리 상담</h2>
            <p className="text-neutral-500">무의식적인 선택으로 현재의 결핍과 필요를 진단합니다.</p>
          </Link>

          <Link href="/tarot" className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300">
            <Layers className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">타로 심리 분석</h2>
            <p className="text-neutral-500">직관적인 상징을 통해 당면한 문제의 돌파구를 찾습니다.</p>
          </Link>
        </div>

        {/* 로또 번호 생성 트리거 (애드센스 유도용) */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 text-center">
          <h3 className="text-xl font-bold mb-4">오늘의 기운에 동기화된 행운 번호</h3>
          <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-full transition-colors shadow-[0_0_15px_rgba(8,145,178,0.5)]">
            로또 번호 추출하기
          </button>
        </div>

        {/* 푸터 (완충 문구) */}
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