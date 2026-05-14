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
    <nav aria-label="Section navigation" className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
      <ul className="flex flex-col gap-5 items-center">
        {sections.map((s) => (
          <li key={s.id} className="relative group">
            <a
              href={`#${s.id}`}
              className={`block rounded-full transition-all duration-500 border border-white/10 ${
                active === s.id ? 'h-10 w-[3px] bg-gold' : 'h-2 w-2 bg-white/20 hover:bg-gold/50'
              }`}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted opacity-0 backdrop-blur-md transition-opacity pointer-events-none whitespace-nowrap group-hover:opacity-100">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
