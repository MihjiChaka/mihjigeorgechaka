import React, { useState } from "react";
import { DEFAULT_PROJECTS } from "../data";
import SecureShellTerminal from "./SecureShellTerminal";
import { ArrowUpRight, ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TechnicalFlowDetailsProps {
  project: any;
  index: number;
}

function TechnicalFlowDetails({ project, index }: TechnicalFlowDetailsProps) {
  return (
    <div className="bg-[#121212]/80 border border-white/10 rounded-xl p-6 md:p-8 space-y-6 shadow-xs text-left">
      
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
            {project.gitLogs.map((log: string, logIdx: number) => {
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
  );
}

const SKILL_DESCRIPTIONS: Record<string, string> = {
  // Good Nature Agro - Data & Tech Support Associate
  "Software/System Testing": "Validating platform rollouts, verifying app updates, and isolating UI/backend bugs.",
  "Data Integrity Auditing": "Sustaining high reporting accuracy, double-verification procedures, and clean database uploads.",
  "IT Hardware & Network Maintenance": "Configuring network routes, troubleshooting local servers, and maintaining field office devices.",
  "Bulk Messaging Campaigns": "Managing SMS configurations, active messaging triggers, and user communication sequences.",

  // Good Nature Agro - Account Associate
  "Data System Integrations": "Integrating stock lists, matching ledger records, and automating spreadsheet operations.",
  "Accounts Reconciliation": "Aligning inventory balances with financial ledgers and identifying outstanding discrepancies.",
  "Control Schedules": "Constructing control documents to trace transit inventory loads with zero stock leaks.",
  "BI Farmer Data Verification": "Partnering with BI to validate farmer portfolios and ledger compliance logs.",

  // Good Nature Agro - Finance Admin & FISP Warehouse Manager
  "Seed Stock Distribution": "Coordinating seed delivery quotas and logging receipt ledgers under extreme peak times.",
  "Warehouse Management (FISP)": "Directing large grain and input warehouse custody, personnel routes, and storage standards.",
  "Data Archiving & Auditing": "Organizing physical and cloud file trails to satisfy external operational compliance tests.",
  "Quality Control Inspections": "Ensuring strict seed purity, weighing accuracy, and storage temperature compliance.",

  // Good Nature Agro - Finance Field Administrator (Intern)
  "Discrepancy Troubleshooting": "Running custom excel algorithms to isolate ledger entries mismatch within minutes.",
  "Weekly Error Reporting": "Drafting diagnostic data feedback charts for regional coordinators and executives.",
  "Files System Administration": "Restructuring digital folder architectures for faster operational lookup speeds.",
  "Data Audits": "Systematic verification of field transactions and expense summaries.",

  // Center for Ticks & Diseases
  "C# Backend Apps": "Compiling type-safe desktop utilities using WinForms/WPF, multi-tier libraries, and local storage.",
  "Unit Testing (UAT)": "Authoring simulated user journeys and software path checks to achieve error-free launches.",
  "Software Architecture Planning": "Visualizing module logic, data workflows, and secure storage structures.",
  "Bug Troubleshooting": "Isolating cold chain software logic flow traps and variable boundary errors.",

  // Chipata Hospital ART Clinic
  "SmartCare HMIS Care Systems": "Managing the national standard electronic patient health record systems.",
  "Confidential Database Administration": "Applying access controls and security protocols to safeguard patient clinical registries.",
  "System Data Backups": "Automating night-time database dumps in case of emergency power fluctuations.",
  "Infrastructure Triage": "Troubleshooting hospital-wide station hardware and local router configurations.",

  // Impact Enterprises
  "Large Dataset Filtering": "Scrubbing high-volume international outreach lists with extreme structural accuracy.",
  "Cleansing Automations": "Applying regex matching and cleanup formulas to remove corrupt columns and bad emails.",
  "Lead Validation Checkpoints": "Authenticating lead metadata and company details to prevent outreach bounces.",
  "Data Best Practices": "Setting up double-blind quality assurance and data ingestion benchmarks."
};

interface SkillTagWithTooltipProps {
  tag: string;
  key?: React.Key | number;
}

function SkillTagWithTooltip({ tag }: SkillTagWithTooltipProps) {
  const description = SKILL_DESCRIPTIONS[tag] || "Core professional discipline and operational capability.";
  
  return (
    <div className="relative group/tooltip inline-block">
      <span
        className="experience-tag font-mono text-[9px] uppercase tracking-wider text-white/80 bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/20 transition-all duration-300 px-2.5 py-1 rounded cursor-help inline-block select-none"
      >
        {tag}
      </span>
      
      {/* Tooltip Popup container */}
      <div className="experience-tooltip-container absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 scale-90 opacity-0 pointer-events-none group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100 transition-all duration-200 ease-out origin-bottom select-none hidden md:block">
        <div className="experience-tooltip-bubble bg-[#121212]/95 backdrop-blur-md border border-white/10 text-[10px] text-white/70 py-2 px-3 rounded-lg shadow-2xl text-center leading-relaxed relative">
          <p className="experience-tooltip-tag font-mono font-bold text-emerald-400 text-[8px] uppercase tracking-widest mb-1">{tag}</p>
          <p className="experience-tooltip-desc font-sans font-normal text-white/80">{description}</p>
          {/* Accent micro-triangle indicator */}
          <div className="experience-tooltip-tri-1 absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] border-4 border-transparent border-t-[#121212]" />
          <div className="experience-tooltip-tri-2 absolute top-full left-1/2 -translate-x-1/2 -mt-[6px] border-[5px] border-transparent border-t-white/10 -z-10" />
        </div>
      </div>
    </div>
  );
}

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
                         <SkillTagWithTooltip key={tagIdx} tag={tag} />
                       ))}
                    </div>

                    {/* Interactive controls */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      
                      {/* Go to website */}
                      <a
                        href={project.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 px-4 py-3 rounded-lg transition-all min-h-[44px]"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
                      </a>

                      {/* Read Case Study Case details */}
                      <button
                        onClick={() => toggleProjectExpansion(project.id)}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 px-4 py-3 rounded-lg transition-all cursor-pointer min-h-[44px]"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 text-emerald-450" />
                            <span>Minimize Brief</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 text-emerald-450 animate-bounce" />
                            <span>Read Technical Flow</span>
                          </>
                        )}
                      </button>

                    </div>

                    {/* MOBILE EXPANDER: renders immediately under interactive controls on mobile devices */}
                    <div className="block lg:hidden w-full">
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden mt-6"
                          >
                            <TechnicalFlowDetails project={project} index={index} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Right block: High-fidelity interactive Secure Shell (SSH) display of the role (lg: 7 cols) */}
                  <div className="hidden lg:block lg:col-span-7">
                    <SecureShellTerminal project={project} />
                  </div>

                </div>

                {/* DESKTOP EXPANDER: renders across full column width on larger devices */}
                <div className="hidden lg:block">
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden mt-8"
                      >
                        <TechnicalFlowDetails project={project} index={index} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
