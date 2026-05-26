import React, { useState } from "react";
import { DEFAULT_PROJECTS } from "../data";
import SecureShellTerminal from "./SecureShellTerminal";
import { ArrowUpRight, ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectList() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const toggleProjectExpansion = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="space-y-16">
        
        {/* Header Title block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Case Studies & Works
            </span>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-white">
              Work Experience (15-25 ®)
            </h2>
          </div>
          <div className="max-w-xs select-none">
            <p className="font-sans text-xs text-white/50 leading-relaxed">
              Below are my primary corporate roles. Click on any experience card to reveal detailed summaries, core services, and challenges solved.
            </p>
          </div>
        </div>

        {/* Selected Project Rows Grid */}
        <div className="space-y-16">
          {DEFAULT_PROJECTS.map((project, index) => {
            const isExpanded = expandedProjectId === project.id;
            return (
              <div
                key={project.id}
                className="group border-b border-white/10 pb-16 last:border-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left block: Descriptive info (lg: 5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between text-xs font-mono text-white/40">
                      <span>0{index + 1}.</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif italic font-normal text-3xl md:text-4xl text-white group-hover:text-white/80 transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-sans font-bold text-xs uppercase tracking-widest text-white/40">
                        {project.role}
                      </p>
                    </div>

                    <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                       {project.services.map((tag, tagIdx) => (
                         <span
                           key={tagIdx}
                           className="font-mono text-[9px] uppercase tracking-wider text-white/80 bg-white/5 hover:bg-white/10 transition-colors px-2.5 py-1 rounded"
                         >
                           {tag}
                         </span>
                       ))}
                    </div>

                    {/* Interactive controls */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      
                      {/* Go to website */}
                      <a
                        href={project.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-white hover:text-white/80 transition"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      {/* Read Case Study Case details */}
                      <button
                        onClick={() => toggleProjectExpansion(project.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold text-white/60 hover:text-white transition cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            <span>Minimize Brief</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                            <span>Read Technical Flow</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>

                  {/* Right block: High-fidelity interactive Secure Shell (SSH) display of the role (lg: 7 cols) */}
                  <div className="lg:col-span-7">
                    <SecureShellTerminal project={project} />
                  </div>

                </div>

                {/* Animated expander container for case-study briefs */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden mt-8"
                    >
                      <div className="bg-[#121212]/80 border border-white/10 rounded-xl p-6 md:p-8 space-y-6 shadow-xs">
                        
                        <div className="flex items-center gap-2 font-mono text-xs text-white/80 font-bold select-none border-b border-white/5 pb-3">
                          <span>0{index + 1} / TECHNICAL SOLUTIONS & EXECUTION REPORT</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-sans">
                          
                          <div className="space-y-2">
                            <h4 className="font-bold text-white/90 uppercase tracking-wider">The Challenge</h4>
                            <p className="text-white/60 leading-relaxed">
                              {project.challenge || "Maintaining database availability, securing clean transaction limits, and enabling zero service interruptions for remote agents and internal managers."}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-bold text-white/90 uppercase tracking-wider">The Solution</h4>
                            <p className="text-white/60 leading-relaxed">
                              {project.solution || "Formulated rigid automated parsing filters, script-based diagnostic routines, and extensive local backups to safeguard dataset transitions."}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-bold text-white/90 uppercase tracking-wider">Business Impact</h4>
                            <p className="text-white/60 leading-relaxed">
                              {project.impact || "Slashed anomaly records to absolute minimums, saved crucial team data cleaning manual hours, and kept operations running continuously."}
                            </p>
                          </div>

                        </div>

                        {/* Git commit history simulator for that specific project repo */}
                        {project.gitLogs && project.gitLogs.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5 select-none font-bold">
                              <span>$ git log --oneline --graph -n 4</span>
                            </div>
                            <div className="system-terminal font-mono text-[10px] sm:text-[11px] space-y-1 bg-black/50 p-3 sm:p-4 rounded-lg border border-white/5 text-zinc-400">
                              {project.gitLogs.map((log, logIdx) => {
                                const parts = log.split(":");
                                const prefix = parts[0] || "";
                                const msg = parts.slice(1).join(":") || "";
                                let prefixColor = "text-zinc-500";
                                if (prefix.includes("feat")) prefixColor = "text-emerald-400";
                                else if (prefix.includes("fix") || prefix.includes("security")) prefixColor = "text-amber-400";
                                else if (prefix.includes("test")) prefixColor = "text-blue-400";
                                else if (prefix.includes("perf")) prefixColor = "text-cyan-400";

                                const mockSha = `b${logIdx}e${(1024 + logIdx * 256).toString(16)}a`;

                                return (
                                  <div key={logIdx} className="flex items-start gap-2 leading-relaxed">
                                    <span className="text-zinc-600 select-none">*</span>
                                    <span className="text-zinc-600 select-none">{mockSha}</span>
                                    <span className="break-all">
                                      {prefix && (
                                        <span className={`${prefixColor} font-bold mr-1`}>{prefix}:</span>
                                      )}
                                      <span className="text-zinc-300">{msg || log}</span>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
