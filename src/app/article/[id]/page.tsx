import { ChevronLeft, Calendar, FileText, Home } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

// 임시 데이터 베이스 (추후 마크다운이나 DB 연동으로 교체 가능)
const MOCK_DB = {
  "saju-wealth": {
    title: "사주로 보는 재물운 관리법: 성공의 80%는 운인가?",
    date: "2026-03-28",
    content: "사주명리학에서 재성(財星)은 재물과 결과를 의미합니다. 많은 사람들이 사주에 재성이 많으면 무조건 부자가 될 것이라 생각하지만, 데이터적 관점과 통계적 기질로 보면 오히려 재성을 감당할 수 있는 '신강(身强)'한 기운이 뒷받침되어야 합니다.\n\n[ 본문 텍스트 영역: 구글 애드센스 승인을 위해서는 이 위치에 1,500자 이상의 독창적인 심층 분석 텍스트가 배치되어야 합니다. 사주 60갑자의 통계적 특성과 에니어그램의 심리학적 기질을 교차 검증하는 내용이 효과적입니다. ]\n\n또한, 운명 결정론에 빠지기보다는 자신이 가진 기질적 장단점을 객관화하고, 이를 보완할 수 있는 '시스템'을 구축하는 것이 현대적 의미의 개운법(開運法)입니다.",
  },
  "enneagram-leader": {
    title: "에니어그램 3번과 8번: 최고 경영자들의 심리적 공통점",
    date: "2026-03-27",
    content: "현대의 성공한 리더들의 기질을 에니어그램으로 분석해보면 특정 패턴이 도출됩니다. 성취를 향한 목표 지향성이 강한 3번 유형과, 통제권과 주도권을 쥐고 환경을 개척하는 8번 유형의 결합은 비즈니스 환경에서 폭발적인 성과를 냅니다.\n\n[ 본문 텍스트 영역: 리더십의 한계를 돌파하기 위해서는 자신의 유형이 가진 방어기제를 해제하는 과정이 필수적입니다. 이 블로그에서는 각 유형별 심리적 맹점을 데이터 기반으로 해부합니다. ]",
  }
};

export default function ArticlePage({ params }: { params: { id: string } }) {
  // URL 파라미터에 맞는 데이터 호출 (없으면 예외 처리)
  const article = MOCK_DB[params.id as keyof typeof MOCK_DB] || {
    title: "존재하지 않는 문서이거나 삭제된 분석 리포트입니다.",
    date: "N/A",
    content: "이전 페이지로 돌아가 다른 리포트를 확인해 주십시오."
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/30">
      {/* 공통 GNB 적용 */}
      <GNB />

      <div className="max-w-3xl mx-auto px-6 pt-48 pb-12 space-y-8">
        
        {/* 서브 네비게이션 */}
        <nav>
          <Link href="/" className="inline-flex items-center text-sm text-neutral-400 hover:text-cyan-400 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            메인으로 돌아가기
          </Link>
        </nav>

        {/* 상단 광고 슬롯 (구글 봇이 가장 먼저 인식하는 수익 영역) */}
        <div className="w-full h-[100px] bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center text-neutral-600 text-xs tracking-widest uppercase">
          [ AdSense Top Banner ]
        </div>

        {/* 포스팅 헤더 */}
        <header className="space-y-4 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-neutral-100">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {article.date}</span>
            <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> LifeCode Analytics</span>
          </div>
        </header>

        {/* 본문 콘텐츠 렌더링 */}
        <article className="prose prose-invert prose-neutral max-w-none text-neutral-300 leading-loose text-lg whitespace-pre-line">
          {article.content}
        </article>

        {/* 하단 광고 및 전면 광고 유도 슬롯 */}
        <div className="pt-12 mt-12 border-t border-neutral-800 space-y-6">
          <div className="w-full h-[250px] bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center text-neutral-600 text-xs tracking-widest uppercase">
            [ AdSense Multiplex / Bottom Banner ]
          </div>
          
          {/* 다른 글 추천 (체류 시간 연장) */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 rounded-xl border border-neutral-700 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-neutral-200">당신의 진짜 기질이 궁금하다면?</h3>
              <p className="text-sm text-neutral-400 mt-1">LifeCode AI 알고리즘으로 즉시 분석하세요.</p>
            </div>
            <Link href="/" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors">
              분석 시작
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}