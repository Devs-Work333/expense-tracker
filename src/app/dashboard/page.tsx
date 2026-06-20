import { getCategories } from "@/actions/category";

export default async function DashboardPage() {
  try {
    const categories = await getCategories();

    return (
      <main className="p-8">
        <h1>Dashboard working</h1>
        <p>Categories count: {categories.length}</p>
      </main>
    );
  } catch (error) {
    console.error("CATEGORY ERROR:", error);

    return (
      <main className="p-8">
        <h1>Category failed</h1>
      </main>
    );
  }
}