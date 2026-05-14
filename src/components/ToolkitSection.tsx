import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const collection = [
  { group: 'Instruments', items: ['Aural perception', 'Piano', 'Alto saxophone', 'Violin & viola'] },
  { group: 'Humanities', items: ['Literature', 'Strategic theory', 'Art history', 'Philosophy'] },
  { group: 'Digital arts', items: ['React', 'Motion', 'Three.js', 'Typography'] },
];

export default function ToolkitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="toolkit" ref={containerRef} className="section relative overflow-hidden">
      <motion.div
        style={{ x: drift }}
        className="pointer-events-none absolute -right-12 top-8 text-[clamp(5rem,16vw,14rem)] font-display italic text-foreground/[0.035] whitespace-nowrap"
      >
        Toolkit
      </motion.div>

      <div className="grid gap-16">
        <div className="space-y-8 max-w-2xl">
          <p className="section-kicker">03 / Archive</p>
          <h2 className="font-display text-[clamp(3rem,6vw,5.6rem)] leading-[0.9] tracking-[-0.05em] uppercase">
            A curated creative arsenal.
          </h2>
          <div className="section-rule w-24" />
          <p className="text-foreground-soft text-lg leading-8 max-w-[36ch]">
            Tools and influences are presented as a disciplined set of references, not a crowded skill wall.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {collection.map((category, index) => (
            <motion.article
              key={category.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-frame rounded-[1.75rem] p-7 md:p-9"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-7">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-muted">{category.group}</p>
                <span className="h-px w-10 bg-gold/40" />
              </div>
              <ul className="space-y-5">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-foreground text-xl md:text-2xl leading-[1.35]">
                    <span className="mt-3 h-px w-5 bg-gold/60 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
