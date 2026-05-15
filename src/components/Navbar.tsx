import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full px-8 py-8 pointer-events-none">
      <nav className="mx-auto flex items-start justify-between pointer-events-auto max-w-[1800px]">
        <div className="flex flex-col gap-1">
          <motion.a 
            href={import.meta.env.BASE_URL} 
            whileHover={{ opacity: 0.8 }} 
            className="font-mono text-[0.75rem] tracking-[0.5em] uppercase text-foreground"
          >
            JZ / Archive
          </motion.a>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-[0.45rem] uppercase tracking-[0.4em] text-muted">System Active / 2026</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-6 pt-1">
          <div className="flex items-center gap-10 text-[0.55rem] uppercase tracking-[0.4em] text-muted font-mono">
            {[
              { id: 'about', label: '01 / Profile' },
              { id: 'timeline', label: '02 / Journey' },
              { id: 'toolkit', label: '03 / Archive' },
              { id: 'contact', label: '04 / Connect' },
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="transition-all hover:text-gold hover:tracking-[0.5em]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="h-[1px] w-64 bg-gradient-to-l from-white/10 to-transparent" />
        </div>
      </nav>
    </header>
  );
}
