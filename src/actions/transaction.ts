"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TransactionType } from "@prisma/client";

export async function createTransaction(
  amount: number,
  type: TransactionType,
  categoryId: string,
  description?: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!amount || amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (!categoryId.trim()) {
    throw new Error("Category is required");
  }

  return prisma.transaction.create({
    data: {
      amount,
      type,
      categoryId,
      description: description?.trim(),
      userId: session.user.id,
    },
  });
}

export async function getTransactions(
  month?: string,
  type?: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  let startDate: Date | undefined;
  let endDate: Date | undefined;

  if (month) {
    startDate = new Date(`${month}-01`);
    endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
  }

  return prisma.transaction.findMany({
    where: {
      userId: session.user.id,
      ...(type && {
        type: type as any,
      }),
      ...(month && {
        date: {
          gte: startDate,
          lt: endDate,
        },
      }),
    },
    include: {
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getTransactionSummary(
  month?: string,
  type?: string
) {
  const transactions = await getTransactions(month, type);

  const income = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const saving = transactions
    .filter((t) => t.type === "SAVING")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense - saving;

  return {
    income,
    expense,
    saving,
    balance,
  };
}

export async function getCategoryAnalytics(
  month?: string
) {
  const transactions = await getTransactions(month);

  const grouped = transactions.reduce((acc, tx) => {
    const key = tx.category.name;

    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key] += tx.amount;

    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(
    ([name, amount]) => ({
      name,
      amount,
    })
  );
}