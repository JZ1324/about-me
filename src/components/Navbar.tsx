import { motion } from 'motion/react';
import GlitchEffect from './GlitchEffect';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full px-10 py-10 pointer-events-none">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between pointer-events-auto">
        <motion.a 
          href="/" 
          whileHover={{ scale: 1.1 }}
          className="pointer-events-auto"
        >
          <GlitchEffect interval={18000}>
            <span className="text-3xl font-display font-black tracking-[-0.05em] text-gold uppercase italic block">
              J.Z.
            </span>
          </GlitchEffect>
        </motion.a>
        <div className="hidden md:flex gap-16 text-[9px] uppercase tracking-[0.6em] font-bold text-foreground/60">
          {[
            { id: 'about', label: 'The Profile' },
            { id: 'timeline', label: 'The Journey' },
            { id: 'toolkit', label: 'The Archive' },
            { id: 'contact', label: 'Get in touch' },
          ].map((item) => (
            <motion.a 
              key={item.id}
              href={`#${item.id}`} 
              whileHover={{ color: 'var(--accent-gold)', scale: 1.05 }}
              className="hover:text-gold transition-all duration-700 relative group"
            >
              {item.label}
              <motion.div 
                className="absolute -bottom-1 left-0 h-[1px] bg-gold w-0 group-hover:w-full transition-all duration-500"
              />
            </motion.a>
          ))}
        </div>
        <div className="hidden md:block w-32 h-[1px] bg-gold/10" />
      </nav>
    </header>
  );
}
