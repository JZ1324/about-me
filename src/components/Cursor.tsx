import { motion, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = target?.closest('.cursor-crosshair') || 
                          target?.closest('button') || 
                          target?.closest('a') ||
                          target?.tagName === 'BUTTON' ||
                          target?.tagName === 'A';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block overflow-hidden mix-blend-screen">
      <motion.div
        style={{ y: springY }}
        className="absolute left-0 right-0 h-px bg-gold/10"
      />
      <motion.div
        style={{ x: springX }}
        className="absolute top-0 bottom-0 w-px bg-gold/10"
      />

      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute flex items-center justify-center"
      >
        <motion.div 
          animate={{ width: isHovering ? 80 : 40 }}
          className="absolute h-px bg-gold/80" 
        />
        <motion.div 
          animate={{ height: isHovering ? 80 : 40 }}
          className="absolute w-px bg-gold/80" 
        />
        <motion.div
          animate={{
            scale: isHovering ? 1 : 0.55,
            opacity: isHovering ? 0.18 : 0.08,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="absolute w-24 h-24 border border-gold/40 rounded-full flex items-center justify-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.04, 1], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-4 border border-gold/30 rounded-full"
          />
        </motion.div>
 
        <motion.div 
          animate={{ scale: isHovering ? 0.5 : 1 }}
          className="w-1.5 h-1.5 bg-gold rounded-full" 
        />

      </motion.div>

      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ 
          rotate: isHovering ? 90 : 0,
          scale: isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.16 : 0.03
        }}
        className="absolute w-40 h-40 flex items-center justify-center"
      >
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold/70" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold/70" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold/70" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold/70" />
      </motion.div>
    </div>
  );
}
