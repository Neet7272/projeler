/**
 * Soyut mimari / yüksek teknoloji dekoratif illüstrasyon — Hero sağ sütun.
 */
export function HeroTechGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 440 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="htg-a" x1="80" y1="40" x2="380" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" stopOpacity="0.35" />
          <stop offset="0.45" stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="htg-b" x1="220" y1="0" x2="220" y2="440" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f1f5f9" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="440" height="440" rx="48" fill="url(#htg-b)" stroke="rgb(226 232 240 / 0.9)" strokeWidth="1" />
      <rect x="24" y="24" width="392" height="392" rx="36" fill="url(#htg-a)" opacity="0.88" />
      <g stroke="rgb(148 163 184 / 0.45)" strokeWidth="0.75" opacity="0.85">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line key={`v${i}`} x1={56 + i * 44} y1="48" x2={56 + i * 44} y2="392" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`h${i}`} x1="48" y1={72 + i * 44} x2="392" y2={72 + i * 44} />
        ))}
      </g>
      <circle cx="300" cy="120" r="56" fill="#22d3ee" opacity="0.14" />
      <circle cx="140" cy="280" r="72" fill="#38bdf8" opacity="0.12" />
      <rect x="88" y="100" width="200" height="120" rx="12" stroke="rgb(6 182 212 / 0.35)" strokeWidth="1.25" fill="rgb(255 255 255 / 0.4)" />
      <rect x="108" y="248" width="160" height="88" rx="10" stroke="rgb(14 165 233 / 0.3)" strokeWidth="1" fill="rgb(248 250 252 / 0.55)" />
      <path
        d="M108 200 L220 148 L332 200 L220 252 Z"
        stroke="rgb(15 23 42 / 0.1)"
        strokeWidth="1"
        fill="rgb(255 255 255 / 0.3)"
      />
      <circle cx="220" cy="200" r="6" fill="#0891b2" opacity="0.85" />
      <circle cx="108" cy="292" r="4" fill="#0ea5e9" opacity="0.65" />
      <circle cx="332" cy="292" r="4" fill="#0ea5e9" opacity="0.65" />
    </svg>
  );
}
