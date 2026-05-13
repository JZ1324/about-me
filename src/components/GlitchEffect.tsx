import { motion, useAnimation } from "motion/react";
import { useEffect, ReactNode } from "react";

interface GlitchEffectProps {
  children: ReactNode;
  className?: string;
  interval?: number;
}

export default function GlitchEffect({ children, className, interval = 8000 }: GlitchEffectProps) {
  const controls = useAnimation();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const runGlitch = async () => {
      // Very subtle glitch sequence
      await controls.start({
        x: [-1, 1, -0.5, 0.5, 0],
        skewX: [-1, 1, 0],
        filter: [
          "contrast(1) brightness(1)",
          "contrast(1.1) brightness(1.1)",
          "contrast(1) brightness(1)",
        ],
        transition: { 
          duration: 0.15, 
          ease: "linear",
          times: [0, 0.2, 0.4, 0.6, 1]
        }
      });

      // Schedule next glitch with random variance
      const nextDelay = interval + Math.random() * 5000;
      timeoutId = setTimeout(runGlitch, nextDelay);
    };

    timeoutId = setTimeout(runGlitch, interval + Math.random() * 2000);

    return () => clearTimeout(timeoutId);
  }, [controls, interval]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
}
