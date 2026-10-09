export type ActivityCategory =
  | "Спорт"
  | "Учёба"
  | "Проект"
  | "Прогулка"
  | "Игры";

export type ActivityFormat = "Офлайн" | "Онлайн";

export type ActivityAuthor = {
  id: string;
  name: string;
  faculty: string;
  initial: string;
};

export type Activity = {
  id: string;
  category: ActivityCategory;
  title: string;
  shortDate: string;
  fullDate: string;
  shortPlace: string;
  fullPlace: string;
  format: ActivityFormat;
  summary: string;
  description: string[];
  participants: {
    current: number;
    maximum: number;
  };
  author: ActivityAuthor;
  publishedAt: string;
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser?: boolean;
  status?: string | null;
  imageUrl?: string | null;
};

export type CreateActivityInput = {
  title: string;
  category: ActivityCategory;
  description: string;
  date: string;
  time: string;
  format: ActivityFormat;
  place: string;
  maximumParticipants: number;
  image?: File | null;
};
