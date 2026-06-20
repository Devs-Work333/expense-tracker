"use client";

import { useState } from "react";
import { createTransaction } from "@/actions/transaction";
import { TransactionType } from "@prisma/client";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  type: TransactionType;
};

type Props = {
  categories: Category[];
};

export default function TransactionForm({ categories }: Props) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  const handleSubmit = async () => {
  if (!amount || !categoryId) {
    alert("Amount and category are required");
    return;
  }

  try {
    await createTransaction(
      Number(amount),
      selectedCategory?.type || TransactionType.EXPENSE,
      categoryId,
      description
    );

    setAmount("");
    setDescription("");
    setCategoryId("");

    router.refresh();
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  }
};

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      {/* Amount */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded border p-2"
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded border p-2"
      />

      {/* Category */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} ({category.type})
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!amount || !categoryId}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        Create Transaction
      </button>
    </div>
  );
}