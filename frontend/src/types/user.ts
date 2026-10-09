export type UserProfile = {
  id: string;
  name: string;
  faculty: string;
  initial: string;
  about: string;
  interests: string[];
  verified: boolean;
  completedActivities: number;
  activeActivities: number;
  publicationsCount: number;
  joinedActivities: number;
};

export type UpdateUserProfileInput = {
  name: string;
  faculty: string;
  about: string;
  interests: string[];
};
