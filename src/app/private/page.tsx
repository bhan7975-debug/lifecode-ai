"use client";
import { useState, useEffect, Suspense } from "react";
import { Lock, Unlock, Database, Brain, Target, Compass, Zap, Layers, RefreshCw, ChevronRight, Share } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

// --- [Mock Data] 셀렉터용 데이터셋 ---
const SAJU_DM = ["甲(거목)", "乙(화초)", "丙(태양)", "丁(촛불)", "戊(태산)", "己(대지)", "庚(원석)", "辛(보석)", "壬(바다)", "癸(옹달샘)"];
const ENNEAGRAM_TYPES = ["1(개혁가)", "2(조력가)", "3(성취자)", "4(예술가)", "5(탐구자)", "6(충실가)", "7(열정가)", "8(도전자)", "9(평화주의자)"];
const SHAPES = ["동그라미(관계)", "세모(목표)", "네모(안정)", "에스(창의)"];
const TAROT_MAJORS = Array.from({ length: 22 }, (_, i) => `Arcana ${i}`);

function ControlCenterEngine() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [step, setStep] = useState("dashboard"); // dashboard, synthesizing, report

  // 클라이언트 통합 데이터 State
  const [clientData, setClientData] = useState({
    saju: "丙(태양)",
    enneagram: "1(개혁가)",
    shape: "세모(목표)",
    tarot: "Arcana 16 (The Tower)"
  });

  const [masterReport, setMasterReport] = useState<any>(null);

  // PIN 인증 로직 (기본값: 0000)
  const handleAuth = () => {
    if (pinCode === "0000" || pinCode === "7777") setIsAuthenticated(true);
    else { alert("보안 인가 실패: 올바르지 않은 PIN 코드입니다."); setPinCode(""); }
  };

  const handleSynthesize = () => {
    setMasterReport(generateMasterPrescription(clientData));
    setStep("synthesizing");
  };

  useEffect(() => { if (step === "synthesizing") setTimeout(() => setStep("report"), 3000); }, [step]);

  // [인증 화면]
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
         <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_#CFA356_0%,_transparent_50%)]"></div>
         <div className="relative z-10 max-w-sm w-full space-y-8 animate-in fade-in zoom-in">
            <div className="text-center space-y-2">
               <Lock className="w-16 h-16 text-[#CFA356] mx-auto mb-4 drop-shadow-[0_0_15px_rgba(207,163,86,0.5)]" />
               <h1 className="text-3xl font-black tracking-tighter text-white">EXPERT ONLY</h1>
               <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase">통합 관제 센터 접근 보안</p>
            </div>
            <div className="bg-[#111111] p-6 rounded-[30px] border border-zinc-800 shadow-2xl space-y-6">
               <input 
                 type="password" 
                 maxLength={4}
                 placeholder="PIN CODE"
                 className="w-full bg-[#0a0a0a] text-center text-white py-4 text-3xl tracking-[1em] rounded-2xl border border-zinc-700 focus:border-[#CFA356] focus:ring-1 focus:ring-[#CFA356] outline-none transition-all"
                 value={pinCode}
                 onChange={(e) => setPinCode(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
               />
               <button onClick={handleAuth} className="w-full py-4 bg-[#CFA356] text-black font-black text-lg rounded-xl hover:bg-[#E4C381] transition-all">DECRYPT & ENTER</button>
            </div>
         </div>
      </div>
    );
  }

  // [관제 센터 화면]
  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden pb-24 relative">
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] -z-10"></div>
      <GNB />
      
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-48 leading-relaxed">
        {step === "dashboard" ? (
          <div className="space-y-12 animate-in fade-in">
             <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
               <div>
                 <h2 className="text-3xl font-black text-white flex items-center gap-3"><Database className="text-[#CFA356]" /> LifeCode Control Center</h2>
                 <p className="text-zinc-500 text-sm tracking-widest mt-2 uppercase">마스터 영적 처방 조립 라인</p>
               </div>
               <Unlock className="text-[#CFA356] w-6 h-6" />
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 데이터 주입 패널 */}
                <div className="bg-[#111111]/80 backdrop-blur-md border border-zinc-800 rounded-[30px] p-8 shadow-2xl space-y-6">
                   <h3 className="text-[#CFA356] font-black text-lg border-b border-zinc-800 pb-3 uppercase tracking-widest text-[11px]">Data Injection</h3>
                   
                   <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase">1. 사주 명리 (일간)</label>
                        <select className="w-full bg-[#0a0a0a] text-white p-4 rounded-xl border border-zinc-700 focus:border-[#CFA356] outline-none" value={clientData.saju} onChange={e => setClientData({...clientData, saju: e.target.value})}>
                          {SAJU_DM.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase">2. 에니어그램 (주 유형)</label>
                        <select className="w-full bg-[#0a0a0a] text-white p-4 rounded-xl border border-zinc-700 focus:border-[#CFA356] outline-none" value={clientData.enneagram} onChange={e => setClientData({...clientData, enneagram: e.target.value})}>
                          {ENNEAGRAM_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase">3. 도형 심리 (1차 주 기질)</label>
                        <select className="w-full bg-[#0a0a0a] text-white p-4 rounded-xl border border-zinc-700 focus:border-[#CFA356] outline-none" value={clientData.shape} onChange={e => setClientData({...clientData, shape: e.target.value})}>
                          {SHAPES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-zinc-400 font-bold uppercase">4. 타로 아르카나 (핵심 과제)</label>
                        <select className="w-full bg-[#0a0a0a] text-white p-4 rounded-xl border border-zinc-700 focus:border-[#CFA356] outline-none" value={clientData.tarot} onChange={e => setClientData({...clientData, tarot: e.target.value})}>
                          {TAROT_MAJORS.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                     </div>
                   </div>
                </div>

                {/* 상태 모니터링 패널 */}
                <div className="bg-[#111111]/80 backdrop-blur-md border border-zinc-800 rounded-[30px] p-8 shadow-2xl flex flex-col">
                   <h3 className="text-zinc-500 font-black text-lg border-b border-zinc-800 pb-3 uppercase tracking-widest text-[11px] mb-6">Matrix Overview</h3>
                   <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="bg-[#0a0a0a] rounded-2xl p-4 flex flex-col justify-center items-center text-center border border-zinc-800"><Compass className="text-[#CFA356] w-6 h-6 mb-2" /><span className="text-[10px] text-zinc-500">운명 코드</span><span className="font-bold">{clientData.saju.split('(')[0]}</span></div>
                      <div className="bg-[#0a0a0a] rounded-2xl p-4 flex flex-col justify-center items-center text-center border border-zinc-800"><Brain className="text-[#CFA356] w-6 h-6 mb-2" /><span className="text-[10px] text-zinc-500">에고 타입</span><span className="font-bold">Type {clientData.enneagram.split('(')[0]}</span></div>
                      <div className="bg-[#0a0a0a] rounded-2xl p-4 flex flex-col justify-center items-center text-center border border-zinc-800"><Target className="text-[#CFA356] w-6 h-6 mb-2" /><span className="text-[10px] text-zinc-500">투사 기질</span><span className="font-bold">{clientData.shape.split('(')[0]}</span></div>
                      <div className="bg-[#0a0a0a] rounded-2xl p-4 flex flex-col justify-center items-center text-center border border-zinc-800"><Layers className="text-[#CFA356] w-6 h-6 mb-2" /><span className="text-[10px] text-zinc-500">무의식 심연</span><span className="font-bold">{clientData.tarot.split(' ')[1]}</span></div>
                   </div>
                   <button onClick={handleSynthesize} className="w-full py-5 mt-6 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-xl rounded-xl shadow-[0_0_30px_rgba(207,163,86,0.2)] hover:brightness-110 active:scale-95 transition-all">통합 영적 처방 알고리즘 가동</button>
                </div>
             </div>
          </div>
        ) : step === "synthesizing" ? (
          <div className="py-40 flex flex-col items-center gap-6"><RefreshCw className="w-16 h-16 text-[#CFA356] animate-spin" /><p className="font-black italic animate-pulse tracking-widest uppercase text-center">Synthesizing 4D Metadata & <br/>Generating Spiritual Prescription...</p></div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700">
             <header className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8">
               <div>
                  <span className="text-[#CFA356] text-[10px] tracking-[0.5em] uppercase pb-1">Master Prescription</span>
                  <h2 className="text-4xl font-black mt-2">단 하나의 영적 솔루션</h2>
               </div>
               <button onClick={() => setStep("dashboard")} className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors"><RefreshCw className="w-5 h-5 text-zinc-400" /></button>
             </header>

             {/* 통합 처방전 출력부 (부드럽고 풍성한 문체 적용) */}
             <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#CFA356]/30 rounded-[40px] p-8 md:p-12 shadow-[0_0_50px_rgba(207,163,86,0.1)] leading-loose text-lg md:text-xl font-light text-zinc-200 text-justify break-keep space-y-8">
                <p><span className="text-3xl font-black text-[#CFA356] font-serif pr-2">당</span>신의 영혼은 우주의 깊은 지혜가 담긴 명리의 <strong>'{clientData.saju.split('(')[0]}'</strong> 에너지를 품고 태어났으며, 이는 <strong>'{clientData.shape.split('(')[0]}'</strong>의 궤적을 그리며 세상과 치열하게 호흡해 왔습니다. 겉으로는 단단한 성곽처럼 스스로를 지키려 애썼지만, 내면의 심연에서는 에니어그램 <strong>{clientData.enneagram.split('(')[0]}번</strong> 특유의 근원적 두려움이 그림자처럼 당신의 발목을 붙잡고 있었군요.</p>
                <p>타로의 계시인 <strong>{clientData.tarot}</strong>의 울림은 우연이 아닙니다. 지금 당신이 겪고 있는 혼란과 상실감, 그리고 통제할 수 없는 현실에 대한 분노는 결코 당신이 실패했음을 의미하지 않습니다. 그것은 오히려 당신이 쌓아 올린 낡은 방어기제의 허물이 벗겨지고, 거룩한 빛이 스며들기 위해 균열이 생기는 <strong>위대하고도 아픈 축복의 과정</strong>입니다.</p>
                <div className="p-6 bg-[#CFA356]/10 border-l-4 border-[#CFA356] rounded-r-2xl my-8">
                   <p className="font-bold text-[#CFA356] italic">"내려놓음은 포기가 아니라, 더 거대한 섭리에 나를 맡기는 가장 용기 있는 결단입니다."</p>
                </div>
                <p>이제 스스로 모든 것을 통제하려는 필사적인 노력을 멈추십시오. 척박한 현실의 무게에 짓눌려 숨죽여 우는 당신의 결핍된 자아를 온전히 끌어안으십시오. 당신을 향한 흠 없는 시선, 그 완전한 절대자의 사랑 앞에 당신의 찢겨진 캔버스를 펼쳐놓을 때입니다. 비로소 당신의 영혼은 질식할 듯한 굴레에서 벗어나 <strong>찬란하고 고귀한 본연의 형상으로 부활</strong>하게 될 것입니다.</p>
             </div>

             <div className="flex gap-4 pt-8">
                <button className="flex-1 py-5 bg-white text-black font-black rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-200 transition-all"><Share className="w-5 h-5" /> 내담자에게 리포트 전송</button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 종합 영적 처방 생성기 (더미 로직이지만, 실제 문맥에서는 입력값을 파싱하여 동적으로 문장을 치환하는 알고리즘 적용 가능)
function generateMasterPrescription(data: any) {
  // 현재 코드는 UI 컴포넌트 내부에 JSX로 직접 렌더링하도록 처리했습니다. 
  // 백엔드가 붙는다면 이 함수에서 OpenAI 프롬프트를 생성하여 API를 호출하게 됩니다.
  return data; 
}

export default function Page() { return <Suspense fallback={null}><ControlCenterEngine /></Suspense>; }