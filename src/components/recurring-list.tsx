import {
  RecurringTransaction,
  Category,
} from "@prisma/client";

type RecurringWithCategory =
  RecurringTransaction & {
    category: Category;
  };

type Props = {
  recurring: RecurringWithCategory[];
};

export default function RecurringList({
  recurring,
}: Props) {
  if (!recurring.length) {
    return (
      <div>No recurring transactions yet.</div>
    );
  }

  return (
    <div className="space-y-4">
      {recurring.map((item) => (
        <div
          key={item.id}
          className="rounded border p-4"
        >
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">
                {item.category.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.description || "No description"}
              </p>
            </div>

            <div className="text-right">
              <p>₹{item.amount}</p>
              <p className="text-sm">
                {item.frequency}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}