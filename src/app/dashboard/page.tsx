import { getCategories } from "@/actions/category";
import { getTransactions } from "@/actions/transaction";

export default async function DashboardPage() {
  const categories = await getCategories();

  const transactions = await getTransactions({
    page: 1,
  });

  return (
    <main className="p-8">
      <h1>Dashboard</h1>

      <p>
        Categories: {categories.length}
      </p>

      <p>
        Transactions: {transactions.length}
      </p>
    </main>
  );
}