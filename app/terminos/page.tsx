"use client";

import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00d4ff]/10 via-black to-[#00d4ff]/10">
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
          <h1 className="text-4xl font-bold text-white mb-4">Términos y Condiciones</h1>
          <p className="text-white/70 text-lg">Última actualización: 2 de octubre de 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de los Términos</h2>
            <p className="text-white/80 leading-relaxed">
              Al acceder y utilizar WikipeIA, usted acepta estar sujeto a estos términos y condiciones de uso. 
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Descripción del Servicio</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              WikipeIA es una plataforma web que proporciona un directorio curado de herramientas de inteligencia artificial. 
              Nuestro servicio incluye:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>Catálogo de herramientas de IA con descripciones detalladas</li>
              <li>Sistema de filtros y búsqueda avanzada</li>
              <li>Enlaces a recursos externos</li>
              <li>Información sobre precios y características</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Uso Aceptable</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Al utilizar WikipeIA, usted se compromete a:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
              <li>No usar el servicio para fines ilegales o no autorizados</li>
              <li>No intentar acceder a áreas restringidas del sitio web</li>
              <li>No interferir con la seguridad del sitio web</li>
              <li>Respetar los derechos de propiedad intelectual</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Propiedad Intelectual</h2>
            <p className="text-white/80 leading-relaxed">
              Todo el contenido de WikipeIA, incluyendo pero no limitado a textos, gráficos, logotipos, iconos, 
              imágenes y software, es propiedad de WikipeIA o sus proveedores de contenido y está protegido por 
              las leyes de derechos de autor y propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Enlaces Externos</h2>
            <p className="text-white/80 leading-relaxed">
              WikipeIA puede contener enlaces a sitios web de terceros. No somos responsables del contenido, 
              políticas de privacidad o prácticas de sitios web de terceros. Le recomendamos que revise las 
              políticas de privacidad de cualquier sitio web de terceros que visite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-white/80 leading-relaxed">
              WikipeIA se proporciona &quot;tal como está&quot; sin garantías de ningún tipo. No garantizamos que el 
              servicio sea ininterrumpido, libre de errores o que satisfaga sus necesidades específicas. 
              En ningún caso seremos responsables de daños directos, indirectos, incidentales o consecuentes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Modificaciones</h2>
            <p className="text-white/80 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones 
              entrarán en vigor inmediatamente después de su publicación en el sitio web. Su uso continuado 
              del servicio después de dichas modificaciones constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contacto</h2>
            <p className="text-white/80 leading-relaxed">
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través del 
              formulario de contacto disponible en nuestro sitio web.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link 
            href="/privacidad"
            className="text-white/70 hover:text-white transition mr-6"
          >
            Política de Privacidad
          </Link>
          <Link 
            href="/"
            className="text-white/70 hover:text-white transition"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
