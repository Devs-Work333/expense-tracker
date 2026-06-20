import { getCategories } from "@/actions/category";

export default async function DashboardPage() {
  const categories = await getCategories();

  return (
    <main className="p-8">
      <h1>Dashboard</h1>
      <p>Categories: {categories.length}</p>
    </main>
  );
}