import { notFound } from "next/navigation";
import { ProfileView } from "@/components/profile/ProfileView";
import { getUserPublications } from "@/services/activity/activity.service";
import { getUserById } from "@/services/user/user.service";

type UserPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const publications = await getUserPublications(user.id);

  return <ProfileView user={user} publications={publications} />;
}
