"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import { RefreshCw, Lock, ChevronRight, ChevronLeft, Search, Layers, Brain, Target, Compass, Zap, Heart, Star, Eye, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

const TAROT_DECK = [
  { id: 0, name: "The Fool", symbol: <Star />, keyword: "자유, 시작, 순수", keywordRev: "무모함, 정체, 불안정" },
  { id: 1, name: "The Magician", symbol: <Zap />, keyword: "창조, 능력, 의지", keywordRev: "기만, 의지 부족, 조작" },
  { id: 2, name: "The High Priestess", symbol: <Brain />, keyword: "직관, 신비, 지혜", keywordRev: "숨겨진 비밀, 감정적 고립" },
  { id: 3, name: "The Empress", symbol: <Heart />, keyword: "풍요, 모성, 자연", keywordRev: "과보호, 결핍, 의존" },
  { id: 4, name: "The Emperor", symbol: <Target />, keyword: "권위, 질서, 통제", keywordRev: "독재, 무질서, 경직성" },
  { id: 5, name: "The Hierophant", symbol: <Compass />, keyword: "전통, 교육, 신념", keywordRev: "맹신, 규칙의 파괴, 반항" },
  { id: 6, name: "The Lovers", symbol: <Heart />, keyword: "선택, 결합, 관계", keywordRev: "갈등, 이별, 잘못된 선택" },
  { id: 7, name: "The Chariot", symbol: <Zap />, keyword: "승리, 전진, 의지", keywordRev: "통제력 상실, 패배, 무모한 돌진" },
  { id: 8, name: "Strength", symbol: <Target />, keyword: "용기, 인내, 내면의 힘", keywordRev: "나약함, 자기 의심, 두려움" },
  { id: 9, name: "The Hermit", symbol: <Search />, keyword: "고독, 탐구, 성찰", keywordRev: "고립, 현실 도피, 폐쇄성" },
  { id: 10, name: "Wheel of Fortune", symbol: <RefreshCw />, keyword: "운명, 변화, 순환", keywordRev: "불운, 통제 불능의 변화, 저항" },
  { id: 11, name: "Justice", symbol: <Target />, keyword: "정의, 균형, 인과", keywordRev: "불공정, 편견, 균형 상실" },
  { id: 12, name: "The Hanged Man", symbol: <Compass />, keyword: "희생, 관점 전환, 정지", keywordRev: "무의미한 희생, 이기심, 저항" },
  { id: 13, name: "Death", symbol: <Layers />, keyword: "종결, 변형, 새 시작", keywordRev: "변화에 대한 두려움, 정체, 집착" },
  { id: 14, name: "Temperance", symbol: <RefreshCw />, keyword: "절제, 조화, 중용", keywordRev: "불균형, 무절제, 극단적 태도" },
  { id: 15, name: "The Devil", symbol: <Zap />, keyword: "속박, 유혹, 집착", keywordRev: "속박으로부터의 해방, 내적 깨달음" },
  { id: 16, name: "The Tower", symbol: <Zap />, keyword: "붕괴, 충격, 깨달음", keywordRev: "재난의 회피, 억압된 분노" },
  { id: 17, name: "The Star", symbol: <Star />, keyword: "희망, 영감, 치유", keywordRev: "절망, 실망, 영감의 고갈" },
  { id: 18, name: "The Moon", symbol: <Brain />, keyword: "혼돈, 환상, 잠재의식", keywordRev: "혼란의 해소, 기만의 발견" },
  { id: 19, name: "The Sun", symbol: <Star />, keyword: "성공, 활력, 기쁨", keywordRev: "지연된 성공, 과시, 활력 저하" },
  { id: 20, name: "Judgement", symbol: <Compass />, keyword: "부활, 용서, 결단", keywordRev: "후회, 결단 지연, 자기 비하" },
  { id: 21, name: "The World", symbol: <Layers />, keyword: "완성, 통합, 실현", keywordRev: "미완성, 정체, 한계 부딪힘" }
];

function GenerativeTarotCard({ card, isFlipped = false, onClick, variant = "large" }: { card?: any, isFlipped?: boolean, onClick?: () => void, variant?: "large" | "small" | "tiny" }) {
  const styles = {
    large: { width: '190px', height: '320px', borderRadius: '20px' },
    small: { width: '130px', height: '220px', borderRadius: '15px' },
    tiny: { width: '90px', height: '150px', borderRadius: '10px' }
  };
  const dim = styles[variant];

  const isReversed = card?.isReversed || false;

  return (
    <div 
      className={`relative ${onClick ? 'cursor-pointer' : ''}`}
      style={{ width: dim.width, height: dim.height, perspective: '1500px' }}
      onClick={onClick}
    >
      <div 
        className="absolute inset-0 w-full h-full duration-700 ease-in-out" 
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* 뒷면 (Back) */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
          style={{ 
            backgroundColor: '#0a0a0a', border: '2px solid rgba(207,163,86,0.6)', borderRadius: dim.borderRadius,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(207,163,86,0.1) 10px, rgba(207,163,86,0.1) 12px)'
          }}
        >
           <div className="relative w-12 h-12 md:w-16 md:h-16 border-4 border-[#CFA356] rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(207,163,86,0.5)]">
             <Eye className="w-6 h-6 md:w-8 md:h-8 text-[#CFA356] -rotate-45" />
           </div>
        </div>

        {/* 앞면 (Front) */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col items-center p-3 md:p-4 shadow-[inset_0_0_20px_rgba(207,163,86,0.2)]"
          style={{ 
            backgroundColor: '#111111', border: '2px solid #CFA356', borderRadius: dim.borderRadius,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' 
          }}
        >
          {card ? (
            // 부모 컨테이너는 정방향 유지
            <div className="relative w-full h-full flex flex-col">
              <div className="absolute top-0 left-0 text-[9px] font-bold text-zinc-500 font-mono">NO.{card.id}</div>
              <div className="flex-1 flex flex-col items-center justify-center w-full mt-3">
                {/* [수정] 픽토그램: 역방향 시 180도 회전 */}
                <div className={`text-[#CFA356] scale-[1.5] md:scale-[2] filter drop-shadow-[0_0_10px_rgba(207,163,86,0.8)] mb-3 transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}>
                  {card.symbol}
                </div>
                <div className="text-center w-full px-1 flex flex-col items-center">
                    {/* [수정] 영문 이름: 역방향 시 180도 회전 */}
                    <div className={`text-[#CFA356] font-black text-sm md:text-lg uppercase tracking-tighter leading-tight break-words transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}>
                      {card.name} 
                    </div>
                    {/* [수정] 한글 상태 라벨 및 키워드: 항상 정방향 유지 */}
                    {isReversed && <span className="block text-[8px] md:text-[10px] text-red-500/80 mt-1 font-bold">[REVERSED]</span>}
                    {variant !== "tiny" && <p className="text-zinc-400 text-[10px] md:text-xs font-light mt-1 md:mt-2 break-keep">{isReversed ? card.keywordRev : card.keyword}</p>}
                </div>
              </div>
              <div className="text-[8px] text-zinc-600 font-medium tracking-[0.2em] uppercase mt-auto pb-1 text-center w-full">LifeCode AI</div>
            </div>
          ) : (
             <RefreshCw className="w-6 h-6 text-[#CFA356] animate-spin m-auto" />
          )}
        </div>
      </div>
    </div>
  );
}

function TarotRevelationEngine() {
  const [step, setStep] = useState("mode");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [reportPage, setReportPage] = useState(1);
  const [result, setResult] = useState<any>(null);
  
  const [randomSpread, setRandomSpread] = useState<any[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState<any[]>([]);

  const initRandomMode = useCallback(() => {
    let deck = [...TAROT_DECK];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setShuffledDeck(deck);
    setRandomSpread(Array(12).fill({ isFlipped: false, card: null }));
    setSelectedCards([]);
    setStep("random");
  }, []);

  const handleRandomSelect = (index: number) => {
    if (selectedCards.length >= 3 || randomSpread[index].isFlipped || isDrawing) return;
    
    const isReversed = Math.random() > 0.5;
    const baseCard = shuffledDeck[selectedCards.length];
    const nextCard = { ...baseCard, isReversed };
    
    const newSpread = [...randomSpread];
    newSpread[index] = { isFlipped: true, card: nextCard };
    setRandomSpread(newSpread);
    setSelectedCards([...selectedCards, nextCard]);
  };

  const filteredCards = TAROT_DECK.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toString() === searchQuery
  );

  const handleManualSelect = (card: any, isReversed: boolean) => {
    if (selectedCards.find(c => c.id === card.id)) return;
    if (selectedCards.length < 3) setSelectedCards([...selectedCards, { ...card, isReversed }]);
  };

  const runEngine = () => {
    if (selectedCards.length < 3) return alert("해석을 위해 3장의 카드를 선택해야 합니다.");
    setResult({ cards: selectedCards, reportData: generateSpreadTarotReport(selectedCards) });
    setStep("analyzing");
  };

  useEffect(() => { if (step === "analyzing") setTimeout(() => setStep("result"), 2500); }, [step]);

  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    if(step === 'analyzing') setIsDrawing(true);
    else setIsDrawing(false);
  }, [step]);

  const spreadLabels = ["과거 (원인/배경)", "현재 (직면한 문제)", "미래 (흐름/조언)"];

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden pb-24 relative">
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] -z-10"></div>
      <GNB />
      
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-48 leading-relaxed">
        {step === "mode" ? (
          <div className="space-y-12 animate-in fade-in">
             <header className="text-center space-y-3">
               <h2 className="text-4xl md:text-5xl font-black text-[#CFA356] italic uppercase tracking-tighter">Tarot Revelation</h2>
               <p className="text-zinc-400 text-sm tracking-widest">운명의 아르카나를 해독하는 시간</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => setStep("manual")} className="group p-10 bg-[#111111]/80 border border-zinc-700 rounded-[30px] text-center space-y-4 hover:border-[#CFA356] transition-all shadow-xl">
                <Search className="w-12 h-12 mx-auto text-[#CFA356]" />
                <h3 className="text-2xl font-bold">수동 검색 입력 모드</h3>
                <p className="text-zinc-500 text-sm">카드 번호나 이름으로 정방향/역방향을 직접 지정</p>
              </button>
              <button onClick={initRandomMode} className="group p-10 bg-[#111111]/80 border border-zinc-700 rounded-[30px] text-center space-y-4 hover:border-[#CFA356] transition-all shadow-xl">
                <Layers className="w-12 h-12 mx-auto text-[#CFA356]" />
                <h3 className="text-2xl font-bold">운명의 랜덤 셔플 모드</h3>
                <p className="text-zinc-500 text-sm">시스템의 무작위 셔플을 통해 카드를 직접 선택</p>
              </button>
            </div>
          </div>
        ) : step === "manual" ? (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-xl">
              <button onClick={() => {setStep("mode"); setSelectedCards([]); setSearchQuery("");}} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all"><ChevronLeft /> 경로 선택</button>
              <p className="text-[#CFA356] font-bold">3-Card Spread: {selectedCards.length} / 3</p>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="카드 번호(0-21) 또는 이름을 입력하여 조회"
                className="w-full bg-white text-black py-5 px-14 rounded-2xl text-xl font-bold outline-none focus:ring-4 focus:ring-[#CFA356]/40 transition-all shadow-2xl placeholder-zinc-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-h-[480px] overflow-y-auto p-4 bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-inner custom-scrollbar">
               {filteredCards.map(card => {
                 const isSelected = selectedCards.find(c => c.id === card.id);
                 return (
                   <div key={card.id} className="relative group mx-auto">
                      <GenerativeTarotCard card={card} isFlipped={true} variant="tiny" />
                      {!isSelected && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-[10px] transition-all p-2 z-10 bg-black/80 opacity-0 group-hover:opacity-100">
                           <button onClick={() => handleManualSelect(card, false)} className="w-full py-2 bg-zinc-800 hover:bg-[#CFA356] hover:text-black text-[10px] font-black uppercase rounded flex items-center justify-center gap-1"><ArrowUp className="w-3 h-3"/> 정방향</button>
                           <button onClick={() => handleManualSelect(card, true)} className="w-full py-2 bg-zinc-800 hover:bg-red-900 hover:text-white text-[10px] font-black uppercase rounded flex items-center justify-center gap-1"><ArrowDown className="w-3 h-3"/> 역방향</button>
                        </div>
                      )}
                      {isSelected && (
                         <div className="absolute inset-0 flex items-center justify-center bg-[#CFA356]/90 rounded-[10px] z-10"><span className="text-[10px] font-black text-black uppercase">Selected</span></div>
                      )}
                   </div>
                 );
               })}
            </div>

            {selectedCards.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8 border-t border-zinc-800 mt-12">
                 {selectedCards.map((c, i) => (
                   <div key={i} className="relative animate-in zoom-in flex flex-col items-center">
                      <span className="text-[#CFA356] font-black text-[10px] md:text-xs mb-3 uppercase tracking-widest">{spreadLabels[i]}</span>
                      <GenerativeTarotCard card={c} isFlipped={true} variant="small" />
                      <button onClick={() => setSelectedCards(selectedCards.filter(sc => sc.id !== c.id))} className="absolute top-6 -right-3 w-8 h-8 bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold border border-zinc-600 hover:bg-red-500 z-20">×</button>
                   </div>
                 ))}
                 {[...Array(3 - selectedCards.length)].map((_, i) => (
                   <div key={i+selectedCards.length} className="flex flex-col items-center">
                      <span className="text-zinc-600 font-bold text-[10px] md:text-xs mb-3 uppercase tracking-widest">{spreadLabels[i+selectedCards.length]}</span>
                      <div className="w-[130px] h-[220px] bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-[15px] flex items-center justify-center text-zinc-700 shadow-inner">Slot</div>
                   </div>
                 ))}
              </div>
            )}

            <button disabled={selectedCards.length < 3} onClick={runEngine} className="w-full py-6 mt-12 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-2xl rounded-2xl shadow-3xl hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all">스프레드 심층 분석 가동</button>
          </div>
        ) : step === "random" ? (
            <div className="space-y-8 animate-in fade-in">
                <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-xl">
                    <button onClick={() => {setStep("mode"); setRandomSpread([]);}} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all"><ChevronLeft /> 경로 선택</button>
                    <p className="text-[#CFA356] font-bold">3-Card Spread: {selectedCards.length} / 3</p>
                </div>

                <div className="bg-[#111111]/80 backdrop-blur-md border border-zinc-700 rounded-[30px] p-8 md:p-12 shadow-3xl">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {randomSpread.map((item, index) => (
                            <GenerativeTarotCard 
                                key={index} 
                                card={item.card} 
                                isFlipped={item.isFlipped} 
                                onClick={() => handleRandomSelect(index)} 
                                variant="small" 
                            />
                        ))}
                    </div>
                    {selectedCards.length < 3 && (
                        <div className="text-center mt-12 space-y-2 animate-pulse">
                            <Layers className="w-10 h-10 mx-auto text-[#CFA356]" />
                            <p className="text-zinc-400 font-bold">도화지 위에 펼쳐진 운명의 뒷면을 터치하여 3장의 카드를 순서대로 뽑으십시오.</p>
                            <p className="text-zinc-600 text-xs">과거 - 현재 - 미래 순으로 배열됩니다.</p>
                        </div>
                    )}
                </div>

                <button disabled={selectedCards.length < 3} onClick={runEngine} className="w-full py-6 mt-12 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-2xl rounded-2xl shadow-3xl hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all">선택된 아르카나 해독 시작</button>
            </div>
        ) : step === "analyzing" ? (
          <div className="py-40 flex flex-col items-center gap-6"><RefreshCw className="w-16 h-16 text-[#CFA356] animate-spin" /><p className="font-black italic animate-pulse tracking-widest uppercase text-center">Interpreting Time Matrix & <br/>Spiritual Resonance...</p></div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700 mt-8">
             <header className="text-center space-y-4 mb-12">
                <span className="text-[#CFA356] text-[10px] tracking-[0.5em] uppercase border-b border-[#CFA356]/30 pb-1">Three-Card Narrative Report</span>
                <h2 className="text-4xl font-black">시간의 축, 타로 아르카나 해독</h2>
             </header>

             <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
                {result.cards.map((c:any, i:number) => (
                  <div key={i} className="animate-in slide-in-from-bottom-6 flex flex-col items-center" style={{ animationDelay: `${i*200}ms` }}>
                    <span className="text-[#CFA356] font-black text-xs mb-4 uppercase tracking-widest">{spreadLabels[i]}</span>
                    <GenerativeTarotCard card={c} isFlipped={true} variant="large" />
                  </div>
                ))}
             </div>

             <div className="flex justify-between items-center bg-zinc-900 rounded-full p-2 border border-zinc-700 shadow-xl">
               {[1, 2, 3].map((num) => (
                 <button key={num} onClick={() => setReportPage(num)} className={`flex-1 py-3 mx-1 rounded-full text-sm font-black transition-all ${reportPage === num ? 'bg-[#CFA356] text-black shadow-lg' : 'bg-white text-black opacity-80 hover:opacity-100'}`}>PAGE 0{num}</button>
               ))}
             </div>

             <div className="min-h-[400px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-zinc-700 rounded-[40px] p-8 md:p-10 shadow-3xl leading-relaxed">
                {reportPage === 1 && <Section title="1. 과거의 궤적: 문제의 근원적 씨앗" icon={<Layers />} body={result.reportData.p1} />}
                {reportPage === 2 && <Section title="2. 현재의 교차로: 직면한 에너지의 충돌" icon={<Zap />} body={result.reportData.p2} />}
                {reportPage === 3 && <Section title="3. 미래의 투영: 결론 및 영적 조언" icon={<Compass />} body={result.reportData.p3} />}
             </div>

             <div className="flex justify-between gap-4 mt-12">
                <button disabled={reportPage === 1} onClick={() => setReportPage(prev => prev - 1)} className="flex-1 py-5 rounded-[20px] bg-white text-black flex justify-center items-center disabled:opacity-30 shadow-xl transition-all"><ChevronLeft className="w-6 h-6" /></button>
                <button disabled={reportPage === 3} onClick={() => setReportPage(prev => prev + 1)} className="flex-1 py-5 rounded-[20px] bg-white text-black flex justify-center items-center disabled:opacity-30 shadow-xl transition-all"><ChevronRight className="w-6 h-6" /></button>
             </div>

             <Link href="/private" className="group flex items-center justify-between p-10 bg-gradient-to-r from-zinc-950/90 to-[#111]/90 backdrop-blur-xl border border-[#CFA356]/40 rounded-[30px] shadow-3xl mt-16">
                <div className="flex items-center gap-6"><Lock className="w-8 h-8 text-[#CFA356]" /><div><p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Expert Only</p><p className="text-xl font-bold text-white group-hover:text-[#CFA356] transition-colors">상담사 전용 심층 타로 해석 관제</p></div></div>
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
      <p className="text-zinc-200 text-[16px] leading-relaxed font-light break-keep text-justify">{body}</p>
    </section>
  );
}

function generateSpreadTarotReport(cards: any[]) {
  const [past, present, future] = cards;
  
  const getKeyword = (c: any) => c.isReversed ? c.keywordRev : c.keyword;
  const getDirText = (c: any) => c.isReversed ? "역방향으로 거꾸로 뒤집혀 그 본연의 에너지가 왜곡된" : "정방향으로 곧게 세워져 선명한 빛을 내뿜는";

  const isPastNegative = past.isReversed;
  const isPresentNegative = present.isReversed;
  const isFutureNegative = future.isReversed;

  let transitionText = "";
  if(isPastNegative && !isPresentNegative) transitionText = "과거의 혼란스러운 잔해를 딛고, 현재 당신의 영혼은 다시금 질서를 향해 나아가려는 강력한 회복 탄력성을 발휘하고 있습니다.";
  else if(!isPastNegative && isPresentNegative) transitionText = "과거에 누렸던 긍정적 유산에도 불구하고, 현재 당신은 보이지 않는 저항에 부딪혀 스스로의 한계를 시험받고 있는 고통스러운 교차로에 서 있습니다.";
  else if(isPastNegative && isPresentNegative) transitionText = "과거로부터 켜켜이 쌓여온 억압과 고립의 에너지가 여전히 현재의 당신을 강하게 결박하고 있으며, 근원적인 영적 쇄신이 요구되는 시점입니다.";
  else transitionText = "과거의 건강한 결단이 현재까지 평온한 주파수를 유지하며, 당신을 안정된 자아실현의 길로 인도하고 있습니다.";

  return {
    p1: `당신이 마주한 문제의 뿌리를 상징하는 첫 번째 카드, '${past.name}'입니다. ${getDirText(past)} 이 카드는 당신의 과거가 '${getKeyword(past)}'의 궤적 위에서 요동쳤음을 은유합니다. 당신이 무의식 속에 남겨둔 그 시간의 상흔 혹은 열매가 현재의 갈등을 촉발하는 거대한 씨앗이 되었음을 직시해야 합니다.`,
    p2: `두 번째 자리에서 계시된 '${present.name}' 카드는 현재 당신을 얽매고 있는 당면한 현실을 꿰뚫어 봅니다. ${transitionText} 이 카드는 현재 당신이 '${getKeyword(present)}'이라는 화두를 품고 치열한 내적 투쟁을 벌이고 있음을 증거합니다. 에너지가 엉켜 있는 이곳에서, 당신은 통제하려는 강박을 내려놓고 현실을 있는 그대로 수용할 용기를 내야 합니다.`,
    p3: `이 모든 시간의 흐름이 당도할 최종 목적지, 세 번째 카드는 '${future.name}'입니다. ${getDirText(future)} 이 아르카나는 미래의 결과이자 영적인 처방을 동시에 내포합니다. '${getKeyword(future)}'의 에너지가 당신을 기다리고 있습니다. ${isFutureNegative ? "미래에 암시된 이 왜곡과 지연의 에너지를 피하기 위해서는, 현재 당신의 마음가짐을 전면적으로 수정하고 섭리에 모든 것을 내어드리는 철저한 비워냄이 필요합니다." : "지금의 시련을 뚫고 나아갈 때, 이 카드가 약속하는 조화와 실현의 빛이 당신의 삶을 찬란하게 뒤덮을 것입니다. 당신을 수용하는 거대한 섭리를 믿고 발걸음을 떼십시오."}`
  };
}

export default function Page() { return <Suspense fallback={null}><TarotRevelationEngine /></Suspense>; }