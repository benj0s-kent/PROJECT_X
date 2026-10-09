"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserProfile } from "@/types/user";
import styles from "./app-layout.module.css";

type AppHeaderProps = {
  user: UserProfile;
};

function getRouteTitle(pathname: string) {
  if (pathname === "/feed") return "Лента";
  if (pathname === "/activities/create") return "Создание активности";
  if (pathname.startsWith("/activities/")) return "Активность";
  if (pathname === "/profile") return "Профиль";
  if (pathname.startsWith("/profile/")) return "Профиль";
  if (pathname === "/activity") return "Активность";
  if (pathname === "/messages") return "Сообщения";
  if (pathname.startsWith("/users/")) return "Профиль";
  return "KENT";
}

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname() ?? "";
  const showCreateButton = pathname !== "/activities/create";

  return (
    <header className={styles.topbar}>
      <Link href="/" className={styles.mobileBrand} aria-label="KENT — главная">
        <span className={styles.mobileBrandIcon}>K</span>
        <span>KENT</span>
      </Link>

      <h1 className={styles.routeTitle}>{getRouteTitle(pathname)}</h1>

      <div className={styles.topbarActions}>
        {showCreateButton && (
          <Link href="/activities/create" className={styles.createLink}>
            Создать
          </Link>
        )}

        <Link
          href="/profile"
          className={styles.headerAvatar}
          aria-label="Открыть профиль"
        >
          {user.initial}
        </Link>
      </div>
    </header>
  );
}
