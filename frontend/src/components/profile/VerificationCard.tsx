type VerificationCardProps = {
  completedActivities: number;
};

export function VerificationCard({
  completedActivities,
}: VerificationCardProps) {
  return (
    <section className="info-card verification-card">
      <h2>
        <span className="verification-symbol" aria-hidden="true">
          ✓
        </span>
        Подтверждённый студент
      </h2>

      <p>
        История участия пополняется
        <br />
        после совместных дел.
      </p>

      <p className="verification-count">
        Сейчас: {completedActivities} завершённых дела
      </p>
    </section>
  );
}
