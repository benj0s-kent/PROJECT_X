import { ActivityCard } from "@/components/activity/ActivityCard";
import { AboutCard } from "@/components/profile/AboutCard";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { VerificationCard } from "@/components/profile/VerificationCard";
import type { Activity } from "@/types/activity";
import type { UserProfile } from "@/types/user";

type ProfileViewProps = {
  user: UserProfile;
  publications: Activity[];
  editable?: boolean;
};

export function ProfileView({ user, publications, editable = false }: ProfileViewProps) {
  return (
    <main className="profile-page">
      <ProfileHeader user={user} editable={editable} />

      <section className="profile-stat-grid" aria-label="Статистика профиля">
        <div className="profile-stat-card">
          <strong>{user.publicationsCount}</strong>
          <span>публикации</span>
        </div>
        <div className="profile-stat-card">
          <strong>{user.activeActivities}</strong>
          <span>активные</span>
        </div>
        <div className="profile-stat-card">
          <strong>{user.completedActivities}</strong>
          <span>завершённые</span>
        </div>
        <div className="profile-stat-card">
          <strong>{user.joinedActivities}</strong>
          <span>участия</span>
        </div>
      </section>

      <div className="profile-info">
        <AboutCard user={user} />
        <VerificationCard completedActivities={user.completedActivities} />
      </div>

      <section className="activities-section" id="profile-activities">
        <h2>{editable ? "Мои публикации" : "Публикации"}</h2>

        {publications.length > 0 ? (
          <div className="activities-grid">
            {publications.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} variant="profile" />
            ))}
          </div>
        ) : (
          <div className="profile-empty-state">
            <strong>Публикаций пока нет</strong>
            <p>Когда пользователь создаст активность, она появится здесь.</p>
          </div>
        )}
      </section>
    </main>
  );
}
