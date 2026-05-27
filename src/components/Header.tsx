import React, { useState, useEffect } from "react";
import { SOCIALS } from "../data";
import { Menu, X, Mail, Sun, Moon, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateCV } from "../utils/cvGenerator";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Header({ activeSection, onNavigate, theme, onToggleTheme }: HeaderProps) {
  const [greeting, setGreeting] = useState("Good morning!");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic greeting based on browser local time
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good morning!");
    } else if (hours < 17) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  const navItems = [
    { id: "hero", label: "Index" },
    { id: "about", label: "About" },
    { id: "projects", label: "Work Experience" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#080808]/85 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Dynamic Greeting */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate("hero")}
              className="text-white hover:text-white/80 transition cursor-pointer flex flex-col group"
            >
              <span className="font-serif italic font-extrabold text-2xl tracking-tighter text-white">
                Mihji G. Chaka
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-white/40 -mt-1 group-hover:text-white/60 transition duration-300">
                Full Stack Developer & Systems Architect
              </span>
            </button>

            {/* Dynamic Greeting Label - Hidden on small screens */}
            <div className="hidden lg:flex items-center gap-2.5 font-mono text-xs text-white/60 border-l border-white/10 pl-8">
              <span className="inline-block w-2 h-2 rounded-full bg-white/40 animate-pulse" />
              <span>{greeting}</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-wider font-medium text-white/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-1.5 transition cursor-pointer hover:text-white ${
                    isActive ? "text-white font-bold" : ""
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Social Icons & Email Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/40">
              {SOCIALS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title={social.name}
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Custom Interactive Theme Toggle Switch */}
            <button
              onClick={onToggleTheme}
              className="theme-toggle relative w-12 h-6.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center p-1 cursor-pointer transition-all duration-300 focus:outline-hidden select-none"
              aria-label="Toggle visual theme"
            >
              <motion.div
                className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer"
                animate={{
                  x: theme === "light" ? 20 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                {theme === "light" ? (
                  <Sun className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                ) : (
                  <Moon className="w-3 h-3 text-zinc-950 fill-zinc-950" />
                )}
              </motion.div>
            </button>

            <a
              href="mailto:hello@mihjichaka.design"
              className="px-4 py-2 bg-white hover:bg-zinc-200 text-neutral-950 font-mono text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95 duration-200 flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Talk!</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            {/* Quick-access Theme Toggle Button on Mobile */}
            <button
              onClick={onToggleTheme}
              className="theme-toggle p-2 text-white/80 hover:text-white cursor-pointer select-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Sun className="w-5.5 h-5.5 text-amber-500 fill-amber-500/20" />
              ) : (
                <Moon className="w-5.5 h-5.5 text-white/80" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-white/80 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu (Slide Down) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mobile-nav-drawer fixed inset-x-0 top-[70px] z-40 bg-[#080808] border-b border-white/10 shadow-2xl flex flex-col p-6 font-mono text-white md:hidden"
          >
            {/* Dynamic Greeting */}
            <div className="flex items-center gap-2 text-xs text-white/40 mb-6 border-b border-white/10 pb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              <span>{greeting}</span>
            </div>

            {/* Navigation Choices */}
            <div className="flex flex-col gap-4 text-sm font-semibold tracking-wide uppercase mb-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 border-b border-white/5 transition-colors cursor-pointer ${
                    activeSection === item.id ? "text-white pl-2 font-bold" : "text-white/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Download CV Mobile Button */}
            <button
              id="download-cv-mobile-btn"
              onClick={() => {
                generateCV();
                setMobileMenuOpen(false);
              }}
              type="button"
              className="w-full mb-6 py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-wider transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download Professional CV</span>
            </button>

            {/* Social Channels inside Mobile drawer */}
            <div className="flex justify-between items-center bg-zinc-900/60 border border-white/5 rounded-xl p-4">
              <div className="flex gap-4">
                {SOCIALS.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <a
                href="mailto:hello@mihjichaka.design"
                className="text-xs font-bold uppercase tracking-wider text-white hover:text-white/85 flex items-center gap-1"
              >
                <span>Let's talk!</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
