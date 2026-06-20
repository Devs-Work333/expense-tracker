import Link from "next/link";
import { getCategories } from "@/actions/category";
import {
  getTransactions,
  getTransactionSummary,
  getCategoryAnalytics,
} from "@/actions/transaction";

import SummaryCards from "@/components/summary-cards";
import TransactionForm from "@/components/transaction-form";
import TransactionFilters from "@/components/transaction-filters";
import TransactionsTable from "@/components/transactions-table";
import CategoryChart from "@/components/category-chart";
import OverviewChart from "@/components/overview-chart";

type Props = {
  searchParams: Promise<{
    month?: string;
    type?: "INCOME" | "EXPENSE";
    date?: string;
    categoryId?: string;
    sort?: "latest" | "oldest" | "high" | "low";
    page?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const categories = await getCategories();

  const transactions = await getTransactions({
    month: params.month,
    type: params.type,
    date: params.date,
    categoryId: params.categoryId,
    sort: params.sort,
    page,
  });

  const summary = await getTransactionSummary(
    params.month,
    params.type
  );

  const analytics = await getCategoryAnalytics(
    params.month
  );

  return (
    <main className="space-y-8 p-8">
      {/* Hero Header */}
      <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
          Financial Command Center
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-slate-300">
          Manage your money with clarity.
        </p>
      </section>

      {/* Summary Cards */}
      <SummaryCards
        income={summary.income}
        expense={summary.expense}
        saving={summary.saving}
        balance={summary.balance}
      />

      {/* Quick Navigation */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/categories"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-500">
            Manage Categories
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            Add / Edit Categories
          </h3>
        </Link>

        <Link
          href="/recurring"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-500">
            Recurring Payments
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            Schedule Transactions
          </h3>
        </Link>

        <Link
          href="/goals"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-500">
            Savings Goals
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            Track Wealth Goals
          </h3>
        </Link>
      </section>

      {/* Quick Add Transaction */}
      <TransactionForm categories={categories} />

      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-2">
        <CategoryChart data={analytics} />

        <OverviewChart
          income={summary.income}
          expense={summary.expense}
          saving={summary.saving}
        />
      </section>

      {/* Filters */}
      <TransactionFilters categories={categories} />

      {/* Transactions */}
      <TransactionsTable
        transactions={transactions}
      />

      {/* Pagination */}
      <div className="flex justify-center">
        <Link
          href={`/dashboard?page=${page + 1}`}
          className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium"
        >
          Load next 10
        </Link>
      </div>
    </main>
  );
}