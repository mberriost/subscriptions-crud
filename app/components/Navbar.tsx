"use client";

import { Notebook, LogIn } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Notebook className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Subscriptions Reminder
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}