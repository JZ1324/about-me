import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import GlitchEffect from './GlitchEffect';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const bgX = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [-15, -2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.01, 0.03, 0.03, 0.01]);

  const textScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.98, 1, 0.98]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.4, 1, 1, 0.4]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.02em", "0.02em"]);

  return (
    <section id="about" ref={containerRef} className="section px-12 md:px-24 py-80 overflow-hidden relative bg-transparent">
      {/* Background Parallax */}
      <motion.div 
        style={{ x: bgX, y: bgY, rotate: bgRotate, opacity: bgOpacity }}
        className="absolute top-0 right-0 text-[22rem] font-black text-foreground whitespace-nowrap pointer-events-none select-none uppercase z-0"
      >
        ARCHITECTURAL PHILOSOPHY — REFINEMENT
      </motion.div>

      <motion.div 
        style={{ scale: textScale, opacity: textOpacity }}
        className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-32 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[1em] text-gold font-bold mb-12 block opacity-60">Section 01 / The Profile</span>
          <motion.h2 
            style={{ letterSpacing }}
            className="text-6xl md:text-9xl font-display font-black leading-[0.85] text-foreground mb-16 uppercase"
          >
            {"A LEGACY OF".split(" ").map((word, i) => (
              <motion.span 
                key={i}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <GlitchEffect interval={15000}>
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="text-gold italic font-serif font-light not-italic block mt-4"
              >
                CURIOSITY.
              </motion.span>
            </GlitchEffect>
          </motion.h2>
          <div className="space-y-12 text-xl font-light text-foreground/80 leading-relaxed max-w-xl uppercase tracking-tighter">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              whileHover={{ x: 10 }}
              className="transition-all duration-300"
            >
              My practice is rooted in the intersection of tradition and 
              transformation. I believe that digital space should carry 
              the same weight and intention as a physical artifact.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              whileHover={{ x: 10 }}
              className="opacity-50 text-lg transition-all duration-300"
            >
              I curate experiences that prioritize reading, rhythm, and the 
              deliberate pacing of content. Every pixel is a structural decision.
            </motion.p>
          </div>
        </motion.div>

        <div className="space-y-24 pt-20 relative">
           <motion.div
             style={{ y: y1 }}
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, delay: 0.3 }}
             className="border-l-[0.5px] border-gold/40 pl-16 pb-12 group"
           >
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gold mb-6 group-hover:tracking-[0.6em] transition-all duration-700">The Aesthetic Vision</h3>
              <p className="text-foreground/60 font-light text-lg leading-relaxed uppercase tracking-tighter">
                Finding the luxury in the void. My work focuses on 
                whitespace as a structural element, allowing the content 
                to breathe and the message to resonate with clarity.
              </p>
           </motion.div>

           <motion.div
             style={{ y: y2 }}
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, delay: 0.5 }}
             className="border-l-[0.5px] border-gold/40 pl-16 pt-12 group"
           >
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gold mb-6 group-hover:tracking-[0.6em] transition-all duration-700">The Technical Core</h3>
              <p className="text-foreground/60 font-light text-lg leading-relaxed uppercase tracking-tighter">
                Behind the facade of minimalism lies a complex architecture 
                of performant code and intentional motion. Beauty that 
                is architected to endure.
              </p>
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
