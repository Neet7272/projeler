import type {
  AnnouncementCategory,
  AnnouncementPriority as PrismaPriority,
} from "@prisma/client";
import type {
  Announcement,
  AnnouncementPriority as UiPriority,
} from "@/lib/mockAnnouncements";

export function prismaPriorityToUi(p: PrismaPriority): UiPriority {
  switch (p) {
    case "HIGH":
      return "High";
    case "LOW":
      return "Low";
    default:
      return "Normal";
  }
}

export function uiPriorityToPrisma(p: UiPriority): PrismaPriority {
  switch (p) {
    case "High":
      return "HIGH";
    case "Low":
      return "LOW";
    default:
      return "NORMAL";
  }
}

export type AnnouncementCategoryUiLabel =
  | "Yarışmalar"
  | "Etkinlikler"
  | "Kulüp etkinlikleri";

export function prismaCategoryToUiLabel(
  cat: AnnouncementCategory
): AnnouncementCategoryUiLabel {
  switch (cat) {
    case "YARISMA":
      return "Yarışmalar";
    case "ETKINLIK":
      return "Etkinlikler";
    default:
      return "Kulüp etkinlikleri";
  }
}

export function uiCategoryLabelToPrisma(
  v: AnnouncementCategoryUiLabel
): AnnouncementCategory {
  switch (v) {
    case "Yarışmalar":
      return "YARISMA";
    case "Etkinlikler":
      return "ETKINLIK";
    default:
      return "KULUP";
  }
}

export type AnnouncementRow = {
  id: string;
  title: string;
  content: string;
  coverImageUrl: string | null;
  priority: PrismaPriority;
  category: AnnouncementCategory;
  externalApplyUrl: string | null;
  externalApplyLabel: string | null;
  createdAt: Date;
};

export function mapAnnouncementRowToUi(row: AnnouncementRow): Announcement {
  const extUrl = row.externalApplyUrl?.trim();
  const extLabel = row.externalApplyLabel?.trim();
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    coverImageUrl: row.coverImageUrl ?? undefined,
    priority: prismaPriorityToUi(row.priority),
    category: row.category,
    externalApplyUrl: extUrl && extUrl.length > 0 ? extUrl : undefined,
    externalApplyLabel: extLabel && extLabel.length > 0 ? extLabel : undefined,
    createdAt: row.createdAt.toISOString().slice(0, 10),
  };
}
