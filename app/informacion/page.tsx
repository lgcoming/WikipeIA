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
              facilitar el acceso a herramientas de IA proporcionando un directorio amplio, cuidado y fácil de navegar
              que ayude a usuarios, empresas y desarrolladores a encontrar exactamente lo que necesitan.
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
                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">Revisión Experta</h3>
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

