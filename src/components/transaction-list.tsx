type Transaction = {
  id: string;
  amount: number;
  description: string | null;
  type: string;
  date: Date;
  category: {
    name: string;
  };
};

type Props = {
  transactions: Transaction[];
};

export default function TransactionList({
  transactions,
}: Props) {
  if (!transactions.length) {
    return (
      <div className="rounded border p-4">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="rounded border p-4"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                {transaction.category.name}
              </h3>

              <p>{transaction.description}</p>

              <small>
                {new Date(transaction.date).toLocaleDateString()}
              </small>
            </div>

            <div>
              ₹{transaction.amount} ({transaction.type})
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}