import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesAndStats from "./components/ServicesAndStats";
import ProjectList from "./components/ProjectList";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    // Check localStorage or default to dark
    const saved = localStorage.getItem("theme");
    return saved === "light" ? "light" : "dark";
  });

  // Load and apply theme on mount
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      return nextTheme;
    });
  };

  // Smooth navigation to scroll targets
  const handleNavigate = (sectionId: string) => {
    // If it's "hero", we scroll to the top
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("hero");
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll spy & Scroll button/progress visibility check
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for detection accuracy

      // Scroll to top button visibility
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const heroElement = document.getElementById("hero");
      const aboutElement = document.getElementById("about");
      const projectsElement = document.getElementById("projects");

      let active = "hero";
      const heroOffset = heroElement?.offsetTop || 0;
      const aboutOffset = aboutElement?.offsetTop || 1000;
      const projectsOffset = projectsElement?.offsetTop || 2000;

      if (projectsElement && scrollPosition >= projectsOffset) {
        active = "projects";
      } else if (aboutElement && scrollPosition >= aboutOffset) {
        active = "about";
      } else {
        active = "hero";
      }
      setActiveSection(active);

      // Now calculate active section scroll progress
      const thresholdOffset = 120;
      let start = 0;
      let end = 1000;
      const currentScroll = window.scrollY;

      if (active === "hero") {
        start = 0;
        end = Math.max(0, aboutOffset - thresholdOffset);
      } else if (active === "about") {
        start = Math.max(0, aboutOffset - thresholdOffset);
        end = Math.max(start, projectsOffset - thresholdOffset);
      } else {
        start = Math.max(0, projectsOffset - thresholdOffset);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        end = maxScroll > start ? maxScroll : start + 1000;
      }

      const totalValue = end - start;
      const progress = totalValue > 0 ? (currentScroll - start) / totalValue : 0;
      const clampedProgress = Math.max(0, Math.min(1, progress));
      setScrollProgress(clampedProgress * 100);
    };

    // Initialize initial correct values
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global keyboard shortcuts: 't' for scroll to top
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcut trigger when user is typing in forms, inputs or terminal simulator
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === "t") {
        event.preventDefault();
        scrollToTop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${theme === "light" ? "bg-[#FAF9F6] text-[#1a1a20]" : "bg-[#080808] text-[#e0e0e0]"}`}>
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 z-[100] transition-all duration-75 ease-out shadow-[0_1px_4px_rgba(16,185,129,0.3)]"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />

      {/* Dynamic Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Hero Banner Grid Section */}
        <div id="hero">
          <Hero theme={theme} />
        </div>

        {/* Services & Quick Stats Metric Columns */}
        <div id="about">
          <ServicesAndStats />
        </div>

        {/* Selected Projects Slider Deck */}
        <div id="projects">
          <ProjectList />
          
          {/* Peere reviews Testimonials */}
          <Testimonials />
        </div>

      </main>

      {/* Footer big CTA contact area */}
      <Footer />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.85 }}
            onClick={scrollToTop}
            type="button"
            className="scroll-to-top-btn fixed bottom-10 right-6 z-50 p-3 rounded-full border shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 arrow-icon-white" />
          </motion.button>
        )}
      </AnimatePresence>
      
    </div>
  );
}
