"use client";

import { useRouter } from "next/navigation";

type Props = {
  categories?: {
    id: string;
    name: string;
  }[];
};

export default function TransactionFilters({
  categories = [],
}: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <input
        type="date"
        onChange={(e) =>
          router.push(
            `/dashboard?date=${e.target.value}`
          )
        }
        className="rounded-xl border border-slate-200 px-4 py-2"
      />

      <select
        onChange={(e) =>
          router.push(
            `/dashboard?categoryId=${e.target.value}`
          )
        }
        className="rounded-xl border border-slate-200 px-4 py-2"
      >
        <option value="">
          All categories
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

      <select
        onChange={(e) =>
          router.push(
            `/dashboard?sort=${e.target.value}`
          )
        }
        className="rounded-xl border border-slate-200 px-4 py-2"
      >
        <option value="latest">
          Latest first
        </option>
        <option value="oldest">
          Oldest first
        </option>
        <option value="high">
          High amount
        </option>
        <option value="low">
          Low amount
        </option>
      </select>
    </div>
  );
}