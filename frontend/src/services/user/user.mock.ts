import type { UserProfile } from "@/types/user";

export const mockCurrentUser: UserProfile = {
  id: "current-user",
  name: "Михаил Петров",
  faculty: "ИТИС · 1 курс",
  initial: "М",
  about:
    "Интересуюсь IT, спортом и стартапами. Ищу людей, с которыми можно делать вещи, а не только обсуждать идеи.",
  interests: ["IT", "Спорт", "Стартапы"],
  verified: true,
  completedActivities: 2,
  activeActivities: 1,
  publicationsCount: 2,
  joinedActivities: 7,
};

export const mockUsers: UserProfile[] = [
  mockCurrentUser,
  {
    id: "alex-smirnov",
    name: "Алексей Смирнов",
    faculty: "ИТИС · 2 курс",
    initial: "А",
    about: "Хожу в зал, бегаю и иногда собираю компанию на спортивные активности.",
    interests: ["Спорт", "Бег", "Зал"],
    verified: true,
    completedActivities: 8,
    activeActivities: 2,
    publicationsCount: 5,
    joinedActivities: 14,
  },
  {
    id: "alina-valeeva",
    name: "Алина Валеева",
    faculty: "ИТИС · 1 курс",
    initial: "А",
    about: "Frontend, дизайн и хакатоны. Люблю собирать маленькие команды и доводить идеи до демо.",
    interests: ["IT", "Дизайн", "Хакатоны"],
    verified: true,
    completedActivities: 4,
    activeActivities: 1,
    publicationsCount: 3,
    joinedActivities: 9,
  },
  {
    id: "sofia-kim",
    name: "София Ким",
    faculty: "ИМО · 2 курс",
    initial: "С",
    about: "Люблю прогулки, языки и настолки. Всегда за спонтанные планы после пар.",
    interests: ["Прогулки", "Игры", "Языки"],
    verified: true,
    completedActivities: 6,
    activeActivities: 1,
    publicationsCount: 4,
    joinedActivities: 11,
  },
];
