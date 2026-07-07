"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      title="Volver arriba"
      className={`
        fixed bottom-6 right-6 z-50
        inline-flex items-center justify-center
        w-12 h-12 rounded-full
        border border-gray-300 dark:border-white/20
        bg-white/90 dark:bg-black/60
        text-gray-700 dark:text-white/85
        backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/50
        shadow-lg dark:shadow-black/40
        hover:bg-gray-100 dark:hover:bg-white/10
        hover:border-gray-400 dark:hover:border-white/30
        hover:text-gray-900 dark:hover:text-white
        hover:ring-1 hover:ring-gray-300 dark:hover:ring-white/30
        hover:shadow-xl
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white/40
        active:scale-95 active:transform
        transition-all duration-200 ease-in-out
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
