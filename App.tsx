
import React, { useState } from 'react';
import { AppScreen } from './types';
import UrlInput from './components/UrlInput';
import PlayerView from './components/PlayerView';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleStartPlay = (url: string) => {
    setVideoUrl(url);
    setCurrentScreen('player');
  };

  const handleGoBack = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-950">
      {currentScreen === 'home' ? (
        <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
          </div>
          
          <UrlInput onPlay={handleStartPlay} />

          <footer className="w-full max-w-2xl px-6 py-8 mt-12 border-t border-slate-800/50 flex flex-col items-center gap-4">
             <div className="flex gap-8 text-xs text-slate-500 font-medium uppercase tracking-widest">
                <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
             </div>
             <p className="text-[10px] text-slate-600">© 2024 MegaStream Pro. All content processed locally.</p>
          </footer>
        </main>
      ) : (
        <PlayerView url={videoUrl} onBack={handleGoBack} />
      )}
    </div>
  );
};

export default App;
