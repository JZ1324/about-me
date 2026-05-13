import { motion } from 'motion/react';
import { Mail, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-gold/10 py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-12 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter uppercase mb-12 italic">
                END OF <span className="text-gold">ENTRY.</span>
              </h3>
              <p className="text-foreground/40 max-w-sm text-sm uppercase tracking-widest leading-loose">
                This digital archive is a LIVING artifact. Fragmented thoughts rendered in light and code. 1024-ARCH-26.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-12 md:items-end">
            <div className="flex gap-8">
              {[
                { icon: Mail, label: 'Contact', href: 'mailto:jz@example.com' },
                { icon: Github, label: 'Source', href: 'https://github.com' },
                { icon: ExternalLink, label: 'Atelier', href: '#' }
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.3em] text-foreground/40 hover:text-gold transition-colors group"
                >
                  <link.icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            <div className="text-[10px] uppercase tracking-[1em] text-foreground/20 font-bold">
              © 2026 JZ Digital Archive
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
