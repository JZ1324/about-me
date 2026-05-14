import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="section relative overflow-hidden border-t border-white/10 pb-16 pt-20">
      <div className="absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(200,162,106,0.12),transparent_68%)] blur-3xl" />

      <div className="grid gap-8 md:grid-cols-[1fr_auto] items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-4"
        >
          <p className="section-kicker">End of entry</p>
          <h3 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] tracking-[-0.05em] uppercase">
            A finished artifact, not a framework demo.
          </h3>
        </motion.div>

        <div className="font-mono text-[0.58rem] uppercase tracking-[0.35em] text-muted md:text-right">
          © 2026 JZ / Built for calm attention
        </div>
      </div>
    </footer>
  );
}
