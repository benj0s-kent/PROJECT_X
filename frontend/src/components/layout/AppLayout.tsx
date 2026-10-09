import type { ReactNode } from "react";
import type { UserProfile } from "@/types/user";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import styles from "@/components/layout/app-layout.module.css";

type AppLayoutProps = {
  children: ReactNode;
  user: UserProfile;
};

export function AppLayout({ children, user }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <AppSidebar user={user} />

      <div className={styles.mainColumn}>
        <AppHeader user={user} />
        <div className={styles.content}>{children}</div>
      </div>

      <MobileNavigation />
    </div>
  );
}
