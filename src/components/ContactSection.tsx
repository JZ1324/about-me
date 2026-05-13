import { motion } from 'motion/react';

export default function ContactSection() {
  return (
    <section id="contact" className="section px-12 md:px-24 py-80 border-gold/10 relative overflow-hidden">
      {/* Background Decorative Text */}
      <motion.div 
        animate={{ 
          x: [-200, 200],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[18rem] font-black text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none uppercase italic"
      >
        FUTURE COLLABORATIONS & CORRESPONDENCE
      </motion.div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] uppercase tracking-[1.5em] text-brass font-bold mb-16 block opacity-50">Acquisitions & Inquiries</span>
          <h2 className="text-6xl md:text-[11rem] font-display font-black text-foreground mb-20 leading-[0.75] tracking-tighter uppercase italic">
            SAY <span className="text-gold italic font-serif font-light not-italic">HELLO.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-24">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:jz@example.com" 
              className="text-2xl md:text-6xl font-light text-foreground hover:text-gold transition-all duration-700 border-b border-gold/20 pb-8 group relative"
            >
              jz@email.com
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gold"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
            
            <div className="flex flex-wrap justify-center gap-16 text-[9px] uppercase tracking-[0.6em] font-bold text-foreground/30">
              {['GitHub Archive', 'Digital Atelier', 'Correspondence'].map((label, i) => (
                <motion.a 
                  key={label}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ color: 'var(--accent-gold)', scale: 1.1 }}
                  className="transition-all duration-500 hover:tracking-[0.8em]"
                >
                  {label}
                </motion.a>
              ))}
            </div>

            <div className="mt-40">
               <motion.div 
                 initial={{ height: 0 }}
                 whileInView={{ height: 128 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5 }}
                 className="w-px bg-gold/20 mx-auto mb-12 origin-top" 
               />
               <p className="text-[9px] uppercase tracking-[1em] font-mono text-foreground/10 italic">
                 JZ — Student & Curator of Digital Form
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
