"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: null as number | null, y: null as number | null, radius: 150 };
    let scrollY = 0;
    let targetScrollY = 0;

    // Colors according to theme
    const getThemeColors = () => {
      const isDark = resolvedTheme === "dark";
      return {
        particleColor: isDark ? "rgba(199, 247, 58, 0.4)" : "rgba(230, 74, 48, 0.3)",
        lineColor: isDark ? "rgba(61, 190, 213, 0.08)" : "rgba(11, 7, 23, 0.05)",
        extraColors: isDark 
          ? ["rgba(199, 247, 58, 0.5)", "rgba(61, 190, 213, 0.4)", "rgba(241, 138, 46, 0.3)"]
          : ["rgba(230, 74, 48, 0.4)", "rgba(61, 190, 213, 0.3)", "rgba(44, 168, 159, 0.3)"]
      };
    };

    let themeColors = getThemeColors();

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      angle: number;
      velocity: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = themeColors.extraColors[Math.floor(Math.random() * themeColors.extraColors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.02 - 0.01;
      }

      update(w: number, h: number, currentScroll: number) {
        // Floating motion
        this.x += this.speedX;
        this.y += this.speedY + (currentScroll * 0.05); // Responds to scrolling

        // Wrap around edges
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Pushes particles slightly away from mouse
            this.x -= dx / distance * force * 2;
            this.y -= dy / distance * force * 2;
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();

        // Glowing aura for larger dots
        if (this.size > 2) {
          context.beginPath();
          context.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          context.fillStyle = this.color.replace(/[\d.]+\)$/, "0.08)");
          context.fill();
        }
      }
    }

    const init = () => {
      const w = canvas.width;
      const h = canvas.height;
      particles = [];
      // Adjust density based on screen size
      const numberOfParticles = Math.min(Math.floor((w * h) / 14000), 75);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      themeColors = getThemeColors();
      init();
    };

    // Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    // Attach listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial setup
    handleResize();

    // Loop
    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      // Smooth scroll delta
      const scrollDelta = targetScrollY - scrollY;
      scrollY += scrollDelta * 0.1; // Lerp scroll

      // Draw background network connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h, scrollDelta);
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connection range
          const maxDistance = 140;
          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = themeColors.lineColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Cuadros (Grid) y Puntos (Dots) */}
      <div className="absolute inset-0 pointer-events-none pattern-grid opacity-15" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3dbed5_1px,transparent_1px)] [background-size:32px_32px] md:[background-size:48px_48px] animate-pulse" />

      {/* Anillos giratorios y puntos difuminados (como en la pantalla de carga) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-teal/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full border border-dashed border-coral/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full border border-orange/10"
          animate={{ rotate: 180 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Glowing blur blobs */}
        <div className="absolute top-[20%] left-[20%] w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-coral/10 blur-[80px] sm:blur-[150px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-teal/15 blur-[80px] sm:blur-[150px] animate-pulse" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-opacity duration-500"
        style={{ mixBlendMode: resolvedTheme === "dark" ? "screen" : "multiply" }}
      />
    </div>
  );
}
