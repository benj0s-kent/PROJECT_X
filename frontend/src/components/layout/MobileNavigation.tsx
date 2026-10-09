"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./app-layout.module.css";

const mobileItems = [
  { href: "/feed", label: "Лента" },
  { href: "/activities/create", label: "Создать" },
  { href: "/activity", label: "Активность" },
  { href: "/messages", label: "Сообщения" },
  { href: "/profile", label: "Профиль" },
];

export function MobileNavigation() {
  const pathname = usePathname() ?? "";

  return (
    <nav className={styles.mobileNavigation} aria-label="Мобильная навигация">
      {mobileItems.map((item) => {
        const isActive =
          item.href === "/feed"
            ? pathname === "/feed"
            : item.href === "/activities/create"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.mobileNavLink} ${
              isActive ? styles.mobileNavLinkActive : ""
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
