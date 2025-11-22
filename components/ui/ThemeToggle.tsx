"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setThemeState] = useState<"dark" | "light">("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
        if (storedTheme) {
            setThemeState(storedTheme);
            document.documentElement.classList.toggle("dark", storedTheme === "dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");

        const meta = document.querySelector('meta[name="color-scheme"]');
        if (meta) {
            meta.setAttribute("content", newTheme);
        }
    };

    if (!mounted) {
        return (
            <div className="inline-flex items-center justify-center rounded-lg p-2 w-9 h-9" aria-hidden="true" />
        );
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/85 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white/40 hover:ring-1 hover:ring-gray-300 dark:hover:ring-white/30 active:scale-95 active:transform"
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            {theme === "dark" ? (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}
