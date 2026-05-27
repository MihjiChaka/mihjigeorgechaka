import React from "react";
import { InteractiveSystem3D } from "./InteractiveSystem3D";

export function GoodNatureAgroDefault() {
  return (
    <div className="w-full h-full relative bg-[#09090b] overflow-hidden flex flex-col justify-between p-6 select-none font-mono text-zinc-400 border border-emerald-500/10 rounded-xl">
      {/* Top Console Status Header */}
      <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="text-zinc-300 font-bold uppercase">QA-STAGING::DATA_PIPELINE</span>
        </div>
        <span className="text-emerald-400 font-bold bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/10">
          SYS_ONLINE
        </span>
      </div>

      {/* Database Schema & Analytics visual inside Staging */}
      <div className="flex-1 my-4 relative flex flex-col justify-center space-y-3">
        
        {/* Terminal log snippet */}
        <div className="bg-black/40 border border-zinc-900 rounded p-3 text-[10px] leading-relaxed space-y-1.5 text-zinc-500">
          <p className="text-zinc-400">
            <span className="text-emerald-400">$</span> sqlcmd -S pg-srv-01 -U m_chaka -q <span className="text-zinc-300">"EXEC IngestFieldLogs;"</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-[9px] border-l border-emerald-500/30 pl-2">
            <div>
              <p className="text-zinc-400">LOG_PARSED (OK): 1,482 rows</p>
              <p className="text-zinc-500">TIME: 2026-05-22 14:30Z</p>
            </div>
            <div>
              <p className="text-amber-400">DUPLICATES_CLEANED: 34 rows</p>
              <p className="text-emerald-400">ANOMALIES_ISOLATED: 0</p>
            </div>
          </div>
        </div>

        {/* Visual yield bar chart / metric display */}
        <div className="grid grid-cols-4 gap-2.5 items-end h-16 pt-2 bg-black/20 p-2 rounded border border-zinc-900">
          <div className="space-y-1">
            <div className="h-6 bg-zinc-800 rounded-sm relative group-hover:bg-emerald-600 transition duration-300">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-500/30" />
            </div>
            <span className="text-[8px] text-zinc-500 block text-center">WK01</span>
          </div>
          <div className="space-y-1">
            <div className="h-10 bg-zinc-800 rounded-sm relative group-hover:bg-emerald-600 transition duration-300">
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-emerald-500/30" />
            </div>
            <span className="text-[8px] text-zinc-500 block text-center">WK02</span>
          </div>
          <div className="space-y-1">
            <div className="h-12 bg-zinc-805 rounded-sm relative group-hover:bg-emerald-600 transition-300">
              <div className="absolute inset-x-0 bottom-0 h-full bg-emerald-500/40" />
            </div>
            <span className="text-[8px] text-zinc-300 block text-center font-bold">WK03</span>
          </div>
          <div className="space-y-1">
            <div className="h-8 bg-zinc-800 rounded-sm relative group-hover:bg-emerald-600 transition duration-300">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-emerald-500/20" />
            </div>
            <span className="text-[8px] text-zinc-500 block text-center">WK04</span>
          </div>
        </div>
      </div>

      {/* Footer statistics */}
      <div className="flex justify-between items-end border-t border-zinc-900 pt-3 text-[9px] text-zinc-500">
        <div className="flex flex-col">
          <span className="uppercase text-[8px]">Agro-Analytics Platform</span>
          <span className="text-zinc-300 font-bold text-[10px] tracking-wide mt-0.5">Good Nature Agro Inc.</span>
        </div>
        <span>INTEGRATION OK</span>
      </div>
    </div>
  );
}

export function CttbdDefault() {
  return (
    <div className="w-full h-full relative bg-[#09090b] overflow-hidden flex flex-col justify-between p-6 select-none font-mono text-zinc-400 border border-blue-500/10 rounded-xl">
      {/* Top Console Status Header */}
      <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-pulse" />
          <span className="text-zinc-300 font-bold uppercase">C#_COMPILER_TARGET::LIVE</span>
        </div>
        <span className="text-blue-400 font-bold bg-blue-950/30 px-2 py-0.5 rounded border border-blue-500/10">
          UAT_PASSING
        </span>
      </div>

      {/* Vaccine inventory data schema and test runner */}
      <div className="flex-1 my-4 relative flex flex-col justify-center space-y-3">
        
        {/* pass/fail test panel */}
        <div className="bg-black/50 border border-zinc-900 rounded p-3 text-[9px] leading-relaxed space-y-1">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-1.5 text-zinc-500">
            <span>RUNNING 4 UNIT TESTS ON C# VACCINE_MANAGER</span>
            <span className="text-blue-400">dotnet test</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5">
            <span>[PASS]</span>
            <span className="text-zinc-400">VaccineController.CalculateActiveColdStorageLimits_Verify()</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5">
            <span>[PASS]</span>
            <span className="text-zinc-400">StockModel.PreventInventoryOverdraw_UnderZero()</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5">
            <span>[PASS]</span>
            <span className="text-zinc-400">LogisticsGateway.EncryptOutboundUARTSecurityToken()</span>
          </div>
          <div className="text-zinc-500 mt-1 pl-1">
            Total test duration: 42ms. Passing rate: 100%.
          </div>
        </div>

        {/* C# visual snippet */}
        <div className="text-[10px] bg-black/20 p-2 rounded border border-zinc-900 text-zinc-500 flex justify-between items-center">
          <code>
            <span className="text-blue-400">public class</span> <span className="text-zinc-300">VaccineManager</span>
          </code>
          <div className="flex gap-2">
            <span className="bg-zinc-800 text-zinc-400 text-[8px] px-1 py-0.2 rounded font-mono">C#</span>
            <span className="bg-zinc-800 text-zinc-400 text-[8px] px-1 py-0.2 rounded font-mono">MS SQL</span>
          </div>
        </div>
      </div>

      {/* Footer statistics */}
      <div className="flex justify-between items-end border-t border-zinc-900 pt-3 text-[9px] text-zinc-500">
        <div className="flex flex-col">
          <span className="uppercase text-[8px]">VACCINE STOCK MANAGER</span>
          <span className="text-zinc-300 font-bold text-[10px] tracking-wide mt-0.5">CTTBD Disease Database</span>
        </div>
        <span>v1.0 STANDALONE</span>
      </div>
    </div>
  );
}

export function ChipataHospitalDefault() {
  return (
    <div className="w-full h-full relative bg-[#09090b] overflow-hidden flex flex-col justify-between p-6 select-none font-mono text-zinc-400 border border-amber-500/10 rounded-xl">
      {/* Top Console Status Header */}
      <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500/80 animate-pulse" />
          <span className="text-zinc-300 font-bold uppercase">SECURED_EMR_PORTAL::REGISTRY</span>
        </div>
        <span className="text-amber-400 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/10">
          AES_256
        </span>
      </div>

      {/* SmartCare system integrity and records */}
      <div className="flex-1 my-4 relative flex flex-col justify-center space-y-3">
        
        {/* Encryption key, security logs and records index */}
        <div className="bg-black/50 border border-zinc-900 rounded p-3 text-[9.5px] leading-relaxed space-y-1.5">
          <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-1">
            <span>SMARTCARE INTERACTION RECORD</span>
            <span className="text-amber-500/80">ACCESS_CONTROL: SAFE</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[9px]">
            <div>
              <p className="text-zinc-500 uppercase text-[8px]">Integrity Index</p>
              <p className="text-zinc-300 font-bold">100.0% SECURE</p>
            </div>
            <div>
              <p className="text-zinc-500 uppercase text-[8px]">Database Engine</p>
              <p className="text-zinc-300 font-bold">SQL SmartCare</p>
            </div>
          </div>
          <div className="bg-black/30 p-1.5 border border-zinc-900 text-zinc-500 rounded text-[8.5px]">
            <p className="text-amber-400">// AUDIT_LOG SECURITY SIGNALS:</p>
            <p>- Decrypting local query logs ... [SUCCESS]</p>
            <p>- Confirmed database compliance hash match.</p>
          </div>
        </div>
      </div>

      {/* Footer statistics */}
      <div className="flex justify-between items-end border-t border-zinc-900 pt-3 text-[9px] text-zinc-500">
        <div className="flex flex-col">
          <span className="uppercase text-[8px]">ART Clinics Security Gateway</span>
          <span className="text-zinc-300 font-bold text-[10px] tracking-wide mt-0.5">Chipata General Hospital</span>
        </div>
        <span>COMPLIANCE AUTH</span>
      </div>
    </div>
  );
}

export function ImpactEnterprisesDefault() {
  return (
    <div className="w-full h-full relative bg-[#09090b] overflow-hidden flex flex-col justify-between p-6 select-none font-mono text-zinc-400 border border-cyan-500/10 rounded-xl">
      {/* Top Console Status Header */}
      <div className="flex justify-between items-center text-[10px] tracking-wider border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-500/80 animate-pulse" />
          <span className="text-zinc-300 font-bold uppercase">BATCH_ENGINE::CLEANSING_CORE</span>
        </div>
        <span className="text-cyan-400 font-bold bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/10">
          99.8% ACCURACY
        </span>
      </div>

      {/* Batch data cleaning pipeline metrics */}
      <div className="flex-1 my-4 relative flex flex-col justify-center space-y-3">
        
        {/* Structured table simulator */}
        <div className="bg-black/40 border border-zinc-900 rounded p-2.5 text-[9px] space-y-1 text-zinc-500">
          <div className="grid grid-cols-3 font-bold text-zinc-400 border-b border-zinc-900 pb-1">
            <span>CUSTOMER_ID</span>
            <span>DOM_STATUS</span>
            <span>CLEANSED_VALUE</span>
          </div>
          <div className="grid grid-cols-3 font-mono">
            <span className="text-zinc-550">#682124</span>
            <span className="text-emerald-400">VERIFIED</span>
            <span className="text-zinc-350">goodnatureagro.com</span>
          </div>
          <div className="grid grid-cols-3 font-mono">
            <span className="text-zinc-550">#682125</span>
            <span className="text-emerald-400">VERIFIED</span>
            <span className="text-zinc-350">cttbd.org/livestock</span>
          </div>
          <div className="grid grid-cols-3 font-mono">
            <span className="text-zinc-550">#682126</span>
            <span className="text-amber-400">MUTATED</span>
            <span className="text-zinc-300">impactenterprises.org</span>
          </div>
          <div className="pt-1.5 border-t border-zinc-900 flex justify-between items-center text-[8px] text-zinc-500">
            <span>PARSING SPEED: 840/sec</span>
            <span className="text-cyan-400">BATCH: #129_A COMPLETE</span>
          </div>
        </div>
      </div>

      {/* Footer statistics */}
      <div className="flex justify-between items-end border-t border-zinc-900 pt-3 text-[9px] text-zinc-500">
        <div className="flex flex-col">
          <span className="uppercase text-[8px]">IT Operations Lab</span>
          <span className="text-zinc-300 font-bold text-[10px] tracking-wide mt-0.5">Impact Enterprises</span>
        </div>
        <span>TEMPLATED_RUN OK</span>
      </div>
    </div>
  );
}

export function AvatarDefault({ theme }: { theme?: "dark" | "light" }) {
  const isLight = theme === "light";
  return (
    <div className={`w-full h-full flex flex-col justify-center items-center select-none relative overflow-hidden rounded-xl border transition-all duration-300 ${
      isLight 
        ? "bg-gradient-to-tr from-[#fbfbfa] to-[#f4f3ef] border-zinc-200/80" 
        : "bg-gradient-to-tr from-[#0a0a0c] to-[#121215] border-white/5"
    }`}>
      <InteractiveSystem3D theme={theme} />
    </div>
  );
}
