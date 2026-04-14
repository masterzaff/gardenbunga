import { useEffect, useRef, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const Section = ({ children, id, className = "" }: SectionProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`section-fade article-section ${className}`.trim()}>
      {children}
    </section>
  );
};

export default Section;
