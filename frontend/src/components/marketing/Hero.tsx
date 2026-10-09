import { ActivityCard } from "@/components/activity/ActivityCard";
import { Button } from "@/components/ui/Button";
import type { Activity } from "@/types/activity";

type HeroProps = {
  activities: Activity[];
};

export function Hero({ activities }: HeroProps) {
  return (
    <main className="main-container">
      <section className="hero-left">
        <div className="badge">Только для КГУ</div>

        <h1>
          Всегда есть с кем
          <br />
          заняться делом
        </h1>

        <p className="hero-desc">
          Спорт, учёба, прогулки, игры и проекты —
          <br />
          с конкретным временем, местом и людьми.
        </p>

        <div className="cta-group">
          <Button href="/feed">Открыть ленту</Button>
          <Button variant="secondary" href="/activities/create">
            Создать активность
          </Button>
        </div>

        <div className="verification">
          <span className="check-icon" aria-hidden="true">
            ✓
          </span>
          <span>Только подтверждённые студенты КГУ</span>
        </div>
      </section>

      <section className="hero-right" aria-label="Примеры активностей">
        <div className="gradient-circle">
          {activities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              variant="showcase"
              showcasePosition={index === 0 ? "primary" : "secondary"}
            >
              {index === 0 && (
                <Button href={`/activities/${activity.id}`} size="compact">
                  Присоединиться
                </Button>
              )}
            </ActivityCard>
          ))}
        </div>
      </section>
    </main>
  );
}
