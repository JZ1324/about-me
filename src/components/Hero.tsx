import { motion, useScroll, useTransform } from 'motion/react';
import GlitchEffect from './GlitchEffect';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const textParallax = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-center px-12 md:px-24 overflow-hidden bg-transparent">
      <motion.div 
        style={{ scale, opacity, y }}
        className="max-w-5xl z-10"
      >
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-[10px] uppercase tracking-[1em] text-gold font-bold mb-16 opacity-60"
          >
            Digital Artisan & Curator
          </motion.p>
          <GlitchEffect interval={10000}>
            <h1 className="font-display text-[clamp(2.5rem,14vw,12rem)] font-black leading-[0.8] tracking-tighter text-foreground mb-20 uppercase italic">
              CRAFTED <br /> 
              <motion.span 
                style={{ x: textParallax }}
                className="font-serif font-light text-brass not-italic tracking-normal inline-block"
              >
                PRECISION.
              </motion.span>
            </h1>
          </GlitchEffect>
          
          <div className="flex flex-col md:flex-row gap-24 items-end">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="text-xl md:text-3xl font-light text-foreground/80 max-w-2xl leading-[1.3] uppercase tracking-tight"
            >
              Curating high-fidelity experiences through a <span className="text-gold font-medium">synthesis</span> of 
              classical theory and structural innovation.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="flex gap-16 text-[9px] uppercase tracking-[0.5em] font-bold text-gold/80 border-l border-gold/20 pl-12 h-fit"
            >
              <div className="flex flex-col gap-6">
                <span className="text-foreground/20 font-mono tracking-widest">Core Disciplines</span>
                <span className="whitespace-nowrap">Architecture / Logic / Harmony</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-32 text-[15rem] font-black text-foreground pointer-events-none italic opacity-10 select-none"
      >
        JZ
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 2 }}
        style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 50]) }}
        className="absolute bottom-12 right-12 flex items-center gap-8 text-[9px] uppercase tracking-[1em] text-foreground font-bold rotate-90 origin-right whitespace-nowrap"
      >
        <span className="animate-pulse">Scroll to Observe</span>
        <div className="w-16 h-px bg-gold/50" />
      </motion.div>
    </section>
  );
}
