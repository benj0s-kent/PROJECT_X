import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function WelcomeHeader() {
  return (
    <header className="welcome-header">
      <Link className="logo" href="/" aria-label="KENT — главная">
        <span className="logo-icon">K</span>
        <span>KENT</span>
      </Link>

      <nav aria-label="Навигация">
        <Link href="/feed">Лента</Link>
        <Link href="/activities/create">Создать</Link>
        <Link href="/messages">Сообщения</Link>
        <Link href="/profile">Профиль</Link>
      </nav>

      <Button href="/feed">Открыть ленту</Button>
    </header>
  );
}
