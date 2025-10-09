"use client";

import Link from "next/link";
import Image from "next/image";

export default function InformacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-8"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a WikipeIA
          </Link>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image src="/logo.png" alt="WikipeIA Logo" width={64} height={64} className="h-16 w-16" />
            <h1 className="text-4xl font-bold text-white">Acerca de WikipeIA</h1>
          </div>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tu directorio de confianza para descubrir las mejores herramientas de inteligencia artificial
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          
          {/* Mission */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              Nuestra Misión
            </h2>
            <p className="text-white/80 leading-relaxed">
              En WikipeIA, creemos que la inteligencia artificial debe ser accesible para todos. Nuestra misión es 
              democratizar el acceso a herramientas de IA proporcionando un directorio curado, fácil de navegar y 
              completamente en español que ayude a usuarios, empresas y desarrolladores a encontrar exactamente 
              lo que necesitan.
            </p>
          </div>

          {/* What we do */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              Lo que Hacemos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📚</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">Curación Experta</h3>
                    <p className="text-white/70 text-sm">Seleccionamos y evaluamos cada herramienta para garantizar calidad y relevancia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🔍</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">Búsqueda Inteligente</h3>
                    <p className="text-white/70 text-sm">Filtra por categoría, precio y características para encontrar lo que buscas.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">Descripciones Detalladas</h3>
                    <p className="text-white/70 text-sm">Información completa sobre funciones, precios y casos de uso.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🔄</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">Actualización Constante</h3>
                    <p className="text-white/70 text-sm">Añadimos nuevas herramientas y actualizamos información regularmente.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <span className="text-2xl">💎</span>
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-white font-medium mb-2">Calidad</h3>
                <p className="text-white/70 text-sm">Solo incluimos herramientas que han demostrado su valor y utilidad.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-white font-medium mb-2">Transparencia</h3>
                <p className="text-white/70 text-sm">Información clara y honesta sobre cada herramienta y sus características.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-white font-medium mb-2">Accesibilidad</h3>
                <p className="text-white/70 text-sm">Hacemos la IA accesible para la comunidad hispanohablante.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-3">
              <span className="text-2xl">📊</span>
              Nuestros Números
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-1">250+</div>
                <div className="text-white/70 text-sm">Herramientas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">10</div>
                <div className="text-white/70 text-sm">Categorías</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-white/70 text-sm">Gratuito</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/70 text-sm">Disponible</div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">¿Tienes una Herramienta que Sugerir?</h2>
            <p className="text-white/70 mb-6">
              Si conoces una herramienta de IA que debería estar en nuestro directorio, 
              nos encantaría conocerla. Contáctanos y la evaluaremos para su inclusión.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-blue-600 hover:to-purple-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.502-.367l-2.85 1.005a.5.5 0 01-.64-.64l1.005-2.85A8.955 8.955 0 014 12a8 8 0 018-8 8 8 0 018 8z" />
              </svg>
              Contáctanos
            </Link>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacidad" className="text-white/70 hover:text-white transition">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-white/70 hover:text-white transition">
              Términos y Condiciones
            </Link>
          </div>
          <Link 
            href="/"
            className="inline-block text-white/70 hover:text-white transition"
          >
            ← Volver al Directorio
          </Link>
        </div>
      </div>
    </div>
  );
}
