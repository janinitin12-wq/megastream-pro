import React, { useState } from 'react';
import { Play, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface UrlInputProps {
  onPlay: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onPlay }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a valid link');
      return;
    }
    if (!url.includes('mega.nz') && !url.includes('mega.io')) {
      setError('Only Mega.io or Mega.nz links are supported');
    } else {
      setError('');
    }
    onPlay(url);
  };

  return (
    <div className="max-w-2xl w-full px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
          MegaStream Pro
        </h1>
        <p className="text-slate-400 text-lg">Paste your Mega.io link and start watching instantly.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <LinkIcon className="text-slate-500" size={20} />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://mega.nz/file/..."
            className="block w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
          />
        </div>
        {error && <div className="text-rose-400 text-sm flex items-center gap-2"><AlertCircle size={16}/>{error}</div>}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3">
          <Play fill="currentColor" size={24} /> Start Watching
        </button>
      </form>
    </div>
  );
};

export default UrlInput;