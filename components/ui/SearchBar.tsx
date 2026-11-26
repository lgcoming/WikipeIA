"use client";

import { useState, useEffect, useRef } from "react";
import { useIsClient } from "@/hooks/useIsClient";

const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export default function SearchBar({
  value,
  onChange,
  onChangeDebounced,
  placeholder = "Buscar herramientas IA ",
  autoFocus = true,
}: {
  value: string;
  onChange: (v: string) => void;
  onChangeDebounced?: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [internal, setInternal] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isClient = useIsClient();

  // Sincronizar con el valor externo durante el render (sin efecto)
  if (value !== prevValue) {
    setPrevValue(value);
    setInternal(value);
  }

  // Solo hacer autofocus en desktop (no en móviles)
  const shouldAutoFocus = isClient && autoFocus && !MOBILE_UA.test(navigator.userAgent);

  // Debounce for onChangeDebounced
  useEffect(() => {
    if (!onChangeDebounced) return;
    const id = setTimeout(() => onChangeDebounced(internal), 250);
    return () => clearTimeout(id);
  }, [internal, onChangeDebounced]);

  // Atajos: "/" enfoca el buscador desde cualquier parte (salvo si se está escribiendo) e Intro
  // lo enfoca cuando no hay nada enfocado. No se interceptan enlaces ni botones.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable);
      const nothingFocused = !target || target === document.body || target === document.documentElement;
      const slash = e.key === "/" && !isEditable && !e.ctrlKey && !e.metaKey && !e.altKey;
      const enter = e.key === "Enter" && nothingFocused;
      if (!slash && !enter) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="search-field group w-full max-w-xs sm:max-w-xl">
      <label htmlFor="wikipeia-search" className="sr-only">Buscar herramientas</label>
      <div className="relative">
        <svg className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-cyan-700 transition-transform duration-300 group-focus-within:scale-110 dark:text-[#00d4ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          id="wikipeia-search"
          ref={inputRef}
          className="search-input w-full rounded-xl border border-gray-300 bg-white/95 py-3 pl-12 pr-4 text-base text-gray-900 shadow-sm outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-out placeholder:text-gray-500 focus:border-cyan-600 sm:py-3.5 sm:pr-14 dark:border-white/15 dark:bg-zinc-900/85 dark:text-white dark:placeholder:text-white/45 dark:focus:border-[#00d4ff]/70"
          type="text"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          aria-keyshortcuts="/"
          value={internal}
          onChange={(e) => {
            setInternal(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          autoFocus={shouldAutoFocus}
        />
        {!internal && (
          <kbd
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 z-10 hidden -translate-y-1/2 rounded-md border border-gray-300 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-500 transition-opacity duration-200 group-focus-within:opacity-0 sm:block dark:border-white/15 dark:bg-white/5 dark:text-white/50"
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
