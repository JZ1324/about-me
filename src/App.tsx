/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/src/components/Hero";
import About from "@/src/components/About";
import Timeline from "@/src/components/Timeline";
import ToolkitSection from "@/src/components/ToolkitSection";
import Background3D from "@/src/components/Background3D";
import ContactSection from "@/src/components/ContactSection";
import PolaroidStrip from "@/src/components/PolaroidStrip";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import StickyRail from "@/src/components/StickyRail";
import MusicPlayer from "@/src/components/MusicPlayer";
import Cursor from "@/src/components/Cursor";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.1,
      infinite: false,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="antialiased scroll-smooth min-h-screen selection:bg-gold selection:text-background text-foreground">
      <Navbar />
      <StickyRail />
      <Background3D />
      <main className="relative z-10">
        <Hero />
        <About />
        <Timeline />
        <ToolkitSection />
        <PolaroidStrip />
        <ContactSection />
        <Footer />
      </main>
      <MusicPlayer />
      <Cursor />
    </div>
  );
}
