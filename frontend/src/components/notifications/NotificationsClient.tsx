"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AppNotification, NotificationType } from "@/types/notification";
import styles from "./notifications.module.css";

type NotificationsClientProps = {
  notifications: AppNotification[];
};

const typeMeta: Record<NotificationType, { icon: string; label: string }> = {
  like: { icon: "♥", label: "Лайк" },
  comment: { icon: "💬", label: "Комментарий" },
  join: { icon: "+", label: "Участник" },
  system: { icon: "✓", label: "Система" },
};

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

const dateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function formatNotificationDate(value: string) {
  const date = new Date(value);
  const sameDay = date.toDateString() === new Date().toDateString();

  return (sameDay ? timeFormatter : dateTimeFormatter).format(date);
}

export function NotificationsClient({ notifications }: NotificationsClientProps) {
  const [items, setItems] = useState(notifications);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const visibleItems = useMemo(
    () => (showUnreadOnly ? items.filter((item) => !item.read) : items),
    [items, showUnreadOnly],
  );

  const unreadCount = useMemo(
    () => items.reduce((count, item) => count + (item.read ? 0 : 1), 0),
    [items],
  );

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  }

  function markRead(id: string) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  return (
    <section className={styles.page} aria-labelledby="activity-heading">
      <div className={styles.header}>
        <div>
          <h2 id="activity-heading">Активность</h2>
          <p>Лайки, комментарии, новые участники и системные события.</p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={`${styles.filterButton} ${showUnreadOnly ? styles.filterButtonActive : ""}`}
            aria-pressed={showUnreadOnly}
            onClick={() => setShowUnreadOnly((current) => !current)}
          >
            Непрочитанные {unreadCount > 0 ? `(${unreadCount})` : ""}
          </button>

          <button
            type="button"
            className={styles.markReadButton}
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            Прочитать все
          </button>
        </div>
      </div>

      {visibleItems.length > 0 ? (
        <div className={styles.list}>
          {visibleItems.map((notification) => {
            const meta = typeMeta[notification.type];

            return (
              <article
                key={notification.id}
                className={`${styles.item} ${notification.read ? "" : styles.unread}`}
              >
                <div className={styles.typeIcon} aria-label={meta.label}>
                  {meta.icon}
                </div>

                <div className={styles.content}>
                  <p className={styles.message}>
                    {notification.actor ? (
                      <>
                        <Link href={`/users/${notification.actor.id}`} className={styles.actorLink}>
                          {notification.actor.name}
                        </Link>{" "}
                        {notification.message}
                      </>
                    ) : (
                      notification.message
                    )}
                  </p>

                  {notification.activity && (
                    <Link
                      href={`/activities/${notification.activity.id}`}
                      className={styles.activityLink}
                    >
                      {notification.activity.title}
                    </Link>
                  )}

                  <time dateTime={notification.createdAt} className={styles.date}>
                    {formatNotificationDate(notification.createdAt)}
                  </time>
                </div>

                {!notification.read && (
                  <button
                    type="button"
                    className={styles.readButton}
                    onClick={() => markRead(notification.id)}
                  >
                    Прочитано
                  </button>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>Здесь пока тихо</strong>
          <p>
            {showUnreadOnly
              ? "Непрочитанных уведомлений нет."
              : "Когда кто-то отреагирует на публикацию или присоединится к активности, событие появится здесь."}
          </p>
        </div>
      )}
    </section>
  );
}
