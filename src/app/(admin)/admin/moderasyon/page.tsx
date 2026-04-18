import { getModerationProjects } from "@/actions/adminActions";
import { ModerationQueueClient } from "@/components/admin/ModerationQueueClient";

export default async function AdminModerationPage() {
  const [pending, approved, rejected] = await Promise.all([
    getModerationProjects("PENDING"),
    getModerationProjects("APPROVED"),
    getModerationProjects("REJECTED"),
  ]);

  return (
    <ModerationQueueClient
      initial={{
        Pending: pending,
        Approved: approved,
        Rejected: rejected,
      }}
    />
  );
}
