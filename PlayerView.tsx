import React, { useEffect, useState } from 'react';
import { ArrowLeft, Share2, Heart, Info, Loader2 } from 'lucide-react';
import { getVideoInfo } from './gemini';
import AdPlaceholder from './AdPlaceholder';

interface PlayerViewProps {
  url: string;
  onBack: () => void;
}

const PlayerView: React.FC<PlayerViewProps> = ({ url, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ title: 'Loading...', description: '' });

  useEffect(() => {
    const fetchMeta = async () => {
      setLoading(true);
      const data = await getVideoInfo(url);
      setMeta(data);
      setTimeout(() => setLoading(false), 1000);
    };
    fetchMeta();
  }, [url]);

  const getEmbedUrl = (inputUrl: string) => {
    try {
      if (inputUrl.includes('mega.nz') || inputUrl.includes('mega.io')) {
        return inputUrl.replace('/file/', '/embed/');
      }
      return inputUrl;
    } catch (e) {
      return inputUrl;
    }
  };

  const isMega = url.includes('mega.nz') || url.includes('mega.io');
  const processedUrl = getEmbedUrl(url);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors flex items-center gap-2 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-medium">Home</span>
        </button>
        <div className="flex-1 px-4 truncate text-center">
          <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase">Now Playing</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-10">
                  <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
                  <p className="text-slate-400 font-medium">Initializing Stream...</p>
                </div>
              )}
              {isMega ? (
                <iframe
                  src={processedUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <video src={processedUrl} controls autoPlay className="w-full h-full object-contain" />
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{meta.title}</h2>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-300 text-sm">{meta.description}</p>
              </div>
            </div>

            <AdPlaceholder />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold">Recommended</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-24 h-14 bg-slate-800 rounded shrink-0" />
                  <div className="text-xs text-slate-400">Related Video {i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;