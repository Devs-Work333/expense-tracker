
import { SavingsGoal } from "@prisma/client";
import UpdateGoalForm from "./update-goal-form";

type Props = {
  goals: SavingsGoal[];
};

export default function SavingsGoalsList({
  goals,
}: Props) {
  if (!goals.length) {
    return (
      <div className="rounded-3xl border border-dashed p-8 text-center text-slate-400">
        No savings goals found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {goals.map((goal) => {
        const progress =
          (goal.current / goal.target) * 100;

        return (
          <div
            key={goal.id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold">
              {goal.title}
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              ₹{goal.current} / ₹{goal.target}
            </p>

            <div className="mt-4 h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                }}
              />
            </div>

            <UpdateGoalForm goalId={goal.id} />
          </div>
        );
      })}
    </div>
  );
}

