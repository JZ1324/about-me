import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const perspectives = [
  {
    title: 'Precision Architecture',
    copy: 'The work treats digital space like an artifact: composed, paced, and edited with intention.',
  },
  {
    title: 'Measured Motion',
    copy: 'Motion is used to reveal hierarchy and rhythm, not to advertise technical bravado.',
  },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 1, 0.3]);

  return (
    <section id="about" ref={containerRef} className="section relative overflow-hidden min-h-screen flex items-center">
      <motion.div
        style={{ x: drift, opacity }}
        className="pointer-events-none absolute -right-20 top-12 text-[clamp(8rem,24vw,22rem)] font-display italic text-foreground/[0.03] whitespace-nowrap uppercase tracking-tighter"
      >
        Documenting
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] items-start relative z-10 w-full">
        <div className="space-y-12 max-w-xl">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.6rem] text-gold uppercase tracking-[0.4em]">01 / Structural Profile</span>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          
          <h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.05em] uppercase max-w-[10ch]">
            A practice <span className="text-gold italic">defined</span> by restraint.
          </h2>
          
          <div className="space-y-6">
            <p className="text-foreground-soft text-xl md:text-2xl leading-[1.45] max-w-[34ch]">
              This portfolio communicates taste through pacing, negative space, and a calm editorial hierarchy.
            </p>
            <div className="arch-border inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-accent-slate/30">
               <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
               <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted">Awaiting Input...</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:mt-[15vh]">
          {perspectives.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-frame arch-border rounded-sm p-8 md:p-12 relative group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 transition-opacity group-hover:opacity-10">
                 <span className="font-mono text-[3rem] leading-none">0{index + 1}</span>
              </div>
              
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-gold mb-6 flex items-center gap-3">
                <span className="h-[1px] w-4 bg-gold/50" />
                {item.title}
              </p>
              <p className="text-foreground text-xl md:text-3xl leading-[1.4] max-w-[28ch] font-display italic">
                {item.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
