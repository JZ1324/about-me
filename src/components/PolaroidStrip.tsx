import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

const PHOTOS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
];

export default function PolaroidStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 48, damping: 18, restDelta: 0.001 });
  const x = useTransform(progress, [0.08, 0.92], ['0%', '-78%']);
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[320vh]">
      <motion.div style={{ opacity }} className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="section relative w-full">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <motion.div
            style={{ x }}
            className="relative flex items-center gap-8 px-[8vw]"
          >
            {Array.from({ length: 14 }).map((_, index) => (
              <motion.figure
                key={index}
                initial={{ y: index % 2 === 0 ? 18 : -12, rotate: index % 2 === 0 ? 2 : -2 }}
                whileHover={{ y: 0, rotate: 0, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="editorial-frame relative w-52 md:w-72 shrink-0 bg-[#121214] p-3 md:p-4"
              >
                <div className="absolute -top-4 left-1/2 h-10 w-6 -translate-x-1/2 rounded-sm border border-white/10 bg-gold/80" />
                <div className="aspect-[0.82/1] overflow-hidden bg-black">
                  <img
                    src={PHOTOS[index % PHOTOS.length]}
                    alt={`Archive frame ${index + 1}`}
                    className="h-full w-full object-cover opacity-80 grayscale transition duration-700 hover:opacity-100 hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <figcaption className="mt-4 flex items-end justify-between border-t border-white/10 pt-3 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
                  <span>Frame {String(index + 1).padStart(2, '0')}</span>
                  <span>Archive</span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.45em] text-muted">
            Polaroid archive / tactile memory
          </div>
        </div>
      </motion.div>
    </section>
  );
}
