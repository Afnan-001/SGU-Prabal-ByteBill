import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { SparklesCore } from "@/components/ui/sparkles"; // Import SparklesCore

export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient with sparkles */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-black via-gray-900 to-sky-400">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 via-transparent to-transparent opacity-60"></div>
        <SparklesCore
          id="dashboard-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#B4E1EF" // Yellow color for sparkles
        />
      </div>

      <div className="px-5 relative z-10">
        <div className="flex items-center justify-between mb-5 pt-5">
          <h1 className="text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">
            Dashboard
          </h1>
        </div>
        <Suspense
          fallback={
            <div className="pt-10">
              <BarLoader width={"100%"} color="#B4E1EF" />
            </div>
          }
        >
          <DashboardPage />
        </Suspense>
      </div>
    </div>
  );
}
