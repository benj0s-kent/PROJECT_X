import Link from "next/link";
import { saveProfileAction } from "@/app/(app)/profile/edit/actions";
import { getCurrentUser } from "@/services/user/user.service";
import { ProfileSubmitButton } from "@/components/profile/ProfileSubmitButton";

type EditProfilePageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function EditProfilePage({ searchParams }: EditProfilePageProps) {
  const [user, params] = await Promise.all([getCurrentUser(), searchParams]);

  return (
    <main className="profile-edit-page">
      <Link href="/profile" className="profile-back-link">
        ← Назад в профиль
      </Link>

      <div className="profile-edit-heading">
        <div className="profile-avatar profile-edit-avatar">{user.initial}</div>
        <div>
          <h2>Редактирование профиля</h2>
          <p>Обнови данные, которые видят другие студенты.</p>
        </div>
      </div>

      {params.error && (
        <p className="profile-edit-error" role="alert">
          Проверь имя, факультет и описание профиля.
        </p>
      )}

      <form action={saveProfileAction} className="profile-edit-form">
        <label>
          <span>Имя</span>
          <input name="name" defaultValue={user.name} minLength={2} maxLength={60} required />
        </label>

        <label>
          <span>Факультет и курс</span>
          <input name="faculty" defaultValue={user.faculty} maxLength={80} required />
        </label>

        <label>
          <span>О себе</span>
          <textarea name="about" defaultValue={user.about} minLength={10} maxLength={500} required />
        </label>

        <label>
          <span>Интересы через запятую</span>
          <input name="interests" defaultValue={user.interests.join(", ")} maxLength={160} />
        </label>

        <div className="profile-edit-actions">
          <ProfileSubmitButton />
          <Link href="/profile">Отмена</Link>
        </div>
      </form>
    </main>
  );
}
