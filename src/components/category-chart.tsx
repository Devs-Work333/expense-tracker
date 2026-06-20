"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    category: string;
    amount: number;
    percentage: number;
  }[];
};

const colors = [
  "#10B981",
  "#F43F5E",
  "#8B5CF6",
  "#3B82F6",
  "#F59E0B",
  "#14B8A6",
];

export default function CategoryChart({
  data,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Pie Chart */}
      <div className="h-[280px] w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    colors[index % colors.length]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Responsive Premium Legend */}
      <div className="flex flex-wrap gap-3 pt-2">
        {data.map((item, index) => (
          <div
            key={`${item.category}-${index}`}
            className="
              flex items-center gap-3
              rounded-full
              border border-slate-100
              bg-slate-50
              px-4 py-2
              transition-all duration-200
              hover:bg-white
            "
          >
            {/* Color dot */}
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  colors[index % colors.length],
              }}
            />

            {/* Category name */}
            <p className="text-[13px] font-medium tracking-[0.03em] text-slate-700">
              {item.category}
            </p>

            {/* Percentage */}
            <p className="text-[12px] font-semibold tracking-[0.06em] text-slate-400">
              {item.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}