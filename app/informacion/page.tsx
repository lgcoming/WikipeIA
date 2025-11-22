"use client";

import Link from "next/link";
import Image from "next/image";
import ContactButton from "@/components/ui/ContactButton";

export default function InformacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-[#00d4ff]/10 dark:via-black dark:to-[#00d4ff]/10">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition mb-8"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a WikipeIA
          </Link>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Image src="/logo negro.png" alt="WikipeIA Logo" width={64} height={64} className="h-16 w-16 dark:hidden" />
            <Image src="/logo.png" alt="WikipeIA Logo" width={64} height={64} className="h-16 w-16 hidden dark:block" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Acerca de WikipeIA</h1>
          </div>

          <p className="text-gray-700 dark:text-white/70 text-lg max-w-2xl mx-auto whitespace-nowrap">
            Tu directorio de confianza para descubrir las mejores herramientas de inteligencia artificial
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">

          {/* Mission */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              Nuestra Misión
            </h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              En WikipeIA, creemos que la inteligencia artificial debe ser accesible para todos. Nuestra misión es
              democratizar el acceso a herramientas de IA proporcionando un directorio curado, fácil de navegar y
              completamente en español que ayude a usuarios, empresas y desarrolladores a encontrar exactamente
              lo que necesitan.
            </p>
          </div>

          {/* What we do */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              Lo que Hacemos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📚</span>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">Curación Experta</h3>
                    <p className="text-gray-600 dark:text-white/70 text-sm">Seleccionamos y evaluamos cada herramienta para garantizar calidad y relevancia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🔍</span>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">Búsqueda Inteligente</h3>
                    <p className="text-gray-600 dark:text-white/70 text-sm">Filtra por categoría, precio y características para encontrar lo que buscas.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">Descripciones Detalladas</h3>
                    <p className="text-gray-600 dark:text-white/70 text-sm">Información completa sobre funciones, precios y casos de uso.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🔄</span>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">Actualización Constante</h3>
                    <p className="text-gray-600 dark:text-white/70 text-sm">Añadimos nuevas herramientas y actualizamos información regularmente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">💎</span>
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium mb-2">Calidad</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Solo incluimos herramientas que han demostrado su valor y utilidad.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium mb-2">Transparencia</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Información clara y honesta sobre cada herramienta y sus características.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-gray-900 dark:text-white font-medium mb-2">Accesibilidad</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Hacemos la IA accesible para la comunidad hispanohablante.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-3">
              <span className="text-2xl">📊</span>
              Nuestros Números
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">250+</div>
                <div className="text-gray-600 dark:text-white/70 text-sm">Herramientas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10</div>
                <div className="text-gray-600 dark:text-white/70 text-sm">Categorías</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
                <div className="text-gray-600 dark:text-white/70 text-sm">Gratuito</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
                <div className="text-gray-600 dark:text-white/70 text-sm">Disponible</div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">¿Tienes una Herramienta que Sugerir?</h2>
            <p className="text-gray-600 dark:text-white/70 mb-6">
              Si conoces una herramienta de IA que debería estar en nuestro directorio,
              nos encantaría conocerla. Contáctanos y la evaluaremos para su inclusión.
            </p>
            <div className="inline-flex">
              <ContactButton label="Contáctanos" showIcon iconClassName="h-5 w-5" />
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
              <p className="text-gray-600 dark:text-white/70 text-sm mb-3">Síguenos en redes sociales</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/lawikipeia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-pink-100 dark:hover:bg-pink-500/10 hover:text-pink-600 dark:hover:text-pink-400 transition"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@lawikipeia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacidad" className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
              Términos y Condiciones
            </Link>
          </div>
          <Link
            href="/"
            className="inline-block text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition"
          >
            ← Volver al Directorio
          </Link>
        </div>
      </div>
    </div>
  );
}

