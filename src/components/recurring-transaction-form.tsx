"use client";

import { useState } from "react";
import { createRecurringTransaction } from "@/actions/recurring";
import {
  TransactionType,
  Frequency,
} from "@prisma/client";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
};

export default function RecurringTransactionForm({
  categories,
}: Props) {
  const [amount, setAmount] = useState("");
 const [frequency, setFrequency] =
  useState<Frequency>(
    Frequency.MONTHLY
  );

  const [categoryId, setCategoryId] =
  useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!amount) {
      alert("Amount is required");
      return;
    }

   await createRecurringTransaction(
  Number(amount),
  TransactionType.EXPENSE,
  categoryId,
  frequency,
  description
);

    setAmount("");
    setFrequency("MONTHLY");
    setDescription("");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Add Recurring Transaction
      </h2>

      <div className="mt-4 space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        <select
          value={frequency}
          onChange={(e) =>
  setFrequency(
    e.target.value as Frequency
  )
}
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
        
        
        <select
  value={categoryId}
  onChange={(e) =>
    setCategoryId(e.target.value)
  }
  className="w-full rounded-xl border border-slate-200 px-4 py-3"
>
  <option value="">
    Select Category
  </option>

  {categories.map((category) => (
    <option
      key={category.id}
      value={category.id}
    >
      {category.name}
    </option>
  ))}
</select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3"
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white"
        >
          Save Recurring
        </button>
      </div>
    </div>
  );
}