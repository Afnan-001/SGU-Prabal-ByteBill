import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { SparklesCore } from "@/components/ui/sparkles";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default async function AddTransactionPage({ searchParams }) {
  const params = await searchParams;
  const accounts = await getUserAccounts();
  
  const editId = params?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient with sparkles */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent opacity-60"></div>
        <SparklesCore
          id="add-transaction-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#B4E1EF" // Yellow color for sparkles
        />
      </div>

      <div className="px-5 relative z-10">
        <Suspense fallback={
          <div className="pt-10">
            <BarLoader width={"100%"} color="#B4E1EF" />
          </div>
        }>
          <div className="max-w-3xl mx-auto py-8">
            <div className="flex justify-center md:justify-normal mb-8">
              <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
                {editId ? "Edit Transaction" : "Add Transaction"}
              </h1>
            </div>
            
            <div className="rounded-lg border border-sky-200 border-s bg-gray-900/80  backdrop-blur-sm p-6 shadow-lg shadow-sky-200">
              <AddTransactionForm
                accounts={accounts}
                categories={defaultCategories}
                editMode={!!editId}
                initialData={initialData}
              />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}