"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSavingsGoal } from "@/actions/savings";

type Props = {
  goalId: string;
};

export default function UpdateGoalForm({
  goalId,
}: Props) {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    if (!amount) {
      alert("Amount required");
      return;
    }

    await updateSavingsGoal(
      goalId,
      Number(amount)
    );

    setAmount("");
    router.refresh();
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="number"
        placeholder="Add amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="rounded border p-2"
      />

      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Add
      </button>
    </div>
  );
}