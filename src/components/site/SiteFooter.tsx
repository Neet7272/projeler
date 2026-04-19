import Link from "next/link";

const WHATSAPP_GROUP =
  "https://chat.whatsapp.com/KEaY2OBguau4RFXJEziZmF";
const INSTAGRAM_URL = "https://www.instagram.com/kentargekulubu/";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/proje-vitrini", label: "Proje Vitrini" },
  { href: "/hakkimizda", label: "Hakkımızda" },
] as const;

const linkClass =
  "group inline-flex min-h-11 items-center text-sm font-medium text-slate-300 transition-all duration-200 ease-out hover:text-cyan-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const socialCardClass =
  "flex min-h-[3rem] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-200 ease-out hover:border-cyan-500/35 hover:bg-cyan-500/[0.07] hover:text-cyan-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800/90 bg-gradient-to-b from-slate-950 via-[#0c1222] to-slate-950 text-slate-200">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-14 pb-[max(3.5rem,env(safe-area-inset-bottom,0px))] md:grid-cols-3 md:gap-10 lg:gap-14">
        <div className="md:pr-4">
          <p className="text-base font-semibold tracking-tight text-white">
            Ar-Ge İnovasyon ve Girişimcilik Kulübü
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Fikirleri prototipe, ekibi başarıya taşıyoruz. Birlikte öğreniyor,
            üretiyor ve geleceği şimdiden inşa ediyoruz — sen de aramıza katıl.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Hızlı Bağlantılar
          </p>
          <nav
            className="mt-5 flex flex-col gap-1"
            aria-label="Hızlı bağlantılar"
          >
            {quickLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass}>
                <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-cyan-400/40">
                  {label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Topluluğa Katıl
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            WhatsApp grubumuzda duyuruları kaçırma; Instagram’da projelerimizi
            takip et.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            <li>
              <a
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className={socialCardClass}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366]">
                  <WhatsAppGlyph className="h-5 w-5" />
                </span>
                <span className="min-w-0 text-left">WhatsApp Grubu</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={socialCardClass}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-violet-500/20 text-pink-300">
                  <InstagramGlyph className="h-5 w-5" />
                </span>
                <span className="min-w-0 text-left">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {year} Ar-Ge İnovasyon ve Girişimcilik Kulübü
          </p>
          <p className="text-center text-[11px] text-slate-600 sm:text-right">
            Üniversite inovasyon topluluğu
          </p>
        </div>
      </div>
    </footer>
  );
}
