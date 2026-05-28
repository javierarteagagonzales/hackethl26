"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const sections = [
  { id: "hero", label: "00 // ACCESO", target: "#" },
  { id: "about", label: "01 // SINOPSIS", target: "#about" },
  { id: "tracks", label: "02 // CATEGORÍAS", target: "#tracks" },
  { id: "sponsors", label: "03 // ALIADOS", target: "#sponsors" },
  { id: "timeline", label: "04 // CRONOGRAMA", target: "#timeline" },
];

export function SidebarTimelineNavigator() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        if (section.id === "hero") continue;
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (target === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none pointer-events-auto">
      {/* Background linking thread */}
      <div className="absolute w-[2px] h-[240px] bg-white/10 rounded-full overflow-hidden">
        {/* Animated active path filling up */}
        <motion.div
          className="w-full h-full bg-gradient-to-b from-coral via-orange to-cyan origin-top"
          style={{ scaleY }}
        />
      </div>

      <div className="flex flex-col justify-between h-[240px] relative">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          
          return (
            <a
              key={sec.id}
              href={sec.target}
              onClick={(e) => handleClick(e, sec.target)}
              className="group flex items-center justify-end relative h-6 w-6"
            >
              {/* Tooltip Label */}
              <span className="absolute right-8 mr-2 px-3 py-1 bg-surface/90 border border-border/40 backdrop-blur-md text-[10px] font-mono tracking-widest text-fg/80 uppercase rounded-md shadow-lg pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
                {sec.label}
              </span>

              {/* Pulsing Outer Orbit */}
              <motion.div
                className={`absolute w-5 h-5 rounded-full border border-dashed transition-all duration-300 ${
                  isActive 
                    ? "border-cyan opacity-80" 
                    : "border-transparent opacity-0 group-hover:opacity-40 group-hover:border-coral"
                }`}
                animate={isActive ? { rotate: 360 } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Connected Dot Core */}
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-coral to-orange scale-125 shadow-[0_0_12px_rgba(230,74,48,0.7)]" 
                    : "bg-fg/30 group-hover:bg-coral group-hover:scale-110"
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
