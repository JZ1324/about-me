import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Music2 } from 'lucide-react';
import { useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-[100]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        className="group relative flex items-center gap-4 rounded-full border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-black transition-transform hover:scale-105 active:scale-95"
          aria-label={isPlaying ? 'Pause ambient track' : 'Play ambient track'}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause size={14} fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play size={14} fill="currentColor" className="ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.35em] text-muted">
            <Music2 className="h-3.5 w-3.5 text-gold" />
            Ambient score
          </div>
          <div className="mt-1 text-[0.7rem] text-foreground-soft">Archive / slow pulse</div>
        </div>
      </motion.div>
    </div>
  );
}
