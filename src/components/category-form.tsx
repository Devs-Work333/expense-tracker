"use client";

import { useState } from "react";
import { createCategory } from "@/actions/category";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");

 const handleSubmit = async () => {
  const router = useRouter();
  const trimmedName = name.trim();

  if (!trimmedName) {
    alert("Category name is required");
    return;
  }

  try {
  await createCategory(trimmedName, type);
  setName("");
  router.refresh();
} catch (error) {
  alert(
    error instanceof Error
      ? error.message
      : "Something went wrong"
  );
}

  setName("");
};

  return (
    <div className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="w-full border rounded p-2"
      />

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value as "INCOME" | "EXPENSE")
        }
        className="w-full border rounded p-2"
      >
        <option value="EXPENSE">Expense</option>
        <option value="INCOME">Income</option>
      </select>

     <button
  onClick={handleSubmit}
  disabled={!name.trim()}
  className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
>
        Create Category
      </button>
    </div>
  );
}