import { getCategories } from "@/actions/category";
import {
  getTransactions,
  getTransactionSummary,
  getCategoryAnalytics,
} from "@/actions/transaction";

export default async function DashboardPage() {
  const categories = await getCategories();

  const transactions = await getTransactions({
    page: 1,
  });

  const summary =
    await getTransactionSummary();

  const analytics =
    await getCategoryAnalytics();

  return (
    <main className="p-8">
      <h1>Dashboard</h1>

      <p>
        Categories: {categories.length}
      </p>

      <p>
        Transactions: {transactions.length}
      </p>

      <p>
        Income: {summary.income}
      </p>

      <p>
        Expense: {summary.expense}
      </p>

      <p>
        Saving: {summary.saving}
      </p>

      <p>
        Analytics Count:
        {analytics.length}
      </p>
    </main>
  );
}