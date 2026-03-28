"use client";
import { useState, useRef, useCallback } from "react";
import { Lock, ShieldCheck, Download, Sparkles, Fingerprint } from "lucide-react";
import { toPng } from "html-to-image";

const SUCCESS_CODES = [
  { id: 1, type: "Type 1", title: "완벽한 설계자", code: "수고하고 무거운 짐 진 자들아 다 내게로 오라", insight: "완벽주의라는 감옥에서 벗어나 '안식'을 얻을 때 비로소 최고의 효율이 발생함." },
  { id: 2, type: "Type 2", title: "핵심 조력자", code: "네 이웃을 네 자신과 같이 사랑하라", insight: "남을 돕기 전에 '자신'을 먼저 사랑하고 돌볼 때, 영향력이 지속 가능한 성공으로 이어짐." },
  { id: 3, type: "Type 3", title: "전략적 성취가", code: "사람이 마음으로 자기의 길을 계획할지라도...", insight: "결과 지향적 삶을 넘어 '과정의 진실성'을 확보할 때 무너지지 않는 성공의 탑이 쌓임." },
  { id: 4, type: "Type 4", title: "독창적 예술가", code: "내가 너를 지었나니 너는 내 것이라", insight: "고립된 특별함이 아니라 '창조주와의 연결' 안에서 당신만의 고유한 색채가 비로소 완성됨." },
  { id: 5, type: "Type 5", title: "통찰적 지략가", code: "여호와를 경외하는 것이 지식의 근본이어니와", insight: "정보의 수집을 넘어 '현장의 실행'으로 나아갈 때, 당신의 지식은 세상을 바꾸는 지혜가 됨." },
  { id: 6, type: "Type 6", title: "신뢰의 수호자", code: "강하고 담대하라 두려워하지 말며...", insight: "불안을 통제하려는 노력을 멈추고 '절대적 신뢰'를 선택할 때, 비로소 강력한 리더십이 발현됨." },
  { id: 7, type: "Type 7", title: "창의적 낙관주의자", code: "항상 기뻐하라... 이것이 너희를 향한 뜻이니라", insight: "자극적인 즐거움이 아닌 '깊은 내면의 희락'을 찾을 때, 산만한 재능이 하나의 거대한 업적으로 수렴됨." },
  { id: 8, type: "Type 8", title: "강력한 통치자", code: "온유한 자는 복이 있나니 땅을 기업으로 받을 것임이요", insight: "힘으로 제압하는 것이 아니라 '온유함'으로 품을 때, 비로소 세상이라는 큰 영토(기업)를 얻게 됨." },
  { id: 9, type: "Type 9", title: "평화적 중재자", code: "내가 여기 있나이다 나를 보내소서", insight: "갈등을 피하는 침묵이 아니라 '주도적인 선택과 행동'을 할 때, 당신의 평화가 성공의 에너지가 됨." }
];

export default function PrivateDashboard() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [selectedType, setSelectedType] = useState(SUCCESS_CODES[2]);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "7777") {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) return;
    toPng(cardRef.current, { cacheBust: true, quality: 1.0 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `SuccessCode_${selectedType.type}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("카드 생성 오류:", err));
  }, [cardRef, selectedType]);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-200 font-serif">
        <form onSubmit={handleUnlock} className="max-w-md w-full bg-slate-900 border border-yellow-600/30 p-8 rounded-xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <Lock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl text-yellow-500">전문가 판독 시스템</h1>
            <p className="text-sm text-slate-400">인가된 상담사 전용 보안 구역입니다.</p>
          </div>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-center tracking-widest text-xl text-yellow-400 focus:outline-none focus:border-yellow-500 transition-colors" placeholder="****" autoFocus />
          </div>
          {error && <p className="text-red-400 text-sm text-center">접근 권한이 거부되었습니다.</p>}
          <button type="submit" className="w-full bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-500 border border-yellow-600/50 py-3 rounded-lg font-semibold transition-all">보안 해제</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-serif selection:bg-yellow-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-yellow-600/30 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500 flex items-center gap-3"><ShieldCheck className="w-8 h-8" /> 라이프 디코딩 대시보드</h1>
            <p className="text-slate-400 mt-2 text-sm tracking-wider">Session ID: REF-2026-X829 (휘발성 데이터)</p>
          </div>
          <button onClick={() => window.location.reload()} className="text-sm px-4 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded transition-colors">세션 파기</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h2 className="text-xl text-yellow-500 border-b border-slate-800 pb-2">에니어그램 데이터 입력 (상담사 판독 결과)</h2>
              <div className="grid grid-cols-3 gap-3">
                {SUCCESS_CODES.map((item) => (
                  <button key={item.id} onClick={() => setSelectedType(item)} className={`p-3 rounded-lg border transition-all text-sm text-left ${selectedType.id === item.id ? 'bg-yellow-900/40 border-yellow-500 text-yellow-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                    <span className="block font-bold mb-1">{item.type}</span>{item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-center">
            <div ref={cardRef} className="w-[320px] aspect-[1/1.6] bg-slate-900 border border-yellow-600/60 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #020617 100%)' }}>
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-yellow-500 rounded-full rotate-45"></div>
              </div>
              <div className="relative z-10 text-center space-y-2 border-b border-yellow-600/30 pb-4">
                <Fingerprint className="w-8 h-8 text-yellow-600 mx-auto" />
                <h3 className="text-[10px] tracking-[0.3em] text-yellow-700 font-bold uppercase">Creator's Manual</h3>
                <h2 className="text-xl font-bold text-yellow-500">{selectedType.title}</h2>
              </div>
              <div className="relative z-10 text-center space-y-6 my-auto">
                <div className="text-sm text-slate-400">해독된 성공 코드 [Code: {selectedType.id}X]</div>
                <div className="text-lg text-slate-200 font-medium leading-relaxed px-2 break-keep">"{selectedType.code}"</div>
              </div>
              <div className="relative z-10 bg-slate-950/80 border border-yellow-900 p-4 rounded text-xs text-slate-300 leading-relaxed text-center break-keep">
                <Sparkles className="w-4 h-4 text-yellow-600 inline-block mr-1 mb-1" />{selectedType.insight}
              </div>
            </div>
            <button onClick={handleDownload} className="w-[320px] py-4 bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(202,138,4,0.4)]">
              <Download className="w-5 h-5" />성공 코드 카드 발급하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}