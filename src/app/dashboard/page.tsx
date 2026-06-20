import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import CategoryForm from "@/components/category-form";
import TransactionForm from "@/components/transaction-form";
import SummaryCards from "@/components/summary-cards";
import TransactionList from "@/components/transaction-list";
import TransactionFilters from "@/components/transaction-filters";
import CategoryChart from "@/components/category-chart";
import OverviewChart from "@/components/overview-chart";

import { getCategories } from "@/actions/category";
import {
  getTransactions,
  getTransactionSummary,
  getCategoryAnalytics,
} from "@/actions/transaction";

type Props = {
  searchParams: Promise<{
    month?: string;
    type?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect dashboard route
  if (!session) {
    redirect("/login");
  }

  // Next.js 15 async searchParams
  const params = await searchParams;

  const month = params.month;
  const type = params.type;

  // Fetch data
  const categories = await getCategories();

  const transactions = await getTransactions(
    month,
    type
  );

  const summary = await getTransactionSummary(
    month,
    type
  );

  const analytics = await getCategoryAnalytics(
    month
  );

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {session.user.name}
          </h1>
          <p className="text-muted-foreground">
            Manage your expenses, savings and income
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          income={summary.income}
          expense={summary.expense}
          saving={summary.saving}
          balance={summary.balance}
        />

        {/* Charts */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Category Breakdown
            </h2>

            <CategoryChart data={analytics} />
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Financial Overview
            </h2>

            <OverviewChart
              income={summary.income}
              expense={summary.expense}
              saving={summary.saving}
            />
          </div>
        </section>

        {/* Category Form */}
        <section className="rounded-lg border p-6">
          <CategoryForm />
        </section>

        {/* Transaction Form */}
        <section className="rounded-lg border p-6">
          <TransactionForm categories={categories} />
        </section>

        {/* Filters */}
        <section className="rounded-lg border p-6">
          <TransactionFilters />
        </section>

        {/* Transactions List */}
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Transaction History
          </h2>

          <TransactionList transactions={transactions} />
        </section>
      </div>
    </main>
  );
}