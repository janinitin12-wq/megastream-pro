
import React from 'react';
import { ExternalLink } from 'lucide-react';

const AdPlaceholder: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 overflow-hidden bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 transition-all">
      {/* 
        DEVELOPER NOTE: To show real ads:
        1. For Web: Paste your Google AdSense code inside this div.
        2. For APK: If using a WebView wrapper, you can use AdMob with a div ID.
      */}
      <div id="ad-container" className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-32 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-300 font-bold text-[10px] uppercase tracking-widest">Sponsored</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-base font-semibold text-white">MegaStream Premium</h4>
          <p className="text-slate-400 text-xs mt-1">Remove all ads and enjoy 4K cloud streaming with priority bandwidth.</p>
        </div>
        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap">
          Upgrade <ExternalLink size={14} />
        </button>
      </div>
      <div className="mt-2 text-[8px] text-slate-600 uppercase tracking-tighter text-center md:text-right">
        Advertisement provided by AdSense/AdMob
      </div>
    </div>
  );
};

export default AdPlaceholder;
