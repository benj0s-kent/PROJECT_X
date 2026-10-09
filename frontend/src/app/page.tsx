import { WelcomeHeader } from "@/components/marketing/WelcomeHeader";
import { Hero } from "@/components/marketing/Hero";
import { getWelcomeActivities } from "@/services/activity/activity.service";

export default async function WelcomePage() {
  const activities = await getWelcomeActivities();

  return (
    <div className="welcome-page">
      <WelcomeHeader />
      <Hero activities={activities} />
    </div>
  );
}
