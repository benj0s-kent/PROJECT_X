import { Button } from "@/components/ui/Button";
import type { UserProfile } from "@/types/user";

type ProfileHeaderProps = {
  user: UserProfile;
  editable?: boolean;
};

export function ProfileHeader({ user, editable = false }: ProfileHeaderProps) {
  return (
    <section className="profile-header">
      <div className="profile-avatar" aria-label={`Аватар ${user.name}`}>
        {user.initial}
      </div>

      <div className="profile-identity">
        <h2>{user.name}</h2>
        <p>{user.faculty}</p>

        {user.verified && (
          <p className="profile-confirmed">
            <span aria-hidden="true">✓</span>
            Студент КГУ подтверждён
          </p>
        )}
      </div>

      {editable && (
        <Button variant="secondary" href="/profile/edit">
          Редактировать
        </Button>
      )}
    </section>
  );
}
