import type { AppNotification } from "@/types/notification";

export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    type: "like",
    createdAt: "2026-10-09T11:35:00+03:00",
    read: false,
    message: "оценил вашу публикацию",
    actor: {
      id: "alex-smirnov",
      name: "Алексей Смирнов",
      initial: "А",
    },
    activity: {
      id: "4",
      title: "Разбираем React перед проектом",
    },
  },
  {
    id: "n2",
    type: "comment",
    createdAt: "2026-10-09T10:15:00+03:00",
    read: false,
    message: "оставила комментарий к публикации",
    actor: {
      id: "alina-valeeva",
      name: "Алина Валеева",
      initial: "А",
    },
    activity: {
      id: "4",
      title: "Разбираем React перед проектом",
    },
  },
  {
    id: "n3",
    type: "join",
    createdAt: "2026-10-08T19:40:00+03:00",
    read: true,
    message: "присоединилась к вашей активности",
    actor: {
      id: "sofia-kim",
      name: "София Ким",
      initial: "С",
    },
    activity: {
      id: "3",
      title: "Настольные игры после пар",
    },
  },
  {
    id: "n4",
    type: "system",
    createdAt: "2026-10-07T12:00:00+03:00",
    read: true,
    message: "Профиль подтверждён. Теперь ваши публикации видны студентам КГУ.",
  },
];
