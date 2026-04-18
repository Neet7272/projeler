import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hakkımızda | Kent Ar-Ge Kulübü",
  description:
    "İstanbul Kent Üniversitesi Ar-Ge, İnovasyon ve Girişimcilik Kulübü — misyon, vizyon ve değerler.",
  openGraph: {
    title: "Hakkımızda | Kent Ar-Ge",
    description:
      "İstanbul Kent Üniversitesi Ar-Ge, İnovasyon ve Girişimcilik Kulübü resmi tanıtım sayfası.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              İstanbul Kent Üniversitesi
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.05]">
              Ar-Ge, İnovasyon ve Girişimcilik Kulübü
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Kent Ar-Ge; mühendislik, tasarım ve girişimcilik disiplinlerini aynı çatı altında
              birleştirir. Amacımız: fikri ölçülebilir prototipe, prototipi güvenilir sahaya taşımak.
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
          <div className="flex flex-col justify-between border-t border-slate-200 pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-slate-900">Şeffaflık</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Moderasyon ve vitrin kuralları herkese açık; süreçler veri tabanında izlenebilir.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Disiplinler arası</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Sanat, tasarım ve Ar-Ge ekiplerinin aynı platformda buluşması.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Üretim odağı</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Yarışma, etkinlik ve kulüp programlarını tek mimaride sunarız.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Topluluk</p>
                <p className="mt-2 leading-6 text-slate-600">
                  Öğrenci ve paydaş ağını büyüten sürdürülebilir kulüp modeli.
                </p>
              </div>
            </div>
            <p className="mt-10 text-xs uppercase tracking-[0.2em] text-slate-400">
              İstanbul Kent Üniversitesi · resmi kulüp sayfası
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Misyon</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                Kampüs içi Ar-Ge kültürünü ölçülebilir çıktılara dönüştürmek: net çağrılar,
                güvenilir ekipler ve sürdürülebilir proje portföyleri oluşturmak.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Vizyon</h2>
              <p className="mt-4 text-base leading-7 text-slate-400">
                İstanbul Kent Üniversitesi’nin inovasyon görünürlüğünü ulusal yarışma ve etkinlik
                sahnesine taşıyan referans Ar-Ge ve girişimcilik kulübü olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Değerlerimiz
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            <li className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-900">Merak ve dürüstlük</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Araştırmayı teşvik eder, sonuçları abartmadan paylaşırız.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-900">İş birliği</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ekip içi güven ve disiplinler arası öğrenmeyi önceleriz.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-900">Sorumluluk</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Veri, gizlilik ve kampüs kurallarına uyumu tartışmaz standart sayarız.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
