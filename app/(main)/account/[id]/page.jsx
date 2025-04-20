import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import { SparklesCore } from "@/components/ui/sparkles";

export default async function AccountPage({ params }) {
  const { id } = await params;
  const accountData = await getAccountWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background with Sparkles */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent opacity-60"></div>
        <SparklesCore
          id="account-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#B4E1EF"
        />
      </div>

      <div className="space-y-8 px-5 relative z-10">
        {/* Account Header */}
        <div className="flex gap-4 items-end justify-between pt-5">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 capitalize">
              {account.name}
            </h1>
            <p className="text-gray-400">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
              Account
            </p>
          </div>

          <div className="text-right pb-2">
            <div className="text-xl sm:text-2xl font-bold text-white">
              ₹{parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-gray-400">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#B4E1EF" />}
        >
          <AccountChart transactions={transactions} />
        </Suspense>

        {/* Transactions Table */}
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#B4E1EF" />}
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}