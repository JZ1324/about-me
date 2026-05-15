import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.35]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -30]);
  const textParallax = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section relative z-10 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] items-start min-h-screen py-[15vh]">
        <motion.div
          style={{ scale, opacity, y }}
          className="max-w-6xl relative"
        >
          <div className="absolute -left-8 top-0 h-full w-[1px] bg-gold/20 hidden xl:block" />
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="section-kicker">Vol. 01</span>
            <div className="h-[1px] w-12 bg-gold/30" />
            <span className="section-kicker">Digital Artisan / Curator</span>
          </motion.div>

          <h1 className="font-display text-[clamp(4.5rem,18vw,14rem)] tight-leading super-tracking text-foreground uppercase max-w-[12ch] relative">
            <span className="relative z-10">Architectural</span>
            <motion.span
              style={{ x: textParallax }}
              className="block text-[0.78em] text-gold italic normal-case tracking-[-0.02em] -mt-[0.15em] ml-[0.25em]"
            >
              Archive
            </motion.span>
          </h1>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12 items-end">
            <div className="space-y-10">
              <p className="text-[clamp(1.15rem,2.2vw,1.8rem)] leading-[1.35] text-foreground-soft max-w-[30ch]">
                A practice defined by the tension between raw material and precise composition.
              </p>
              <div className="flex gap-12 pt-4">
                <div className="space-y-2">
                  <p className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">Coordinates</p>
                  <p className="font-mono text-[0.65rem] text-gold">40.7128° N, 74.0060° W</p>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">Status</p>
                  <p className="font-mono text-[0.65rem] text-gold">Active / Production</p>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <p className="font-mono text-[0.6rem] leading-relaxed text-muted uppercase tracking-[0.25em] vertical-text transform rotate-180 origin-center">
                Built with intentional restraint.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:mt-[10vh] editorial-frame arch-border rounded-sm p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <div className="font-mono text-[4rem] leading-none tracking-tighter">ARCH</div>
          </div>
          
          <div className="space-y-12 relative z-10">
            <div>
              <p className="section-kicker mb-4 text-gold/60">Overview / 01</p>
              <p className="text-foreground-soft text-xl leading-[1.6] italic font-display">
                This space is an archive of digital artifacts, measured and authored to feel permanent.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
              {[
                ['Format', 'Editorial Object'],
                ['Mood', 'Industrial Luxury'],
                ['Motion', 'Staggered Construction'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-baseline gap-4">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted">{label}</span>
                  <span className="h-[1px] flex-grow bg-white/5" />
                  <span className="text-foreground text-[0.7rem] uppercase tracking-wider">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"
      />

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 60]) }}
        className="absolute bottom-12 left-8 font-mono text-[0.55rem] uppercase tracking-[0.6em] text-muted flex items-center gap-6"
      >
        <div className="h-12 w-[1px] bg-gold/40" />
        Enter the Archive
      </motion.div>
    </section>
  );
}
