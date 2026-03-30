import Link from "next/link";
import { Home } from "lucide-react";

export default function GNB() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-3xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black italic text-gold tracking-tighter transition-transform group-active:scale-95">
            LifeCode AI
          </span>
        </Link>
        <Link 
          href="/" 
          className="p-2 bg-zinc-900/80 rounded-full text-zinc-400 hover:text-white transition-all active:scale-90 border border-white/5 hover:border-gold/20 shadow-lg shadow-black/50"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}
