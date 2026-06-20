"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TransactionType } from "@prisma/client";

export async function createCategory(
  name: string,
  type: TransactionType
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Category name is required");
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: trimmedName,
      type,
      userId: session.user.id,
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return prisma.category.create({
    data: {
      name: trimmedName,
      type,
      userId: session.user.id,
    },
  });
}

export async function getCategories() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
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