"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type Props = {
  label?: string;
  showIcon?: boolean;
  iconClassName?: string;
};

export default function ContactButton({ label = "Contacto", showIcon = false, iconClassName = "h-4 w-4" }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(null);
  const [openedAt, setOpenedAt] = useState<number | null>(null);

  // Cerrar con tecla Escape para replicar comportamiento del ToolModal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const website = String(formData.get("website") || ""); // honeypot
    const ts = openedAt ?? Date.now();
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, hp: website, ts }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setResult({ ok: true, message: "Mensaje enviado correctamente. ¡Gracias!" });
        (e.currentTarget as HTMLFormElement).reset();
        setTimeout(() => setOpen(false), 1200);
      } else {
        setResult({ ok: false, message: data?.error || "No se pudo enviar. Prueba de nuevo." });
      }
    } catch {
      setResult({ ok: false, message: "Error de red. Intenta más tarde." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setOpenedAt(Date.now());
        }}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]/40 hover:ring-1 hover:ring-[#00d4ff]/30 hover:bg-[#00d4ff]/30 hover:text-white border border-[#00d4ff]/30 bg-[#00d4ff]/20 text-[#00d4ff] transition-all duration-150 cursor-pointer active:scale-95 active:transform"
      >
        {showIcon && (
          <svg className={iconClassName} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h14a2 2 0 012 2v0.5l-9 5.5-9-5.5V7zm0 2.236V17a2 2 0 002 2h14a2 2 0 002-2V9.236l-8.553 5.224a2 2 0 01-2.894 0L3 9.236z" />
          </svg>
        )}
        {label}
      </button>

      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              aria-modal="true"
              role="dialog"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Panel */}
              <motion.div
                className="relative z-10 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-white/15 bg-zinc-950 text-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.9 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contacto-title"
              >
                <div className="p-5">
                  <div className="mb-4">
                    <h2 id="contacto-title" className="text-lg font-semibold">Contacto</h2>
                    <p className="text-sm text-white/60 mt-1">Déjanos tu mensaje y te contactaremos pronto.</p>
                  </div>
                  <form onSubmit={onSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1 text-white/80">Nombre</label>
                      <input id="name" name="name" type="text" className="w-full rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent-weak)]" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-1 text-white/80">Email</label>
                      <input id="email" name="email" type="email" required className="w-full rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent-weak)]" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm mb-1 text-white/80">Mensaje</label>
                      <textarea id="message" name="message" rows={4} required className="w-full resize-y rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--accent-weak)]" />
                    </div>
                    {/* Honeypot para bots: campo oculto que los usuarios no verán */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
                    </div>
                    {!!result && (
                      <div className={"text-sm " + (result.ok ? "text-emerald-400" : "text-red-400")}>{result.message}</div>
                    )}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white">Cancelar</button>
                      <button type="submit" disabled={submitting} className="btn-accent rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-60 transition-all duration-150 active:scale-95 active:transform disabled:active:scale-100">
                        {submitting ? "Enviando..." : "Enviar"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

