import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';
import { useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        className="group relative"
      >
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 bg-foreground/[0.03] backdrop-blur-2xl rounded-2xl border border-foreground/10 shadow-[0_15px_35px_-8px_rgba(114,62,49,0.3)] overflow-hidden">
          {/* Animated Liquid Accents - Scaled down */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
              x: [-10, 10, -5, 5, -10],
              y: [-5, 5, 10, -10, -5]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gold/10 blur-[60px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 0.8, 1.2, 0.9, 1.1],
              rotate: [360, 270, 180, 90, 0],
              x: [10, -10, 5, -5, 10],
              y: [5, -5, -10, 10, 5]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-background/5 blur-[80px] rounded-full"
          />
        </div>

        {/* Content Container - Compact Vinyl Style */}
        <div className="relative p-3 flex items-center gap-4 w-56">
          {/* Vinyl Record Section */}
          <div className="relative w-16 h-16 shrink-0 group/vinyl">
            {/* The Record Disc */}
            <motion.div 
              animate={{ 
                rotate: isPlaying ? 360 : 0
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 rounded-full bg-[#121212] flex items-center justify-center shadow-lg border border-white/5"
            >
              {/* Grooves */}
              <div className="absolute inset-1 rounded-full border border-white/[0.03]" />
              <div className="absolute inset-3 rounded-full border border-white/[0.03]" />
              <div className="absolute inset-5 rounded-full border border-white/[0.03]" />
              
              {/* Center Label */}
              <div className="w-5 h-5 rounded-full bg-gold/90 flex items-center justify-center relative overflow-hidden shadow-inner">
                <Music className="w-2.5 h-2.5 text-foreground/60" />
                <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Tone Arm / Needle */}
            <motion.div 
              initial={{ rotate: -45 }}
              animate={{ rotate: isPlaying ? 0 : -45 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              style={{ originX: "100%", originY: "0%" }}
              className="absolute -top-1 -right-1 w-8 h-1 bg-foreground/20 rounded-full z-10 pointer-events-none"
            >
              <div className="absolute left-0 top-0 w-2 h-2 bg-gold/80 rounded-full -translate-y-1/4 shadow-sm" />
            </motion.div>
          </div>

          {/* Info & Micro Controls */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="relative h-4 overflow-hidden whitespace-nowrap mask-linear-r-80">
              <motion.span 
                animate={{ x: isPlaying ? [0, -120, 0] : 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[10px] font-display uppercase tracking-widest text-foreground font-bold inline-block"
              >
                Vinyl Master .01 &nbsp;&nbsp;&nbsp; /// &nbsp;&nbsp;&nbsp; Archive.wav &nbsp;&nbsp;&nbsp; /// &nbsp;&nbsp;&nbsp;
              </motion.span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-background shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Pause size={12} fill="currentColor" />
                    </motion.div>
                  ) : (
                    <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="ml-0.5">
                      <Play size={12} fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <div className="flex-1 h-[2px] bg-foreground/10 rounded-full relative overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="absolute left-0 top-0 h-full bg-gold/60"
                />
              </div>
            </div>
          </div>
        </div>

      {/* Outer Glow on Hover */}
        <div className="absolute -inset-4 bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </motion.div>
    </div>
  );
}
