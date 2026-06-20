# Expense Tracker — Premium Personal Finance Dashboard

A modern full-stack personal finance management platform built with **Next.js**, **Prisma**, **PostgreSQL**, and **Better Auth**.

Designed with a premium-grade UI system focused on speed, clarity, and minimal friction.

---

# Overview

Expense Tracker helps users:

- Track income and expenses
- Organize spending by categories
- Monitor financial health
- View analytics and breakdowns
- Manage recurring transactions
- Create savings goals
- Filter historical records like a passbook

The product focuses heavily on:

- Fast transaction entry
- Clean financial insights
- Premium dashboard experience
- Scalable architecture

---

# Core Features

## Authentication

Built using :contentReference[oaicite:0]{index=0}

Supports:

- Email/password login
- Session-based authentication
- Protected dashboard routes
- Production-safe auth handling

Flow:

```text
Unauthenticated → Redirect to /login
Authenticated → Dashboard
```

---

## Dashboard

Main financial control center.

Includes:

### Hero Header

Premium dark editorial header.

Shows:

- Product positioning
- User context
- Financial control branding

---

### Summary Cards

Displays:

- Total Income
- Total Expenses
- Total Savings
- Available Balance

Features:

- Gradient backgrounds
- Premium visual hierarchy
- Contextual financial labels
- Hover interactions

Formula:

```text
Balance = Income - Expense - Saving
```

---

### Quick Actions

Separated from dashboard logic:

- Manage Categories
- Recurring Transactions
- Savings Goals

Purpose:

Reduce dashboard clutter.

---

## Transactions

Fast-entry optimized.

User flow:

1. Select existing category
2. Enter amount
3. Optional description
4. Submit

Design principles:

- Zero unnecessary friction
- Fast repeat usage
- Mobile-friendly chip system

---

## Transaction Filtering

Passbook-inspired table.

Supports:

### Filters

- By Date
- By Category
- By Type

### Sorting

Available:

- Latest
- Oldest
- Highest Amount
- Lowest Amount

### Pagination

Default:

```text
Latest 10 transactions
```

Load more:

```text
Next 10 transactions
```

---

## Category Management

Users can:

- Create categories
- Separate by transaction type

Types:

```text
INCOME
EXPENSE
SAVING
```

Examples:

Expense:

- Food
- Rent
- Shopping

Income:

- Salary
- Freelance

Saving:

- Investments
- Emergency Fund

---

## Analytics

Dashboard charts include:

---

### Category Breakdown (Pie Chart)

Shows:

- Percentage distribution
- Category-based color mapping
- Responsive legends
- Adaptive wrapping for multiple categories

Improvements:

- Percentages instead of raw values
- External legend system
- Responsive footer

---

### Financial Health (Bar Chart)

Displays:

- Income
- Expense
- Saving

Features:

- Premium soft borders
- Color-coded visual hierarchy
- Better typography
- Dashboard-consistent spacing

---

## Recurring Transactions

Separate page.

Allows:

- Fixed recurring payments
- Frequency-based scheduling

Supported frequencies:

```text
DAILY
WEEKLY
MONTHLY
YEARLY
```

Examples:

- Rent
- SIP
- Netflix
- Insurance

---

## Savings Goals

Separate page.

Allows:

- Create financial goals
- Track progress
- Measure saved capital

Examples:

- Emergency Fund
- Vacation
- Car Purchase

---

# Tech Stack

Frontend:

- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}
- :contentReference[oaicite:3]{index=3}
- :contentReference[oaicite:4]{index=4}

Backend:

- Next.js Server Actions

Database:

- :contentReference[oaicite:5]{index=5}
- :contentReference[oaicite:6]{index=6}

Authentication:

- :contentReference[oaicite:7]{index=7}

Deployment:

- :contentReference[oaicite:8]{index=8}

---

# Project Structure

```text
src/
│── app/
│   ├── dashboard/
│   ├── categories/
│   ├── recurring/
│   ├── goals/
│   ├── login/
│   ├── signup/
│
│── actions/
│   ├── category.ts
│   ├── transaction.ts
│   ├── recurring.ts
│   ├── goals.ts
│
│── components/
│   ├── summary-cards.tsx
│   ├── transaction-form.tsx
│   ├── transaction-filters.tsx
│   ├── transactions-table.tsx
│   ├── category-chart.tsx
│   ├── overview-chart.tsx
│
│── lib/
│   ├── prisma.ts
│   ├── auth.ts
```

---

# Environment Variables

Required:

```env
DATABASE_URL=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=
NEXT_PUBLIC_APP_URL=
```

Production example:

```env
BETTER_AUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

Important:

No trailing slash.

Correct:

```text
https://your-project.vercel.app
```

Wrong:

```text
https://your-project.vercel.app/
```

---

# Local Development

Install:

```bash
npm install
```

Run:

```bash
npm run dev
```

Prisma:

```bash
npx prisma generate
npx prisma db push
```

---

# Deployment

Platform:

:contentReference[oaicite:9]{index=9}

Steps:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <repo-url>
git push -u origin main
```

Import in Vercel.

Add env variables.

Deploy.

---

# Security Notes

Protected routes:

```text
/dashboard
/categories
/recurring
/goals
```

Dashboard protection:

```tsx
if (!session) {
  redirect("/login");
}
```

Server actions:

```tsx
if (!session) {
  throw new Error("Unauthorized");
}
```

---

# Design System Philosophy

This app follows:

### Premium Editorial UI

Focus on:

- Clean spacing
- Strong typography hierarchy
- Soft gradients
- Financial trust aesthetics

Not:

- Overcrowded dashboards
- Heavy borders
- Visual noise

Inspired by:

- Modern fintech products
- Wealth dashboards
- Luxury productivity apps

---

# Current Status

Completed:

- Authentication
- Dashboard
- Summary Cards
- Transactions
- Filters
- Analytics
- Category Management
- Recurring Transactions
- Savings Goals
- Vercel Deployment

In Progress:

- Advanced reports
- Export CSV/PDF
- Notifications
- Recurring auto-execution
- Goal progress charts

---

# Future Improvements

Planned:

- Monthly budgeting
- AI financial insights
- Smart expense categorization
- Predictive spending
- Investment tracking
- Financial calendar
- Wallet integrations

---

# Author

Built as a premium-grade personal finance product with a focus on usability, speed, and clean architecture.