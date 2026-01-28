
import React, { useState, useRef } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Target, 
  Users, 
  PenTool, 
  CheckCircle,
  ChevronRight,
  Search,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
  Fingerprint,
  Cpu,
  Zap,
  Scale,
  BrainCircuit,
  FileUp,
  X,
  Loader2,
  TrendingUp,
  Award,
  FileDown,
  Flame,
  Rocket,
  Hash,
  Copy,
  Tag,
  Plus
} from 'lucide-react';
import Header from './components/Header';
import SectionCard from './components/SectionCard';

// Déclaration globale pour html2pdf
declare var html2pdf: any;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analysis');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isProjectLoaded, setIsProjectLoaded] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  const printRef = useRef<HTMLDivElement>(null);

  const reportData = {
    title: "Doctrine du Caractère",
    author: "Forges Emmanuel",
    mainObjective: "Restaurer la primauté du caractère moral comme infrastructure de survie et régulateur suprême de l'humanité face à l'automatisation du jugement par l'IA et l'effondrement des structures de confiance mondiales.",
    secondaryObjectives: [
      "Démystifier la prétendue neutralité de la technologie et des algorithmes.",
      "Redéfinir le leadership non comme un privilège ou une rente, mais comme un sacrifice et un service.",
      "Dénoncer le 'Crime des Portes Confisquées' (favoritisme et blocage du mérite).",
      "Établir un 'Jus Cogens Numérique' pour protéger l'intégrité biologique et cognitive humaine.",
      "Proposer une transition d'une justice du risque (probabiliste) à une justice de la responsabilité."
    ],
    targetAudience: {
      level: "Leaders, diplomates, créateurs technologiques et citoyens engagés.",
      expectations: "Une boussole éthique pour un siècle de ruptures technologiques brutales.",
      painPoints: "Sentiment d'impuissance face aux systèmes, crise de sens, déresponsabilisation administrative."
    },
    plagiarism: {
      globalScore: 12,
      aiScore: 8,
      risks: [
        { level: "Modéré", cause: "Convention de Vienne (Article 26)", context: "Paragraphe 14 : Citation juridique brute sans analyse contextuelle.", solution: "Intégrer une analyse doctrinale sur l'infrastructure de survie." },
        { level: "Faible", cause: "Concept 'Classe Inutile' (Harari)", context: "Paragraphe 32 : Emprunt sémantique direct.", solution: "Proposer un contre-point ontologique sur l'intention humaine." }
      ]
    },
    rewrites: [
      {
        id: "D-1",
        label: "Convention de Vienne",
        original: "Conformément à l'article 26 de la Convention de Vienne sur le droit des traités, tout traité en vigueur lie les parties et doit être exécuté par elles de bonne foi.",
        rewritten: "Le principe du 'Pacta sunt servanda' n'est pas qu'une règle technique ; dans notre Doctrine du Caractère, c'est l'infrastructure même de la survie collective. La bonne foi est l'engagement sacré de l'être face aux exigences de l'histoire.",
        note: "Neutralisation de l'aspect citation brute par une signature doctrinale."
      },
      {
        id: "D-2",
        label: "Concept IA/Harari",
        original: "L'intelligence artificielle va créer une classe d'humains inutiles qui n'auront plus de travail car les machines feront tout mieux qu'eux.",
        rewritten: "Le véritable vertige n'est pas l'émergence d'une 'classe inutile', mais celle d'une humanité dont la volonté aura été anesthésiée par l'algorithme. L'IA ne nous remplace pas dans l'action, elle nous remplace dans l'intention.",
        note: "Signature critique déplaçant le débat vers la souveraineté de l'intention."
      }
    ]
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleExportPDF = () => {
    if (!printRef.current) return;
    setIsExporting(true);

    const element = printRef.current;
    
    const opt = {
      margin: 10,
      filename: `Rapport_Editorial_Complet_${reportData.title.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // On force la visibilité pour l'export
    element.style.display = 'block';
    
    html2pdf().set(opt).from(element).save().then(() => {
      element.style.display = 'none';
      setIsExporting(false);
    }).catch((err: any) => {
      console.error('Erreur PDF:', err);
      element.style.display = 'none';
      setIsExporting(false);
    });
  };

  const AnalysisContent = () => (
    <div className="space-y-6">
      <SectionCard title="A. Objectif du livre" icon={<Target className="text-indigo-600" />}>
        <div className="space-y-6">
          <p className="text-xl leading-relaxed text-slate-800 font-medium border-l-4 border-indigo-600 pl-6 py-4 bg-indigo-50/50 rounded-r-xl serif italic">
            "{reportData.mainObjective}"
          </p>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">Objectifs secondaires :</h4>
            <ul className="grid grid-cols-1 gap-3">
              {reportData.secondaryObjectives.map((obj, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                  <span className="font-black text-indigo-400">{i + 1}.</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="B. Public cible" icon={<Users className="text-indigo-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TargetBox label="Profil" value={reportData.targetAudience.level} />
          <TargetBox label="Attentes" value={reportData.targetAudience.expectations} />
          <TargetBox label="Douleurs" value={reportData.targetAudience.painPoints} />
        </div>
      </SectionCard>
    </div>
  );

  const PlagiarismContent = () => (
    <SectionCard title="D. Intégrité : Plagiat & IA" icon={<Fingerprint className="text-rose-600" />}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 text-center">
            <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Similarité Globale</p>
            <p className="text-4xl font-black text-rose-600">{reportData.plagiarism.globalScore}%</p>
            <p className="text-[10px] font-bold text-rose-500 mt-2 uppercase">Risque Faible</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
            <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">Signature IA</p>
            <p className="text-4xl font-black text-indigo-600">{reportData.plagiarism.aiScore}%</p>
            <p className="text-[10px] font-bold text-indigo-500 mt-2 uppercase">Hautement Humain</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 text-sm">Passages à optimiser :</h4>
          {reportData.plagiarism.risks.map((risk, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black text-indigo-600 uppercase">{risk.cause}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">{risk.level}</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 italic">"{risk.context}"</p>
              <p className="text-xs text-slate-700"><span className="font-bold text-emerald-600">Action :</span> {risk.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );

  const RewriteContent = () => (
    <SectionCard title="E. Propositions de Refonte" icon={<PenTool className="text-indigo-600" />}>
      <div className="space-y-8">
        {reportData.rewrites.map((item, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded uppercase">{item.id}</span>
              <span className="text-xs font-bold text-slate-400">{item.label}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-50/30 border border-rose-100 rounded-xl">
                <p className="text-[9px] font-black text-rose-300 uppercase mb-2">Original</p>
                <p className="text-xs text-slate-500 italic">"{item.original}"</p>
              </div>
              <div className="p-4 bg-white border-2 border-indigo-100 rounded-xl shadow-sm">
                <p className="text-[9px] font-black text-indigo-400 uppercase mb-2">Refonte Humaine</p>
                <p className="text-xs text-slate-800 font-bold leading-relaxed">"{item.rewritten}"</p>
                <p className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-500 italic">Note: {item.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  // Fix: Added the missing KdpContent component to resolve the "Cannot find name 'KdpContent'" error
  const KdpContent = () => (
    <SectionCard title="F. Diagnostic KDP" icon={<CheckCircle className="text-emerald-600" />}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Conformité Technique</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500" /> Format A5/Moyen : Optimal
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500" /> Marges de sécurité : Vérifiées
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 size={14} className="text-emerald-500" /> Résolution DPI : 300+
              </li>
            </ul>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">Points d'Attention</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-slate-700">
                <Info size={14} className="text-amber-500" /> Vérifier le contraste de la couverture
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-700">
                <Info size={14} className="text-amber-500" /> Catégories : "Philosophie Sociale" recommandée
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionCard>
  );

  const ViraliteContent = () => (
    <div className="space-y-8">
      <SectionCard title="G. Viralité & Bestseller Booster" icon={<Flame className="text-amber-500" />}>
        <div className="space-y-8">
          <div className="bg-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden">
            <TrendingUp className="absolute -right-8 -bottom-8 opacity-10 w-48 h-48" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-6xl font-black text-amber-400">78%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mt-2">Score Viral</div>
              </div>
              <div className="flex-1 text-sm text-indigo-100 leading-relaxed border-l border-white/10 pl-8">
                Haut potentiel de partage sur les plateformes professionnelles (LinkedIn) via la thématique "Souveraineté Individuelle".
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Titres Stratégiques</h5>
              <MarketingCopyItem label="Titre Choc" value="L'Arme Ultime contre l'Algorithme" onCopy={() => handleCopy("L'Arme Ultime contre l'Algorithme", "Titre")} />
              <MarketingCopyItem label="Titre SEO" value="Souveraineté Morale : Survivre à l'IA" onCopy={() => handleCopy("Souveraineté Morale : Survivre à l'IA", "Titre")} />
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Réseaux Sociaux</h5>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><Hash size={10} /> Hashtags</p>
                <p className="text-[11px] font-bold text-indigo-600">#DoctrineDuCaractere #EthiqueIA #Leadership2025 #Humanisme</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><Tag size={10} /> Mots-clés KDP</p>
                <p className="text-[11px] font-medium text-slate-700 italic">IA, Éthique, Caractère, Leadership, Emmanuel Forges, Souveraineté.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Quatrième de Couverture (Blurb)</h5>
            <div className="p-6 bg-white border-2 border-slate-100 rounded-2xl shadow-sm relative">
              <button onClick={() => handleCopy("Et si votre caractère était votre seule infrastructure de survie ?...", "Blurb")} className="absolute top-4 right-4 text-slate-300 hover:text-indigo-600 transition-colors"><Copy size={16} /></button>
              <p className="text-sm text-slate-800 font-bold mb-3">"Et si votre caractère était votre seule infrastructure de survie ?"</p>
              <p className="text-xs text-slate-600 leading-relaxed">À l'heure où les algorithmes automatisent nos choix, Emmanuel Forges livre un manifeste radical pour restaurer la primauté de l'humain. Un guide indispensable pour les leaders de demain.</p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onImportClick={() => setIsImportModalOpen(true)} onNewProjectClick={() => setIsProjectLoaded(false)} />
      
      {copyFeedback && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-indigo-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-top-4">
          {copyFeedback} copié !
        </div>
      )}

      {isProjectLoaded ? (
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <NavItem active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} icon={<Target size={18} />} label="Objectif & Public" />
              <NavItem active={activeTab === 'plagiarism'} onClick={() => setActiveTab('plagiarism')} icon={<Fingerprint size={18} />} label="Plagiat & IA" />
              <NavItem active={activeTab === 'rewrite'} onClick={() => setActiveTab('rewrite')} icon={<PenTool size={18} />} label="Refonte Humaine" />
              <NavItem active={activeTab === 'kdp'} onClick={() => setActiveTab('kdp')} icon={<CheckCircle size={18} />} label="Diagnostic KDP" />
              <NavItem active={activeTab === 'viralite'} onClick={() => setActiveTab('viralite')} icon={<Flame size={18} />} label="Viralité & Marketing" />
            </nav>
            <div className="mt-8 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="animate-spin" size={16} /> : <FileDown size={16} />}
                {isExporting ? "Génération..." : "Télécharger Rapport"}
              </button>
            </div>
          </aside>

          <main className="flex-1 space-y-8 pb-20">
            {activeTab === 'analysis' && <AnalysisContent />}
            {activeTab === 'plagiarism' && <PlagiarismContent />}
            {activeTab === 'rewrite' && <RewriteContent />}
            {activeTab === 'kdp' && <KdpContent />}
            {activeTab === 'viralite' && <ViraliteContent />}
          </main>

          {/* HIDDEN PRINT VIEW - Contient toutes les sections pour l'export complet */}
          <div className="hidden">
            <div ref={printRef} className="bg-white p-12 text-slate-900 font-sans" style={{ width: '210mm' }}>
              <div className="border-b-4 border-indigo-600 pb-8 mb-12 text-center">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-indigo-950 mb-2">Rapport Éditorial Stratégique</h1>
                <p className="text-xl italic text-slate-600">{reportData.title} — {reportData.author}</p>
              </div>
              <div className="space-y-12">
                <AnalysisContent />
                <div style={{ pageBreakBefore: 'always' }} />
                <PlagiarismContent />
                <div style={{ pageBreakBefore: 'always' }} />
                <RewriteContent />
                <div style={{ pageBreakBefore: 'always' }} />
                <ViraliteContent />
              </div>
              <div className="mt-20 pt-8 border-t border-slate-200 text-center text-[10px] text-slate-400 uppercase tracking-widest">
                Document Confidentiel — Comité Éditorial Autonome © 2024
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl border border-slate-100 max-w-lg space-y-8">
            <BookOpen className="text-indigo-600 mx-auto" size={48} />
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">Nouvelle Analyse</h2>
              <p className="text-slate-500 text-sm">Prêt à transformer votre manuscrit ?</p>
            </div>
            <button onClick={() => { setIsAnalyzing(true); setTimeout(() => { setIsAnalyzing(false); setIsProjectLoaded(true); }, 2000); }} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <FileUp />}
              {isAnalyzing ? "Analyse en cours..." : "Importer Manuscrit"}
            </button>
          </div>
        </main>
      )}

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 Comité Éditorial Multidisciplinaire</p>
          <div className="flex items-center gap-2"><ShieldCheck size={14} /> EA-Alpha Secure</div>
        </div>
      </footer>
    </div>
  );
};

/* --- Helpers --- */

const TargetBox = ({ label, value }: { label: string, value: string }) => (
  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{label}</p>
    <p className="text-sm text-slate-800 font-bold">{value}</p>
  </div>
);

const MarketingCopyItem = ({ label, value, onCopy }: { label: string, value: string, onCopy: () => void }) => (
  <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-between group">
    <div>
      <p className="text-[9px] font-black text-indigo-400 uppercase mb-1">{label}</p>
      <p className="text-xs font-bold text-slate-800">{value}</p>
    </div>
    <button onClick={onCopy} className="text-slate-300 hover:text-indigo-600 transition-all"><Copy size={14} /></button>
  </div>
);

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-white hover:text-indigo-600'
    }`}
  >
    {icon} {label}
  </button>
);

export default App;
