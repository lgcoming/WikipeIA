"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  value,
  onChange,
  onChangeDebounced,
  placeholder = "Busca herramientas IA...",
  autoFocus = true,
}: {
  value: string;
  onChange: (v: string) => void;
  onChangeDebounced?: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [internal, setInternal] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => setInternal(value), [value]);

  // Debounce for onChangeDebounced
  useEffect(() => {
    if (!onChangeDebounced) return;
    const id = setTimeout(() => onChangeDebounced(internal), 250);
    return () => clearTimeout(id);
  }, [internal, onChangeDebounced]);

  // Enter keyboard shortcut to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const el = e.target as HTMLElement | null;
        const tag = el?.tagName?.toLowerCase();
        const isTyping = tag === "input" || tag === "textarea" || el?.isContentEditable;
        if (!isTyping) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="wikipeia-search" className="sr-only">Buscar herramientas</label>
      <div className="relative">
        <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--accent)]/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <motion.input
          id="wikipeia-search"
          ref={inputRef}
          className="w-full rounded-xl border bg-white/95 dark:bg-zinc-900/80 pl-9 pr-3 py-2.5 text-sm sm:text-base outline-none shadow-sm focus:ring-0"
          type="text"
          value={internal}
          onChange={(e) => {
            setInternal(e.target.value);
            onChange(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Buscador de herramientas"
          animate={{ borderColor: focused ? "var(--accent)" : "rgba(255,255,255,0.15)" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        />
      </div>
      <motion.div
        className="mt-3 text-sm text-black/50 dark:text-white/60"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        Pulsa Enter para ir al buscador
      </motion.div>
    </div>
  );
}

