import type { UserProfile } from "@/types/user";

type AboutCardProps = {
  user: UserProfile;
};

export function AboutCard({ user }: AboutCardProps) {
  return (
    <section className="info-card about-card">
      <h2>О себе</h2>

      <p>{user.about}</p>

      <div className="interest-tags">
        {user.interests.map((interest) => (
          <span
            key={interest}
            className={interest === "Спорт" ? "interest-sport" : undefined}
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  );
}
