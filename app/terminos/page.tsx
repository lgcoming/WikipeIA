"use client";

import Link from "next/link";

export default function TerminosPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Términos y Condiciones</h1>
          <p className="text-gray-700 dark:text-white/70 text-lg">Última actualización: 2 de octubre de 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-8 shadow-sm">

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Al acceder y utilizar WikipeIA, usted acepta estar sujeto a estos términos y condiciones de uso.
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Uso del Servicio</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
              WikipeIA es un directorio de herramientas de inteligencia artificial. Usted se compromete a:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-2 ml-4">
              <li>Utilizar el servicio solo para fines legales y legítimos</li>
              <li>No intentar acceder a áreas restringidas del sitio web</li>
              <li>No interferir con el funcionamiento del servicio</li>
              <li>No copiar, modificar o distribuir el contenido sin autorización</li>
              <li>Proporcionar información precisa cuando sea requerida</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Propiedad Intelectual</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
              Todo el contenido presente en WikipeIA, incluyendo pero no limitado a:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-2 ml-4">
              <li>Textos, gráficos, logotipos e imágenes</li>
              <li>Diseño y estructura del sitio web</li>
              <li>Código fuente y software</li>
              <li>Compilación y organización de información</li>
            </ul>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mt-4">
              Está protegido por derechos de autor y otras leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Enlaces a Terceros</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              WikipeIA contiene enlaces a sitios web de terceros. No tenemos control sobre el contenido,
              políticas de privacidad o prácticas de estos sitios y no asumimos responsabilidad por ellos.
              Le recomendamos revisar los términos y políticas de privacidad de cualquier sitio de terceros que visite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Descargo de Responsabilidad</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
              WikipeIA se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot;. No garantizamos que:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-2 ml-4">
              <li>El servicio será ininterrumpido o libre de errores</li>
              <li>Los resultados obtenidos serán precisos o confiables</li>
              <li>La calidad del servicio cumplirá con sus expectativas</li>
              <li>Cualquier error en el software será corregido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              En ningún caso WikipeIA será responsable por daños directos, indirectos, incidentales, especiales,
              consecuentes o punitivos, incluyendo pero no limitado a pérdida de beneficios, datos o uso,
              que resulten del uso o la imposibilidad de usar nuestro servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Modificaciones del Servicio</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Nos reservamos el derecho de modificar o discontinuar, temporal o permanentemente, el servicio
              (o cualquier parte del mismo) con o sin previo aviso. No seremos responsables ante usted ni
              ante terceros por cualquier modificación, suspensión o discontinuación del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Modificaciones de los Términos</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Podemos actualizar estos términos y condiciones periódicamente. Le notificaremos cualquier cambio
              publicando los nuevos términos en esta página y actualizando la fecha de &quot;última actualización&quot;.
              Su uso continuado del servicio después de dichos cambios constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Ley Aplicable</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener en cuenta
              sus disposiciones sobre conflictos de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Contacto</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través del
              formulario de contacto disponible en nuestro sitio web.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/informacion" className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
              Información
            </Link>
            <Link href="/privacidad" className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
              Política de Privacidad
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
