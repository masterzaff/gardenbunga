import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ContentSections from "@/components/ContentSections";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let loadFrameId = 0;

    const root = document.documentElement;
    const updateScrollVars = () => {
      const y = window.scrollY;
      const maxScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = y / maxScrollable;

      root.style.setProperty("--scroll-y", `${y}`);
      root.style.setProperty("--scroll-progress", `${progress}`);
    };

    const onScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(updateScrollVars);
    };

    updateScrollVars();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    loadFrameId = requestAnimationFrame(() => setIsLoaded(true));

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      if (loadFrameId) {
        cancelAnimationFrame(loadFrameId);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`page-shell min-h-screen bg-background ${isLoaded ? "page-loaded" : "page-loading"}`}>
      <Hero />
      <ContentSections />
    </div>
  );
};

export default Index;
