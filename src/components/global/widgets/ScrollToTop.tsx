import { useEffect, useState } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalDocScrollLength = Math.max(docHeight - winHeight, 1);
      const scrollPosition = Math.min(
        Math.max(Math.round((scrollTop / totalDocScrollLength) * 100), 0),
        100
      );

      setScrollPercentage(scrollPosition);
      setIsVisible(scrollTop > 280);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      className={`fixed bottom-24 left-6 z-40 group transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      onClick={scrollToTop}
    >
      <svg
        width="58"
        height="58"
        viewBox="0 0 50 50"
        className="rounded-full bg-gradient-to-br from-primary via-secondary to-tertiary p-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] group-hover:scale-105"
      >
        <circle cx="25" cy="25" r="23" fill="transparent" />
        <circle
          cx="25"
          cy="25"
          r="21"
          fill="transparent"
          stroke="#9CD81F"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: `${2 * Math.PI * 21}`,
            strokeDashoffset: `${
              (1 - scrollPercentage / 100) * 2 * Math.PI * 21
            }`,
          }}
        />

        <circle cx="25" cy="25" r="19" fill="transparent" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-white">
        <i className="fas fa-chevron-up text-base drop-shadow-md transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden></i>
      </div>

      <div className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full bg-cyan-300 text-slate-900 text-[10px] font-black flex items-center justify-center border border-white/70 shadow-md">
        {scrollPercentage}%
      </div>
    </button>
  );
};

export default ScrollToTop;
