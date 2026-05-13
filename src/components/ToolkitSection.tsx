import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const collection = [
  { group: 'Instruments', items: ['Aural Perception', 'Piano (Classical)', 'Alto Saxophone', 'Violin & Viola'] },
  { group: 'Humanities', items: ['Classic Literature', 'Strategic Theory', 'Art History', 'Philosophy'] },
  { group: 'Digital Arts', items: ['React / Next.js', '3D WebGL', 'Typography', 'Motion Design'] },
];

export default function ToolkitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="toolkit" ref={containerRef} className="section px-12 md:px-24 py-80 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 right-0 text-[18rem] font-black text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none uppercase -rotate-90 origin-top-right translate-x-1/2"
      >
        CANONICAL ARTIFACTS
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8 block">03 / Library</span>
          <h2 className="text-5xl md:text-7xl font-display font-light text-foreground leading-tight tracking-tighter">
             The Personal <span className="italic font-serif">Canon</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-20">
          {collection.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 bg-foreground/[0.01] border border-foreground/[0.03] backdrop-blur-sm group hover:border-gold/20 transition-all duration-700"
            >
              <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gold/60 mb-10 border-b border-gold/10 pb-4 group-hover:text-gold transition-colors duration-500">{cat.group}</h3>
              <ul className="space-y-6">
                {cat.items.map((item, j) => (
                  <motion.li 
                    key={j} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i * 0.2) + (j * 0.1) }}
                    className="text-xl md:text-2xl font-light text-foreground/40 hover:text-foreground hover:pl-4 transition-all cursor-crosshair relative flex items-center gap-4 group/item"
                  >
                    <div className="w-0 group-hover/item:w-4 h-px bg-gold transition-all duration-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
