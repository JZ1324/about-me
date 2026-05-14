import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import GlitchEffect from './GlitchEffect';

const events = [
  { era: 'Early years', note: 'Discovery of the piano and the foundations of harmony.' },
  { era: 'Scholarship', note: 'Immersion into literature and the discovery of structured thought.' },
  { era: 'Digital Era', note: 'Learning to build with code, treating logic like musical theory.' },
  { era: 'Present', note: 'Refining a personal aesthetic and building with deliberate intent.' },
];

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end center"]
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleY = scrollYProgress;

  const bgX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="timeline" className="section px-12 md:px-24 py-[40vh] bg-foreground/[0.02] relative overflow-hidden">
      {/* Background Parallax */}
      <motion.div 
        style={{ x: bgX }}
        className="absolute bottom-0 left-0 text-[20rem] font-black text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none transition-all"
      >
        CHRONOLOGY ARCHIVE
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-24 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold mb-8 block">02 / Narrative</span>
          <GlitchEffect interval={13000}>
            <h2 className="text-4xl md:text-6xl font-display font-light text-foreground leading-tight">
              A sequence of <span className="italic font-serif">curiosities</span>.
            </h2>
          </GlitchEffect>
        </motion.div>

        <div ref={scrollRef} className="relative space-y-[180vh] pl-12 md:pl-24 pb-[60vh]">
          {/* Progress Line */}
          <div className="absolute left-0 top-0 w-px h-full bg-linear-to-b from-transparent via-gold/5 to-transparent origin-top">
            {/* Texture/Pattern Layer for the line background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,var(--color-gold)_1px,transparent_1px)] bg-[size:1px_8px] mix-blend-overlay" />
            
            <motion.div 
              style={{ scaleY }}
              className="w-full h-full bg-linear-to-b from-transparent via-gold to-transparent origin-top blur-[0.5px]" 
            />
            
            {/* Dynamic Pulsing Glow around the line */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ scaleY }}
              className="absolute inset-0 w-[2px] -left-[0.5px] bg-gold/40 blur-[4px] origin-top"
            />

            {/* Animated Glow Head / Scanner */}
            <motion.div 
              style={{ top: useTransform(scaleY, [0, 1], ["0%", "100%"]) }}
              className="absolute left-1/2 -translate-x-1/2 w-[3px] h-40 bg-linear-to-b from-gold via-gold to-transparent -translate-y-1/2 z-20"
            >
              {/* Horizontal "Scanner" line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gold shadow-[0_0_15px_rgba(217,177,142,0.8)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(217,177,142,1)]" />
            </motion.div>
          </div>

          {events.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }: { event: typeof events[0], index: number }) {
  const itemRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Wider entrance/exit windows for readability
  // 0.5 is when item is center screen
  const opacity = useTransform(smoothProgress, 
    [0.1, 0.25, 0.75, 0.9], 
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(smoothProgress, 
    [0.15, 0.5, 0.85], 
    [0.9, 1, 0.9]
  );

  const xOffset = useTransform(smoothProgress,
    [0.15, 0.5, 0.85],
    [20, 0, -20]
  );

  const zRotation = useTransform(smoothProgress,
    [0.15, 0.5, 0.85],
    [1, 0, -1]
  );

  const yEntrance = useTransform(smoothProgress,
    [0.1, 0.5, 0.9],
    [30, 0, -30]
  );

  return (
    <motion.div
      ref={itemRef}
      style={{ 
        opacity, 
        x: xOffset, 
        y: yEntrance,
        rotateY: zRotation
      }}
      className="relative flex flex-col md:flex-row gap-12 items-baseline group perspective-1000"
    >
      <motion.div 
        style={{ scale }}
        className="absolute -left-[54px] md:-left-[103px] top-2 w-3.5 h-3.5 rounded-full bg-gold shadow-[0_0_20px_rgba(217,177,142,1)] z-10" 
      />
      <div className="flex flex-col gap-4 shrink-0">
        <motion.span 
          style={{ opacity: useTransform(smoothProgress, [0.3, 0.5], [0, 1]) }}
          className="text-xs font-mono text-gold uppercase tracking-[0.5em] w-40"
        >
          {event.era}
        </motion.span>
        <motion.div 
          style={{ width: useTransform(smoothProgress, [0.4, 0.6], [0, 40]) }}
          className="h-px bg-gold/60 hidden md:block" 
        />
      </div>
      <div className="relative">
        <motion.p 
          className="text-3xl md:text-5xl font-display font-light text-foreground/90 leading-[1.1] group-hover:text-gold transition-colors duration-700 uppercase tracking-tighter"
        >
          {event.note}
        </motion.p>
      </div>
    </motion.div>
  );
}
