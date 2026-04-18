import { FadeUp } from "@/components/dashboard/FadeUp";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/Button";

const mock = {
  stats: [
    { label: "Aktif İlanlarım", value: "2", hint: "Onay bekleyen: 1" },
    { label: "Başvurularım", value: "5", hint: "Geri dönüş: 2" },
    { label: "Kaydedilen İlanlar", value: "7", hint: "Son 7 gün" },
  ],
  recentActivity: [
    { title: "Unity 3D mini-oyun ilanına başvurdun", when: "2 gün önce" },
    { title: "React Native ilanını kaydettin", when: "4 gün önce" },
    { title: "Yeni bir ekip ilanı taslağı oluşturdun", when: "1 hafta önce" },
  ],
};

export default function DashboardPage() {
  return (
    <div>
      <FadeUp>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-[var(--muted)]">Genel Bakış</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              Dashboard
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
              Her şey tek rolde: <span className="text-[var(--foreground)]">Member</span>.
              İlan oluştur, başvur, profilini güncel tut.
            </p>
          </div>
          <Button href="/takim-ilanlari" variant="secondary">
            İlanları keşfet
          </Button>
        </div>
      </FadeUp>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3">
        {mock.stats.map((s, idx) => (
          <FadeUp key={s.label} delay={idx * 0.05}>
            <StatCard label={s.label} value={s.value} hint={s.hint} />
          </FadeUp>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:mt-12">
        <p className="text-sm font-medium text-[var(--muted)]">Son Aktiviteler</p>
        <ul className="mt-4 space-y-3">
          {mock.recentActivity.map((a) => (
            <li
              key={a.title}
              className="flex items-center justify-between gap-4 rounded-xl border border-[var(--hairline)] bg-black/0 px-4 py-3"
            >
              <span className="text-sm text-[var(--foreground)]/90">{a.title}</span>
              <span className="text-xs text-[var(--muted)]">{a.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

