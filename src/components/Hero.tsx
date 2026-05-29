import React, { useState, useEffect } from "react";
import { DEFAULT_BIO, DESKTOP_PORTFOLIO_URL } from "../data";
import { AvatarDefault } from "./DefaultVisuals";
import TerminalSimulator from "./TerminalSimulator";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDownRight, Database, Network, Code2, Download, Monitor } from "lucide-react";
import { generateCV } from "../utils/cvGenerator";
import { DataStreamFlow } from "./DataStreamFlow";

interface HeroProps {
  theme?: "dark" | "light";
}

export default function Hero({ theme = "dark" }: HeroProps) {
  const words = ["FULL STACK", "DATABASES", "WEB APPS", "AUTOMATION", "NETWORKS", "CLOUD DEPS"];
  const [index, setIndex] = useState(0);

  // Auto-rotating slider text for engineering domains
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-10 md:pt-12 pb-8 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <DataStreamFlow theme={theme} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-11 items-start relative z-10">
        
        {/* Left Column: Introductions & Terminal Core */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Subtitle intro label */}
          <div className="inline-flex items-center gap-2 bg-white/5 rounded-full py-1 px-3 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/70 font-bold">
              Systems Architect & Secure Automator
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <p className="font-sans text-base tracking-wide text-white/50 font-medium">
              Hi there! This is <span className="text-white font-semibold">{DEFAULT_BIO.name}</span>
            </p>
            
            <h1 className="font-serif italic font-light text-3xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-white tracking-tighter">
              Robust code <br />
              and pipeline <br />
              <div className="h-[1.25em] relative block w-full overflow-hidden align-bottom pb-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: 50, opacity: 0, rotateX: -60 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -50, opacity: 0, rotateX: 60 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute left-0 text-white font-bold not-italic hover:text-white/80 transition duration-300 underline decoration-white/20 underline-offset-8 whitespace-nowrap text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.5rem]"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm md:text-base max-w-xl font-normal leading-relaxed">
            {DEFAULT_BIO.subBio}
          </p>

          {/* Core Services badges or pillars */}
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-2 text-[11px] font-mono text-white/80 border border-white/10 bg-zinc-900/40 shadow-xs px-2.5 py-1.5 rounded-lg">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              <span>SQL & ETL Pipelines</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-white/80 border border-white/10 bg-zinc-900/40 shadow-xs px-2.5 py-1.5 rounded-lg">
              <Code2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Multi-Stack API Backends</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-white/80 border border-white/10 bg-zinc-900/40 shadow-xs px-2.5 py-1.5 rounded-lg">
              <Network className="w-3.5 h-3.5 text-emerald-400" />
              <span>CCNP Network Security</span>
            </div>
          </div>

          {/* Interactive Shell Terminal Panel */}
          <div className="pt-1">
            <TerminalSimulator />
          </div>

          {/* Call to action arrow and CV download button */}
          <div className="pt-1 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-semibold text-white/80 hover:text-white transition duration-300"
            >
              <span>Explore Staged Deployments</span>
              <ArrowDownRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300 bg-zinc-800 rounded-full p-0.5" />
            </a>

            <button
              id="download-cv-hero-btn"
              onClick={generateCV}
              type="button"
              className="inline-flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-mono text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-md shadow-emerald-950/10"
            >
              <Download className="w-3 h-3" />
              <span>Download CV</span>
            </button>

            <a
              href={DESKTOP_PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 font-mono text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-md shadow-indigo-950/10"
            >
              <Monitor className="w-3.5 h-3.5 animate-pulse" />
              <span>Desktop OS Portfolio</span>
            </a>
          </div>

        </div>

        {/* Right Column: Premium Monogram/Avatar */}
        <div className="lg:col-span-6 flex justify-center lg:sticky lg:top-[75px] w-full">
          <div className="w-full max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] shadow-2xl relative">
            {/* Visual glow backdrop decoration */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/10 to-purple-500/10 rounded-2xl blur-3xl z-0 animate-pulse" />
            
            <div className={`relative z-10 w-full rounded-2xl border-4 shadow-2xl overflow-hidden h-[590px] xs:h-[620px] sm:h-[640px] md:h-auto md:aspect-square transition-all duration-300 ${
              theme === "light" 
                ? "border-black/5 bg-[#ffffff] shadow-lg shadow-black/5" 
                : "border-white/10 bg-zinc-950"
            }`}>
              <AvatarDefault theme={theme} />
            </div>
          </div>
        </div>

      </div>

      {/* Industry Leaders logos spacer */}
      <div className="mt-20 pt-10 border-t border-white/10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-medium mb-6">
          Organizations & Platforms I supported
        </p>

        {/* Crisp monochrome Grid layout with placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-1 items-start md:items-center">
            <div className="flex items-center gap-1.5 font-sans font-extrabold text-white/85 tracking-tight text-sm">
              <span className="inline-block w-4 h-4 bg-emerald-500/20 rounded-sm border border-emerald-550/20" />
              <span>Good Nature Agro</span>
            </div>
            <span className="font-mono text-[8.5px] text-white/40 uppercase tracking-widest">Zambia Corporate</span>
          </div>

          <div className="flex flex-col gap-1 items-start md:items-center">
            <div className="flex items-center gap-1.5 font-sans font-extrabold text-white/85 tracking-tight text-sm">
              <span className="w-4 h-4 rounded-full border border-blue-500/30 bg-blue-500/10" />
              <span>CTTBD Livestock</span>
            </div>
            <span className="font-mono text-[8.5px] text-white/40 uppercase tracking-widest">Malawi Developer</span>
          </div>

          <div className="flex flex-col gap-1 items-start md:items-center">
            <div className="flex items-center gap-1.5 font-sans font-extrabold text-white/85 tracking-tight text-sm">
              <span className="font-serif italic font-extrabold text-base text-white/90">SmartCare EMR</span>
            </div>
            <span className="font-mono text-[8.5px] text-white/40 uppercase tracking-widest">Medical Registry</span>
          </div>

          <div className="flex flex-col gap-1 items-start md:items-center">
            <div className="flex items-center gap-1.5 font-sans font-extrabold text-white/85 tracking-tight text-sm">
              <span className="w-1.5 h-4 bg-cyan-500/20 rounded-xs" />
              <span className="w-1.5 h-4 bg-cyan-500/20 rounded-xs" />
              <span>Impact Enterprises</span>
            </div>
            <span className="font-mono text-[8.5px] text-white/40 uppercase tracking-widest">Operations Lab</span>
          </div>
        </div>
      </div>

    </section>
  );
}
