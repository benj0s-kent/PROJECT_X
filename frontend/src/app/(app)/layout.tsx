import type { ReactNode } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { getCurrentUser } from "@/services/user/user.service";

export default async function ApplicationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();

  return <AppLayout user={user}>{children}</AppLayout>;
}
