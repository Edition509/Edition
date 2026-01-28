
import React from 'react';
import { ShieldCheck, FileText, Share2, Plus, FileUp, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onImportClick: () => void;
  onNewProjectClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onImportClick, onNewProjectClick }) => {
  return (
    <header className="bg-indigo-950 text-white sticky top-0 z-50 shadow-xl border-b border-indigo-900">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-800 rounded-lg">
              <ShieldCheck className="text-amber-400" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Comité Éditorial Autonome</h1>
              <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold">Analyse Multidisciplinaire de Manuscrit</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onNewProjectClick}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-md border border-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <Plus size={14} />
              <span className="hidden xs:inline">Nouveau Projet</span>
            </button>
            
            <button 
              onClick={onImportClick}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 transition-all active:scale-95"
            >
              <FileUp size={14} />
              <span className="hidden xs:inline">Importer</span>
              <ChevronDown size={12} className="opacity-50" />
            </button>

            <div className="h-6 w-px bg-indigo-900 mx-1 hidden md:block" />

            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:text-white transition-colors">
              <Share2 size={14} />
              Partager
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-baseline gap-3 border-t border-indigo-900 pt-4">
          <span className="text-indigo-400 text-xs font-bold uppercase">Projet Actif:</span>
          <h2 className="text-lg font-bold serif tracking-wide text-amber-50">DOCTRINE DU CARACTÈRE</h2>
          <span className="text-indigo-400 text-sm hidden sm:inline">— Forges Emmanuel</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
