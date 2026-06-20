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

export default function TransactionForm({
  categories,
}: Props) {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [description, setDescription] =
    useState("");
  const [categoryId, setCategoryId] =
    useState("");

  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  const handleSubmit = async () => {
    if (!amount || !categoryId) {
      alert("Amount and category required");
      return;
    }

   if (
  !selectedCategory ||
  selectedCategory.type ===
    TransactionType.SAVING
) {
  alert(
    "Please select Income or Expense category"
  );
  return;
}

await createTransaction(
  Number(amount),
  selectedCategory.type as
    "INCOME" | "EXPENSE",
  categoryId,
  description
);

    setAmount("");
    setDescription("");
    setCategoryId("");

    router.refresh();
  };

  return (
    <section
      className="
        relative overflow-hidden
        rounded-[34px]
        border border-white/60
        bg-gradient-to-br
        from-white
        via-slate-50
        to-slate-100
        p-7
        shadow-[0_20px_60px_rgba(15,23,42,0.06)]
        backdrop-blur-xl
      "
    >
      {/* Ambient glow */}
      <div className="absolute -top-14 -right-14 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute -bottom-14 -left-14 h-40 w-40 rounded-full bg-violet-100/40 blur-3xl" />

      {/* Header */}
      <div className="relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          Smart Entry
        </p>

        <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-slate-900">
          Add a Transaction
        </h2>

        <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
          Designed for speed. Tap a category, enter an amount, and keep moving.
        </p>
      </div>

      {/* Amount input */}
      <div className="relative z-10 mt-8 rounded-[28px] border border-white/70 bg-white/80 px-6 py-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-medium text-slate-400">
            ₹
          </span>

          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="
              w-full border-none bg-transparent
              text-5xl font-semibold tracking-[-0.04em]
              text-slate-900 outline-none
              placeholder:text-slate-300
            "
          />
        </div>
      </div>

      {/* Category selector */}
      <div className="relative z-10 mt-8">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Select category
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const active =
              categoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setCategoryId(category.id)
                }
                className={`
                  rounded-full px-5 py-2.5
                  text-[13px] font-medium tracking-[0.02em]
                  transition-all duration-300
                  ${
                    active
                      ? "bg-slate-900 text-white shadow-lg"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }
                `}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional note */}
      <div className="relative z-10 mt-7">
        <input
          type="text"
          placeholder="Add a note (optional)"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="
            w-full rounded-[22px]
            border border-white/80
            bg-white/70
            px-5 py-4
            text-[14px]
            text-slate-700
            shadow-[0_6px_20px_rgba(15,23,42,0.03)]
            outline-none
            placeholder:text-slate-400
          "
        />
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        className="
          relative z-10 mt-8 w-full
          rounded-[22px]
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
          px-6 py-4
          text-[14px] font-semibold tracking-[0.02em]
          text-white
          shadow-[0_15px_35px_rgba(15,23,42,0.20)]
          transition-all duration-300
          hover:-translate-y-[1px]
          hover:shadow-[0_20px_45px_rgba(15,23,42,0.24)]
        "
      >
        Add Transaction
      </button>
    </section>
  );
}