import { getCategories } from "@/actions/category";
import RecurringTransactionForm from "@/components/recurring-transaction-form";

export default async function RecurringPage() {
  const categories = await getCategories();

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Recurring Transactions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Automate regular expenses and income.
        </p>
      </div>

      <RecurringTransactionForm
        categories={categories}
      />
    </main>
  );
}