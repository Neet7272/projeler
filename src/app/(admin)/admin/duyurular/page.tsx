import { getAnnouncements } from "@/lib/announcementQueries";
import { AdminAnnouncementsClient } from "@/components/admin/AdminAnnouncementsClient";

export default async function AdminAnnouncementsPage() {
  const items = await getAnnouncements();
  return <AdminAnnouncementsClient initialItems={items} />;
}
