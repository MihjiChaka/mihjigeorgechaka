import React, { useState } from "react";
import { DEFAULT_SERVICES, DEFAULT_STATS, DEFAULT_BIO, DEFAULT_CERTIFICATIONS, Certification } from "../data";
import { MoveRight, Shield, CheckCircle, Award, Terminal, Cloud, ShieldCheck, Cpu, Network } from "lucide-react";

export default function ServicesAndStats() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSpec, setActiveSpec] = useState<number>(0);

  const specialties = [
    {
      tech: "PHP / Laravel",
      title: "Enterprise Web App Architecture",
      desc: "Architecting high-availability backends, multi-tenant SaaS structures, and restful APIs using Laravel, Symfony, and CodeIgniter.",
      stats: "PHP 8.x, MVC patterns, Composer"
    },
    {
      tech: "C# / ASP.NET",
      title: "Backend Service & Microservices",
      desc: "Formulating enterprise systems with ASP.NET Core, Docker, dependency injection containers, and secure MSSQL relational schemas.",
      stats: ".NET 8.0 Core, Entity Framework, C#"
    },
    {
      tech: "Python / Django",
      title: "Automation & Data Pipelines",
      desc: "Creating high-performance data cleansers, ETL automation tools, web scrapers, and RESTful APIs using Django, Flask, and FastAPI.",
      stats: "Automated parsing, Pandas, Python"
    },
    {
      tech: "Cisco CCNP",
      title: "Enterprise Networking Topologies",
      desc: "Designing robust Layer 3 routing schemas, multi-area BGP/OSPF environments, SD-WAN controllers, and secure firewall network access.",
      stats: "Cisco Advanced Routing & Switching"
    }
  ];

  // Auto-cycling timer for the tabs
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpec((prev) => (prev + 1) % specialties.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const categories = ["All", "Networks", "Software", "Cloud", "Compliance"];

  const filteredCertifications = DEFAULT_CERTIFICATIONS.filter((cert) => {
    if (selectedCategory === "All") return true;
    return cert.category === selectedCategory;
  });

  return (
    <section id="about" className="py-24 bg-white/[0.02] border-y border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* About Intro Quote block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4 select-none">
            <h2 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Engineering Pillars & Mission
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-serif italic font-normal text-2xl md:text-3xl lg:text-4xl text-white leading-snug tracking-tight">
              "{DEFAULT_BIO.longBio}"
            </h3>
            <div className="w-12 h-0.5 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-24 border-b border-white/10 pb-16">
          {DEFAULT_STATS.map((stat) => (
            <div key={stat.id} className="space-y-3 group">
              <span className="font-serif italic font-light text-5xl md:text-6xl text-white group-hover:text-white/80 transition-colors duration-300">
                {stat.number}
              </span>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white">
                  {stat.label}
                </h4>
                <p className="font-sans text-xs text-white/50 max-w-xs leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Services Listings split-grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 border-b border-white/10">
          
          <div className="lg:col-span-4 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Core Capabilities
            </span>
            <h3 className="font-serif italic font-normal text-3xl text-white">
              Areas of Specialty
            </h3>
            
            {/* Dynamic, Interactive Specialty Switching Panel */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-2 flex-wrap">
                {specialties.map((spec, sIdx) => (
                  <button
                    key={spec.tech}
                    onClick={() => setActiveSpec(sIdx)}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-wide uppercase transition cursor-pointer ${
                      activeSpec === sIdx
                        ? "bg-white text-zinc-950 border-white font-bold"
                        : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {spec.tech}
                  </button>
                ))}
              </div>

              {/* Dynamic card contents */}
              <div className="p-5 rounded-xl border border-white/10 bg-[#0f0f12]/60 space-y-3 relative overflow-hidden transition-all duration-300 min-h-[140px]">
                <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-widest block">
                  {specialties[activeSpec].tech} Focus
                </span>
                <h4 className="font-sans font-extrabold text-sm text-white uppercase tracking-tight">
                  {specialties[activeSpec].title}
                </h4>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  {specialties[activeSpec].desc}
                </p>
                <div className="border-t border-white/5 pt-2 text-[9px] font-mono text-white/30">
                  {specialties[activeSpec].stats}
                </div>
                {/* Horizontal dynamic loading bar indicator */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 w-full animate-[shimmer_6s_infinite] origin-left" style={{ animationDuration: '6s' }} />
              </div>
            </div>
            
            <div>
              <a
                href={`mailto:${DEFAULT_BIO.email}`}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-white hover:text-white/80 transition"
              >
                <span>Initiate connection</span>
                <MoveRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Individual Service Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEFAULT_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="bg-[#121212]/40 rounded-2xl p-6 border border-white/5 shadow-xs hover:shadow-md hover:border-white/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-white/80 group-hover:bg-white group-hover:text-[#080808] transition-colors duration-300">
                    {index === 0 ? "CS" : index === 1 ? "DD" : "SN"}
                  </div>
                  
                  <h4 className="font-sans font-bold text-base text-white">
                    {service.name}
                  </h4>
                  
                  <p className="font-sans text-xs text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 space-y-2">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                      <CheckCircle className="w-3 h-3 text-white/45" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Credentials & Technical badging list */}
        <div className="pt-24 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
                Professional Credentials
              </span>
              <h3 className="font-serif italic font-normal text-3xl sm:text-4xl text-white">
                Certifications & Verification
              </h3>
            </div>
            
            {/* Category Filter buttons */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-950/80 p-1 border border-white/5 rounded-lg select-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded text-xs tracking-wide font-sans cursor-pointer transition ${
                    selectedCategory === cat
                      ? "bg-white text-[#08080c] font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat === "All" ? "All Locks" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => {
              // Custom rendering indicators based on category
              const renderCategoryIcon = (category: string) => {
                switch (category) {
                  case "Networks":
                    return <Network className="w-5 h-5 text-emerald-400" />;
                  case "Software":
                    return <Terminal className="w-5 h-5 text-blue-400" />;
                  case "Cloud":
                    return <Cloud className="w-5 h-5 text-cyan-400" />;
                  case "Compliance":
                    return <ShieldCheck className="w-5 h-5 text-amber-500" />;
                  default:
                    return <Award className="w-5 h-5 text-white/60" />;
                }
              };

              return (
                <div
                  key={cert.id}
                  className="bg-[#121212]/30 hover:bg-[#121212]/70 rounded-xl p-5 border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition">
                        {renderCategoryIcon(cert.category)}
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5 tracking-wider">
                        {cert.year}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-sm text-white group-hover:text-white/95 leading-snug">
                        {cert.name}
                      </h4>
                      <p className="font-mono text-[9px] uppercase text-white/45 tracking-widest">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-4 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[8.5px] tracking-wide text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {cert.url && (
                      <div className="flex items-center justify-end pt-1">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[9px] text-white/45 group-hover:text-white/95 transition flex items-center gap-1 uppercase tracking-widest font-bold"
                        >
                          <span>Verify Record</span>
                          <MoveRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
