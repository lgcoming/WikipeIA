import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import ContactButton from "@/components/ui/ContactButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MotionProvider from "@/components/MotionProvider";
import RevealObserver from "@/components/RevealObserver";
import { FavoritesProvider } from "@/lib/favoritesContext";
import { CookieProvider } from "@/lib/cookieContext";
import CookieBanner from "@/components/cookies/CookieBanner";
import CookieSettings from "@/components/cookies/CookieSettings";
import CookieGearButton from "@/components/cookies/CookieGearButton";
import JsonLd from "@/components/seo/JsonLd";
import { CATEGORIES, categoryPath } from "@/lib/categories";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Monoespaciada solo para los números del índice en las páginas legales: sin precarga global.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// Orbitron se ve en la cabecera de todas las páginas: se precarga.
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WikipeIA | Directorio de herramientas de IA en español",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    url: "/",
    title: "WikipeIA | Directorio de herramientas de IA en español",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "WikipeIA | Directorio de herramientas de IA en español",
    description: SITE_DESCRIPTION,
  },
  other: { "impact-site-verification": "a26c4215-b677-4ce9-8f25-6f7393aa64fc" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Aplica el tema guardado antes de pintar para evitar el parpadeo claro/oscuro.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');var m=document.querySelector('meta[name="color-scheme"]');if(m)m.setAttribute('content',t);}catch(e){}})()`;

// Nombre del sitio y organización: Google los usa para el nombre y el logotipo que muestra en los resultados.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ["Wikipeia", "WikipeIA directorio de IA"],
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png"), width: 192, height: 192 },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getUTCFullYear();
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <JsonLd data={JSON_LD} />
      </head>
      <body className={`${geistMono.variable} ${orbitron.variable} antialiased`} suppressHydrationWarning>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
        >
          Saltar al contenido
        </a>
        <MotionProvider>
          <CookieProvider>
            <FavoritesProvider>
              <header className="site-header w-full border-b border-gray-300/80 dark:border-white/10 sticky top-0 z-40 bg-white/90 dark:bg-black/80 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/40">
                <div className="max-w-6xl mx-auto p-3 sm:p-4 flex items-center justify-between gap-4">
                  <Link href="/" aria-label="WikipeIA, ir al inicio" className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white/40">
                    <Image src="/logo negro.png" alt="" className="h-12 w-12 sm:h-9 sm:w-9 dark:hidden" width={48} height={48} loading="eager" />
                    <Image src="/logo.png" alt="" className="h-12 w-12 sm:h-9 sm:w-9 hidden dark:block" width={48} height={48} loading="eager" />
                    <span className="hidden sm:inline text-base sm:text-lg font-semibold tracking-tight font-display text-gray-900 dark:text-white">WikipeIA</span>
                  </Link>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                      href="/informacion"
                      className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/85 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-white/40 hover:ring-1 hover:ring-gray-300 dark:hover:ring-white/30 active:scale-95 active:transform"
                    >
                      Información
                    </Link>
                    <ContactButton />
                  </div>
                </div>
              </header>
              <main id="contenido" tabIndex={-1} className="max-w-6xl mx-auto px-4 sm:px-6 pt-0 pb-16 outline-none">
                {children}
              </main>
              <footer className="w-full border-t border-gray-200 dark:border-white/10 py-10 mt-8">
                <nav aria-label="Categorías" className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-left dark:text-white/50">
                    Herramientas de IA por categoría
                  </p>
                  <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:justify-start">
                    {CATEGORIES.map((category) => (
                      <li key={category.slug}>
                        <Link href={categoryPath(category.slug)} className="text-gray-600 hover:text-gray-900 dark:text-white/70 dark:hover:text-white transition link-neon">
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-600 dark:text-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2">
                    <Image src="/logo negro.png" alt="" className="h-5 w-5 dark:hidden" width={20} height={20} />
                    <Image src="/logo.png" alt="" className="h-5 w-5 hidden dark:block" width={20} height={20} />
                    <span>© {year} WikipeIA. Todos los derechos reservados.</span>
                  </div>
                  <nav aria-label="Legal" className="inline-flex items-center gap-4">
                    <Link href="/privacidad" className="hover:text-gray-900 dark:hover:text-white transition link-neon">Privacidad</Link>
                    <Link href="/terminos" className="hover:text-gray-900 dark:hover:text-white transition link-neon">Términos</Link>
                  </nav>
                </div>
              </footer>

              {/* Cookie Components */}
              <CookieBanner />
              <CookieSettings />
              <CookieGearButton />

              <RevealObserver />

              {/* Botón flotante volver arriba */}
              <ScrollToTop />
            </FavoritesProvider>
          </CookieProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
