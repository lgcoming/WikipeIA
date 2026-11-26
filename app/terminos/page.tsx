import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import PageHero, { UpdatedAt } from "@/components/content/PageHero";
import LegalDocument, { type LegalSectionData } from "@/components/content/LegalDocument";
import RelatedPages from "@/components/content/RelatedPages";
import { BulletList } from "@/components/content/blocks";
import Icon from "@/components/content/Icon";
import ContactButton from "@/components/ui/ContactButton";

export const metadata: Metadata = pageMetadata({
  title: "Términos y condiciones",
  description: "Condiciones de uso del directorio de herramientas de inteligencia artificial WikipeIA: uso del servicio, propiedad intelectual y responsabilidad.",
  path: "/terminos",
});

const SECTIONS: LegalSectionData[] = [
  {
    id: "aceptacion",
    title: "Aceptación de los términos",
    content: (
      <p>
        Al acceder y utilizar WikipeIA, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está
        de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
      </p>
    ),
  },
  {
    id: "uso-del-servicio",
    title: "Uso del servicio",
    content: (
      <>
        <p>WikipeIA es un directorio de herramientas de inteligencia artificial. Usted se compromete a:</p>
        <BulletList
          items={[
            "Utilizar el servicio solo para fines legales y legítimos",
            "No intentar acceder a áreas restringidas del sitio web",
            "No interferir con el funcionamiento del servicio",
            "No copiar, modificar o distribuir el contenido sin autorización",
            "Proporcionar información precisa cuando sea requerida",
          ]}
        />
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "Propiedad intelectual",
    content: (
      <>
        <p>Todo el contenido presente en WikipeIA, incluyendo pero no limitado a:</p>
        <BulletList
          items={[
            "Textos, gráficos, logotipos e imágenes",
            "Diseño y estructura del sitio web",
            "Código fuente y software",
            "Compilación y organización de información",
          ]}
        />
        <p>Está protegido por derechos de autor y otras leyes de propiedad intelectual.</p>
      </>
    ),
  },
  {
    id: "enlaces-a-terceros",
    title: "Enlaces a terceros",
    content: (
      <p>
        WikipeIA contiene enlaces a sitios web de terceros. No tenemos control sobre el contenido, políticas de
        privacidad o prácticas de estos sitios y no asumimos responsabilidad por ellos. Le recomendamos revisar los
        términos y políticas de privacidad de cualquier sitio de terceros que visite.
      </p>
    ),
  },
  {
    id: "descargo",
    title: "Descargo de responsabilidad",
    content: (
      <>
        <p>
          WikipeIA se proporciona &quot;tal cual&quot; y &quot;según disponibilidad&quot;. No garantizamos que:
        </p>
        <BulletList
          items={[
            "El servicio será ininterrumpido o libre de errores",
            "Los resultados obtenidos serán precisos o confiables",
            "La calidad del servicio cumplirá con sus expectativas",
            "Cualquier error en el software será corregido",
          ]}
        />
      </>
    ),
  },
  {
    id: "limitacion",
    title: "Limitación de responsabilidad",
    content: (
      <div className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5 dark:border-white/10 dark:bg-white/[0.03]">
        <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700 dark:text-[#00d4ff]" />
        <p>
          En ningún caso WikipeIA será responsable por daños directos, indirectos, incidentales, especiales,
          consecuentes o punitivos, incluyendo pero no limitado a pérdida de beneficios, datos o uso, que resulten
          del uso o la imposibilidad de usar nuestro servicio.
        </p>
      </div>
    ),
  },
  {
    id: "modificaciones-del-servicio",
    title: "Modificaciones del servicio",
    content: (
      <p>
        Nos reservamos el derecho de modificar o discontinuar, temporal o permanentemente, el servicio (o cualquier
        parte del mismo) con o sin previo aviso. No seremos responsables ante usted ni ante terceros por cualquier
        modificación, suspensión o discontinuación del servicio.
      </p>
    ),
  },
  {
    id: "modificaciones-de-los-terminos",
    title: "Modificaciones de los términos",
    content: (
      <p>
        Podemos actualizar estos términos y condiciones periódicamente. Le notificaremos cualquier cambio publicando
        los nuevos términos en esta página y actualizando la fecha de &quot;última actualización&quot;. Su uso
        continuado del servicio después de dichos cambios constituye su aceptación de los nuevos términos.
      </p>
    ),
  },
  {
    id: "ley-aplicable",
    title: "Ley aplicable",
    content: (
      <p>
        Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener en cuenta sus
        disposiciones sobre conflictos de leyes.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "Contacto",
    content: (
      <>
        <p>
          Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través del formulario de
          contacto disponible en nuestro sitio web.
        </p>
        <ContactButton label="Abrir formulario de contacto" showIcon variant="solid" />
      </>
    ),
  },
];

export default function TerminosPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Términos y condiciones"
        description="Las condiciones que regulan el acceso y el uso del directorio WikipeIA."
      >
        <UpdatedAt date="2 de octubre de 2025" dateTime="2025-10-02" />
      </PageHero>
      <LegalDocument sections={SECTIONS} />
      <RelatedPages current="terminos" />
    </>
  );
}
