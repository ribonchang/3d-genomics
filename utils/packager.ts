/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import JSZip from 'jszip';

// --- CONFIGURATION FILES ---

const PACKAGE_JSON = {
  "name": "research-visualization",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.15.12",
    "@react-three/drei": "^9.96.1",
    "three": "^0.160.0",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.309.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
};

const VITE_CONFIG = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`;

const TS_CONFIG = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

const TS_NODE_CONFIG = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`;

const POSTCSS_CONFIG = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        nobel: {
          gold: '#0d9488', // BioTech Teal
          dark: '#0f172a',
          cream: '#F0FDFA',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}`;

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Research Visualization</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`;

const INDEX_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}

body {
  @apply bg-stone-50 text-stone-900;
}`;

const INDEX_TSX = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

const TYPES_TS = `export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}`;

// --- SOURCE CODE CONTENT ---
// We embed the current source code here to ensure the download works
// without needing a backend file system.

const APP_TSX = `
import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { ChiAPETDiagram, InteractionTypesDiagram, CellSpecificityChart } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, Download, User } from 'lucide-react';

// --- PAPER CONFIGURATION ---
// EDIT THIS OBJECT TO CHANGE THE CONTENT OF THE WEBSITE
const PAPER_CONFIG = {
  themeColor: "teal", // Options: gold, teal, blue, rose
  metadata: {
    title: "Chromatin Connectivity Maps",
    subtitle: "Unveiling the 3D Transcriptional Interactomes of Stem Cells",
    journal: "Nature • Dec 2013",
    doiUrl: "https://doi.org/10.1038/nature12716",
    downloadFileName: "3d-genomics-project"
  },
  links: {
    portfolio: "https://ribonchang.github.io/#about" // Back to your profile
  },
  abstract: "In multicellular organisms, transcription regulation is one of the central mechanisms modelling lineage differentiation and cell-fate determination. Here, through a chromatin interaction analysis with paired-end tagging (ChIA-PET) approach using an antibody that primarily recognizes the pre-initiation complexes of RNA polymerase II, we explore the transcriptional interactomes of three mouse cells of progressive lineage commitment.",
  authors: [
    { name: "Yubo Zhang", role: "Joint Genome Institute, LBNL" },
    { name: "Chee-Hong Wong", role: "Joint Genome Institute, LBNL" },
    { name: "Ramon Y. Birnbaum", role: "UCSF" },
    { name: "Guoliang Li", role: "Jackson Laboratory" },
    { name: "Chia-Lin Wei", role: "Genome Institute of Singapore" }
  ],
  content: {
    introduction: {
      title: "The 3D Genome",
      text: [
        "Transcription requires dynamic chromatin configurations between promoters and their corresponding distal regulatory elements. It is believed that their communication occurs within large discrete foci of aggregated RNA polymerases termed transcription factories in three-dimensional nuclear space.",
        "However, the dynamic nature of chromatin connectivity has not been characterized at the genome-wide level. Using RNAPII ChIA-PET, we mapped the global chromatin connectivity in embryonic stem cells (ESCs), neural stem cells (NSCs), and neurosphere stem/progenitor cells (NPCs)."
      ]
    },
    methodology: {
      title: "ChIA-PET Workflow",
      text: "The ChIA-PET assay was performed using an RNAPII monoclonal antibody (8WG16). Cells were cross-linked, lysed, and fragmented. The sonicated chromatin-DNA complexes were enriched with antibody-coated beads. To distinguish intramolecular proximity ligation products from chimaeras, two different barcoded biotinylated half-linkers were used.",
      diagramType: "workflow"
    },
    results: {
      title: "Interaction Landscape",
      text: "Our global chromatin connectivity maps reveal approximately 40,000 long-range interactions. Analysis shows extensive colocalizations among promoters and distal-acting enhancers. Most enhancers associate with promoters located beyond their nearest active genes, indicating that linear juxtaposition is not the only guiding principle."
    },
    impact: {
      title: "Orchestrating Development",
      text: "Chromatin connectivity networks reveal that the pivotal genes of reprogramming functions are transcribed within physical proximity to each other in embryonic stem cells. This study sets the stage for the full-scale dissection of spatial and temporal genome structures and their roles in orchestrating development."
    }
  }
};

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-xl text-stone-900 text-center mb-2">{name}</h3>
      <div className="w-10 h-0.5 bg-nobel-gold mb-3 opacity-60"></div>
      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDFA] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${scrolled ? 'bg-[#F0FDFA]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}\`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">3D</div>
            <span className={\`font-serif font-bold text-lg tracking-wide transition-opacity \${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}\`}>
              GENOMICS <span className="font-normal text-stone-500">2013</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Intro</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Results</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Impact</a>
            <a 
              href={PAPER_CONFIG.links.portfolio}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-nobel-gold transition-colors cursor-pointer uppercase"
            >
              <User size={14} /> My Profile
            </a>
            <a 
              href={PAPER_CONFIG.metadata.doiUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Read Paper
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F0FDFA] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Results</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Impact</a>
             <a href={PAPER_CONFIG.links.portfolio} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">My Profile</a>
            <a 
              href={PAPER_CONFIG.metadata.doiUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer"
            >
              Read Paper
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(240,253,250,0.85)_0%,rgba(240,253,250,0.5)_50%,rgba(240,253,250,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            {PAPER_CONFIG.metadata.journal}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 text-stone-900 drop-shadow-sm">
            {PAPER_CONFIG.metadata.title} <br/>
            <span className="italic font-normal text-stone-500 text-2xl md:text-4xl block mt-4">{PAPER_CONFIG.metadata.subtitle}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-12">
            {PAPER_CONFIG.abstract}
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>EXPLORE</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Context</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">{PAPER_CONFIG.content.introduction.title}</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              {PAPER_CONFIG.content.introduction.text.map((paragraph, idx) => (
                <p key={idx}>
                  {idx === 0 && <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">{paragraph.charAt(0)}</span>}
                  {idx === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="methodology" className="py-24 bg-[#F0FDFA] border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> Experimental Design
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">{PAPER_CONFIG.content.methodology.title}</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           {PAPER_CONFIG.content.methodology.text}
                        </p>
                    </div>
                    <div>
                        <ChiAPETDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Results */}
        <section id="results" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                {/* Decorative background pattern */}
                <div className="w-96 h-96 rounded-full bg-teal-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-blue-500 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <InteractionTypesDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            Key Findings
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">{PAPER_CONFIG.content.results.title}</h2>
                        <p className="text-lg text-stone-300 mb-6 leading-relaxed">
                            {PAPER_CONFIG.content.results.text}
                        </p>
                        <ul className="space-y-4 text-stone-400">
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold mt-2"></div>
                            <span>Identified ~40,000 interactions across 3 cell types</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold mt-2"></div>
                            <span>Promoter-Promoter and Promoter-Enhancer interactions dominate</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-nobel-gold mt-2"></div>
                            <span>Enhancers are highly cell-type specific</span>
                          </li>
                        </ul>
                     </div>
                </div>
            </div>
        </section>

        {/* Cell Specificity Impact */}
        <section id="impact" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">{PAPER_CONFIG.content.impact.title}</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        {PAPER_CONFIG.content.impact.text}
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <CellSpecificityChart />
                </div>
            </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F0FDFA] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">RESEARCH TEAM</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Contributors</h2>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
                    {PAPER_CONFIG.authors.map((author, index) => (
                      <AuthorCard 
                          key={index}
                          name={author.name} 
                          role={author.role} 
                          delay={\`\${index * 0.1}s\`} 
                      />
                    ))}
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="container mx-auto px-6 flex flex-col items-center gap-6">
            <div className="text-center">
                <div className="text-white font-serif font-bold text-2xl mb-2">{PAPER_CONFIG.metadata.title}</div>
                <p className="text-sm opacity-60">{PAPER_CONFIG.metadata.subtitle}</p>
            </div>
            
            <p className="text-xs text-stone-600 mt-4">
              Designed for ribonchang.github.io
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
`;

const DIAGRAMS_TSX = `
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dna, Scissors, Link, Database, PieChart, Activity } from 'lucide-react';

// --- CHIA-PET WORKFLOW DIAGRAM ---
export const ChiAPETDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: <Dna size={24} />, label: "Crosslinking", desc: "Fix chromatin in vivo" },
    { icon: <Scissors size={24} />, label: "Fragmentation", desc: "Sonication & Ligation" },
    { icon: <Link size={24} />, label: "Enrichment", desc: "Antibody Pull-down" },
    { icon: <Database size={24} />, label: "Sequencing", desc: "Paired-End Tags (PET)" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-stone-200 my-8 shadow-sm">
      <h3 className="font-serif text-xl mb-6 text-stone-800">ChIA-PET Protocol</h3>
      
      <div className="w-full flex justify-between items-center relative max-w-lg mb-12">
         {/* Connecting Line */}
         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -z-10"></div>
         
         {steps.map((s, idx) => (
           <div key={idx} className="flex flex-col items-center relative">
              <div 
                className={\`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white
                  \${step >= idx ? 'border-nobel-gold text-nobel-gold scale-110' : 'border-stone-200 text-stone-300'}\`}
              >
                {s.icon}
              </div>
              <div className={\`absolute top-14 text-center w-24 transition-opacity duration-300 \${step === idx ? 'opacity-100' : 'opacity-40'}\`}>
                <div className="text-xs font-bold uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[10px] text-stone-500">{s.desc}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="text-center p-4 bg-stone-50 rounded-lg text-stone-600 text-sm italic max-w-md">
        "Capturing genome-wide long-range interactions mediated by RNAPII"
      </div>
    </div>
  );
};

// --- INTERACTION TYPES DIAGRAM ---
export const InteractionTypesDiagram: React.FC = () => {
  // Data roughly based on Figure 3a of Nature 2013 paper
  // P-P: 44%, P-E: 43%, E-E: 13%
  const data = [
    { label: "Promoter-Promoter", value: 44, color: "bg-teal-500" },
    { label: "Promoter-Enhancer", value: 43, color: "bg-blue-500" },
    { label: "Enhancer-Enhancer", value: 13, color: "bg-indigo-500" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-stone-800 rounded-xl border border-stone-700 my-8">
      <h3 className="font-serif text-xl mb-6 text-white">Interaction Composition</h3>
      <p className="text-stone-400 text-sm mb-8 text-center">
        Distribution of RNAPII-mediated chromatin interactions in ESCs.
      </p>

      <div className="flex gap-4 items-end h-48 w-full max-w-md px-8">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
             <div className="text-white font-mono font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}%
             </div>
             <motion.div 
               className={\`w-full \${item.color} rounded-t-lg opacity-80 hover:opacity-100 transition-opacity\`}
               initial={{ height: 0 }}
               animate={{ height: \`\${item.value * 2}%\` }}
               transition={{ duration: 1, delay: idx * 0.2 }}
             />
             <div className="text-[10px] text-stone-400 text-center uppercase tracking-wider font-medium h-8">
               {item.label}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CELL SPECIFICITY CHART ---
export const CellSpecificityChart: React.FC = () => {
    // Conceptual visualization of cell specific enhancers vs common promoters
    const [view, setView] = useState<'promoters' | 'enhancers'>('promoters');

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-white text-stone-800 rounded-xl my-8 border border-stone-200 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-4 text-stone-900">Specificity Analysis</h3>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                    While promoters involved in interactions are largely shared across cell types (Common), the enhancers they connect to are highly specific to the cell lineage (Specific).
                </p>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setView('promoters')}
                        className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all \${view === 'promoters' ? 'bg-nobel-gold text-white shadow-md' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}\`}
                    >
                        Promoters (Common)
                    </button>
                    <button 
                        onClick={() => setView('enhancers')}
                        className={\`px-4 py-2 rounded-lg text-sm font-medium transition-all \${view === 'enhancers' ? 'bg-nobel-gold text-white shadow-md' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}\`}
                    >
                        Enhancers (Specific)
                    </button>
                </div>
            </div>
            
            <div className="w-64 h-64 relative flex items-center justify-center bg-stone-50 rounded-full border border-stone-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 text-9xl font-serif text-stone-300">
                    {view === 'promoters' ? 'P' : 'E'}
                </div>
                
                {/* Venn Diagram Simulation */}
                <div className="relative w-48 h-48">
                    {view === 'promoters' ? (
                        <>
                           {/* High Overlap */}
                           <motion.div 
                             className="absolute inset-0 rounded-full bg-teal-500 mix-blend-multiply opacity-60"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                           <motion.div 
                             className="absolute inset-0 rounded-full bg-blue-500 mix-blend-multiply opacity-60"
                             initial={{ scale: 0, x: 20 }} animate={{ scale: 1, x: 10 }}
                           />
                           <motion.div 
                             className="absolute inset-0 rounded-full bg-rose-500 mix-blend-multiply opacity-60"
                             initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: -10, y: 10 }}
                           />
                           <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md">
                                ~70% Shared
                           </div>
                        </>
                    ) : (
                        <>
                           {/* Low Overlap / Distinct */}
                           <motion.div 
                             className="absolute top-0 left-0 w-24 h-24 rounded-full bg-teal-500 opacity-80"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                           <motion.div 
                             className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-blue-500 opacity-80"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                           <motion.div 
                             className="absolute top-10 right-0 w-24 h-24 rounded-full bg-rose-500 opacity-80"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-stone-600 text-xs">
                               High Specificity
                           </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
`;

const QUANTUM_SCENE_TSX = `
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ChromatinNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        metalness={0.1}
        roughness={0.5}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const DnaStrand = () => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.y = t * 0.05;
       ref.current.rotation.z = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
        <Torus args={[4, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#0d9488" transparent opacity={0.3} />
        </Torus>
         <Torus args={[4.2, 0.02, 16, 100]} rotation={[Math.PI / 2.1, 0, 0]}>
            <meshStandardMaterial color="#2dd4bf" transparent opacity={0.2} />
        </Torus>
    </group>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ccfbf1" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main Nodes representing Proteins/DNA clusters */}
          <ChromatinNode position={[0, 0, 0]} color="#0d9488" scale={1.2} />
          <DnaStrand />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <ChromatinNode position={[-3, 1, -2]} color="#3b82f6" scale={0.5} />
           <ChromatinNode position={[3, -1, -3]} color="#f43f5e" scale={0.6} />
           <ChromatinNode position={[-2, -2, -1]} color="#14b8a6" scale={0.4} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
     <div className="w-full h-full absolute inset-0 bg-stone-100 flex items-center justify-center">
         <div className="text-stone-300 font-serif italic">Cellular Environment</div>
     </div>
  );
}
`;

export const packageProject = async (filename: string, portfolioUrl: string) => {
  const zip = new JSZip();

  // Root configuration files
  zip.file("package.json", JSON.stringify(PACKAGE_JSON, null, 2));
  zip.file("vite.config.ts", VITE_CONFIG);
  zip.file("tsconfig.json", TS_CONFIG);
  zip.file("tsconfig.node.json", TS_NODE_CONFIG);
  zip.file("tailwind.config.js", TAILWIND_CONFIG);
  zip.file("postcss.config.js", POSTCSS_CONFIG);
  zip.file("index.html", INDEX_HTML);

  // Src directory
  const src = zip.folder("src");
  if (src) {
    src.file("index.tsx", INDEX_TSX);
    src.file("index.css", INDEX_CSS);
    src.file("App.tsx", APP_TSX);
    src.file("types.ts", TYPES_TS);
    
    // Components directory
    const components = src.folder("components");
    if (components) {
      components.file("Diagrams.tsx", DIAGRAMS_TSX);
      components.file("QuantumScene.tsx", QUANTUM_SCENE_TSX);
    }
  }

  // Generate blob and download
  const content = await zip.generateAsync({ type: "blob" });
  const url = window.URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.zip`;
  a.click();
  window.URL.revokeObjectURL(url);
};
