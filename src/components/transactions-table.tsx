import { TransactionType } from "@prisma/client";

type Props = {
  transactions: any[];
};

export default function TransactionsTable({
  transactions,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b border-slate-100 bg-slate-50">
          <tr>
            <th className="px-5 py-4 text-left text-sm text-slate-500">
              Date
            </th>
            <th className="px-5 py-4 text-left text-sm text-slate-500">
              Category
            </th>
            <th className="px-5 py-4 text-left text-sm text-slate-500">
              Description
            </th>
            <th className="px-5 py-4 text-right text-sm text-slate-500">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-b border-slate-50"
            >
              <td className="px-5 py-4 text-sm text-slate-600">
                {new Date(
                  transaction.date
                ).toLocaleDateString()}
              </td>

              <td className="px-5 py-4 font-medium text-slate-800">
                {transaction.category.name}
              </td>

              <td className="px-5 py-4 text-sm text-slate-500">
                {transaction.description ||
                  "-"}
              </td>

              <td
                className={`px-5 py-4 text-right font-semibold ${
                  transaction.type ===
                  TransactionType.INCOME
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >
                {transaction.type ===
                TransactionType.INCOME
                  ? "+"
                  : "-"}
                ₹
                {Number(
                  transaction.amount
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}