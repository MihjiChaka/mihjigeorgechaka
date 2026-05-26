import React, { useState, useRef, useEffect } from "react";
import { DEFAULT_BIO, DEFAULT_CERTIFICATIONS } from "../data";
import { Terminal, Shield, Play, HelpCircle, Code } from "lucide-react";

interface LogLine {
  type: "input" | "output" | "error";
  text: string;
}

export default function TerminalSimulator() {
  const [history, setHistory] = useState<LogLine[]>([
    { type: "output", text: "Mihji OS Loader v4.1.2-STABLE" },
    { type: "output", text: "Retrieving encrypted portfolio systems ... [LOADED]" },
    { type: "output", text: "Type 'help' or click the command shortcuts below to interrogate developer logs." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newLines: LogLine[] = [{ type: "input", text: `mihji@mgchaka-infra:~$ ${cmd}` }];

    switch (cleanCmd) {
      case "help":
      case "commands":
        newLines.push({ type: "output", text: "Available commands regarding Mihji George Chaka:" });
        newLines.push({ type: "output", text: "  neofetch   - Render system stats, credentials, and experience timeline." });
        newLines.push({ type: "output", text: "  skills     - Access automated metrics for core software and IT stacks." });
        newLines.push({ type: "output", text: "  certs      - Query secure certification hashes (CCNP, CCNA, Azure)." });
        newLines.push({ type: "output", text: "  contact    - Retrieve active communication gateway endpoints." });
        newLines.push({ type: "output", text: "  clear      - Purge session log buffers." });
        break;

      case "neofetch":
        newLines.push({
          type: "output",
          text: `   /\\_/\\     OS: Mihji George Chaka Zambia GNU/Linux
  ( o.o )    UPTIME: 4 Years + Active Staging
   > ^ <     ROLE: Full Stack Developer & Systems Architect
  [_____]    HOST: Good Nature Agro (Present) / CTTBD Active Nodes
             SHELL: PowerShell 7.4 / zsh / bash / pwsh
             CITIZENSHIP: Zambian
             VERIFIED: Cisco CCNP Enterprise (Core & Advanced Routing) & Multi-Stack Developer certified`
        });
        break;

      case "skills":
        newLines.push({ type: "output", text: "[CRITICAL INTERNALS] EVALUATING CORE STACK RATINGS:" });
        newLines.push({ type: "output", text: "  PHP & Python Web Frameworks   [████████████████████] 96% (Laravel, Symfony, Django)" });
        newLines.push({ type: "output", text: "  C# & .NET / ASP.NET Core      [██████████████████░░] 90% (Microservices, Docker)" });
        newLines.push({ type: "output", text: "  SQL Querying & DB Engine Admin [████████████████████] 98% (MySQL, PostgreSQL, MongoDB)" });
        newLines.push({ type: "output", text: "  CCNP/CCNA Routing & CyberSec  [██████████████████░░] 92% (VPNs, VLANs, Firewalls)" });
        newLines.push({ type: "output", text: "  PowerShell & Bash Automation  [████████████████░░░░] 80% (Admin task scripts)" });
        break;

      case "certs":
        newLines.push({ type: "output", text: `Authenticated Credentials List (Total: ${DEFAULT_CERTIFICATIONS.length} Secure Hashes):` });
        DEFAULT_CERTIFICATIONS.slice(0, 6).forEach((cert) => {
          newLines.push({
            type: "output",
            text: `  * [${cert.year}] ${cert.name} - Issued by ${cert.issuer}`
          });
        });
        newLines.push({ type: "output", text: "  [NOTICE] Type 'certs --all' on console or view Badges tab below for complete list." });
        break;

      case "certs --all":
        newLines.push({ type: "output", text: "Retrieving complete database certifications index..." });
        DEFAULT_CERTIFICATIONS.forEach((cert) => {
          newLines.push({
            type: "output",
            text: `  * [${cert.year}] ${cert.name} (${cert.issuer})`
          });
        });
        break;

      case "contact":
        newLines.push({ type: "output", text: "ONLINE COMMUNICATION NODES ACTIVE:" });
        newLines.push({ type: "output", text: `  - Email:     ${DEFAULT_BIO.email}` });
        newLines.push({ type: "output", text: `  - Phone Primary:   ${DEFAULT_BIO.phone} (WhatsApp Enabled)` });
        newLines.push({ type: "output", text: `  - Phone Secondary: ${DEFAULT_BIO.altPhone}` });
        newLines.push({ type: "output", text: `  - Location:  ${DEFAULT_BIO.location}` });
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      case "":
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

  const commandButtons = ["neofetch", "skills", "certs", "contact", "clear"];

  return (
    <div className="system-terminal w-full bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs select-none">
      
      {/* Real terminal-style upper topbar */}
      <div className="bg-[#121215] border-b border-white/5 py-3 px-4 flex items-center justify-between select-none">
        
        {/* Terminal dots controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/30" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/30" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/30" />
          <span className="text-[10px] text-white/30 ml-2 tracking-widest uppercase">
            mihji@mgchaka-infra: ~
          </span>
        </div>

        {/* Security / lock badge indicator */}
        <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/5">
          <Shield className="w-3 h-3 text-emerald-400" />
          <span className="text-zinc-400">SECURE_SHELL</span>
        </div>
      </div>

      {/* Terminal log panel area */}
      <div
        ref={terminalRef}
        className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto p-4 space-y-2 bg-[#08080a] text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
      >
        {history.map((log, idx) => {
          let logClass = "text-zinc-300";
          if (log.type === "input") logClass = "text-emerald-400 font-bold";
          else if (log.type === "error") logClass = "text-red-400 font-bold";
          else if (log.text.startsWith(" ")) logClass = "text-zinc-400";

          return (
            <div key={idx} className={`${logClass} whitespace-pre-wrap leading-relaxed break-keep`}>
              {log.text}
            </div>
          );
        })}
      </div>

      {/* Direct inline terminal command execution user input */}
      <div className="bg-[#0b0b0e] border-t border-white/5 p-3 flex items-center gap-2">
        <span className="text-emerald-400 font-bold select-none pl-1">~$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g., neofetch) and press Enter..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-200 focus:ring-0 placeholder-zinc-700 text-xs py-0.5"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
        <button
          onClick={() => executeCommand(inputValue)}
          className="p-1 px-2 hover:bg-white hover:text-[#08080a] rounded text-zinc-500 hover:text-[#08080a] transition uppercase text-[10px] font-bold tracking-widest flex items-center gap-1 cursor-pointer"
        >
          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400 group-hover:fill-[#08080a]" />
          <span>RUN</span>
        </button>
      </div>

      {/* Button suggestions shortcuts block for rapid clicking */}
      <div className="bg-[#121215]/80 border-t border-white/5 px-4 py-3 flex flex-wrap gap-2 items-center select-none">
        <span className="text-[9px] font-mono tracking-widest text-zinc-650 uppercase mr-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 w-3 text-zinc-550" />
          <span>Quick Commands:</span>
        </span>
        {commandButtons.map((btn) => (
          <button
            key={btn}
            onClick={() => executeCommand(btn)}
            className="px-2.5 py-1 bg-white/5 hover:bg-white hover:text-[#080a0c] rounded-md text-zinc-405 border border-white/5 cursor-pointer text-[10px] tracking-wide font-sans hover:-translate-y-0.5 transition active:translate-y-0 duration-200"
          >
            {btn}
          </button>
        ))}
        <button
          onClick={() => executeCommand("certs --all")}
          className="px-2.5 py-1 bg-blue-950/25 hover:bg-blue-400 hover:text-[#080a0c] text-blue-300 border border-blue-500/10 rounded-md cursor-pointer text-[10px] tracking-wide font-sans hover:-translate-y-0.5 transition active:translate-y-0 duration-200"
        >
          certs --all
        </button>
      </div>
    </div>
  );
}
