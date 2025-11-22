"use client";

import Link from "next/link";

export default function PrivacidadPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Política de Privacidad</h1>
          <p className="text-gray-700 dark:text-white/70 text-lg">Última actualización: 2 de octubre de 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-8 shadow-sm">

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Información que Recopilamos</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Información que Usted Proporciona</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-1 ml-4">
                  <li>Datos de contacto cuando usa nuestro formulario</li>
                  <li>Preferencias de herramientas guardadas localmente</li>
                  <li>Configuraciones de cookies y preferencias</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Información Recopilada Automáticamente</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-1 ml-4">
                  <li>Direcciones IP y información del navegador</li>
                  <li>Páginas visitadas y tiempo de navegación</li>
                  <li>Referencia de sitios web que lo dirigieron a nosotros</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Uso de Cookies</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
              Utilizamos diferentes tipos de cookies para mejorar su experiencia:
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-white/5 p-4 rounded-lg border border-blue-200 dark:border-white/10">
                <h3 className="text-gray-900 dark:text-white font-medium mb-2">🍪 Cookies Esenciales</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Necesarias para el funcionamiento básico del sitio web.</p>
              </div>
              <div className="bg-blue-50 dark:bg-white/5 p-4 rounded-lg border border-blue-200 dark:border-white/10">
                <h3 className="text-gray-900 dark:text-white font-medium mb-2">📊 Cookies Analíticas</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Nos ayudan a entender cómo usa el sitio web para mejorarlo.</p>
              </div>
              <div className="bg-blue-50 dark:bg-white/5 p-4 rounded-lg border border-blue-200 dark:border-white/10">
                <h3 className="text-gray-900 dark:text-white font-medium mb-2">🎯 Cookies de Personalización</h3>
                <p className="text-gray-600 dark:text-white/70 text-sm">Guardan sus preferencias y configuraciones personales.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Cómo Usamos su Información</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-2 ml-4">
              <li>Proporcionar y mantener nuestro servicio</li>
              <li>Personalizar su experiencia de navegación</li>
              <li>Analizar el uso del sitio web para mejoras</li>
              <li>Responder a sus consultas y proporcionar soporte</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Compartir Información</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
              No vendemos, comercializamos o transferimos su información personal a terceros, excepto en los siguientes casos:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-2 ml-4">
              <li>Con su consentimiento explícito</li>
              <li>Para cumplir con requisitos legales</li>
              <li>Para proteger nuestros derechos y seguridad</li>
              <li>Con proveedores de servicios que nos ayudan a operar el sitio web</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Seguridad de Datos</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Implementamos medidas de seguridad apropiadas para proteger su información personal contra
              acceso no autorizado, alteración, divulgación o destrucción. Esto incluye revisiones internas
              de nuestras prácticas de recopilación, almacenamiento y procesamiento de datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Sus Derechos</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-white/80 space-y-2 ml-4">
              <li>Acceder a la información personal que tenemos sobre usted</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de su información personal</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Retirar el consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Retención de Datos</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Conservamos su información personal solo durante el tiempo necesario para los fines establecidos
              en esta política de privacidad, a menos que la ley requiera o permita un período de retención más largo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Cambios en esta Política</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Podemos actualizar esta política de privacidad periódicamente. Le notificaremos cualquier cambio
              publicando la nueva política en esta página y actualizando la fecha de &quot;última actualización&quot;.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contacto</h2>
            <p className="text-gray-700 dark:text-white/80 leading-relaxed">
              Si tiene preguntas sobre esta política de privacidad o el tratamiento de sus datos personales,
              puede contactarnos a través del formulario de contacto disponible en nuestro sitio web.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/informacion" className="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition">
              Información
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
