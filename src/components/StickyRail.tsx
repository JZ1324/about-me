import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'The Intro' },
  { id: 'about', label: 'The Profile' },
  { id: 'timeline', label: 'The Journey' },
  { id: 'toolkit', label: 'The Archive' },
  { id: 'contact', label: 'Connect' },
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
    <nav aria-label="Section navigation" className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
      <ul className="flex flex-col gap-6 items-center">
        {sections.map((s) => (
          <li key={s.id} className="relative group">
            <a
              href={`#${s.id}`}
              className={`block w-1.5 h-1.5 rounded-full transition-all duration-500 border border-gold/20 ${
                active === s.id ? 'bg-gold h-8 scale-x-125' : 'bg-foreground/10 hover:bg-gold/40'
              }`}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 rounded border border-gold/10 bg-background/80 backdrop-blur-md text-[9px] uppercase tracking-widest text-foreground font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
