"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  income: number;
  expense: number;
  saving: number;
};

export default function OverviewChart({
  income,
  expense,
  saving,
}: Props) {
  const data = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
    { name: "Saving", amount: saving },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}