"use server"; 

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createSavingsGoal(
  title: string,
  target: number
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!title.trim()) {
    throw new Error("Title required");
  }

  if (!target || target <= 0) {
    throw new Error(
      "Target must be greater than 0"
    );
  }

  return prisma.savingsGoal.create({
    data: {
      title,
      target,
      current: 0,
      userId: session.user.id,
    },
  });
}

export async function getSavingsGoals() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.savingsGoal.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateSavingsGoal(
  goalId: string,
  amount: number
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const goal =
    await prisma.savingsGoal.findUnique({
      where: {
        id: goalId,
      },
    });

  if (!goal) {
    throw new Error("Goal not found");
  }

 return prisma.savingsGoal.update({
  where: {
    id: goalId,
  },
  data: {
    current:
      Number(goal.current) + amount,
  },
});
}