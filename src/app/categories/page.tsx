import { getCategories } from "@/actions/category";
import CategoryForm from "@/components/category-form";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Categories
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Organize your income and expenses.
        </p>
      </div>

      <CategoryForm />

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <p className="font-medium text-slate-800">
              {category.name}
            </p>

            <p className="text-sm text-slate-500">
              {category.type}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}