"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Frequency,
  TransactionType,
} from "@prisma/client";

export async function createRecurringTransaction(
  amount: number,
  type: TransactionType,
  categoryId: string,
  frequency: Frequency,
  description?: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) { 
    throw new Error("Unauthorized");
  }

  if (!amount || amount <= 0) {
    throw new Error(
      "Amount must be greater than 0"
    );
  }

  return prisma.recurringTransaction.create({
    data: {
      amount,
      type,
      categoryId,
      frequency,
      description: description?.trim(),
      userId: session.user.id,
    },
  });
}

export async function getRecurringTransactions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.recurringTransaction.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}