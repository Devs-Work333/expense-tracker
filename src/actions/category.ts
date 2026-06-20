"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getCategories() {
  const session =
    await auth.api.getSession({
      headers: new Headers(),
    });

  if (!session?.user?.id) {
    return [];
  }

  return prisma.category.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}