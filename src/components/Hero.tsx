import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.965]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.42]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -50]);
  const textParallax = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section relative z-10 grid gap-16 lg:grid-cols-[1.25fr_0.75fr] items-end min-h-screen py-[12vh]">
        <motion.div
          style={{ scale, opacity, y }}
          className="max-w-6xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="section-kicker mb-10"
          >
            Digital Artisan / Curator
          </motion.p>

          <h1 className="font-display text-[clamp(4.25rem,16vw,12.5rem)] leading-[0.82] tracking-[-0.06em] text-foreground uppercase max-w-[10ch]">
            Crafted
            <motion.span
              style={{ x: textParallax }}
              className="block text-[0.84em] text-gold italic normal-case tracking-[-0.03em]"
            >
              Precision
            </motion.span>
          </h1>

          <div className="mt-12 max-w-3xl space-y-8">
            <p className="text-[clamp(1.05rem,2vw,1.6rem)] leading-[1.45] text-foreground-soft max-w-[34ch]">
              A cinematic portfolio shaped like an editorial object: measured, atmospheric, and authored with restraint.
            </p>
            <div className="section-rule w-40" />
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.38em] text-muted max-w-[56ch] leading-7">
              Smooth narrative pacing, layered depth, and deliberate transitions built to feel premium within seconds.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:justify-self-end w-full max-w-md editorial-frame rounded-[2rem] p-7 md:p-9"
        >
          <div className="space-y-10">
            <div>
              <p className="section-kicker mb-3">Overview</p>
              <p className="text-foreground-soft text-lg leading-8">
                This experience balances motion, typography, and atmosphere so the work feels edited, not assembled.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                ['Format', 'Single-page editorial site'],
                ['Mood', 'Dark, cinematic, restrained'],
                ['Motion', 'Slow scroll-linked transitions'],
                ['System', 'React / TypeScript / Motion'],
              ].map(([label, value]) => (
                <div key={label} className="space-y-2">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted">{label}</div>
                  <div className="text-foreground text-sm leading-6">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0.18, 0.3, 0.18], scale: [1, 1.02, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-24 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,162,106,0.16),transparent_68%)] blur-3xl"
      />

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, 40]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.55em] text-muted"
      >
        Scroll to enter the archive
      </motion.div>
    </section>
  );
}
