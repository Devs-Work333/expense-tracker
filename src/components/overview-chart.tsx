"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
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
    {
      name: "Income",
      amount: income,
      color: "#10B981",
    },
    {
      name: "Expense",
      amount: expense,
      color: "#F43F5E",
    },
    {
      name: "Savings",
      amount: saving,
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={28}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E2E8F0"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 13,
              fontWeight: 600,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              fill: "rgba(148,163,184,0.08)",
            }}
            contentStyle={{
              borderRadius: "18px",
              border: "1px solid #E2E8F0",
              backgroundColor: "#fff",
            }}
          />

          <Bar
            dataKey="amount"
            radius={[12, 12, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`bar-${index}`}
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}