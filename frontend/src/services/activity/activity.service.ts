import { ApiError, apiRequest, isMockApiEnabled } from "@/services/api/client";
import {
  mockActivities,
  welcomeActivityIds,
} from "@/services/activity/activity.mock";
import type { Activity, CreateActivityInput } from "@/types/activity";

function cloneActivity(activity: Activity): Activity {
  return structuredClone(activity);
}

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapCreateInputToActivity(input: CreateActivityInput): Activity {
  const normalizedDate = new Date(`${input.date}T${input.time}`);

  return {
    id: `mock-${Date.now()}`,
    category: input.category,
    title: input.title,
    shortDate: normalizedDate.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    fullDate: normalizedDate.toLocaleString("ru-RU"),
    shortPlace: input.place,
    fullPlace: input.place,
    format: input.format,
    summary: input.description.slice(0, 120),
    description: [input.description],
    participants: {
      current: 1,
      maximum: input.maximumParticipants,
    },
    author: {
      id: "current-user",
      name: "Михаил Петров",
      faculty: "ИТИС · 1 курс",
      initial: "М",
    },
    publishedAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
    imageUrl: null,
  };
}

export async function getActivities(): Promise<Activity[]> {
  if (isMockApiEnabled()) {
    return mockActivities.map(cloneActivity);
  }

  return apiRequest<Activity[]>("/activities", {
    cache: "no-store",
  });
}

export async function getActivityById(id: string): Promise<Activity | null> {
  if (isMockApiEnabled()) {
    const activity = mockActivities.find((item) => item.id === id);
    return activity ? cloneActivity(activity) : null;
  }

  try {
    return await apiRequest<Activity>(`/activities/${id}`, {
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getUserPublications(userId: string): Promise<Activity[]> {
  if (isMockApiEnabled()) {
    return mockActivities
      .filter((activity) => activity.author.id === userId)
      .map(cloneActivity);
  }

  return apiRequest<Activity[]>(`/users/${userId}/activities`, {
    cache: "no-store",
  });
}

export async function getProfileActivities(): Promise<Activity[]> {
  if (isMockApiEnabled()) {
    return mockActivities
      .filter((activity) => activity.author.id === "current-user")
      .map(cloneActivity);
  }

  return apiRequest<Activity[]>("/users/me/activities", {
    cache: "no-store",
  });
}

export async function getWelcomeActivities(): Promise<Activity[]> {
  if (isMockApiEnabled()) {
    return mockActivities
      .filter((activity) => welcomeActivityIds.includes(activity.id))
      .map(cloneActivity);
  }

  const activities = await getActivities();
  return activities.slice(0, 2);
}

export async function createActivity(input: CreateActivityInput): Promise<Activity> {
  if (isMockApiEnabled()) {
    await delay(700);
    return mapCreateInputToActivity(input);
  }

  const formData = new FormData();
  formData.set("title", input.title);
  formData.set("category", input.category);
  formData.set("description", input.description);
  formData.set("date", input.date);
  formData.set("time", input.time);
  formData.set("format", input.format);
  formData.set("place", input.place);
  formData.set("maximumParticipants", String(input.maximumParticipants));

  if (input.image) {
    formData.set("image", input.image);
  }

  return apiRequest<Activity>("/activities", {
    method: "POST",
    body: formData,
  });
}
