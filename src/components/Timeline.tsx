import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

const events = [
  { era: 'Early years', note: 'Piano study built an instinct for structure, rhythm, and restraint.' },
  { era: 'Scholarship', note: 'Literature and theory shaped a habit of reading systems before building them.' },
  { era: 'Digital work', note: 'Code became the medium for translating taste into form and interaction.' },
  { era: 'Present', note: 'The portfolio now focuses on refinement, pacing, and a consistent visual voice.' },
];

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start center', 'end center'],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });
  const line = useTransform(progress, [0, 1], [0, 1]);
  const drift = useTransform(progress, [0, 1], [-20, 20]);

  return (
    <section id="timeline" className="section relative overflow-hidden">
      <motion.div
        style={{ x: drift }}
        className="pointer-events-none absolute -left-16 top-16 text-[clamp(5rem,16vw,14rem)] font-display italic text-foreground/[0.035] whitespace-nowrap"
      >
        Timeline
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div className="space-y-8 max-w-xl">
          <p className="section-kicker">02 / Narrative</p>
          <h2 className="font-display text-[clamp(3rem,6vw,5.6rem)] leading-[0.9] tracking-[-0.05em] uppercase">
            A measured sequence of chapters.
          </h2>
          <div className="section-rule w-24" />
          <p className="text-foreground-soft text-lg leading-8 max-w-[34ch]">
            Each milestone is paced like an editorial spread so the story reads as progression, not chronology for its own sake.
          </p>
        </div>

        <div ref={scrollRef} className="relative pl-8 md:pl-12">
          <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <motion.div style={{ scaleY: line }} className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-gold to-transparent" />

          <div className="space-y-14 md:space-y-20">
            {events.map((event, index) => (
              <TimelineItem key={event.era} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }: { event: typeof events[0], index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: itemRef, offset: ['start end', 'end start'] });
  const reveal = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  const opacity = useTransform(reveal, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);
  const y = useTransform(reveal, [0.2, 0.5, 0.8], [18, 0, -18]);
  const x = useTransform(reveal, [0.2, 0.5, 0.8], [12, 0, -12]);

  return (
    <motion.article
      ref={itemRef}
      style={{ opacity, y, x }}
      className="relative grid gap-4 md:grid-cols-[8rem_1fr] items-start"
    >
      <div className="pt-1">
        <div className="inline-flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-muted">
          {event.era}
        </p>
      </div>
      <p className="font-display text-[clamp(1.8rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.045em] text-foreground max-w-[14ch]">
        {event.note}
      </p>
    </motion.article>
  );
}
