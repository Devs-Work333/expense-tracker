"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TransactionType } from "@prisma/client";

export async function createTransaction(
  amount: number,
  type: "INCOME" | "EXPENSE",
  categoryId: string,
  description?: string
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.transaction.create({
    data: {
      amount,
      type,
      categoryId,
      description: description?.trim(),
      userId: session.user.id,
      date: new Date(),
    },
  });
}

export async function getTransactions({
  month,
  type,
  date,
  categoryId,
  sort = "latest",
  page = 1,
}: {
  month?: string;
  type?: TransactionType;
  date?: string;
  categoryId?: string;
  sort?: "latest" | "oldest" | "high" | "low";
  page?: number;
} = {}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const orderBy =
    sort === "latest"
      ? { date: "desc" as const }
      : sort === "oldest"
      ? { date: "asc" as const }
      : sort === "high"
      ? { amount: "desc" as const }
      : { amount: "asc" as const };

  return prisma.transaction.findMany({
    where: {
      userId: session.user.id,

      ...(month && {
        date: {
          gte: new Date(`${month}-01`),
          lte: new Date(`${month}-31`),
        },
      }),

      ...(type && {
        type,
      }),

      ...(date && {
        date: {
          gte: new Date(date),
          lte: new Date(
            new Date(date).setHours(
              23,
              59,
              59
            )
          ),
        },
      }),

      ...(categoryId && {
        categoryId,
      }),
    },

    include: {
      category: true,
    },

    orderBy,

    take: 10,
    skip: (page - 1) * 10,
  });
}

export async function getTransactionSummary(
  month?: string,
  type?: TransactionType
) {
  const transactions =
    await getTransactions({
      month,
      type,
    });

  const income = transactions
    .filter(
      (transaction) =>
        transaction.type === "INCOME"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    );

  const expense = transactions
    .filter(
      (transaction) =>
        transaction.type === "EXPENSE"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    );


 const saving = 0;
 const balance = income - expense;

return {
  income,
  expense,
  balance,saving
};
}

export async function getCategoryAnalytics(
  month?: string
) {
  const transactions =
    await getTransactions({
      month,
    });

  const categoryMap = transactions.reduce(
    (acc, transaction) => {
      const name =
        transaction.category.name;

      acc[name] =
        (acc[name] || 0) +
        Number(transaction.amount);

      return acc;
    },
    {} as Record<string, number>
  );

  const total = Object.values(
    categoryMap
  ).reduce(
    (sum, value) => sum + value,
    0
  );

  return Object.entries(
    categoryMap
  ).map(([category, amount]) => ({
    category,
    amount,
    percentage: total
      ? Math.round(
          (amount / total) * 100
        )
      : 0,
  }));
}