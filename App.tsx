
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
  Plus,
  Video,
  Layout,
  MessageSquare,
  Globe,
  Share2,
  FileText,
  Settings,
  AlertTriangle,
  Split,
  Eye,
  Check,
  MousePointerClick
} from 'lucide-react';
import Header from './components/Header';
import SectionCard from './components/SectionCard';

// Déclaration globale pour html2pdf
declare var html2pdf: any;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('analysis');
  const [isProjectLoaded, setIsProjectLoaded] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  // États pour les refontes
  const [selectedVariations, setSelectedVariations] = useState<Record<string, number>>({
    "REF-01": 0,
    "REF-02": 0,
    "REF-03": 0,
    "REF-04": 0
  });
  const [comparisonModes, setComparisonModes] = useState<Record<string, boolean>>({});

  const printRef = useRef<HTMLDivElement>(null);

  const reportData = {
    title: "Doctrine du Caractère",
    author: "Forges Emmanuel",
    bookType: "Essai philosophique / Manifeste",
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
        { level: "Élevé (Généricité)", cause: "Théorie du contrat social classique", context: "L'introduction traite de l'accord tacite entre citoyens de manière trop scolaire.", solution: "Injection d'une métaphore sur 'L'Algorithme Souverain' pour briser la structure classique." },
        { level: "Modéré (Similarité)", cause: "Yuval Noah Harari - Homo Deus", context: "La description de la 'classe inutile' est trop proche des termes originaux de Harari.", solution: "Recentrer sur la 'perte d'intention' plutôt que sur la 'perte d'utilité'." }
      ]
    },
    rewrites: [
      {
        id: "REF-01",
        label: "Contrat Social Digital",
        original: "Les citoyens acceptent de céder une partie de leur liberté à l'État en échange de la sécurité et de l'ordre public.",
        variations: [
          {
            title: "Signature Doctrinale",
            text: "Nous ne cédons plus notre liberté à un État par contrat, nous la dissolvons dans un flux algorithmique par commodité. Le nouveau pacte n'est plus politique, il est transactionnel et invisible.",
            note: "Focus sur l'invisibilité du nouveau pacte.",
            highlights: ["dissolvons", "flux algorithmique", "transactionnel et invisible"]
          },
          {
            title: "Style Manifeste",
            text: "L'ordre public n'est plus une promesse d'État, mais un calcul de serveur. La liberté n'est pas cédée, elle est évaporée au profit d'une sécurité prédictive sans âme.",
            note: "Ton plus radical et provocateur.",
            highlights: ["calcul de serveur", "évaporée", "sécurité prédictive sans âme"]
          }
        ]
      },
      {
        id: "REF-02",
        label: "Inutilité vs Anesthésie",
        original: "L'intelligence artificielle va rendre l'humain inutile dans de nombreux domaines de travail.",
        variations: [
          {
            title: "Perspective Ontologique",
            text: "L'IA ne rend pas l'homme inutile ; elle le rend spectateur de sa propre vie. Le risque n'est pas le chômage de masse, mais l'atrophie de la volonté souveraine.",
            note: "Recentrage sur la volonté plutôt que l'emploi.",
            highlights: ["spectateur", "atrophie de la volonté souveraine"]
          },
          {
            title: "Vision Stratégique",
            text: "Le grand remplacement n'est pas technique, il est décisionnel. Là où la machine optimise la tâche, l'homme doit désormais sanctuariser l'intention.",
            note: "Idéal pour un public de leaders et décideurs.",
            highlights: ["décisionnel", "sanctuariser l'intention"]
          }
        ]
      },
      {
        id: "REF-03",
        label: "La Justice du Risque",
        original: "Le système judiciaire doit s'adapter aux nouvelles technologies pour mieux prévenir les risques criminels.",
        variations: [
          {
            title: "Critique de la Responsabilité",
            text: "Nous glissons d'une justice de la faute à une gestion du risque. En déléguant le jugement aux probabilités, nous liquidons la responsabilité humaine au profit de la statistique préventive.",
            note: "Dénonciation de la déresponsabilisation.",
            highlights: ["liquidons la responsabilité", "statistique préventive"]
          },
          {
            title: "Droit & Éthique",
            text: "La technologie ne prévient pas le crime, elle automatise le soupçon. La véritable justice ne réside pas dans la prédiction, mais dans la confrontation du caractère face à la loi.",
            note: "Défense de l'intégrité du procès humain.",
            highlights: ["automatise le soupçon", "confrontation du caractère"]
          }
        ]
      },
      {
        id: "REF-04",
        label: "Éducation & Algorithmes",
        original: "L'éducation moderne doit intégrer l'informatique pour préparer les jeunes au monde de demain.",
        variations: [
          {
            title: "Humanisme Classique",
            text: "L'enjeu n'est pas de coder pour demain, mais de penser pour l'éternité. L'éducation doit redevenir le rempart contre l'atrophie critique que les algorithmes imposent à notre jeunesse.",
            note: "Défense de la pensée critique contre le technicisme.",
            highlights: ["penser pour l'éternité", "rempart contre l'atrophie critique"]
          },
          {
            title: "Expertise Technique",
            text: "Apprendre à coder est une nécessité de survie numérique. Celui qui ne comprend pas la grammaire de l'algorithme est condamné à être écrit par lui plutôt que d'écrire son futur.",
            note: "Approche pragmatique de la souveraineté numérique.",
            highlights: ["grammaire de l'algorithme", "écrit par lui"]
          }
        ]
      }
    ],
    viraliteActions: [
      {
        title: "Série 'The Moral Glitch'",
        description: "Vidéos courtes (60s) montrant des bugs éthiques d'IA célèbres avec le commentaire : 'Le caractère ne se code pas'. Idéal pour Instagram/TikTok.",
        icon: <Video size={18} className="text-rose-500" />,
        platforms: ["TikTok", "Reels", "YouTube Shorts"],
        priority: "CRITIQUE"
      },
      {
        title: "Infographies 'IA vs Caractère'",
        description: "Carrousels LinkedIn comparant la logique froide de l'algorithme à la décision courageuse du leader. Design minimaliste requis.",
        icon: <Layout size={18} className="text-indigo-500" />,
        platforms: ["LinkedIn", "Twitter/X"],
        priority: "HAUT"
      },
      {
        title: "Infiltration r/Futurology",
        description: "Partager le chapitre sur le 'Jus Cogens Numérique' comme une proposition de loi mondiale. Susciter le débat sur la régulation éthique.",
        icon: <MessageSquare size={18} className="text-emerald-500" />,
        platforms: ["Reddit", "Hacker News"],
        priority: "STRATÉGIQUE"
      }
    ],
    kdpChecklist: {
      metadata: [
        { label: "Sous-titre", check: "Doit inclure 'Éthique' et 'IA' pour le SEO.", status: "warning" },
        { label: "Catégories", check: "Philosophy > Social & Political (Obligatoire).", status: "ok" },
        { label: "Série", check: "Envisager une série 'Souveraineté Individuelle'.", status: "info" }
      ],
      layout: [
        { label: "Notes de bas de page", check: "Vérifier l'ancrage dynamique pour Kindle.", status: "critical" },
        { label: "Typographie", check: "Utiliser une police Serif (Garamond/Sabon) — Essentiel pour l'autorité.", status: "ok" },
        { label: "Sommaire", check: "Niveaux de titres hiérarchisés pour navigation fluide.", status: "ok" }
      ],
      content: [
        { label: "Auteur", check: "Bio 'Expert' soulignant la légitimité éthique.", status: "ok" },
        { label: "Bibliographie", check: "Références académiques indispensables pour un Essai.", status: "warning" },
        { label: "Appel à l'action", check: "Lien vers la communauté 'Souverain' en fin d'ouvrage.", status: "ok" }
      ]
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const toggleComparison = (id: string) => {
    setComparisonModes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectVariation = (id: string, index: number) => {
    setSelectedVariations(prev => ({ ...prev, [id]: index }));
    setCopyFeedback(`${reportData.rewrites.find(r => r.id === id)?.label} : Version validée`);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleExportPDF = () => {
    if (!printRef.current) return;
    setIsExporting(true);
    
    // Activer la visibilité du contenu d'impression via la classe body
    document.body.classList.add('is-exporting-pdf');
    const element = printRef.current;
    
    // Options optimisées pour html2pdf
    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right
      filename: `Rapport_Editorial_${reportData.title.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
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

    // Laisser un petit délai pour que le DOM se mette à jour avec is-exporting-pdf
    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          document.body.classList.remove('is-exporting-pdf');
          setIsExporting(false);
        })
        .catch((err: any) => {
          console.error('Erreur lors de l\'export PDF:', err);
          document.body.classList.remove('is-exporting-pdf');
          setIsExporting(false);
        });
    }, 500);
  };

  const AnalysisContent = () => (
    <div className="space-y-6">
      <SectionCard title="A. Objectif du livre" icon={<Target className="text-indigo-600" />}>
        <div className="space-y-6">
          <p className="text-xl leading-relaxed text-slate-800 font-medium border-l-4 border-indigo-600 pl-6 py-4 bg-indigo-50/50 rounded-r-xl serif italic">
            "{reportData.mainObjective}"
          </p>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">Objectifs secondaires détectés :</h4>
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
      <SectionCard title="B. Public cible (Inféré)" icon={<Users className="text-indigo-600" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TargetBox label="Profil" value={reportData.targetAudience.level} />
          <TargetBox label="Attentes" value={reportData.targetAudience.expectations} />
          <TargetBox label="Douleurs" value={reportData.targetAudience.painPoints} />
        </div>
      </SectionCard>
    </div>
  );

  const PlagiarismContent = () => (
    <SectionCard title="D. Zones à risque (Plagiat & IA)" icon={<Fingerprint className="text-rose-600" />}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-center">
            <p className="text-[10px] font-black uppercase text-rose-400">Plagiat Potentiel</p>
            <p className="text-3xl font-black text-rose-600">{reportData.plagiarism.globalScore}%</p>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
            <p className="text-[10px] font-black uppercase text-indigo-400">Score IA</p>
            <p className="text-3xl font-black text-indigo-600">{reportData.plagiarism.aiScore}%</p>
          </div>
        </div>
        <div className="space-y-4">
          {reportData.plagiarism.risks.map((risk, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded uppercase">{risk.level}</span>
                <span className="text-[10px] font-bold text-slate-400">{risk.cause}</span>
              </div>
              <p className="text-xs text-slate-600 mb-2 italic">"{risk.context}"</p>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-50">
                <Zap size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-slate-800"><span className="text-emerald-600">Recommandation :</span> {risk.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );

  const RewriteContent = ({ isPrint = false }: { isPrint?: boolean }) => (
    <SectionCard title="E. Refonte Humaine : Signature Unique" icon={<PenTool className="text-indigo-600" />}>
      <div className="space-y-12">
        {!isPrint && (
          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <MousePointerClick size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-indigo-900 uppercase">Interface de Sélection Éditoriale</h4>
              <p className="text-xs text-indigo-800/80 leading-relaxed">
                Analysez chaque passage marqué ci-dessous. Basculez entre les propositions et cliquez sur <strong>"Valider cette version"</strong> pour l'inclure définitivement dans votre rapport final.
              </p>
            </div>
          </div>
        )}

        {reportData.rewrites.map((item, i) => {
          const selectedIdx = selectedVariations[item.id] || 0;
          const variation = item.variations[selectedIdx];
          const isComparing = isPrint ? true : comparisonModes[item.id];

          return (
            <div key={item.id} className="space-y-6 pb-8 border-b border-slate-100 last:border-0 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded uppercase tracking-tighter">
                      {item.id}
                    </span>
                    {/* Badge sélectionné globale */}
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm">
                      <Check size={8} strokeWidth={4} />
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                    {item.label}
                  </h4>
                </div>
                {!isPrint && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    {item.variations.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectVariation(item.id, idx)}
                        className={`px-4 py-2 text-[10px] font-black rounded-lg transition-all flex items-center gap-2 ${
                          selectedIdx === idx 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'text-slate-500 hover:bg-white hover:text-slate-800'
                        }`}
                      >
                        {selectedIdx === idx && <Check size={10} strokeWidth={3} />}
                        {v.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className={`grid gap-5 transition-all duration-500 ${isComparing ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {isComparing && (
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden animate-in fade-in slide-in-from-left-4">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300" />
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
                      <Eye size={12} className="opacity-50" /> Passage Original (Risque IA/Plagiat)
                    </p>
                    <p className="text-sm text-slate-500 italic leading-relaxed font-medium">"{item.original}"</p>
                  </div>
                )}

                <div className={`p-8 bg-white border-2 rounded-3xl shadow-sm relative group transition-all duration-300 ${
                  isComparing ? 'border-indigo-100' : 'border-slate-100'
                } ${selectedIdx !== -1 ? 'ring-4 ring-emerald-500/5 border-emerald-500/20' : ''}`}>
                  
                  {/* Overlay de statut "Sélectionné" */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Check size={10} strokeWidth={3} /> VERSION VALIDÉE
                    </span>
                    {!isPrint && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleComparison(item.id)}
                          className={`p-2 rounded-xl transition-all ${isComparing ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'}`}
                          title="Mode Comparaison"
                        >
                          <Split size={18} />
                        </button>
                        <button 
                          onClick={() => handleCopy(variation.text, item.label)}
                          className="p-2 bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                          title="Copier"
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-[9px] font-black text-indigo-400 uppercase mb-5 flex items-center gap-2 tracking-widest">
                    <Fingerprint size={12} /> Proposition de l'Éditeur : {variation.title}
                  </p>

                  <p className="text-base text-slate-900 font-bold leading-relaxed serif italic border-l-2 border-indigo-100 pl-4 py-2">
                    "{variation.text.split(' ').map((word, wIdx) => {
                      const cleanWord = word.replace(/[.,;:]/g, '');
                      const isHighlit = variation.highlights.some(h => h.toLowerCase().includes(cleanWord.toLowerCase()));
                      return (
                        <span key={wIdx} className={isHighlit ? 'text-indigo-600 bg-indigo-50/50 px-0.5 rounded-sm transition-colors hover:bg-indigo-100/50' : ''}>
                          {word}{' '}
                        </span>
                      );
                    })}"
                  </p>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-indigo-600">
                        <Info size={14} strokeWidth={3} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Note Stratégique</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic leading-snug">
                        {variation.note}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2 text-indigo-600">
                        <BrainCircuit size={14} strokeWidth={3} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Signatures Détectées</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {variation.highlights.map((h, hIdx) => (
                          <span key={hIdx} className="text-[8px] font-bold px-2 py-0.5 bg-white text-indigo-600 rounded border border-indigo-100 shadow-sm">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );

  const KdpContent = () => (
    <SectionCard title="F. Diagnostic KDP & Publication" icon={<CheckCircle className="text-emerald-600" />}>
      <div className="space-y-8">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-inner">
          <div className="text-center md:border-r md:border-slate-200 md:pr-8">
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type de Livre Détecté</h5>
             <p className="text-sm font-black text-indigo-600 uppercase">{reportData.bookType}</p>
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-500 italic">
              "En tant qu'Essai Philosophique, votre manuscrit doit répondre à des standards d'autorité et de structure plus rigoureux pour être accepté par les algorithmes de recommandation d'Amazon."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
             <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
               <Tag size={16} className="text-indigo-500" />
               <h6 className="text-xs font-black uppercase text-slate-700">Métadonnées</h6>
             </div>
             <div className="space-y-2">
               {reportData.kdpChecklist.metadata.map((item, i) => (
                 <KdpCheckItem key={i} {...item} />
               ))}
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
               <Layout size={16} className="text-indigo-500" />
               <h6 className="text-xs font-black uppercase text-slate-700">Mise en Page</h6>
             </div>
             <div className="space-y-2">
               {reportData.kdpChecklist.layout.map((item, i) => (
                 <KdpCheckItem key={i} {...item} />
               ))}
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
               <FileText size={16} className="text-indigo-500" />
               <h6 className="text-xs font-black uppercase text-slate-700">Exigences Contenu</h6>
             </div>
             <div className="space-y-2">
               {reportData.kdpChecklist.content.map((item, i) => (
                 <KdpCheckItem key={i} {...item} />
               ))}
             </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
          <div className="space-y-1">
            <h6 className="text-[10px] font-black text-amber-600 uppercase">Alerte IA Content Policy</h6>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Amazon exige désormais de déclarer si le contenu est 'généré par IA'. Grâce à nos refontes de la section E, votre manuscrit se situe dans la catégorie 'Assisté par IA', ce qui est favorable à la validation.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );

  const ViraliteContent = () => (
    <div className="space-y-8">
      <SectionCard title="G. Viralité & Bestseller Booster" icon={<Flame className="text-amber-500" />}>
        <div className="space-y-10">
          <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
            <TrendingUp className="absolute -right-12 -bottom-12 opacity-10 w-64 h-64" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="text-center md:border-r md:border-white/10 md:pr-12">
                <div className="text-7xl font-black text-amber-400 italic leading-none">78%</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] mt-4 text-amber-400/80">Indice de Potentiel Viral</div>
              </div>
              <div className="flex-1 space-y-4">
                <h4 className="text-xl font-bold text-indigo-100 flex items-center gap-2">
                  <Globe size={20} /> Analyse des tendances 2025
                </h4>
                <p className="text-sm text-indigo-200/80 leading-relaxed italic">
                  "Le marché sature des guides purement techniques sur l'IA. Votre positionnement sur la 'Souveraineté du Caractère' crée une friction intellectuelle nécessaire. C'est un moteur de partage émotionnel puissant."
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <Rocket className="text-indigo-600" size={24} />
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Actions pour une Viralité Instantanée</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reportData.viraliteActions.map((action, i) => (
                <div key={i} className="group p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 transition-all flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      {action.icon}
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      action.priority === 'CRITIQUE' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {action.priority}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 mb-2 text-sm">{action.title}</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-4 flex-1">{action.description}</p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {action.platforms.map(p => (
                      <span key={p} className="text-[8px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2"><Tag size={12}/> Variantes de Titres</h5>
              <MarketingCopyItem label="Titre Choc (Social)" value="L'Arme Ultime contre l'Algorithme" onCopy={() => handleCopy("L'Arme Ultime contre l'Algorithme", "Titre Social")} />
              <MarketingCopyItem label="Titre Autorité (SEO)" value="Souveraineté Morale : Survivre à l'IA" onCopy={() => handleCopy("Souveraineté Morale : Survivre à l'IA", "Titre Autorité")} />
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2"><Share2 size={12}/> Écosystème Digital</h5>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><Hash size={10} /> Hashtags Stratégiques</p>
                <p className="text-[11px] font-black text-indigo-600">#MoralGlitch #IAEthique #DoctrineDuCaractere #Leadership2025</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><Search size={10} /> Mots-clés KDP</p>
                <p className="text-[11px] font-medium text-slate-700 italic">IA, Éthique, Souveraineté, Philosophie Sociale, Emmanuel Forges.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2"><PenTool size={12}/> La 'Blurb' à Conversion (A+)</h5>
            <div className="p-8 bg-white border-2 border-indigo-50 rounded-3xl shadow-sm relative group">
              <p className="text-lg text-slate-900 font-bold mb-4 italic">"Et si votre caractère était votre seule infrastructure de survie ?"</p>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                À l'heure où les algorithmes automatisent nos choix et où la confiance mondiale s'effondre, Emmanuel Forges livre un manifeste radical. Découvrez comment restaurer la primauté de l'éthique humaine face au déluge technologique. Un guide indispensable pour leaders souverains.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onImportClick={() => {}} onNewProjectClick={() => {}} />
      
      {copyFeedback && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-indigo-900 text-white px-6 py-3 rounded-full text-xs font-black shadow-2xl animate-in fade-in slide-in-from-top-4 uppercase tracking-widest text-center min-w-[300px]">
          {copyFeedback}
        </div>
      )}

      {isProjectLoaded ? (
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0 no-print">
            <nav className="sticky top-24 space-y-1">
              <NavItem active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} icon={<Target size={18} />} label="Objectif & Public" />
              <NavItem active={activeTab === 'plagiarism'} onClick={() => setActiveTab('plagiarism')} icon={<Fingerprint size={18} />} label="Risques Plagiat" />
              <NavItem active={activeTab === 'rewrite'} onClick={() => setActiveTab('rewrite')} icon={<PenTool size={18} />} label="Refontes Signées" />
              <NavItem active={activeTab === 'kdp'} onClick={() => setActiveTab('kdp')} icon={<CheckCircle size={18} />} label="Publication KDP" />
              <NavItem active={activeTab === 'viralite'} onClick={() => setActiveTab('viralite')} icon={<Flame size={18} />} label="Viralité & Boost" />
            </nav>
            <div className="mt-8 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-tighter hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="animate-spin" size={16} /> : <FileDown size={16} />}
                {isExporting ? "Génération..." : "Télécharger PDF"}
              </button>
            </div>
          </aside>

          <main className="flex-1 space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 no-print">
            {activeTab === 'analysis' && <AnalysisContent />}
            {activeTab === 'plagiarism' && <PlagiarismContent />}
            {activeTab === 'rewrite' && <RewriteContent />}
            {activeTab === 'kdp' && <KdpContent />}
            {activeTab === 'viralite' && <ViraliteContent />}
          </main>

          {/* VUE D'IMPRESSION (Invisible à l'écran, capturée par html2pdf) */}
          <div className="print-only">
            <div ref={printRef} className="bg-white p-10 text-slate-900 font-sans" style={{ width: '210mm' }}>
              <div className="border-b-4 border-indigo-600 pb-6 mb-8 text-center">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-indigo-950 mb-1">Rapport Éditorial Stratégique</h1>
                <p className="text-lg italic text-slate-600">{reportData.title} — {reportData.author}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Généré le {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-12">
                <div className="section-break"><AnalysisContent /></div>
                <div className="section-break"><PlagiarismContent /></div>
                <div className="section-break"><RewriteContent isPrint={true} /></div>
                <div className="section-break"><KdpContent /></div>
                <div className="section-break"><ViraliteContent /></div>
              </div>

              <div className="mt-16 pt-6 border-t border-slate-200 text-center">
                <p className="text-[9px] text-slate-400 uppercase tracking-[0.3em]">Confidentialité Protégée — Comité Éditorial EA-Alpha © 2024</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto no-print">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 Comité Éditorial Multidisciplinaire</p>
          <div className="flex items-center gap-2"><ShieldCheck size={14} /> Sécurisé par EA-Alpha</div>
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

const KdpCheckItem = ({ label, check, status }: { label: string, check: string, status: string }) => (
  <div className="p-3 bg-white border border-slate-100 rounded-lg text-[10px] shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <span className="font-black uppercase text-slate-400 tracking-tighter">{label}</span>
      {status === 'ok' && <CheckCircle2 size={12} className="text-emerald-500" />}
      {status === 'warning' && <AlertTriangle size={12} className="text-amber-500" />}
      {status === 'critical' && <AlertTriangle size={12} className="text-rose-500" />}
      {status === 'info' && <Info size={12} className="text-indigo-400" />}
    </div>
    <p className="text-slate-700 font-medium leading-tight">{check}</p>
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
