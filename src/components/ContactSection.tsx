import { motion } from 'motion/react';

export default function ContactSection() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,162,106,0.14),transparent_68%)] blur-3xl"
      />

      <div className="grid gap-14 md:grid-cols-[1fr_auto] items-end">
        <div className="max-w-2xl space-y-8">
          <p className="section-kicker">04 / Contact</p>
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.06em] uppercase max-w-[7ch]">
            Quiet confidence.
          </h2>
          <div className="section-rule w-24" />
          <p className="text-foreground-soft text-lg md:text-xl leading-8 max-w-[34ch]">
            For collaborations, commissions, or conversation, the final impression stays minimal and memorable.
          </p>
        </div>

        <motion.a
          whileHover={{ y: -2 }}
          href="mailto:jz@example.com"
          className="inline-flex items-center gap-4 border-b border-gold/30 pb-4 font-display text-[clamp(2rem,4vw,4rem)] tracking-[-0.04em] text-foreground transition-colors hover:text-gold"
        >
          jz@email.com
        </motion.a>
      </div>

      <div className="mt-10 flex flex-wrap gap-8 font-mono text-[0.6rem] uppercase tracking-[0.34em] text-muted">
        <a className="transition-colors hover:text-gold" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        <a className="transition-colors hover:text-gold" href="#timeline">Selected work</a>
        <a className="transition-colors hover:text-gold" href="#hero">Back to top</a>
      </div>
    </section>
  );
}
