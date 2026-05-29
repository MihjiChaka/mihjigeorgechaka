import React, { useState } from "react";
import { SOCIALS, CHANNELS, DEFAULT_BIO, DESKTOP_PORTFOLIO_URL } from "../data";
import { Copy, Check, ArrowUpRight, Github, Send } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEFAULT_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Modern grid layout
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Big Call To Action Title */}
        <div className="space-y-6 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold block">
            Got a project in mind?
          </span>
          
          <h2 className="font-serif italic font-normal text-4xl sm:text-6xl text-white leading-tight">
            Let's make something <br />
            happen together
          </h2>

          {/* Interactive Click-to-Copy Email Capsule */}
          <div className="pt-6">
            <button
               onClick={handleCopyEmail}
               type="button"
               className="inline-flex items-center gap-3 bg-[#121212]/85 hover:bg-zinc-900 transition border border-white/10 rounded-xl px-5 py-3 text-sm md:text-lg font-mono text-white/90 w-full sm:w-auto text-left relative group cursor-pointer"
            >
              <span>{DEFAULT_BIO.email}</span>
              <div className="w-8 h-8 rounded-lg bg-black/50 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              </div>
              
              {copied && (
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-[#080808] text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded shadow-lg">
                  Copied Address!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Links structure columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10 text-white/60 text-xs">
          
          {/* Services Repeat column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-white">
              WHAT I DO
            </h4>
            <ul className="space-y-2 font-sans font-medium">
              <li>- Website Design</li>
              <li>- Product Design</li>
              <li>- Branding & Strategy</li>
            </ul>
          </div>

          {/* Socials column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-white">
              SOCIAL CHANNELS
            </h4>
            <ul className="space-y-2 font-mono">
              <li>
                <a
                  href={DESKTOP_PORTFOLIO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 text-emerald-400 font-bold transition-colors flex items-center gap-1 group"
                >
                  <span className="animate-pulse">●</span>
                  <span>Desktop OS Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              </li>
              {SOCIALS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Messenger column */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-white">
              TEXT ME
            </h4>
            <ul className="space-y-3.5 font-mono">
              {CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.url}
                    className="hover:text-white transition-colors flex items-start gap-1 group"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest leading-none mb-1 group-hover:text-white/60 transition-colors">
                        {channel.name}
                      </span>
                      <span className="text-xs text-white font-mono tracking-wider font-semibold group-hover:text-blue-400 transition-colors">
                        {channel.label}
                      </span>
                    </div>
                    <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity self-center ml-1 text-blue-450" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Credit Line */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-white/30 font-mono text-[10px]">
          <span>© 16-25 / DESIGNED BY Mihji Chaka / ALL RIGHTS RESERVED</span>
          <span className="mt-2 md:mt-0">MADE WITH PRECISION EXCELLENCE</span>
        </div>

      </div>
    </footer>
  );
}
