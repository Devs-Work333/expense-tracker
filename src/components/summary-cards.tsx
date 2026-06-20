type Props = {
  income?: number;
  expense?: number;
  saving?: number;
  balance?: number;
};

const cardStyles = {
  income: {
    bg: "from-emerald-100 via-emerald-50 to-white",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    meta: "Cash inflow this cycle",
  },
  expense: {
    bg: "from-rose-100 via-rose-50 to-white",
    border: "border-rose-200",
    accent: "text-rose-700",
    meta: "Cash outflow this cycle",
  },
  saving: {
    bg: "from-violet-100 via-violet-50 to-white",
    border: "border-violet-200",
    accent: "text-violet-700",
    meta: "Capital reserved",
  },
  balance: {
    bg: "from-blue-100 via-blue-50 to-white",
    border: "border-blue-200",
    accent: "text-blue-700",
    meta: "Available liquidity",
  },
};

export default function SummaryCards({
  income = 0,
  expense = 0,
  saving = 0,
  balance = 0,
}: Props) {
  const cards = [
    {
      title: "Income",
      amount: Number(income),
      style: cardStyles.income,
    },
    {
      title: "Expense",
      amount: Number(expense),
      style: cardStyles.expense,
    },
    {
      title: "Savings",
      amount: Number(saving),
      style: cardStyles.saving,
    },
    {
      title: "Balance",
      amount: Number(balance),
      style: cardStyles.balance,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            relative overflow-hidden rounded-[28px]
            border ${card.style.border}
            bg-gradient-to-br ${card.style.bg}
            p-6
            shadow-[0_12px_35px_rgba(0,0,0,0.06)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
          `}
        >
          {/* Ambient glow */}
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/50 blur-3xl" />

          {/* Header */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            {card.title}
          </p>

          {/* Value */}
          <h2
            className={`
              mt-3 text-[30px] font-semibold tracking-[-0.03em]
              ${card.style.accent}
            `}
          >
            ₹{Number(card.amount ?? 0).toLocaleString()}
          </h2>

          {/* Divider */}
          <div className="mt-3 h-px w-full bg-white/70" />

          {/* Footer */}
          <p className="mt-2 text-[12px] font-medium tracking-[0.06em] text-slate-500">
            {card.style.meta}
          </p>
        </div>
      ))}
    </section>
  );
}