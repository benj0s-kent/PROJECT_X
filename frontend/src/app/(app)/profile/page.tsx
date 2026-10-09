import { ProfileView } from "@/components/profile/ProfileView";
import { getProfileActivities } from "@/services/activity/activity.service";
import { getCurrentUser } from "@/services/user/user.service";

export default async function ProfilePage() {
  const [user, publications] = await Promise.all([
    getCurrentUser(),
    getProfileActivities(),
  ]);

  return <ProfileView user={user} publications={publications} editable />;
}
