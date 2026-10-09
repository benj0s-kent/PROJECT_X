"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useImagePreview } from "@/components/activity/use-image-preview";
import { ApiError } from "@/services/api/client";
import { createActivity } from "@/services/activity/activity.service";
import type { ActivityCategory, ActivityFormat } from "@/types/activity";
import {
  emptyActivityForm,
  toCreateActivityInput,
  validateActivityForm,
  validateActivityImage,
  type ActivityFormErrors,
  type ActivityFormValues,
} from "@/components/activity/activity-form";
import styles from "@/components/activity/create-activity-form.module.css";

const categories: ActivityCategory[] = [
  "Спорт",
  "Учёба",
  "Проект",
  "Прогулка",
  "Игры",
];

const formats: ActivityFormat[] = ["Офлайн", "Онлайн"];

export function CreateActivityForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<ActivityFormValues>(emptyActivityForm);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<ActivityFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const previewUrl = useImagePreview(image);

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const field = event.target.name as keyof ActivityFormValues;
    const value = event.target.value;

    setValues((current) => ({
      ...current,
      [field]: value,
    }) as ActivityFormValues);

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
    setSubmitError(null);
    setSuccessMessage(null);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const nextImage = event.target.files?.[0] ?? null;
    const imageError = validateActivityImage(nextImage);

    setImage(imageError ? null : nextImage);
    setErrors((current) => ({
      ...current,
      image: imageError,
    }));
    setSubmitError(null);
    setSuccessMessage(null);

    if (imageError && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateActivityForm(values, image);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError("Проверь отмеченные поля перед публикацией.");
      setSuccessMessage(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const createdActivity = await createActivity(
        toCreateActivityInput(values, image),
      );

      setSuccessMessage(
        `Активность «${createdActivity.title}» опубликована.`,
      );
      setValues(emptyActivityForm);
      setImage(null);
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      const message =
        error instanceof ApiError
          ? `Backend вернул ошибку ${error.status}. Попробуй ещё раз.`
          : "Не удалось опубликовать активность. Проверь соединение и повтори попытку.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setValues(emptyActivityForm);
    setImage(null);
    setErrors({});
    setSubmitError(null);
    setSuccessMessage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    router.push("/feed");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <div className={styles.field}>
        <label htmlFor="activity-title" className={styles.label}>
          Название активности
        </label>
        <input
          id="activity-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleFieldChange}
          placeholder="Например: кто хочет сегодня погулять?"
          className={styles.input}
          maxLength={80}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "activity-title-error" : undefined}
          disabled={isSubmitting}
        />
        {errors.title ? (
          <p id="activity-title-error" className={styles.errorText}>
            {errors.title}
          </p>
        ) : (
          <p className={styles.hint}>От 5 до 80 символов.</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="activity-category" className={styles.label}>
          Категория
        </label>
        <select
          id="activity-category"
          name="category"
          className={styles.input}
          value={values.category}
          onChange={handleFieldChange}
          aria-invalid={Boolean(errors.category)}
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Выбери категорию
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className={styles.errorText}>{errors.category}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="activity-description" className={styles.label}>
          Описание
        </label>
        <textarea
          id="activity-description"
          name="description"
          value={values.description}
          onChange={handleFieldChange}
          placeholder="Расскажи подробнее, кого ищешь и чем планируете заниматься."
          className={styles.textarea}
          maxLength={500}
          aria-invalid={Boolean(errors.description)}
          disabled={isSubmitting}
        />
        {errors.description ? (
          <p className={styles.errorText}>{errors.description}</p>
        ) : (
          <p className={styles.hint}>От 20 до 500 символов.</p>
        )}
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor="activity-date" className={styles.label}>
            Дата
          </label>
          <input
            id="activity-date"
            name="date"
            type="date"
            className={styles.input}
            value={values.date}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.date)}
            disabled={isSubmitting}
          />
          {errors.date && <p className={styles.errorText}>{errors.date}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="activity-time" className={styles.label}>
            Время
          </label>
          <input
            id="activity-time"
            name="time"
            type="time"
            className={styles.input}
            value={values.time}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.time)}
            disabled={isSubmitting}
          />
          {errors.time && <p className={styles.errorText}>{errors.time}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="activity-format" className={styles.label}>
          Формат
        </label>
        <select
          id="activity-format"
          name="format"
          className={styles.input}
          value={values.format}
          onChange={handleFieldChange}
          disabled={isSubmitting}
        >
          {formats.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="activity-place" className={styles.label}>
          {values.format === "Онлайн" ? "Площадка / ссылка" : "Место"}
        </label>
        <input
          id="activity-place"
          name="place"
          type="text"
          value={values.place}
          onChange={handleFieldChange}
          placeholder={
            values.format === "Онлайн"
              ? "Например: Discord"
              : "Например: центр Казани"
          }
          className={styles.input}
          maxLength={100}
          aria-invalid={Boolean(errors.place)}
          disabled={isSubmitting}
        />
        {errors.place && <p className={styles.errorText}>{errors.place}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="activity-participants" className={styles.label}>
          Максимальное количество участников
        </label>
        <input
          id="activity-participants"
          name="maximumParticipants"
          type="number"
          className={styles.input}
          min={2}
          max={50}
          value={values.maximumParticipants}
          onChange={handleFieldChange}
          aria-invalid={Boolean(errors.maximumParticipants)}
          disabled={isSubmitting}
        />
        {errors.maximumParticipants && (
          <p className={styles.errorText}>{errors.maximumParticipants}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="activity-image" className={styles.label}>
          Изображение
        </label>
        <input
          ref={fileInputRef}
          id="activity-image"
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className={styles.fileInput}
          onChange={handleImageChange}
          disabled={isSubmitting}
        />
        <p className={styles.hint}>PNG, JPG, WEBP или GIF, до 5 МБ.</p>
        {errors.image && <p className={styles.errorText}>{errors.image}</p>}

        {previewUrl && (
          <div className={styles.imagePreview}>
            <Image
              src={previewUrl}
              alt="Предпросмотр изображения активности"
              fill
              sizes="(max-width: 600px) 100vw, 620px"
              unoptimized
            />
          </div>
        )}
      </div>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      {successMessage && (
        <p className={styles.successMessage} role="status">
          {successMessage}
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Публикуем…" : "Опубликовать"}
        </button>

        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
