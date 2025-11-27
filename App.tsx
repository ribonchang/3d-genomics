/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { ChiAPETDiagram, InteractionTypesDiagram, CellSpecificityChart } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, Download, User } from 'lucide-react';
import { packageProject } from './utils/packager';

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
  const [isPackaging, setIsPackaging] = useState(false);

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

  const handleDownload = async () => {
    setIsPackaging(true);
    try {
      await packageProject(PAPER_CONFIG.metadata.downloadFileName, PAPER_CONFIG.links.portfolio);
    } catch (error) {
      console.error("Failed to package", error);
      alert("Failed to package project.");
    } finally {
      setIsPackaging(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0FDFA] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F0FDFA]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">3D</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
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
                          delay={`${index * 0.1}s`} 
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
            
            <button 
              onClick={handleDownload}
              disabled={isPackaging}
              className="flex items-center gap-2 px-6 py-3 bg-nobel-gold text-white rounded-lg hover:bg-opacity-90 transition-all font-medium text-sm"
            >
              {isPackaging ? (
                <span className="animate-pulse">Packaging...</span>
              ) : (
                <>
                  <Download size={16} />
                  Download Project Source
                </>
              )}
            </button>
            <p className="text-xs text-stone-600 mt-4">
              Designed for ribonchang.github.io
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;