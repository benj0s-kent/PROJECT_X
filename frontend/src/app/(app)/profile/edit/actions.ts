"use server";

import { redirect } from "next/navigation";
import { updateCurrentUserProfile } from "@/services/user/user.service";

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveProfileAction(formData: FormData) {
  const name = getText(formData, "name");
  const faculty = getText(formData, "faculty");
  const about = getText(formData, "about");
  const interests = getText(formData, "interests")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);

  if (name.length < 2 || !faculty || about.length < 10) {
    redirect("/profile/edit?error=1");
  }

  await updateCurrentUserProfile({ name, faculty, about, interests });
  redirect("/profile");
}
