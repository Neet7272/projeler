export type TeamAdStatus = "Idea" | "Prototype" | "Active Development";

export type MockOwnerProfile = {
  name: string;
  headline: string;
  department?: string;
  year?: string;
  skills: string[];
  portfolio?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
};

export type ExternalLinks = {
  figma?: string;
  notion?: string;
  competition?: string;
  repository?: string;
  /** İlan sahibinin proje portföyü (Behance, site vb.) */
  portfolioUrl?: string;
  /** Canlı demo, yarışma sayfası veya genel proje URL’si */
  projectUrl?: string;
};

/** `Project.externalUrls` içinde saklanan isteğe bağlı vitrin detayları */
export type TeamAdExtended = {
  /** Kart / paylaşım için tek satır */
  tagline?: string;
  /** Teslimatlar, kapsam, kilometre taşları */
  deliverables?: string;
  /** Örn. “5–8 saat/hafta” */
  timeCommitment?: string;
  /** Çalışma şekli, araçlar, buluşma tercihi */
  collaborationNotes?: string;
};

export type TeamAd = {
  id: string;
  title: string;
  description: string;
  status: TeamAdStatus;
  moderationState: "Pending" | "Approved" | "Rejected";
  tags: string[];
  lookingFor: string[];
  owner: MockOwnerProfile;
  links?: ExternalLinks;
} & TeamAdExtended;

export const teamAds: TeamAd[] = [
  {
    id: "ad_001",
    title: "Teknofest Sürü İHA Projesi — Takım Kuruyoruz",
    description:
      "Hedef: Teknofest Sürü İHA kategorisi için uçuşa hazır bir prototip.\n\nOdak alanları: görev planlama, sürü koordinasyonu, yer istasyonu arayüzü, test ve validasyon.\n\nHaftalık sprint mantığıyla ilerleyeceğiz. Teknik dokümantasyon ve yarışma takvimi netleştirilecek.",
    status: "Active Development",
    moderationState: "Approved",
    tags: ["Teknofest", "UAV", "Control", "Systems", "Telemetry"],
    lookingFor: ["Embedded", "Control", "Computer Vision", "UI/UX"],
    owner: {
      name: "Mert",
      headline: "Sistem mimarisi • Kontrol • Test",
      department: "Bilgisayar Mühendisliği",
      year: "2. Sınıf",
      skills: ["Systems", "Testing", "Coordination"],
      portfolio: {
        github: "https://github.com/",
      },
    },
    links: {
      notion: "https://www.notion.so/",
      competition: "https://teknofest.org/",
    },
    tagline:
      "Sürü İHA yer kontrolü, saha testi ve jüri demosuna kadar uçuşa hazır prototip.",
    deliverables:
      "Görev planlama modülü, sürü haberleşme katmanı, yer istasyonu UI taslağı, saha test raporu ve yarışma teknik dosyası özeti.",
    timeCommitment: "Haftada 6–10 saat; sprint toplantıları Çarşamba akşamı.",
    collaborationNotes:
      "Discord + aylık hibrit buluşma; kod ve dokümantasyon İngilizce/Türkçe karışık kabul edilir.",
  },
  {
    id: "ad_002",
    title: "Mimari Konsept Tasarım Yarışması — Sunum + Modelleme Ekibi",
    description:
      "Bir konsept tasarım yarışması için güçlü bir görsel dil ve net bir hikâye kurguluyoruz.\n\nİhtiyaç: plan/sekisyon, 3D kütle çalışmaları, render, poster tasarımı ve kısa anlatı metni.\n\nAmaç: jüri kriterlerine göre temiz, profesyonel teslim.",
    status: "Prototype",
    moderationState: "Approved",
    tags: ["Architecture", "Concept", "3D", "Presentation", "Visual"],
    lookingFor: ["3D Modeling", "Graphic Design", "Storytelling"],
    owner: {
      name: "Zeynep",
      headline: "Konsept geliştirme • Sunum dili",
      department: "Mimarlık",
      year: "3. Sınıf",
      skills: ["Concept Design", "Presentation", "Layout"],
      portfolio: {
        linkedin: "https://linkedin.com/",
        website: "https://example.com",
      },
    },
    links: {
      figma: "https://www.figma.com/",
      notion: "https://www.notion.so/",
    },
  },
  {
    id: "ad_003",
    title: "TÜBİTAK 2209 Girişimcilik Fikri — MVP ve Doğrulama",
    description:
      "Bir girişim fikrini TÜBİTAK 2209 başvurusuna hazır hale getiriyoruz.\n\nİhtiyaç: problem/çözüm netliği, pazar/doğrulama planı, temel MVP akışı ve ölçüm metrikleri.\n\nHedef: 2–3 haftada demo + başvuru dokümanı.",
    status: "Idea",
    moderationState: "Pending",
    tags: ["TÜBİTAK", "Entrepreneurship", "MVP", "Research"],
    lookingFor: ["Product", "UI/UX", "Frontend"],
    owner: {
      name: "Efe",
      headline: "Araştırma • Ürün • Sunum",
      department: "İşletme",
      year: "4. Sınıf",
      skills: ["Research", "Product", "Pitch"],
    },
    links: {
      competition: "https://tubitak.gov.tr/",
      notion: "https://www.notion.so/",
    },
  },
  {
    id: "ad_004",
    title: "Kampüs İçi Afet Hazırlık Haritası — Veri + Arayüz",
    description:
      "Kampüs için toplanma alanları, ilk yardım noktaları ve acil çıkış rotalarını bir harita üzerinde topluyoruz.\n\nİhtiyaç: veri toplama/temizleme, basit harita UI, erişilebilirlik ve hızlı kullanım.\n\nHedef: doğrulanabilir bir MVP ve kaynak linkleri.",
    status: "Prototype",
    moderationState: "Pending",
    tags: ["Civic", "Maps", "Data", "UX"],
    lookingFor: ["Frontend", "Data", "UI/UX"],
    owner: {
      name: "Selin",
      headline: "Ürün • Koordinasyon",
      department: "Şehir ve Bölge Planlama",
      year: "3. Sınıf",
      skills: ["Product", "Coordination", "Research"],
      portfolio: {
        github: "https://github.com/",
      },
    },
    links: {
      repository: "https://github.com/",
    },
  },
];

export function getTeamAdById(id: string) {
  return teamAds.find((a) => a.id === id) ?? null;
}

export function uniqTags(list = teamAds) {
  const s = new Set<string>();
  for (const a of list) for (const t of a.tags) s.add(t);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

