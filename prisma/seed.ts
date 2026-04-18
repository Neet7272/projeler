import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

import { teamAds } from "../src/lib/mockAds";
import { uiStatusToPrisma } from "../src/lib/projectMappers";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DEV_PASSWORD = "dev123";

async function main() {
  const devPasswordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@kulup.local" },
    create: {
      email: "admin@kulup.local",
      name: "Kulüp Admin",
      role: "ADMIN",
      passwordHash: devPasswordHash,
    },
    update: {
      name: "Kulüp Admin",
      passwordHash: devPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "system@kulup.local" },
    create: {
      email: "system@kulup.local",
      name: "Kulüp Üyesi",
      role: "MEMBER",
      skills: [],
      portfolioUrls: {},
      passwordHash: devPasswordHash,
    },
    update: {
      passwordHash: devPasswordHash,
    },
  });

  for (const ad of teamAds) {
    const email = `seed-${ad.id}@kulup.local`;

    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        name: ad.owner.name,
        role: "MEMBER",
        skills: ad.owner.skills,
        passwordHash: devPasswordHash,
        portfolioUrls: {
          headline: ad.owner.headline,
          department: ad.owner.department,
          year: ad.owner.year,
          github: ad.owner.portfolio?.github,
          linkedin: ad.owner.portfolio?.linkedin,
          website: ad.owner.portfolio?.website,
        },
      },
      update: {
        name: ad.owner.name,
        skills: ad.owner.skills,
        passwordHash: devPasswordHash,
        portfolioUrls: {
          headline: ad.owner.headline,
          department: ad.owner.department,
          year: ad.owner.year,
          github: ad.owner.portfolio?.github,
          linkedin: ad.owner.portfolio?.linkedin,
          website: ad.owner.portfolio?.website,
        },
      },
    });

    const mod =
      ad.moderationState === "Approved"
        ? ("APPROVED" as const)
        : ad.moderationState === "Rejected"
          ? ("REJECTED" as const)
          : ("PENDING" as const);

    await prisma.project.upsert({
      where: { id: ad.id },
      create: {
        id: ad.id,
        title: ad.title,
        description: ad.description,
        status: uiStatusToPrisma(ad.status),
        requiredSkills: ad.tags,
        externalUrls: {
          lookingFor: ad.lookingFor,
          ...(ad.links ?? {}),
        },
        moderationStatus: mod,
        ownerId: user.id,
      },
      update: {
        title: ad.title,
        description: ad.description,
        status: uiStatusToPrisma(ad.status),
        requiredSkills: ad.tags,
        externalUrls: {
          lookingFor: ad.lookingFor,
          ...(ad.links ?? {}),
        },
        moderationStatus: mod,
        ownerId: user.id,
      },
    });
  }

  const deletedAnn = await prisma.announcement.deleteMany({});
  console.log(`[seed] Kaldırılan eski duyuru: ${deletedAnn.count}`);

  await prisma.announcement.createMany({
    data: [
      {
        title: "TEKNOFEST 2026 — İnsansız Su Altı Sistemleri Yarışması",
        content:
          "TEKNOFEST kapsamında insansız su altı sistemleri (ROV/AUV) kategorisi 2026 sezonu duyuruldu.\n\n" +
          "Takımların hidrodinamik gövde, güç yönetimi, haberleşme ve otonom görev profillerini gerçekçi senaryolarda test etmesi beklenir. Ön eleme, teknik rapor ve saha demo aşamaları ile ilerlenir.\n\n" +
          "Kent Ar-Ge üyeleri için kulüp içi mentorluk ve test havuzu koordinasyonu planlanmaktadır. Başvuru öncesi takım sözleşmesi ve görev paylaşım tablosu zorunludur.",
        category: "YARISMA",
        priority: "HIGH",
        coverImageUrl:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
        externalApplyUrl: "https://www.teknofest.org",
        externalApplyLabel: "TEKNOFEST resmi başvuru",
        authorId: adminUser.id,
      },
      {
        title: "TÜBİTAK 2242 — Üniversite Öğrencileri Araştırma Proje Yarışmaları",
        content:
          "2242 programı, lisans öğrencilerinin özgün araştırma önerilerini destekler. Proje özeti, literatür taraması, yöntem ve zaman çizelgesi değerlendirme kriterlerinin ağırlıklı bileşenleridir.\n\n" +
          "Kent Ar-Ge, başvuru öncesi okuma turları ve istatistik / yazım atölyeleri düzenler. Danışman onayı ve etik kurul gereksinimleri için kampüs takvimi paylaşılacaktır.",
        category: "YARISMA",
        priority: "HIGH",
        coverImageUrl:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
        externalApplyUrl: "https://www.tubitak.gov.tr",
        externalApplyLabel: "TÜBİTAK2242 çağrısı",
        authorId: adminUser.id,
      },
      {
        title: "Ideathon: Sürdürülebilir Şehirler — 48 saatlik fikir maratonu",
        content:
          "İstanbul odaklı sürdürülebilir şehirler temalı ideathon, 48 saat içinde problem tanımı → çözüm → prototip sunumu formatındadır.\n\n" +
          "Kategoriler: düşük karbon mobilite, atık azaltma, yeşil alan erişimi ve dijital ikiz ile şehir planlama. Jüri; etki, uygulanabilirlik ve sunum netliğine göre puanlar.\n\n" +
          "Ekip oluşturmak için vitrin üzerinden önceden eşleşme önerilir.",
        category: "YARISMA",
        priority: "NORMAL",
        coverImageUrl:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80",
        externalApplyUrl: "https://ideathon.example.org",
        externalApplyLabel: "Ideathon ön kayıt (örnek)",
        authorId: adminUser.id,
      },
      {
        title: "Google Developer Groups — Campus Build Day İstanbul",
        content:
          "Mobil, bulut ve yapay zeka odaklı pratik oturumlar; Firebase, Gemini API ve Android baseline profilleri üzerinden ilerleyecek.\n\n" +
          "Katılım kontenjanlıdır; kulüp üyelerine öncelikli davet. Kendi dizüstü bilgisayarını getir (KBİG) kuralı geçerlidir.",
        category: "ETKINLIK",
        priority: "NORMAL",
        coverImageUrl:
          "https://images.unsplash.com/photo-1540575467063-27aef4e7bd51?auto=format&fit=crop&w=1600&q=80",
        externalApplyUrl: "https://developers.google.com/community",
        externalApplyLabel: "Etkinlik bilgisi",
        authorId: adminUser.id,
      },
      {
        title: "Design Systems & Motion — ileri seviye workshop",
        content:
          "Tasarım sistemi token’ları, bileşen sözleşmeleri ve Framer Motion ile mikro-etkileşim. Figma → kod handoff pratikleri.\n\n" +
          "İstanbul Kent Üniversitesi iş birliğiyle sınırlı kontenjan; başvuruda mini portfolyo linki istenir.",
        category: "ETKINLIK",
        priority: "LOW",
        coverImageUrl:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
        authorId: adminUser.id,
      },
      {
        title: "Kent Ar-Ge Genel Kurul & yönetim kurulu seçimi",
        content:
          "2026 dönemi genel kurul toplantısı; faaliyet raporu, bütçe taslağı ve komite yapılanması oylanacak.\n\n" +
          "Aday listeleri kulüp e-posta grubunda yayımlandı. Oy kullanma için üyelik doğrulaması gereklidir.",
        category: "KULUP",
        priority: "HIGH",
        coverImageUrl:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
        authorId: adminUser.id,
      },
      {
        title: "Proje eşleştirme gecesi — vitrin hızlı tanıtımlar",
        content:
          "Onaylı projeler 3’er dakikalık hızlı pitch ile tanıtır; ardından bire bir görüşme masaları açılır.\n\n" +
          "Başvuru için profil tamamlama ve vitrin kurallarına uyum zorunludur. Moderasyon ekibi saha düzenini yönetir.",
        category: "KULUP",
        priority: "NORMAL",
        coverImageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        authorId: adminUser.id,
      },
    ],
  });

  console.log("\n\x1b[36m========================================\x1b[0m");
  console.log("\x1b[36m  Kent Ar-Ge — seed tamamlandı\x1b[0m");
  console.log("\x1b[33m  Admin e-posta:\x1b[0m  admin@kulup.local");
  console.log("\x1b[33m  Admin şifre:\x1b[0m    dev123");
  console.log("\x1b[36m========================================\x1b[0m\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
