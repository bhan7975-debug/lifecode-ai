"use client";
import { useState, useEffect, Suspense } from "react";
import { RefreshCw, Lock, ChevronRight, ChevronLeft, Zap, Clock, BookOpen, Activity, Heart, Coins, Target } from "lucide-react";
import Link from "next/link";
import { Solar, Lunar } from "lunar-javascript";
import GNB from "@/components/GNB";

function getSipSin(dm: string, target: string, isZhi: boolean = false) {
  if (!dm || !target) return '';
  if (dm === target && !isZhi) return '일간';
  const ganData:any = {'甲':{e:0,y:1}, '乙':{e:0,y:0}, '丙':{e:1,y:1}, '丁':{e:1,y:0}, '戊':{e:2,y:1}, '己':{e:2,y:0}, '庚':{e:3,y:1}, '辛':{e:3,y:0}, '壬':{e:4,y:1}, '癸':{e:4,y:0}};
  const zhiData:any = {'子':{e:4,y:0}, '丑':{e:2,y:0}, '寅':{e:0,y:1}, '卯':{e:0,y:0}, '辰':{e:2,y:1}, '巳':{e:1,y:1}, '午':{e:1,y:0}, '未':{e:2,y:0}, '申':{e:3,y:1}, '酉':{e:3,y:0}, '戌':{e:2,y:1}, '亥':{e:4,y:1}};
  
  const dmNode = ganData[dm];
  const targetNode = isZhi ? zhiData[target] : ganData[target];
  if(!dmNode || !targetNode) return '';

  const eDiff = (targetNode.e - dmNode.e + 5) % 5;
  const isSameYinYang = dmNode.y === targetNode.y;
  const SIPSIN_NAMES = [['비견', '겁재'], ['식신', '상관'], ['편재', '정재'], ['편관', '정관'], ['편인', '정인']];
  return SIPSIN_NAMES[eDiff][isSameYinYang ? 0 : 1];
}

const ELEMENT_MAP: any = { '甲':'木','乙':'木','寅':'木','卯':'木', '丙':'火','丁':'火','巳':'火','午':'火', '戊':'土','己':'土','辰':'土','戌':'土','丑':'土','未':'土', '庚':'金','辛':'金','申':'金','酉':'金', '壬':'水','癸':'水','亥':'水','子':'水' };

function SajuRealEngine() {
  const [step, setStep] = useState("input");
  const [formData, setFormData] = useState({ name: "", date: "", zodiacTime: "unknown", lunar: "solar", gender: "male" });
  const [result, setResult] = useState<any>(null);
  const [reportPage, setReportPage] = useState(1);

  const runEngine = () => {
    if (!formData.name || !formData.date) return alert("데이터를 입력하십시오.");
    
    try {
      const [y, m, d] = formData.date.split("-").map(Number);
      const hMap: any = { "unknown":12, "zi":0, "chou":2, "yin":4, "mao":6, "chen":8, "si":10, "wu":12, "wei":14, "shen":16, "you":18, "xu":20, "hai":22 };
      const h = hMap[formData.zodiacTime] || 12;
      
      let lunar = formData.lunar === "solar" ? Solar.fromYmdHms(y, m, d, h, 0, 0).getLunar() : Lunar.fromYmdHms(y, m, d, h, 0, 0);
      const ec = lunar.getEightChar();
      const dm = ec.getDayGan(); 
      const dz = ec.getDayZhi();

      const pillars = [
        { label: '시주', gan: ec.getTimeGan(), zhi: ec.getTimeZhi(), ganSip: getSipSin(dm, ec.getTimeGan()), zhiSip: getSipSin(dm, ec.getTimeZhi(), true) },
        { label: '일주', gan: dm, zhi: dz, ganSip: '일간', zhiSip: getSipSin(dm, dz, true) },
        { label: '월주', gan: ec.getMonthGan(), zhi: ec.getMonthZhi(), ganSip: getSipSin(dm, ec.getMonthGan()), zhiSip: getSipSin(dm, ec.getMonthZhi(), true) },
        { label: '연주', gan: ec.getYearGan(), zhi: ec.getYearZhi(), ganSip: getSipSin(dm, ec.getYearGan()), zhiSip: getSipSin(dm, ec.getYearZhi(), true) }
      ];

      const chars = [ec.getTimeGan(), ec.getTimeZhi(), dm, dz, ec.getMonthGan(), ec.getMonthZhi(), ec.getYearGan(), ec.getYearZhi()];
      let scores: any = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
      chars.forEach(c => { if (ELEMENT_MAP[c]) scores[ELEMENT_MAP[c]]++; });
      
      const sortedElements = Object.entries(scores).sort((a:any, b:any) => b[1] - a[1]);
      const strongest = sortedElements[0][0];
      const weakest = sortedElements[4][0];

      const reportData = generateDeepSajuReport(dm, dz, formData.gender, strongest, weakest, formData.name);

      setResult({ pillars, reportData, name: formData.name });
      setStep("analyzing");
    } catch (e) { alert("데이터 형식을 확인하십시오."); }
  };

  useEffect(() => { if (step === "analyzing") setTimeout(() => setStep("result"), 1500); }, [step]);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden pb-24 relative">
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] -z-10"></div>
      
      <GNB />
      
      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-48">
        {step === "input" ? (
          <div className="space-y-12 animate-in fade-in">
            <header className="text-center space-y-3">
               <h2 className="text-4xl md:text-5xl font-black text-[#CFA356] italic uppercase drop-shadow-lg">LifeCode Saju</h2>
               <p className="text-zinc-400 text-sm tracking-widest">3단계 정밀 명리 알고리즘</p>
            </header>
            
            <div className="space-y-8">
               {/* [수정 포인트] bg-white 및 text-black 적용 */}
               <div className="space-y-2">
                 <label className="text-[11px] text-[#CFA356] font-bold tracking-[0.2em] ml-2 uppercase">Subject Name</label>
                 <input type="text" placeholder="성함을 입력하세요" className="w-full bg-white border border-zinc-300 rounded-2xl px-6 py-5 text-xl text-black placeholder-zinc-400 outline-none focus:border-[#CFA356] focus:ring-4 focus:ring-[#CFA356]/20 shadow-xl transition-all" onChange={(e)=>setFormData({...formData, name:e.target.value})} />
               </div>
               
               <div className="space-y-2">
                 <label className="text-[11px] text-[#CFA356] font-bold tracking-[0.2em] ml-2 uppercase">Birth Date</label>
                 <input type="date" className="w-full bg-white border border-zinc-300 rounded-2xl px-6 py-5 text-xl text-black shadow-xl [color-scheme:light] outline-none focus:border-[#CFA356] focus:ring-4 focus:ring-[#CFA356]/20 transition-all" onChange={(e)=>setFormData({...formData, date:e.target.value})} />
               </div>

               <div className="space-y-2">
                 <label className="text-[11px] text-[#CFA356] font-bold tracking-[0.2em] ml-2 uppercase">Birth Time</label>
                 <div className="relative">
                   <select className="w-full bg-white border border-zinc-300 rounded-2xl px-6 py-5 text-xl text-black appearance-none cursor-pointer shadow-xl outline-none focus:border-[#CFA356] focus:ring-4 focus:ring-[#CFA356]/20 transition-all" onChange={(e)=>setFormData({...formData, zodiacTime:e.target.value})}>
                      <option value="unknown">태어난 시간 모름</option>
                      <option value="zi">자시(子) 23~01시</option><option value="chou">축시(丑) 01~03시</option>
                      <option value="yin">인시(寅) 03~05시</option><option value="mao">묘시(卯) 05~07시</option>
                      <option value="chen">진시(辰) 07~09시</option><option value="si">사시(巳) 09~11시</option>
                      <option value="wu">오시(午) 11~13시</option><option value="wei">미시(未) 13~15시</option>
                      <option value="shen">신시(申) 15~17시</option><option value="you">유시(酉) 17~19시</option>
                      <option value="xu">술시(戌) 19~21시</option><option value="hai">해시(亥) 21~23시</option>
                   </select>
                   <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                 <div className="space-y-2">
                   <label className="text-[11px] text-[#CFA356] font-bold tracking-[0.2em] ml-2 uppercase">Calendar</label>
                   <div className="flex gap-2">
                      <button onClick={() => setFormData({...formData, lunar: "solar"})} className={`flex-1 py-4 rounded-2xl font-bold transition-all border shadow-lg ${formData.lunar === "solar" ? "bg-[#CFA356] border-[#CFA356] text-black" : "bg-[#111111]/80 border-zinc-700 text-zinc-400 hover:text-white"}`}>양력</button>
                      <button onClick={() => setFormData({...formData, lunar: "lunar"})} className={`flex-1 py-4 rounded-2xl font-bold transition-all border shadow-lg ${formData.lunar === "lunar" ? "bg-[#CFA356] border-[#CFA356] text-black" : "bg-[#111111]/80 border-zinc-700 text-zinc-400 hover:text-white"}`}>음력</button>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[11px] text-[#CFA356] font-bold tracking-[0.2em] ml-2 uppercase">Gender</label>
                   <div className="flex gap-2">
                      <button onClick={() => setFormData({...formData, gender: "male"})} className={`flex-1 py-4 rounded-2xl font-bold transition-all border shadow-lg ${formData.gender === "male" ? "bg-[#CFA356] border-[#CFA356] text-black" : "bg-[#111111]/80 border-zinc-700 text-zinc-400 hover:text-white"}`}>남성</button>
                      <button onClick={() => setFormData({...formData, gender: "female"})} className={`flex-1 py-4 rounded-2xl font-bold transition-all border shadow-lg ${formData.gender === "female" ? "bg-[#CFA356] border-[#CFA356] text-black" : "bg-[#111111]/80 border-zinc-700 text-zinc-400 hover:text-white"}`}>여성</button>
                   </div>
                 </div>
               </div>

               <button onClick={runEngine} className="w-full py-6 mt-4 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-2xl rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all">정밀 분석 가동</button>
            </div>
          </div>
        ) : step === "analyzing" ? (
          <div className="py-40 flex flex-col items-center gap-6"><RefreshCw className="w-16 h-16 text-[#CFA356] animate-spin" /><p className="font-black italic animate-pulse tracking-widest uppercase">Extracting Destiny Codes...</p></div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-700">
             <div className="bg-[#111111]/80 backdrop-blur-md border border-zinc-700 rounded-[30px] p-6 shadow-2xl">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {result.pillars.map((p:any, i:number) => (
                    <div key={i} className="space-y-2">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">{p.label}</span>
                      <div className="border-b border-zinc-800 pb-2"><span className="text-[9px] text-[#CFA356] block mb-1">{p.ganSip}</span><span className="text-2xl font-black text-white">{p.gan}</span></div>
                      <div className="pt-1"><span className="text-2xl font-black text-white">{p.zhi}</span><span className="text-[9px] text-[#CFA356] block mt-1">{p.zhiSip}</span></div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="flex justify-between items-center bg-[#111111]/80 backdrop-blur-md rounded-full p-2 border border-zinc-700 shadow-xl">
               {[1, 2, 3].map((num) => (
                 <button key={num} onClick={() => setReportPage(num)} className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${reportPage === num ? 'bg-[#CFA356] text-black shadow-lg' : 'text-zinc-400 hover:text-white'}`}>
                   PAGE 0{num}
                 </button>
               ))}
             </div>

             <div className="min-h-[400px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-zinc-700 rounded-[40px] p-8 md:p-10 shadow-2xl">
               {reportPage === 1 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="1. 일주 성격풀이" icon={<Zap />} body={result.reportData.p1.personality} />
                   <Section title="2. 살(殺)풀이 분석" icon={<Target />} body={result.reportData.p1.sal} />
                   <Section title="3. 인생 전체 운 흐름 (대운)" icon={<BookOpen />} body={result.reportData.p1.daewun} />
                 </div>
               )}
               {reportPage === 2 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="4. 2026 병오년 운세 (세운)" icon={<Clock />} body={result.reportData.p2.sewun} />
                   <Section title="5. 진로 및 적성 풀이" icon={<Target />} body={result.reportData.p2.career} />
                   <Section title="6. 건강 운 풀이" icon={<Activity />} body={result.reportData.p2.health} />
                 </div>
               )}
               {reportPage === 3 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="7. 재물 운 분석" icon={<Coins />} body={result.reportData.p3.wealth} />
                   <Section title="8. 연애 및 결혼운" icon={<Heart />} body={result.reportData.p3.love} />
                 </div>
               )}
             </div>

             <div className="flex justify-between gap-4">
                <button disabled={reportPage === 1} onClick={() => setReportPage(prev => prev - 1)} className="flex-1 py-5 rounded-[20px] bg-[#111111]/80 backdrop-blur-md border border-zinc-700 flex justify-center items-center disabled:opacity-30 shadow-xl"><ChevronLeft className="text-white" /></button>
                <button disabled={reportPage === 3} onClick={() => setReportPage(prev => prev + 1)} className="flex-1 py-5 rounded-[20px] bg-[#111111]/80 backdrop-blur-md border border-zinc-700 flex justify-center items-center disabled:opacity-30 shadow-xl"><ChevronRight className="text-white" /></button>
             </div>

             <Link href="/private" className="group flex items-center justify-between p-10 bg-gradient-to-r from-zinc-950/90 to-[#111]/90 backdrop-blur-xl border border-[#CFA356]/40 rounded-[30px] shadow-2xl mt-12">
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

function generateDeepSajuReport(dm: string, dz: string, gender: string, strongest: string, weakest: string, name: string) {
  const dmNature: any = { '甲':'거목','乙':'화초','丙':'태양','丁':'촛불','戊':'태산','己':'대지','庚':'원석','辛':'보석','壬':'바다','癸':'옹달샘' };
  return {
    p1: {
      personality: `${name}님의 본질은 일간 '${dm}(${dmNature[dm]})'의 기운을 띠고 있습니다. 이는 자신만의 확고한 철학과 원칙을 지키려는 성향을 의미합니다. 일지 '${dz}'의 영향으로 겉으로는 부드러워 보일지라도 내면에는 누구도 꺾을 수 없는 강한 자존심과 독립심이 내재되어 있습니다. 타인의 간섭을 싫어하며 스스로 납득해야만 움직이는 주도적인 기질입니다.`,
      sal: `원국 내 글자들의 조합을 분석한 결과, 특수 에너지인 '도화(桃花)' 혹은 '화개(華蓋)'의 기운이 감지됩니다. 이는 현대 사회에서 대중의 이목을 끌거나, 예술적/종교적 통찰력이 뛰어남을 암시합니다. 이러한 에너지는 고난을 겪을 때 오히려 자신을 지키는 강력한 무기로 발현됩니다.`,
      daewun: `인생 전체를 지배하는 대운의 흐름을 보면, 선천적으로 '${strongest}'의 기운이 강하여 초중년에는 자신의 신념을 밀어붙이는 돌파력이 돋보입니다. 인생의 후반부로 갈수록 결핍되어 있는 '${weakest}'의 기운을 보완하는 운로(運路)가 열리며, 극단적이었던 성향이 중용을 찾고 사회적 안정을 이룩하는 대기만성형 흐름을 보입니다.`
    },
    p2: {
      sewun: `2026년(병오년)은 강력한 붉은 말(火)의 기운이 들어오는 해입니다. ${strongest === '火' ? '이미 원국에 열기가 충분한 상태에서 불이 더해지니, 번아웃이나 대인관계의 충돌(구설수)을 극도로 경계해야 합니다.' : '당신에게 부족했던 추진력과 열정이 폭발적으로 공급되는 해입니다. 미뤄두었던 일을 시작하기에 최적의 타이밍입니다.'}`,
      career: `조직의 부품으로 일하기보다는 독립적인 권한이 주어지는 환경에서 능력을 발휘합니다. 오행 중 '${strongest}'이 가장 강하므로, ${strongest === '木' ? '교육, 기획, 건축' : strongest === '火' ? 'IT, 방송, 마케팅' : strongest === '土' ? '부동산, 상담, 중개' : strongest === '金' ? '금융, 법률, 기술' : '연구, 예술, 무역'} 분야의 적성이 가장 높게 측정됩니다.`,
      health: `에너지의 불균형 측면에서 '${weakest}'의 기운이 취약합니다. 명리학적으로 ${weakest === '木' ? '간/담' : weakest === '火' ? '심혈관/눈' : weakest === '土' ? '위장/소화기' : weakest === '金' ? '호흡기/대장' : '신장/비뇨기'} 계통의 질환에 취약할 수 있으니, 해당 부위에 대한 주기적인 스트레스 관리와 예방이 필수적입니다.`
    },
    p3: {
      wealth: `일확천금을 노리는 투기성 재물보다는, 시스템과 구조를 만들어내는 '정재(正財)' 성향의 안정적 재산 축적에 유리한 원국입니다. 재물의 그릇 자체는 작지 않으나, 감정적인 기복에 의해 지출이 발생할 수 있으니 문서(부동산, 신탁) 형태로 자산을 묶어두는 전략이 당신의 재물운을 극대화합니다.`,
      love: `배우자나 연인을 선택할 때 외적인 조건보다 '나를 정신적으로 존중해 주는가'를 가장 중요하게 생각합니다. ${gender === 'male' ? '여자를 통제하려 하기보다 든든한 울타리가 되어주려는 성향입니다.' : '남성에게 의존하기보다 동등한 파트너십을 원합니다.'} 결혼운은 일찍 서두르기보다 자신의 사회적 기반이 안정된 후반부에 맺어지는 인연이 훨씬 견고합니다.`
    }
  };
}

export default function Page() { return <Suspense fallback={null}><SajuRealEngine /></Suspense>; }