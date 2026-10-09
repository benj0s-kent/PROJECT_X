import { apiRequest, isMockApiEnabled } from "@/services/api/client";
import { mockNotifications } from "@/services/notification/notification.mock";
import type { AppNotification } from "@/types/notification";

export async function getNotifications(): Promise<AppNotification[]> {
  if (isMockApiEnabled()) {
    return structuredClone(mockNotifications);
  }

  return apiRequest<AppNotification[]>("/notifications", {
    cache: "no-store",
  });
}
