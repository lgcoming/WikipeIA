import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import PageHero, { UpdatedAt } from "@/components/content/PageHero";
import LegalDocument, { type LegalSectionData } from "@/components/content/LegalDocument";
import RelatedPages from "@/components/content/RelatedPages";
import { BulletList, CheckList, Tile } from "@/components/content/blocks";
import ContactButton from "@/components/ui/ContactButton";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description: "Cómo WikipeIA recopila, usa y protege la información personal, qué cookies utiliza y cómo ejercer tus derechos.",
  path: "/privacidad",
});

const SECTIONS: LegalSectionData[] = [
  {
    id: "informacion-recopilada",
    title: "Información que recopilamos",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        <Tile icon="user" title="Información que usted proporciona" layout="stack">
          <BulletList
            items={[
              "Datos de contacto cuando usa nuestro formulario",
              "Preferencias de herramientas guardadas localmente",
              "Configuraciones de cookies y preferencias",
            ]}
          />
        </Tile>
        <Tile icon="cursor" title="Información recopilada automáticamente" layout="stack">
          <BulletList
            items={[
              "Direcciones IP y información del navegador",
              "Páginas visitadas y tiempo de navegación",
              "Referencia de sitios web que lo dirigieron a nosotros",
            ]}
          />
        </Tile>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Uso de cookies",
    content: (
      <>
        <p>Utilizamos diferentes tipos de cookies para mejorar su experiencia:</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Tile icon="lock" title="Cookies esenciales" layout="stack">
            Necesarias para el funcionamiento básico del sitio web.
          </Tile>
          <Tile icon="chart" title="Cookies analíticas" layout="stack">
            Nos ayudan a entender cómo usa el sitio web para mejorarlo.
          </Tile>
          <Tile icon="adjustments" title="Cookies de personalización" layout="stack">
            Guardan sus preferencias y configuraciones personales.
          </Tile>
        </div>
      </>
    ),
  },
  {
    id: "uso-de-la-informacion",
    title: "Cómo usamos su información",
    content: (
      <BulletList
        items={[
          "Proporcionar y mantener nuestro servicio",
          "Personalizar su experiencia de navegación",
          "Analizar el uso del sitio web para mejoras",
          "Responder a sus consultas y proporcionar soporte",
          "Cumplir con obligaciones legales",
        ]}
      />
    ),
  },
  {
    id: "compartir-informacion",
    title: "Compartir información",
    content: (
      <>
        <p>
          No vendemos, comercializamos o transferimos su información personal a terceros, excepto en los
          siguientes casos:
        </p>
        <BulletList
          items={[
            "Con su consentimiento explícito",
            "Para cumplir con requisitos legales",
            "Para proteger nuestros derechos y seguridad",
            "Con proveedores de servicios que nos ayudan a operar el sitio web",
          ]}
        />
      </>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad de datos",
    content: (
      <p>
        Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no
        autorizado, alteración, divulgación o destrucción. Esto incluye revisiones internas de nuestras prácticas
        de recopilación, almacenamiento y procesamiento de datos.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "Sus derechos",
    content: (
      <>
        <p>Usted tiene derecho a:</p>
        <CheckList
          items={[
            "Acceder a la información personal que tenemos sobre usted",
            "Solicitar la corrección de datos inexactos",
            "Solicitar la eliminación de su información personal",
            "Oponerse al procesamiento de sus datos",
            "Retirar el consentimiento en cualquier momento",
          ]}
        />
      </>
    ),
  },
  {
    id: "retencion",
    title: "Retención de datos",
    content: (
      <p>
        Conservamos su información personal solo durante el tiempo necesario para los fines establecidos en esta
        política de privacidad, a menos que la ley requiera o permita un período de retención más largo.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    content: (
      <p>
        Podemos actualizar esta política de privacidad periódicamente. Le notificaremos cualquier cambio
        publicando la nueva política en esta página y actualizando la fecha de &quot;última actualización&quot;.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "Contacto",
    content: (
      <>
        <p>
          Si tiene preguntas sobre esta política de privacidad o el tratamiento de sus datos personales, puede
          contactarnos a través del formulario de contacto disponible en nuestro sitio web.
        </p>
        <ContactButton label="Abrir formulario de contacto" showIcon variant="solid" />
      </>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de privacidad"
        description="Qué información tratamos cuando utiliza WikipeIA, con qué finalidad y cómo puede ejercer sus derechos."
      >
        <UpdatedAt date="2 de octubre de 2025" dateTime="2025-10-02" />
      </PageHero>
      <LegalDocument sections={SECTIONS} />
      <RelatedPages current="privacidad" />
    </>
  );
}
