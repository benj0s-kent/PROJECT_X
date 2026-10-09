"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState, type FormEvent } from "react";
import { CategoryBadge } from "@/components/activity/CategoryBadge";
import type { Activity } from "@/types/activity";
import styles from "./feed-post-card.module.css";

type FeedPostCardProps = {
  activity: Activity;
  onHide: (id: string) => void;
};

const publishedAtFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function formatPublishedAt(value: string) {
  return publishedAtFormatter.format(new Date(value));
}

export const FeedPostCard = memo(function FeedPostCard({ activity, onHide }: FeedPostCardProps) {
  const [liked, setLiked] = useState(Boolean(activity.likedByCurrentUser));
  const [likesCount, setLikesCount] = useState(activity.likesCount);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [newComments, setNewComments] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState("");

  function handleLike() {
    setLiked((current) => !current);
    setLikesCount((current) => current + (liked ? -1 : 1));
  }

  function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = commentText.trim();

    if (!normalized) return;

    setNewComments((current) => [...current, normalized]);
    setCommentText("");
  }

  async function handleCopyLink() {
    const url = `${window.location.origin}/activities/${activity.id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopyMessage("Ссылка скопирована");
    } catch {
      setCopyMessage("Не удалось скопировать");
    }
  }

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <Link href={`/users/${activity.author.id}`} className={styles.author}>
          <span className={styles.avatar}>{activity.author.initial}</span>
          <span className={styles.authorText}>
            <strong>{activity.author.name}</strong>
            <small>{activity.author.faculty}</small>
          </span>
        </Link>

        <div className={styles.headerMeta}>
          <time dateTime={activity.publishedAt}>
            {formatPublishedAt(activity.publishedAt)}
          </time>

          <details className={styles.menu}>
            <summary aria-label="Меню публикации">•••</summary>
            <div className={styles.menuPanel}>
              <Link href={`/activities/${activity.id}`}>Открыть публикацию</Link>
              <button type="button" onClick={handleCopyLink}>
                Скопировать ссылку
              </button>
              <button type="button" onClick={() => onHide(activity.id)}>
                Скрыть публикацию
              </button>
              {copyMessage && <small role="status">{copyMessage}</small>}
            </div>
          </details>
        </div>
      </header>

      {activity.imageUrl && (
        <div className={styles.imageWrap}>
          <Image
            src={activity.imageUrl}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 900px"
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}

      <div className={styles.content}>
        <CategoryBadge category={activity.category} />
        <Link href={`/activities/${activity.id}`} className={styles.titleLink}>
          <h2>{activity.title}</h2>
        </Link>
        <p className={styles.summary}>{activity.summary}</p>

        <div className={styles.activityMeta}>
          <span>{activity.shortDate}</span>
          <span>{activity.shortPlace}</span>
          <span>
            {activity.participants.current}/{activity.participants.maximum} участников
          </span>
        </div>
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={`${styles.actionButton} ${liked ? styles.actionButtonActive : ""}`}
          aria-pressed={liked}
          onClick={handleLike}
        >
          ♥ {likesCount}
        </button>

        <button
          type="button"
          className={styles.actionButton}
          aria-expanded={commentsOpen}
          onClick={() => setCommentsOpen((current) => !current)}
        >
          Комментарии {activity.commentsCount + newComments.length}
        </button>

        <Link href={`/activities/${activity.id}`} className={styles.openLink}>
          Подробнее
        </Link>
      </footer>

      {commentsOpen && (
        <section className={styles.comments} aria-label="Комментарии">
          {activity.commentsCount > 0 && (
            <p className={styles.existingComments}>
              До вашего ответа здесь уже было комментариев: {activity.commentsCount}.
            </p>
          )}

          {activity.commentsCount === 0 && newComments.length === 0 && (
            <p className={styles.commentsEmpty}>Комментариев пока нет — можно быть первым.</p>
          )}

          {newComments.map((comment, index) => (
            <div className={styles.comment} key={`${comment}-${index}`}>
              <strong>Вы</strong>
              <p>{comment}</p>
            </div>
          ))}

          <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
            <label htmlFor={`comment-${activity.id}`} className={styles.visuallyHidden}>
              Комментарий
            </label>
            <input
              id={`comment-${activity.id}`}
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Написать комментарий…"
              maxLength={280}
            />
            <button type="submit" disabled={!commentText.trim()}>
              Отправить
            </button>
          </form>
        </section>
      )}
    </article>
  );
});
