"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Frequency,
  TransactionType,
} from "@prisma/client";

import { createRecurringTransaction } from "@/actions/recurring";

type Category = {
  id: string;
  name: string;
  type: TransactionType;
};

type Props = {
  categories: Category[];
};

export default function RecurringForm({
  categories,
}: Props) {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [frequency, setFrequency] =
    useState<Frequency>("MONTHLY");

  const selectedCategory = categories.find(
    (c) => c.id === categoryId
  );

  const handleSubmit = async () => {
    if (!amount || !categoryId) {
      alert("Amount and category required");
      return;
    }

    await createRecurringTransaction(
      Number(amount),
      selectedCategory?.type ||
        TransactionType.EXPENSE,
      categoryId,
      frequency,
      description
    );

    setAmount("");
    setCategoryId("");
    setDescription("");

    router.refresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Add Recurring Transaction
      </h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="w-full rounded border p-2"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full rounded border p-2"
      />

      <select
        value={categoryId}
        onChange={(e) =>
          setCategoryId(e.target.value)
        }
        className="w-full rounded border p-2"
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={frequency}
        onChange={(e) =>
          setFrequency(
            e.target.value as Frequency
          )
        }
        className="w-full rounded border p-2"
      >
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
      </select>

      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Create Recurring
      </button>
    </div>
  );
}