import type {
  ActivityCategory,
  ActivityFormat,
  CreateActivityInput,
} from "@/types/activity";

export type ActivityFormValues = {
  title: string;
  category: ActivityCategory | "";
  description: string;
  date: string;
  time: string;
  format: ActivityFormat;
  place: string;
  maximumParticipants: string;
};

export type ActivityFormErrors = Partial<
  Record<keyof ActivityFormValues | "image", string>
>;

export const emptyActivityForm: ActivityFormValues = {
  title: "",
  category: "",
  description: "",
  date: "",
  time: "",
  format: "Офлайн",
  place: "",
  maximumParticipants: "2",
};

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function validateActivityImage(
  image: File | null,
): string | undefined {
  if (!image) {
    return undefined;
  }

  if (!image.type.startsWith("image/")) {
    return "Можно загрузить только изображение.";
  }

  if (image.size > MAX_IMAGE_SIZE) {
    return "Изображение должно быть не больше 5 МБ.";
  }

  return undefined;
}

export function validateActivityForm(
  values: ActivityFormValues,
  image: File | null,
): ActivityFormErrors {
  const errors: ActivityFormErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const place = values.place.trim();
  const maximumParticipants = Number(values.maximumParticipants);

  if (title.length < 5) {
    errors.title = "Минимум 5 символов.";
  } else if (title.length > 80) {
    errors.title = "Максимум 80 символов.";
  }

  if (!values.category) {
    errors.category = "Выбери категорию.";
  }

  if (description.length < 20) {
    errors.description = "Добавь хотя бы 20 символов описания.";
  } else if (description.length > 500) {
    errors.description = "Максимум 500 символов.";
  }

  if (!values.date) {
    errors.date = "Укажи дату.";
  }

  if (!values.time) {
    errors.time = "Укажи время.";
  }

  if (values.date && values.time) {
    const scheduledAt = new Date(`${values.date}T${values.time}`);

    if (Number.isNaN(scheduledAt.getTime())) {
      errors.date = "Не удалось прочитать дату и время.";
    } else if (scheduledAt.getTime() <= Date.now()) {
      errors.date = "Активность должна быть запланирована на будущее.";
    }
  }

  if (!place) {
    errors.place =
      values.format === "Онлайн"
        ? "Укажи площадку или ссылку."
        : "Укажи место встречи.";
  } else if (place.length > 100) {
    errors.place = "Максимум 100 символов.";
  }

  if (
    !Number.isInteger(maximumParticipants) ||
    maximumParticipants < 2 ||
    maximumParticipants > 50
  ) {
    errors.maximumParticipants = "Допустимо от 2 до 50 участников.";
  }

  const imageError = validateActivityImage(image);

  if (imageError) {
    errors.image = imageError;
  }

  return errors;
}

export function toCreateActivityInput(
  values: ActivityFormValues,
  image: File | null,
): CreateActivityInput {
  if (!values.category) {
    throw new Error("Activity category is required");
  }

  return {
    title: values.title.trim(),
    category: values.category,
    description: values.description.trim(),
    date: values.date,
    time: values.time,
    format: values.format,
    place: values.place.trim(),
    maximumParticipants: Number(values.maximumParticipants),
    image,
  };
}
