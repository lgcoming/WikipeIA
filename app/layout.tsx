import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import ContactButton from "@/components/ui/ContactButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { FavoritesProvider } from "@/lib/favoritesContext";
import { CookieProvider } from "@/lib/cookieContext";
import CookieBanner from "@/components/cookies/CookieBanner";
import CookieSettings from "@/components/cookies/CookieSettings";
import CookieGearButton from "@/components/cookies/CookieGearButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WikipeIA | Herramientas IA",
  description: "Directorio de herramientas IA en español.",
  icons: [{ url: "/favicon.ico", rel: "icon", type: "image/x-icon", sizes: "32x32" }],
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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <meta name="color-scheme" content="dark" />
        <meta name='impact-site-verification' content='a26c4215-b677-4ce9-8f25-6f7393aa64fc' />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){const t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');document.querySelector('meta[name="color-scheme"]')?.setAttribute('content',t);})()`
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`} suppressHydrationWarning>
        <CookieProvider>
          <FavoritesProvider>
            <header className="w-full border-b border-gray-400 dark:border-white/15 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/30">
              <div className="max-w-6xl mx-auto p-3 sm:p-4 flex items-center justify-between gap-4">
                <Link href="/" className="inline-flex items-center gap-3">
                  <Image src="/logo negro.png" alt="Logo" className="h-12 w-12 sm:h-9 sm:w-9 dark:hidden" width={48} height={48} priority />
                  <Image src="/logo.png" alt="Logo" className="h-12 w-12 sm:h-9 sm:w-9 hidden dark:block" width={48} height={48} priority />
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-0 pb-16">
              {children}
            </div>
            <footer className="w-full border-t border-gray-200 dark:border-white/10 py-10 mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-gray-600 dark:text-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" className="h-5 w-5" width={20} height={20} />
                  <span> {year} WikipeIA. Todos los derechos reservados.</span>
                </div>
                <div className="inline-flex items-center gap-4">
                  <a
                    href="https://www.tiktok.com/@lawikipeia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white transition"
                    aria-label="TikTok"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                  <Link href="/privacidad" className="hover:text-gray-900 dark:hover:text-white transition link-neon">Privacidad</Link>
                  <Link href="/terminos" className="hover:text-gray-900 dark:hover:text-white transition link-neon">Términos</Link>
                </div>
              </div>
            </footer>

            {/* Cookie Components */}
            <CookieBanner />
            <CookieSettings />
            <CookieGearButton />

          </FavoritesProvider>
        </CookieProvider>
      </body>
    </html>
  );
}
