import {
  getSavingsGoals,
} from "@/actions/savings";

import SavingsGoalForm from "@/components/savings-goal-form";
import SavingsGoalsList from "@/components/savings-goals-list";

export default async function GoalsPage() {
  const goals = await getSavingsGoals();

  return (
    <main className="space-y-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Savings Goals
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Plan and track your wealth journey.
        </p>
      </div>

      <SavingsGoalForm />

      <SavingsGoalsList goals={goals} />
    </main>
  );
}