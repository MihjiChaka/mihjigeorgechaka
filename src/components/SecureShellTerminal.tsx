import React, { useState, useRef, useEffect } from "react";
import { Project } from "../types";
import { Play, RotateCcw, Shield, HelpCircle, CheckCircle, Terminal } from "lucide-react";

interface SecureShellTerminalProps {
  project: Project;
}

interface LogLine {
  type: "input" | "output" | "error";
  text: string;
}

export default function SecureShellTerminal({ project }: SecureShellTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<LogLine[]>([]);

  // Unique hostname/host structure for each company
  const getHostConfig = () => {
    switch (project.id) {
      case "good-nature-agro":
        return { host: "mihji@gna-prod-node01", dir: "~/projects/gna-techsupport" };
      case "good-nature-agro-accounts":
        return { host: "mihji@gna-ledger-srv", dir: "~/finance/reconciliation" };
      case "good-nature-agro-finance":
        return { host: "mihji@gna-fisp-vault", dir: "~/inventory/warehouse-audit" };
      case "good-nature-agro-intern":
        return { host: "mihji@gna-field-node", dir: "~/backlog/cleansing" };
      case "cttbd":
        return { host: "mihji@cttbd-core-system", dir: "~/coldchain/microbiology-eng" };
      case "chipata-hospital":
        return { host: "mihji@smartcare-hmis", dir: "~/sysadmin/backup" };
      case "impact-enterprises":
        return { host: "mihji@ie-qa-engine", dir: "~/data/scrubbing" };
      default:
        return { host: "mihji@portfolio-daemon", dir: "~/workspace/experience" };
    }
  };

  const config = getHostConfig();

  // Initialize terminal history with greeting and automatic system summary representation
  useEffect(() => {
    setHistory([
      { type: "output", text: `SSH Connection established to ${config.host}:22 ... [AES-128 GCM]` },
      { type: "output", text: `Authorized access user: m_chaka (Last Login: ${new Date().toLocaleDateString()} from secure-gateway)` },
      { type: "output", text: `Loaded enterprise history buffer for: ${project.title.toUpperCase()}` },
      { type: "output", text: `Type 'help' or execute command buttons below to interrogate role details.` }
    ]);
  }, [project.id]);

  // Keep scrolled to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const newLines: LogLine[] = [
      { type: "input", text: `${config.host}:${config.dir}~$ ${cmd}` }
    ];

    switch (cleanCmd) {
      case "help":
      case "commands":
        newLines.push({ type: "output", text: `Available inquiry signals for ${project.title}:` });
        newLines.push({ type: "output", text: "  profile    - View executive role summary, title, and mission description." });
        newLines.push({ type: "output", text: "  challenge  - Dive deep into technical challenges, solutions, and operational outcomes." });
        newLines.push({ type: "output", text: "  services   - List primary frameworks, services & methodologies handled." });
        newLines.push({ type: "output", text: "  git-log    - Simulates repo trace logs detailing code actions." });
        newLines.push({ type: "output", text: "  clear      - Purge screen buffer." });
        break;

      case "profile":
      case "role":
      case "info":
        newLines.push({ type: "output", text: `--- EXECUTIVE PROFILE: ${project.title.toUpperCase()} ---` });
        newLines.push({ type: "output", text: `ROLE:     ${project.role}` });
        newLines.push({ type: "output", text: `TENURE:   ${project.year}` });
        newLines.push({ type: "output", text: `TAGLINE:  ${project.tagline}` });
        newLines.push({ type: "output", text: `\nMISSION STATEMENT:` });
        newLines.push({ type: "output", text: project.description });
        break;

      case "challenge":
      case "challenges":
      case "solution":
      case "impact":
        newLines.push({ type: "output", text: "--- PROBLEM-SOLVING DIAGNOSTIC REPORT ---" });
        newLines.push({ type: "output", text: `[THE CHALLENGE]\n${project.challenge || "Complex platform rollout with rural user bandwidth requirements and data integration latencies."}` });
        newLines.push({ type: "output", text: `\n[THE INTRODUCED SOLUTION]\n${project.solution || "Formulated rigid automated parsing filters, script-centered diagnostic testing parameters, and structured support escalation rules."}` });
        newLines.push({ type: "output", text: `\n[BUSINESS RESOLUTION IMPACT]\n${project.impact || "Slashed error anomalies, boosted support resolution metrics, and maintained perfect inventory alignment records during seasonal peaks."}` });
        break;

      case "services":
      case "skills":
      case "stack":
        newLines.push({ type: "output", text: `--- INVENTORY OF SERVICES & CAPABILITIES ---` });
        newLines.push({ type: "output", text: `Total operations monitored: ${project.services.length}` });
        project.services.forEach((service, index) => {
          newLines.push({ type: "output", text: `  * [0${index + 1}] ${service}` });
        });
        break;

      case "git-log":
      case "git":
      case "commits":
        newLines.push({ type: "output", text: `--- SIMULATED REPOSITORY LOGS ($ git log --oneline -n 4) ---` });
        if (project.gitLogs && project.gitLogs.length > 0) {
          project.gitLogs.forEach((log, logIdx) => {
            const mockSha = `b${logIdx}e${(1024 + logIdx * 256).toString(16)}a`;
            newLines.push({
              type: "output",
              text: `  * commit ${mockSha} - ${log}`
            });
          });
        } else {
          newLines.push({ type: "output", text: "  * commit b0ea13a - Initial project repository import clean state" });
        }
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      default:
        newLines.push({
          type: "error",
          text: `Command not found: '${cmd}'. Enter 'help' to review authorized signals.`
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const commandButtons = ["profile", "challenge", "services", "git-log", "clear"];

  return (
    <div className="system-terminal w-full h-full bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs select-none">
      
      {/* UNIX-style SSH Window Header Bar */}
      <div className="bg-[#121215] border-b border-white/5 py-3 px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/85 inline-block border border-red-500/20" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/85 inline-block border border-yellow-500/20" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/85 inline-block border border-emerald-500/20" />
          <span className="text-[10px] text-white/30 ml-2 tracking-widest uppercase">
            {config.host}: {config.dir}
          </span>
        </div>
        
        {/* Security badge matching index.css / index page */}
        <div className="flex items-center gap-1.5 text-zinc-500 text-[9.5px] tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/5">
          <Shield className="w-3 h-3 text-emerald-400" />
          <span className="text-zinc-400 font-bold">SECURE_SHELL</span>
        </div>
      </div>

      {/* Terminal Content Box */}
      <div 
        ref={terminalRef}
        className="p-5 md:p-6 flex-grow space-y-4 overflow-y-auto h-[260px] max-h-[300px] bg-[#08080a] min-h-[220px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent text-zinc-300"
      >
        {history.map((log, logIdx) => {
          let colorClass = "text-zinc-300";
          
          if (log.type === "input") {
            colorClass = "text-emerald-400 font-bold";
          } else if (log.type === "error") {
            colorClass = "text-red-400 font-bold";
          } else if (
            log.text.startsWith("SUCCESS:") || 
            log.text.includes("[PASS]") || 
            log.text.includes("established") || 
            log.text.startsWith("---") ||
            log.text.startsWith("ROLE:") ||
            log.text.startsWith("TENURE:") ||
            log.text.startsWith("[THE ") ||
            log.text.startsWith("MISSION STATEMENT:")
          ) {
            colorClass = "text-emerald-400 font-medium";
          } else if (log.text.startsWith("  *")) {
            colorClass = "text-zinc-400 pl-2";
          }

          return (
            <p key={logIdx} className={`${colorClass} whitespace-pre-wrap leading-relaxed pb-0.5`}>
              {log.text}
            </p>
          );
        })}
      </div>

      {/* Inline terminal command execution input */}
      <div className="bg-[#0b0b0e] border-t border-white/5 p-3 flex items-center gap-2">
        <span className="text-emerald-400 font-bold select-none pl-1">~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (profile, challenge, services...) and press Enter..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-200 focus:ring-0 placeholder-zinc-700 text-xs py-0.5"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        <button
          onClick={() => executeCommand(inputValue)}
          className="p-1 px-2 hover:bg-white hover:text-[#08080a] rounded text-zinc-500 hover:text-[#08080a] transition uppercase text-[10px] font-bold tracking-widest flex items-center gap-1 cursor-pointer"
        >
          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
          <span>RUN</span>
        </button>
      </div>

      {/* Suggesters quick clicks */}
      <div className="bg-[#121215]/80 border-t border-white/5 px-4 py-3 flex flex-wrap gap-2 items-center select-none">
        <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mr-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-zinc-650" />
          <span>Interrogate:</span>
        </span>
        {commandButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => executeCommand(btn)}
            className="px-2.5 py-1 bg-white/5 hover:bg-white hover:text-[#080a0c] rounded-md text-zinc-400 border border-white/5 cursor-pointer text-[10px] tracking-wide font-sans hover:-translate-y-0.5 transition active:translate-y-0 duration-200"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* UNIX Status bar */}
      <div className="bg-[#121215] border-t border-white/5 px-4 py-1.5 flex justify-between select-none text-[9px] text-zinc-600">
        <span>Channel: Secure API (Active)</span>
        <span>encoding: UTF-8</span>
        <span>Secure SSHv2</span>
      </div>

    </div>
  );
}
