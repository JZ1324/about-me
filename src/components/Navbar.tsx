import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full px-5 sm:px-8 py-5 pointer-events-none">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between pointer-events-auto">
        <motion.a href={import.meta.env.BASE_URL} whileHover={{ opacity: 0.8 }} className="font-mono text-[0.7rem] tracking-[0.45em] uppercase text-foreground/70">
          JZ / Portfolio
        </motion.a>
        <div className="hidden md:flex items-center gap-8 rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-md text-[0.62rem] uppercase tracking-[0.35em] text-muted">
          {[
            { id: 'about', label: 'Profile' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'toolkit', label: 'Toolkit' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition-colors hover:text-gold">
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
