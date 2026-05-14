import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const perspectives = [
  'The work treats digital space like an artifact: composed, paced, and edited with intention.',
  'Motion is used to reveal hierarchy and rhythm, not to advertise technical bravado.',
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const drift = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.4, 1, 0.4]);

  return (
    <section id="about" ref={containerRef} className="section relative overflow-hidden">
      <motion.div
        style={{ x: drift, opacity }}
        className="pointer-events-none absolute -right-8 top-12 text-[clamp(6rem,18vw,16rem)] font-display italic text-foreground/[0.04] whitespace-nowrap"
      >
        Profile
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="space-y-8 max-w-xl">
          <p className="section-kicker">01 / The Profile</p>
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.05em] uppercase max-w-[8ch]">
            A practice shaped by restraint.
          </h2>
          <div className="section-rule w-24" />
          <p className="text-foreground-soft text-lg md:text-xl leading-8 max-w-[36ch]">
            This portfolio is built to communicate taste through pacing, negative space, and a calm editorial hierarchy.
          </p>
        </div>

        <div className="grid gap-6">
          {perspectives.map((copy, index) => (
            <motion.article
              key={copy}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-frame rounded-[1.75rem] p-7 md:p-10"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.4em] text-muted mb-5">
                Perspective 0{index + 1}
              </p>
              <p className="text-foreground text-lg md:text-2xl leading-[1.55] max-w-[32ch]">
                {copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
