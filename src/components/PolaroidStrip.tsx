import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const PHOTOS = [
  'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop',
];

export default function PolaroidStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Tracking 0 to 1 of the STICKY duration precisely
  const x = useTransform(springProgress, [0.05, 0.95], ["0%", "-92%"]);
  const bgX = useTransform(springProgress, [0, 1], [-100, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[2000vh] bg-transparent"
    >
      <motion.div 
        style={{ opacity }}
        className="sticky top-0 h-screen overflow-hidden flex items-center"
      >
        {/* Background Parallax */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[25rem] font-black text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none uppercase italic"
        >
          CURATED VISUAL ARCHIVE — RECOLLECTIONS
        </motion.div>

        {/* The "Clothesline" String */}
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-black/5 z-0" />
        
        <motion.div 
          style={{ x }}
          className="flex gap-16 px-[10vw] items-center"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                rotate: (i % 2 === 0 ? 3 : -3), 
                y: (i % 2 === 0 ? 30 : -10) 
              }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.15, 
                zIndex: 100, 
                y: 0,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-56 md:w-64 aspect-[1/1.2] bg-background p-3 shadow-xl border border-foreground/5 flex flex-col relative group cursor-crosshair"
            >
              {/* Refined Clip / Peg */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 bg-gold rounded-sm shadow-sm z-10 border border-foreground/5" />
              
              <div className="w-full aspect-square overflow-hidden bg-foreground/5 mb-4 mt-2">
                <img 
                  src={PHOTOS[i % PHOTOS.length]} 
                  alt={`Archive ${i}`} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="mt-auto border-t border-foreground/5 pt-3">
                <div className="flex justify-between items-end text-[10px] font-mono leading-none tracking-tighter">
                  <div className="flex flex-col gap-1.5 text-foreground/60">
                    <span className="font-bold uppercase tracking-widest">FRGM_ {i.toString().padStart(3, '0')}</span>
                    <span className="opacity-40 italic">LATENCY TYPE_S</span>
                  </div>
                  <span className="text-foreground/20 font-bold">19:{90 + (i % 36)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Tooltip Instruction */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[9px] uppercase tracking-[1em] text-foreground font-black opacity-40 z-30 pointer-events-none"
        >
          <div className="w-12 h-px bg-gold" />
          Observe / Interact
          <div className="w-12 h-px bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
