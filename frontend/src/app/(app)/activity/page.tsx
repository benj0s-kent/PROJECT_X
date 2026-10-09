import { NotificationsClient } from "@/components/notifications/NotificationsClient";
import { getNotifications } from "@/services/notification/notification.service";

export default async function ActivityPage() {
  const notifications = await getNotifications();

  return <NotificationsClient notifications={notifications} />;
}
