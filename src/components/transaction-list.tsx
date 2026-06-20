
import { Transaction, Category } from "@prisma/client";

type TransactionWithCategory =
  Transaction & {
    category: Category;
  };

type Props = {
  transactions: TransactionWithCategory[];
};

export default function TransactionList({
  transactions,
}: Props) {
  if (!transactions.length) {
    return (
      <div className="rounded-3xl border border-dashed p-8 text-center text-slate-400">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:bg-slate-50 transition"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                {transaction.category.name}
              </h3>

              <p className="text-sm text-slate-500">
                {transaction.description}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ₹{transaction.amount}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

