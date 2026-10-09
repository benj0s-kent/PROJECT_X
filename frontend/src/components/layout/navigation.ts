export const appNavigation = [
  { href: "/feed", label: "Лента" },
  { href: "/activities/create", label: "Создать" },
  { href: "/activity", label: "Активность" },
  { href: "/profile#profile-activities", label: "Мои активности" },
  { href: "/messages", label: "Сообщения" },
  { href: "/profile", label: "Профиль" },
] as const;

export function isNavigationItemActive(pathname: string, href: string) {
  const cleanHref = href.split("#")[0];

  if (cleanHref === "/feed") {
    return pathname === "/feed";
  }

  if (cleanHref === "/activities/create") {
    return pathname === "/activities/create";
  }

  if (href.includes("#profile-activities")) {
    return false;
  }

  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}
