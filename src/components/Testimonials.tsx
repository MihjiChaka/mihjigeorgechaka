import React, { useState } from "react";
import { DEFAULT_TESTIMONIALS } from "../data";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? DEFAULT_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === DEFAULT_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-white/[0.01] border-t border-white/10 relative overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, intro & interactive sliders arrows */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold block">
              Testimonials
            </span>
            
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-white leading-tight">
              What people say <br className="hidden md:inline" />
              about me
            </h2>
            
            <p className="font-sans text-xs text-white/50 max-w-xs leading-relaxed">
              Real recommendations and professional feedback from software engineering managers, data analysts, and HR directors who worked with me side-by-side.
            </p>

            {/* Slider triggers */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handlePrev}
                type="button"
                className="w-10 h-10 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-white/10 flex items-center justify-center transition active:scale-90 cursor-pointer shadow-xs"
                title="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleNext}
                type="button"
                className="w-10 h-10 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-white/10 flex items-center justify-center transition active:scale-90 cursor-pointer shadow-xs"
                title="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 ml-4 text-[10px] font-mono text-white/40">
                <span className="text-white font-bold">0{activeIndex + 1}</span>
                <span>/</span>
                <span>0{DEFAULT_TESTIMONIALS.length}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive sliding Quote deck (lg: 8 cols) */}
          <div className="lg:col-span-8 bg-[#121212]/40 border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-white/5 transition duration-500 relative min-h-[300px] flex flex-col justify-between">
            {/* Absolute quote decoration watermark */}
            <div className="absolute top-6 right-8 select-none pointer-events-none opacity-30">
              <Quote className="w-16 h-16 text-white/20" />
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <p className="font-serif italic font-normal text-lg sm:text-xl text-white leading-relaxed max-w-3xl">
                    "{DEFAULT_TESTIMONIALS[activeIndex].comment}"
                  </p>
                  
                  <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-sans font-extrabold text-white text-sm tracking-tight">
                        {DEFAULT_TESTIMONIALS[activeIndex].author}
                      </h4>
                      <p className="font-mono text-[10px] text-white/60 uppercase tracking-wider font-bold mt-0.5">
                        {DEFAULT_TESTIMONIALS[activeIndex].title}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-white/30">
                      Peer recommendation
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Dynamic References Section */}
        <div className="mt-28 pt-16 border-t border-white/10 space-y-10">
          <div className="space-y-3 select-none">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              Reference Directory
            </span>
            <h3 className="font-serif italic font-normal text-3xl sm:text-4xl text-white">
              Professional Endorsements
            </h3>
            <p className="font-sans text-xs text-white/50 max-w-xl leading-relaxed">
              For security vetting or formal operations reviews, please reach out to these contacts from my professional tenure:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Fredah Banda */}
            <div className="bg-[#121212]/30 border border-white/5 p-6 rounded-xl hover:border-white/10 transition space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-bold block">Good Nature Agro</span>
                <h4 className="font-sans font-bold text-white text-base">DR. FREDAH BANDA</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase">Software Engineering Manager</p>
              </div>
              <div className="text-[11px] font-mono text-white/60 space-y-1.5 border-t border-white/5 pt-3">
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Email:</span>
                  <a href="mailto:fredah.banda@goodnatureagro.com" className="text-white hover:underline">fredah.banda@goodnatureagro.com</a>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Cell:</span>
                  <a href="tel:+260977789980" className="text-zinc-300 hover:text-white">+260 977 789 980</a>
                </p>
              </div>
            </div>

            {/* Mathews Banda */}
            <div className="bg-[#121212]/30 border border-white/5 p-6 rounded-xl hover:border-white/10 transition space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-bold block">Good Nature Agro</span>
                <h4 className="font-sans font-bold text-white text-base">MR. MATHEWS BANDA</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase">Systems Operations Analyst</p>
              </div>
              <div className="text-[11px] font-mono text-white/60 space-y-1.5 border-t border-white/5 pt-3">
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Email:</span>
                  <a href="mailto:mathews.banda@goodnatureagro.com" className="text-white hover:underline font-mono text-[10px]">mathews.banda@goodnatureagro.com</a>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Cell:</span>
                  <a href="tel:+260976325495" className="text-zinc-300 hover:text-white">+260 976 325 495</a>
                </p>
              </div>
            </div>

            {/* Peter Mfune */}
            <div className="bg-[#121212]/30 border border-white/5 p-6 rounded-xl hover:border-white/10 transition space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest font-bold block">Impact Enterprises</span>
                <h4 className="font-sans font-bold text-white text-base">MR. PETER MFUNE</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase">Human Resource Manager</p>
              </div>
              <div className="text-[11px] font-mono text-white/60 space-y-1.5 border-t border-white/5 pt-3">
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Location:</span>
                  <span>Chipata HQ</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Cell:</span>
                  <a href="tel:+26097380558" className="text-zinc-300 hover:text-white">+260 973 805 558</a>
                </p>
              </div>
            </div>

            {/* Sitali */}
            <div className="bg-[#121212]/30 border border-white/5 p-6 rounded-xl hover:border-white/10 transition space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest font-bold block">Chipata General Hospital</span>
                <h4 className="font-sans font-bold text-white text-base">MR. SITALI</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase">Data Associate</p>
              </div>
              <div className="text-[11px] font-mono text-white/60 space-y-1.5 border-t border-white/5 pt-3">
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Registry:</span>
                  <span>SmartCare Core</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Cell:</span>
                  <a href="tel:+260979285511" className="text-zinc-300 hover:text-white">+260 979 285 511</a>
                </p>
              </div>
            </div>

            {/* Chabala */}
            <div className="bg-[#121212]/30 border border-white/5 p-6 rounded-xl hover:border-white/10 transition space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest font-bold block">Chipata General Hospital</span>
                <h4 className="font-sans font-bold text-white text-base">MR. CHABALA</h4>
                <p className="font-mono text-[10px] text-white/40 uppercase">Data Associate</p>
              </div>
              <div className="text-[11px] font-mono text-white/60 space-y-1.5 border-t border-white/5 pt-3">
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Registry:</span>
                  <span>SmartCare Active</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-white/30">Cell:</span>
                  <a href="tel:+26097775508" className="text-zinc-300 hover:text-white">+260 977 755 08</a>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
