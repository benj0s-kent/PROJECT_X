"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserProfile } from "@/types/user";
import {
  appNavigation,
  isNavigationItemActive,
} from "./navigation";
import styles from "./app-layout.module.css";

type AppSidebarProps = {
  user: UserProfile;
};

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname() ?? "";

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logo} aria-label="KENT — главная">
        <span className={styles.logoIcon}>K</span>
        <span>KENT</span>
      </Link>

      <p className={styles.caption}>Совместные дела</p>

      <nav className={styles.nav} aria-label="Основная навигация">
        {appNavigation.map((item) => {
          const isActive = isNavigationItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                isActive ? styles.navLinkActive : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={styles.navDot} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link href="/profile" className={styles.userLink}>
        <span className={styles.avatar}>{user.initial}</span>
        <span>
          <strong className={styles.userName}>{user.name}</strong>
          <small className={styles.userFaculty}>{user.faculty}</small>
        </span>
      </Link>
    </aside>
  );
}
