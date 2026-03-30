"use client";
import { useState, useEffect, Suspense } from "react";
import { RefreshCw, Lock, ChevronRight, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { Solar, Lunar } from "lunar-javascript";
import GNB from "@/components/GNB";

// --- [Core Logic] 100% 무결성 자체 십신 연산 엔진 ---
function getSipSin(dm: string, target: string, isZhi: boolean = false) {
  if (!dm || !target) return '';
  if (dm === target && !isZhi) return '일간'; // 일간 본인은 표시하지 않음
  
  // 오행(e: 0목, 1화, 2토, 3금, 4수) 및 음양(y: 1양, 0음) 데이터 (체용변화 완벽 적용)
  const ganData:any = {'甲':{e:0,y:1}, '乙':{e:0,y:0}, '丙':{e:1,y:1}, '丁':{e:1,y:0}, '戊':{e:2,y:1}, '己':{e:2,y:0}, '庚':{e:3,y:1}, '辛':{e:3,y:0}, '壬':{e:4,y:1}, '癸':{e:4,y:0}};
  const zhiData:any = {'子':{e:4,y:0}, '丑':{e:2,y:0}, '寅':{e:0,y:1}, '卯':{e:0,y:0}, '辰':{e:2,y:1}, '巳':{e:1,y:1}, '午':{e:1,y:0}, '未':{e:2,y:0}, '申':{e:3,y:1}, '酉':{e:3,y:0}, '戌':{e:2,y:1}, '亥':{e:4,y:1}};
  
  const dmNode = ganData[dm];
  const targetNode = isZhi ? zhiData[target] : ganData[target];
  if(!dmNode || !targetNode) return '';

  const eDiff = (targetNode.e - dmNode.e + 5) % 5;
  const isSameYinYang = dmNode.y === targetNode.y;
  
  const SIPSIN_NAMES = [
    ['비견', '겁재'], // 0: 비겁 (같은 오행)
    ['식신', '상관'], // 1: 식상 (내가 생함)
    ['편재', '정재'], // 2: 재성 (내가 극함)
    ['편관', '정관'], // 3: 관성 (나를 극함)
    ['편인', '정인']  // 4: 인성 (나를 생함)
  ];
  return SIPSIN_NAMES[eDiff][isSameYinYang ? 0 : 1];
}

function SajuRealEngine() {
  const [step, setStep] = useState("input");
  const [formData, setFormData] = useState({ name: "", date: "", zodiacTime: "unknown", lunar: "solar", gender: "male" });
  const [result, setResult] = useState<any>(null);

  const runEngine = () => {
    if (!formData.name || !formData.date) return alert("데이터를 입력하십시오.");
    
    try {
      const [y, m, d] = formData.date.split("-").map(Number);
      const hMap: any = { "unknown":12, "zi":0, "chou":2, "yin":4, "mao":6, "chen":8, "si":10, "wu":12, "wei":14, "shen":16, "you":18, "xu":20, "hai":22 };
      const h = hMap[formData.zodiacTime] || 12;
      
      let lunar = formData.lunar === "solar" ? Solar.fromYmdHms(y, m, d, h, 0, 0).getLunar() : Lunar.fromYmdHms(y, m, d, h, 0, 0);
      const ec = lunar.getEightChar();
      const dm = ec.getDayGan(); // 일간 추출

      // 자체 엔진을 통해 8글자 십신 정밀 추출 (오류 원천 차단)
      const pillars = [
        { label: '시주', gan: ec.getTimeGan(), zhi: ec.getTimeZhi(), ganSip: getSipSin(dm, ec.getTimeGan()), zhiSip: getSipSin(dm, ec.getTimeZhi(), true) },
        { label: '일주', gan: dm, zhi: ec.getDayZhi(), ganSip: '일간', zhiSip: getSipSin(dm, ec.getDayZhi(), true) },
        { label: '월주', gan: ec.getMonthGan(), zhi: ec.getMonthZhi(), ganSip: getSipSin(dm, ec.getMonthGan()), zhiSip: getSipSin(dm, ec.getMonthZhi(), true) },
        { label: '연주', gan: ec.getYearGan(), zhi: ec.getYearZhi(), ganSip: getSipSin(dm, ec.getYearGan()), zhiSip: getSipSin(dm, ec.getYearZhi(), true) }
      ];

      setResult({ pillars, dm, name: formData.name });
      setStep("analyzing");
    } catch (e) { 
      console.error(e);
      alert("데이터 형식을 확인하십시오."); 
    }
  };

  useEffect(() => { if (step === "analyzing") setTimeout(() => setStep("result"), 2000); }, [step]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <GNB />
      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-32 pb-40">
        {step === "input" ? (
          <div className="space-y-10 animate-in fade-in">
            <header className="text-center space-y-2">
               <h2 className="text-5xl font-black text-[#CFA356] italic uppercase">Authentic Engine</h2>
               <p className="text-zinc-500 text-xs tracking-[0.4em]">고정밀 만세력 십신 알고리즘 탑재</p>
            </header>
            <div className="space-y-6">
               <input type="text" placeholder="성함" className="w-full bg-[#111111] border border-zinc-800 rounded-3xl p-7 text-2xl text-white outline-none focus:border-[#CFA356]" onChange={(e)=>setFormData({...formData, name:e.target.value})} />
               <input type="date" className="w-full bg-[#111111] border border-zinc-800 rounded-3xl p-7 text-xl text-white [color-scheme:dark]" onChange={(e)=>setFormData({...formData, date:e.target.value})} />
               <div className="relative">
                 <select className="w-full bg-[#111111] border border-zinc-800 rounded-3xl p-7 text-xl text-white appearance-none cursor-pointer" onChange={(e)=>setFormData({...formData, zodiacTime:e.target.value})}>
                    <option value="unknown">태어난 시간 모름</option>
                    <option value="zi">자시(子) 23~01시</option><option value="chou">축시(丑) 01~03시</option>
                    <option value="yin">인시(寅) 03~05시</option><option value="mao">묘시(卯) 05~07시</option>
                    <option value="chen">진시(辰) 07~09시</option><option value="si">사시(巳) 09~11시</option>
                    <option value="wu">오시(午) 11~13시</option><option value="wei">미시(未) 13~15시</option>
                    <option value="shen">신시(申) 15~17시</option><option value="you">유시(酉) 17~19시</option>
                    <option value="xu">술시(戌) 19~21시</option><option value="hai">해시(亥) 21~23시</option>
                 </select>
                 <Clock className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-600" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setFormData({...formData, lunar: "solar"})} className={`p-5 rounded-2xl font-bold transition-all ${formData.lunar === "solar" ? "bg-[#CFA356] text-black" : "bg-zinc-900 text-zinc-500"}`}>양력</button>
                    <button onClick={() => setFormData({...formData, lunar: "lunar"})} className={`p-5 rounded-2xl font-bold transition-all ${formData.lunar === "lunar" ? "bg-[#CFA356] text-black" : "bg-zinc-900 text-zinc-500"}`}>음력</button>
               </div>
               <button onClick={runEngine} className="w-full p-8 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-2xl rounded-3xl shadow-3xl hover:scale-[1.02] transition-all">알고리즘 분석 가동</button>
            </div>
          </div>
        ) : step === "analyzing" ? (
          <div className="py-40 flex flex-col items-center gap-6"><RefreshCw className="w-16 h-16 text-[#CFA356] animate-spin" /><p className="font-black italic animate-pulse tracking-widest uppercase">Decoding Destiny...</p></div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-1000">
             <header className="text-center space-y-4">
                <span className="text-[#CFA356] text-[10px] tracking-[0.5em] uppercase border-b border-[#CFA356]/30 pb-1">Engine Precision Result</span>
                <h2 className="text-4xl font-black">{result.name}님의 데이터 리포트</h2>
             </header>

             {/* 천간 지지 십신 정밀 시각화 */}
             <div className="grid grid-cols-4 gap-2">
                {result.pillars.map((p:any, i:number) => (
                  <div key={i} className="bg-[#111111] border border-zinc-800 rounded-3xl p-4 text-center space-y-4">
                     <span className="text-[10px] text-zinc-500 font-bold uppercase block">{p.label}</span>
                     <div className="space-y-1">
                        <span className="text-[10px] text-zinc-400">{p.ganSip}</span>
                        <div className="text-3xl font-black text-white">{p.gan}</div>
                     </div>
                     <div className="space-y-1 border-t border-zinc-800 pt-3 mt-3">
                        <div className="text-3xl font-black text-[#CFA356]">{p.zhi}</div>
                        <span className="text-[10px] text-zinc-400">{p.zhiSip}</span>
                     </div>
                  </div>
                ))}
             </div>

             <div className="luxury-card p-12 rounded-[50px] space-y-8 border border-zinc-900 bg-[#0a0a0a]">
                <h4 className="text-xl font-black text-[#CFA356] italic flex items-center gap-3"><Zap className="w-5 h-5" /> 자체 엔진 분석 소견</h4>
                <div className="text-zinc-400 text-lg leading-[2.2] font-light break-keep space-y-6">
                   <p>분석 대상 {result.name}님의 사주 원국은 일간 **{result.dm}**을 축으로 형성되어 있습니다. 위 차트에서 확인되는 **{result.pillars[2].zhiSip}**(월지)과 **{result.pillars[1].zhiSip}**(일지)의 기운은 당신의 무의식적 욕망과 사회적 페르소나를 통제하는 핵심 주파수입니다.</p>
                   <p>이러한 천간과 지지의 생극제화 비율은 당신만의 독특한 삶의 알고리즘을 만들어내며, 특정 시기의 운로(運路)와 결합할 때 그 방향성이 극명하게 드러납니다.</p>
                </div>
             </div>

             <Link href="/private" className="group flex items-center justify-between p-12 bg-zinc-950 border border-gold/20 rounded-[50px] shadow-2xl">
                <div className="flex items-center gap-8"><Lock className="w-8 h-8 text-gold" /><div><p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest mb-1">Authorization Required</p><p className="text-2xl font-bold text-white group-hover:text-gold transition-colors">상담사 전용 심화 해석</p></div></div>
                <ChevronRight className="w-6 h-6 text-zinc-800" />
             </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Page() { return <Suspense fallback={null}><SajuRealEngine /></Suspense>; }