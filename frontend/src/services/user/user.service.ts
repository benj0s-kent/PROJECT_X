import { cookies } from "next/headers";
import { ApiError, apiRequest, isMockApiEnabled } from "@/services/api/client";
import { mockCurrentUser, mockUsers } from "@/services/user/user.mock";
import type { UpdateUserProfileInput, UserProfile } from "@/types/user";

const PROFILE_COOKIE = "kent_mock_profile";

function cloneUser(user: UserProfile): UserProfile {
  return structuredClone(user);
}

function normalizeProfileInput(input: UpdateUserProfileInput) {
  return {
    name: input.name.trim(),
    faculty: input.faculty.trim(),
    about: input.about.trim(),
    interests: input.interests.map((interest) => interest.trim()).filter(Boolean),
  };
}

async function getMockCurrentUser(): Promise<UserProfile> {
  const cookieStore = await cookies();
  const savedProfile = cookieStore.get(PROFILE_COOKIE)?.value;

  if (!savedProfile) {
    return cloneUser(mockCurrentUser);
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(savedProfile)) as Partial<UserProfile>;
    return {
      ...cloneUser(mockCurrentUser),
      ...parsed,
      id: mockCurrentUser.id,
      completedActivities: mockCurrentUser.completedActivities,
      activeActivities: mockCurrentUser.activeActivities,
      publicationsCount: mockCurrentUser.publicationsCount,
      joinedActivities: mockCurrentUser.joinedActivities,
    };
  } catch {
    return cloneUser(mockCurrentUser);
  }
}

export async function getCurrentUser(): Promise<UserProfile> {
  if (isMockApiEnabled()) {
    return getMockCurrentUser();
  }

  return apiRequest<UserProfile>("/users/me", {
    cache: "no-store",
  });
}

export async function getUserById(id: string): Promise<UserProfile | null> {
  if (id === mockCurrentUser.id) {
    return getCurrentUser();
  }

  if (isMockApiEnabled()) {
    const user = mockUsers.find((item) => item.id === id);
    return user ? cloneUser(user) : null;
  }

  try {
    return await apiRequest<UserProfile>(`/users/${id}`, {
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function updateCurrentUserProfile(
  input: UpdateUserProfileInput,
): Promise<UserProfile> {
  const normalized = normalizeProfileInput(input);

  if (isMockApiEnabled()) {
    const current = await getMockCurrentUser();
    const updated: UserProfile = {
      ...current,
      ...normalized,
      initial: normalized.name.charAt(0).toUpperCase() || current.initial,
    };

    const cookieStore = await cookies();
    cookieStore.set(PROFILE_COOKIE, encodeURIComponent(JSON.stringify(updated)), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return updated;
  }

  return apiRequest<UserProfile>("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalized),
  });
}
