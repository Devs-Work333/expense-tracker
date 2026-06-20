"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type NavbarProps = {
  name: string;
};

export default function Navbar({ name }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/sign-in");
  };

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-bold">Expense Tracker</h1>

      <div className="flex items-center gap-4">
        <span>{name}</span>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}