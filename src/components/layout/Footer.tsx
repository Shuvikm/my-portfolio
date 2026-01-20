import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative manga-panel border-t-8 border-[#1a1a1a] py-12 bg-white">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-[#fbbf24]" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-[#1a1a1a] uppercase">SHUVIK M</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-[#1a1a1a] text-sm font-bold uppercase">
            <span>CRAFTED WITH</span>
            <Code2 className="w-4 h-4 text-[#fbbf24]" />
            <span>BY SHUVIK M</span>
          </div>

          <div className="text-xs text-[#1a1a1a] font-bold">
            <span>{new Date().getFullYear()} - All rights reserved</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-[#1a1a1a] font-bold uppercase">
            <span>Inspired by anime</span>
            <div className="w-1.5 h-1.5 bg-[#fbbf24] border border-[#1a1a1a]"></div>
            <span>Powered by React</span>
            <div className="w-1.5 h-1.5 bg-[#fbbf24] border border-[#1a1a1a]"></div>
            <span>Built with passion</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block relative">
            <div className="thought-bubble py-3 px-8 text-sm italic font-bold text-[#1a1a1a]">
              <span>"Every line of code is a step towards the dream"</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
