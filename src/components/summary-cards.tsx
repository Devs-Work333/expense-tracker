type Props = {
  income: number;
  expense: number;
  saving: number;
  balance: number;
};

export default function SummaryCards({
  income,
  expense,
  saving,
  balance,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded border p-4">
        <h3 className="font-semibold">Income</h3>
        <p>₹{income}</p>
      </div>

      <div className="rounded border p-4">
        <h3 className="font-semibold">Expense</h3>
        <p>₹{expense}</p>
      </div>

      <div className="rounded border p-4">
        <h3 className="font-semibold">Saving</h3>
        <p>₹{saving}</p>
      </div>

      <div className="rounded border p-4">
        <h3 className="font-semibold">Balance</h3>
        <p>₹{balance}</p>
      </div>
    </div>
  );
}