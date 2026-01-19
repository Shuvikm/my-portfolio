import { Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-cyan-400/20 py-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-white">SHUVIK M</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
            <span>and</span>
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>by Shuvik M</span>
          </div>

          <div className="text-sm text-gray-500">
            {new Date().getFullYear()} - All rights reserved
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Inspired by anime</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>Powered by React</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>Built with passion</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-20"></div>
            <p className="relative text-sm text-gray-400 italic px-8 py-3 bg-slate-900/50 border border-cyan-400/10 rounded-full">
              "Every line of code is a step towards the dream"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
