export type NotificationType = "like" | "comment" | "join" | "system";

export type AppNotification = {
  id: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
  message: string;
  actor?: {
    id: string;
    name: string;
    initial: string;
  };
  activity?: {
    id: string;
    title: string;
  };
};
