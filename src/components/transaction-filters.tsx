"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TransactionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const month = searchParams.get("month") || "";
  const type = searchParams.get("type") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="flex gap-4">
      <input
        type="month"
        value={month}
        onChange={(e) =>
          updateFilter("month", e.target.value)
        }
        className="rounded border p-2"
      />

      <select
        value={type}
        onChange={(e) =>
          updateFilter("type", e.target.value)
        }
        className="rounded border p-2"
      >
        <option value="">All Types</option>
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
        <option value="SAVING">Saving</option>
      </select>
    </div>
  );
}