import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  { id: 'hero', label: 'Intro', code: '00' },
  { id: 'about', label: 'Profile', code: '01' },
  { id: 'timeline', label: 'Journey', code: '02' },
  { id: 'toolkit', label: 'Archive', code: '03' },
  { id: 'contact', label: 'Connect', code: '04' },
];

export default function StickyRail() {
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav aria-label="Technical navigation" className="fixed right-8 top-0 h-full w-24 z-50 hidden xl:flex flex-col items-center justify-center border-l border-white/5 bg-black/10 backdrop-blur-[2px]">
      <div className="absolute top-8 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-muted vertical-text">
        Archive / System v1.0
      </div>

      <ul className="flex flex-col gap-12 items-center py-20">
        {sections.map((s) => (
          <li key={s.id} className="relative group flex flex-col items-center gap-4">
            <span className={`font-mono text-[0.5rem] transition-colors duration-500 ${active === s.id ? 'text-gold' : 'text-muted'}`}>
              {s.code}
            </span>
            
            <a
              href={`#${s.id}`}
              className="relative flex items-center justify-center"
              aria-current={active === s.id ? 'true' : undefined}
            >
              <div className={`h-8 w-[1px] transition-all duration-700 ${
                active === s.id ? 'bg-gold scale-y-125' : 'bg-white/10 group-hover:bg-gold/40'
              }`} />
              
              <AnimatePresence>
                {active === s.id && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -left-1 w-2 h-2 rounded-full bg-gold blur-[2px]"
                  />
                )}
              </AnimatePresence>

              <span className="absolute right-12 font-mono text-[0.5rem] uppercase tracking-[0.4em] text-muted opacity-0 transition-all duration-500 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-8 font-mono text-[0.5rem] uppercase tracking-[0.4em] text-gold/40 vertical-text">
        © 2026 Archive
      </div>
    </nav>
  );
}
