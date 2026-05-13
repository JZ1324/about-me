import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for the cursor motion
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over a polaroid or interactive element
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
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block overflow-hidden">
      {/* Full Screen Guides */}
      <motion.div
        style={{ y: springY }}
        className="absolute left-0 right-0 h-[1px] bg-gold/5"
      />
      <motion.div
        style={{ x: springX }}
        className="absolute top-0 bottom-0 w-[1px] bg-gold/5"
      />

      {/* Main Cursor Group */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute flex items-center justify-center"
      >
        {/* Horizontal Line */}
        <motion.div 
          animate={{ width: isHovering ? 80 : 40 }}
          className="absolute h-[1px] bg-gold shadow-[0_0_10px_rgba(217,177,142,0.5)]" 
        />
        {/* Vertical Line */}
        <motion.div 
          animate={{ height: isHovering ? 80 : 40 }}
          className="absolute w-[1px] bg-gold shadow-[0_0_10px_rgba(217,177,142,0.5)]" 
        />
        
        {/* Expanding Focus Circle on Hover */}
        <motion.div
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 0.4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="absolute w-[120px] h-[120px] border-[0.5px] border-gold rounded-full flex items-center justify-center"
        >
          {/* Pulsing inner ring */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-4 border-[0.5px] border-gold rounded-full"
          />
        </motion.div>
 
        {/* Small Center Core */}
        <motion.div 
          animate={{ scale: isHovering ? 0.5 : 1 }}
          className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(217,177,142,1)]" 
        />

      </motion.div>

      {/* Outer Rotating Frame */}
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
          opacity: isHovering ? 0.2 : 0.05
        }}
        className="absolute w-48 h-48 flex items-center justify-center"
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold" />
      </motion.div>
    </div>
  );
}
