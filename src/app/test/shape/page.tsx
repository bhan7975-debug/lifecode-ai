"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { RefreshCw, Lock, ChevronRight, ChevronLeft, Eraser, PenTool, Brain, Target, Compass, Zap, Move, Activity } from "lucide-react";
import Link from "next/link";
import GNB from "@/components/GNB";

const SHAPE_TYPES = [
  { id: "circle", symbol: "○", name: "동그라미" },
  { id: "triangle", symbol: "△", name: "세모" },
  { id: "square", symbol: "□", name: "네모" },
  { id: "s", symbol: "S", name: "에스" }
];

function ShapeDrawingEngine() {
  const [step, setStep] = useState("input");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShapeType, setCurrentShapeType] = useState<string>("circle");
  const [drawnShapes, setDrawnShapes] = useState<any[]>([]);
  const [reportPage, setReportPage] = useState(1);
  const [result, setResult] = useState<any>(null);

  const drawCanvasBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    ctx.lineCap = "round";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";

    ctx.strokeRect(0, 0, width, height);

    const innerW = width * 0.4;
    const innerH = height * 0.4;
    const innerX = (width - innerW) / 2;
    const innerY = (height - innerH) / 2;
    ctx.strokeRect(innerX, innerY, innerW, innerH);

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#CFA356";
  };

  useEffect(() => {
    if (step === "input") {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) drawCanvasBackground(ctx, canvas.width, canvas.height);
      }
    }
  }, [step]);

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#CFA356";
    
    const newShape = { type: currentShapeType, points: [{ x, y }], bounds: { minX: x, maxX: x, minY: y, maxY: y } };
    setDrawnShapes([...drawnShapes, newShape]);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    const lastShape = drawnShapes[drawnShapes.length - 1];
    lastShape.points.push({ x, y });
    lastShape.bounds.minX = Math.min(lastShape.bounds.minX, x);
    lastShape.bounds.maxX = Math.max(lastShape.bounds.maxX, x);
    lastShape.bounds.minY = Math.min(lastShape.bounds.minY, y);
    lastShape.bounds.maxY = Math.max(lastShape.bounds.maxY, y);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) drawCanvasBackground(ctx, canvas.width, canvas.height);
    setDrawnShapes([]);
  };

  const runEngine = () => {
    if (drawnShapes.length < 4) return alert("[입력 부족] 최소 4개 이상의 도형(1차 3개, 2차 1개)을 캔버스 위에 그려주십시오.");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const analyzedData = drawnShapes.map((shape, idx) => {
      const centerX = (shape.bounds.minX + shape.bounds.maxX) / 2;
      const centerY = (shape.bounds.minY + shape.bounds.maxY) / 2;
      const width = shape.bounds.maxX - shape.bounds.minX;
      const height = shape.bounds.maxY - shape.bounds.minY;
      const size = width * height;
      
      const col = Math.floor(centerX / (canvas.width / 3));
      const row = Math.floor(centerY / (canvas.height / 3));
      const gridZone = (row * 3) + col + 1;

      return { ...shape, centerX, centerY, width, height, size, order: idx, gridZone };
    });

    setResult({
      shapes: analyzedData,
      canvasArea: canvas.width * canvas.height,
      reportData: generateHighDimClinicalReport(analyzedData, canvas.width, canvas.height)
    });
    setStep("analyzing");
  };

  useEffect(() => { if (step === "analyzing") setTimeout(() => setStep("result"), 2500); }, [step]);

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden pb-24 relative">
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] -z-10"></div>
      <GNB />
      
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-48">
        {step === "input" ? (
          <div className="space-y-8 animate-in fade-in">
            <header className="text-center space-y-3">
               <h2 className="text-4xl md:text-5xl font-black text-[#CFA356] italic uppercase drop-shadow-lg tracking-tighter">Psycho-Canvas</h2>
               <p className="text-zinc-400 text-sm tracking-widest">직접 그리고 배치하는 고정밀 도형 심리 분석</p>
            </header>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 space-y-4">
                <div className="bg-[#111111]/80 border border-zinc-700 rounded-3xl p-4 space-y-4 shadow-xl">
                  <p className="text-[10px] font-bold text-[#CFA356] text-center mb-4 tracking-widest uppercase">Tool Box</p>
                  {SHAPE_TYPES.map(s => (
                    <button key={s.id} onClick={() => setCurrentShapeType(s.id)} className={`w-full py-4 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${currentShapeType === s.id ? 'bg-[#CFA356] border-[#CFA356] text-black shadow-lg' : 'bg-white border-white text-black opacity-40'}`}>
                      <span className="text-3xl font-black">{s.symbol}</span>
                      <span className="text-[10px] font-bold uppercase">{s.name}</span>
                    </button>
                  ))}
                  <button onClick={clearCanvas} className="w-full py-4 rounded-2xl bg-zinc-800 text-white flex items-center justify-center gap-2 text-sm font-bold border border-zinc-600 hover:bg-zinc-700 transition-colors"><Eraser className="w-4 h-4" /> 지우기</button>
                </div>
              </div>

              <div className="flex-1 relative">
                <canvas 
                  ref={canvasRef} 
                  onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                  className="w-full h-[600px] bg-[#0a0a0a] rounded-[40px] shadow-2xl cursor-crosshair touch-none border border-zinc-700"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="px-4 py-2 bg-black text-white rounded-full text-[10px] font-black shadow-lg flex items-center gap-2 border border-zinc-800">
                    <PenTool className="w-3 h-3 text-[#CFA356]" /> TYPE: {currentShapeType.toUpperCase()}
                  </div>
                  <div className="px-4 py-2 bg-black text-white rounded-full text-[10px] font-black shadow-lg border border-zinc-800">
                    OBJECTS: {drawnShapes.length}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={runEngine} className="w-full py-7 mt-4 bg-gradient-to-r from-[#CFA356] to-[#AA7C4D] text-black font-black text-2xl rounded-[30px] shadow-3xl hover:scale-[1.01] transition-all active:scale-95">무의식 데이터 정밀 분석 가동</button>
          </div>
        ) : step === "analyzing" ? (
          <div className="py-40 flex flex-col items-center gap-6"><RefreshCw className="w-16 h-16 text-[#CFA356] animate-spin" /><p className="font-black italic animate-pulse tracking-widest uppercase text-center">Executing High-Dimensional<br/>Clinical Interpretations...</p></div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700 mt-8">
             <header className="text-center space-y-4 mb-8">
                <span className="text-[#CFA356] text-[10px] tracking-[0.5em] uppercase border-b border-[#CFA356]/30 pb-1">Clinical Space Report</span>
                <h2 className="text-4xl font-black">심층 임상 공간 분석 결과</h2>
             </header>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {result.shapes.map((s:any, i:number) => (
                  <div key={i} className="bg-[#111111] border border-zinc-800 rounded-3xl p-5 text-center space-y-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">{i < 3 ? '1차 유형' : '2차 유형'}</span>
                    <div className="text-3xl font-black text-[#CFA356]">{SHAPE_TYPES.find(t=>t.id===s.type)?.symbol}</div>
                    <div className="text-[9px] text-zinc-400 font-mono">구역: {s.gridZone} ({(s.size / result.canvasArea * 100).toFixed(1)}%)</div>
                  </div>
                ))}
             </div>

             <div className="flex justify-between items-center bg-zinc-900 rounded-full p-2 border border-zinc-700 shadow-xl">
               {[1, 2, 3].map((num) => (
                 <button key={num} onClick={() => setReportPage(num)} className={`flex-1 py-3 mx-1 rounded-full text-sm font-black transition-all ${reportPage === num ? 'bg-[#CFA356] text-black shadow-lg' : 'bg-white text-black opacity-80 hover:opacity-100'}`}>
                   PAGE 0{num}
                 </button>
               ))}
             </div>

             <div className="min-h-[400px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-zinc-700 rounded-[40px] p-8 md:p-10 shadow-2xl leading-relaxed">
               {reportPage === 1 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="1. 자아의 본질: 선천적 기질의 울림" icon={<Brain />} body={result.reportData.p1.core} />
                   <Section title="2. 공간 위상학: 영혼의 9분할 지향점" icon={<Move />} body={result.reportData.p1.gridTopology} />
                 </div>
               )}
               {reportPage === 2 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="3. 결핍과 과잉: 크기에 담긴 무의식의 상흔" icon={<Zap />} body={result.reportData.p2.sizeAnomaly} />
                   <Section title="4. 경계 침범: 대인관계와 억압의 역학" icon={<Target />} body={result.reportData.p2.interference} />
                 </div>
               )}
               {reportPage === 3 && (
                 <div className="space-y-10 animate-in slide-in-from-right-4">
                   <Section title="5. 심리적 위기 진단: 현재의 내면 풍경" icon={<Activity />} body={result.reportData.p3.crisis} />
                   <Section title="6. 영적 회복의 처방: 완전한 빛을 향하여" icon={<Compass />} body={result.reportData.p3.solution} />
                 </div>
               )}
             </div>

             <div className="flex justify-between gap-4">
                <button disabled={reportPage === 1} onClick={() => setReportPage(prev => prev - 1)} className="flex-1 py-5 rounded-[20px] bg-white text-black flex justify-center items-center disabled:opacity-30 shadow-xl transition-all"><ChevronLeft className="w-6 h-6" /></button>
                <button disabled={reportPage === 3} onClick={() => setReportPage(prev => prev + 1)} className="flex-1 py-5 rounded-[20px] bg-white text-black flex justify-center items-center disabled:opacity-30 shadow-xl transition-all"><ChevronRight className="w-6 h-6" /></button>
             </div>

             <Link href="/private" className="group flex items-center justify-between p-10 bg-gradient-to-r from-zinc-950/90 to-[#111]/90 backdrop-blur-xl border border-[#CFA356]/40 rounded-[30px] shadow-2xl mt-12">
                <div className="flex items-center gap-6"><Lock className="w-8 h-8 text-[#CFA356]" /><div><p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Expert Only</p><p className="text-xl font-bold text-white group-hover:text-[#CFA356] transition-colors">상담사 전용 심층 분석 관제</p></div></div>
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

function generateHighDimClinicalReport(shapes: any[], width: number, height: number) {
  const canvasArea = width * height;
  const p1Shapes = shapes.slice(0, 3);
  const p2Shape = shapes[shapes.length - 1];

  const typeNames: any = { circle: "원만함(동그라미)", triangle: "열정(세모)", square: "안정(네모)", s: "창의(에스)" };
  const primaryType = p1Shapes[0].type;
  let coreText = `당신이 가장 먼저 도화지 위에 아로새긴 '${typeNames[primaryType]}'는 당신의 선천적 자아를 대변하는 영혼의 거울입니다. 이 도형은 세상과 관계 맺고 자아를 실현하는 당신만의 독특하고도 찬란한 방식을 은유합니다.`;

  let avgZone = Math.round(shapes.reduce((acc, s) => acc + s.gridZone, 0) / shapes.length);
  let gridText = "";
  if ([1, 4, 7].includes(avgZone)) gridText = "캔버스의 좌측 구역(과거와 내향성)에 깊게 침잠된 당신의 궤적은, 해결되지 않은 과거의 잔상이나 잃어버린 안정감에 대한 무의식적 향수를 아프게 증언하고 있습니다.";
  else if ([3, 6, 9].includes(avgZone)) gridText = "우측 구역(미래와 외향성)을 향해 맹렬하게 뻗어 나간 배치는, 통제할 수 없는 미래에 대한 불안감과 동시에 강렬한 성취욕이 뒤섞인 역동적인 심리 상태를 나타냅니다.";
  else gridText = "중앙부(현재와 자아)에 안착한 배치는, 폭풍우 속에서도 나를 잃지 않으려 발버둥 치는 치열한 자아 수용의 과정을 보여줍니다.";

  if ([7, 8, 9].includes(avgZone)) gridText += " 특히 하단부로 가라앉은 무게 중심은, 현재 당신을 짓누르는 거대한 스트레스와 억눌린 우울감을 은유적으로 토해내고 있습니다.";

  const microShapes = shapes.filter(s => (s.size / canvasArea) < 0.05);
  const macroShapes = shapes.filter(s => (s.size / canvasArea) > 0.40);
  
  let sizeAnomalyText = "현재 도형의 크기 배분은 비교적 안정적인 호흡을 유지하고 있습니다. 극단적인 결핍이나 과잉 없이 자아의 에너지를 통제하려 노력하는 성숙함이 엿보입니다.";
  if (microShapes.length > 0) {
    sizeAnomalyText = `캔버스 구석에 5% 미만의 위태로운 크기로 웅크린 '${typeNames[microShapes[0].type]}'는, 척박한 현실의 무게에 철저히 짓눌려 숨죽여 우는 당신의 결핍된 자아를 뼈아프게 증명합니다. 누구에게도 말하지 못한 상처가 곪아가고 있군요.`;
  }
  if (macroShapes.length > 0) {
    sizeAnomalyText += ` 반면 화면을 집어삼킬 듯 40% 이상 거대하게 팽창한 '${typeNames[macroShapes[0].type]}'는, 통제력을 잃을까 두려워 극단적인 방어기제를 치고 있는 당신의 강박적 불안과 외로움을 거칠게 웅변합니다.`;
  }

  // [수정 포인트] 명칭 동기화: isOverlapped -> isOverlapping
  let isOverlapping = false;
  for(let i=0; i<shapes.length; i++) {
    for(let j=i+1; j<shapes.length; j++) {
      const a = shapes[i].bounds;
      const b = shapes[j].bounds;
      if (a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY) {
        isOverlapping = true; break;
      }
    }
  }

  const interferenceText = isOverlapping
    ? "도형들이 서로의 숨통을 조이듯 기괴하게 얽히고 침범하는 이 궤적은, 현재 당신의 연약한 자아 경계가 타인 혹은 억압적인 환경에 의해 무자비하게 허물어지고 있음을 시사합니다. 관계의 무게에 짓눌려 극심한 스트레스와 정서적 질식을 호소하는 영혼의 비명이 들려옵니다."
    : "도형들이 서로 닿지 않고 각자의 외딴섬처럼 철저히 고립된 형태는, 타인의 침범을 극도로 경계하며 스스로를 마음의 감옥에 가둔 고독한 방어기제를 보여줍니다. 상처받지 않기 위해 마음의 문을 굳게 닫아걸은 차가운 방어벽이 느껴집니다.";

  const crisisText = (isOverlapping || microShapes.length > 0) 
    ? "당신의 무의식이 그려낸 심리적 지형도는 현재 적색경보를 울리고 있습니다. 억압된 상처와 무너진 경계 속에서 당신의 자아는 길을 잃고 표류하는 난파선과 같습니다. 내면의 에너지가 심각하게 고갈되어 가고 있습니다."
    : "비교적 독립적인 자아를 유지하려 애쓰고 있으나, 보이지 않는 긴장감이 캔버스를 팽팽하게 맴돌고 있습니다. 고립된 자아로는 온전한 평안에 이를 수 없음을 당신의 무의식도 인지하고 있습니다.";

  const solutionText = "이 찢겨지고 억압된 심리적 공간을 치유할 수 있는 유일한 길은, 나를 옥죄는 방어기제를 스스로 허물어뜨리는 것입니다. 위축된 결핍의 자리, 그리고 타인에게 짓눌린 겹침의 자리에 거룩한 절대자의 빛을 초대하십시오. 당신의 어그러진 캔버스 위에 완전한 사랑의 덧칠이 얹어질 때, 비로소 질식할 듯한 스트레스에서 해방되어 찬란한 본연의 형상으로 부활하게 될 것입니다.";

  return {
    p1: { core: coreText, gridTopology: gridText },
    p2: { sizeAnomaly: sizeAnomalyText, interference: interferenceText },
    p3: { crisis: crisisText, solution: solutionText }
  };
}

export default function Page() { return <Suspense fallback={null}><ShapeDrawingEngine /></Suspense>; }