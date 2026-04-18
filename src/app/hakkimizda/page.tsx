import type { Metadata } from "next";
import { MatchmakingHowItWorks } from "@/components/home/MatchmakingHowItWorks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hakkımızda | Kent Ar-Ge Kulübü",
  description:
    "İstanbul Kent Üniversitesi Sanat, Tasarım, Ar-Ge, İnovasyon ve Girişimcilik Kulübü — yapısal, şeffaf, üretken.",
  openGraph: {
    title: "Hakkımızda | Kent Ar-Ge",
    description:
      "Kampüs içi Ar-Ge ekosistemi, vitrin ve matchmaking ile projeleri hızlandırıyoruz.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-12 sm:py-24">
          <div className="sm:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              İstanbul Kent Üniversitesi
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.05]">
              Sanat, Tasarım, Ar-Ge, İnovasyon ve Girişimcilik Kulübü
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Kent Ar-Ge; disiplinler arası üretimi, mühendislik disiplinini ve girişimcilik
              düşüncesini aynı çatı altında birleştirir. Amacımız: fikri hızlıca prototipe,
              prototipi sahaya taşımak.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/proje-vitrini" variant="primary">
                Proje vitrini
              </Button>
              <Button href="/duyurular" variant="secondary">
                Duyurular
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-between border-t border-slate-200 pt-10 sm:col-span-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-slate-900">Yapı</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Şeffaf moderasyon, veri tabanlı vitrin ve gerçek kullanıcı oturumları.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Odak</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Yarışma çağrıları, etkinlikler ve kulüp programları tek mimaride.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Üretim</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Ekip arama ve ilan verme ile eşleşmeyi hızlandırırız.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Topluluk</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Öğrenci, akademisyen ve paydaş ağını genişleten açık platform.
                </p>
              </div>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-400">
              Matte structural · grid · anthracite type
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Misyon
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                Kampüs içi Ar-Ge kültürünü ölçülebilir çıktılara dönüştürmek: net çağrılar,
                güvenilir ekipler ve sürdürülebilir proje portföyleri.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Vizyon
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                İstanbul Kent Üniversitesi’nin inovasyon görünürlüğünü ulusal yarışma ve
                etkinlik sahnesine taşıyan referans kulüp modeli olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[var(--background)] text-[var(--foreground)]">
        <MatchmakingHowItWorks />
      </div>
    </div>
  );
}
