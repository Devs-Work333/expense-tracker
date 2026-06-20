"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSavingsGoal } from "@/actions/savings";

export default function SavingsGoalForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = async () => {
    if (!title || !target) {
      alert("All fields required");
      return;
    }

    await createSavingsGoal(
      title,
      Number(target)
    );

    setTitle("");
    setTarget("");

    router.refresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Create Savings Goal
      </h2>

      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full rounded border p-2"
      />

      <input
        type="number"
        placeholder="Target amount"
        value={target}
        onChange={(e) =>
          setTarget(e.target.value)
        }
        className="w-full rounded border p-2"
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Create Goal
      </button>
    </div>
  );
}