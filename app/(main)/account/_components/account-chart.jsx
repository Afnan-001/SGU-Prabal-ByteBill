"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SparklesCore } from "@/components/ui/sparkles";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("ALL");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    // Filter transactions within date range
    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    // Group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  // Calculate totals for the selected period
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <div className="relative">
      {/* Sparkles Background */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="account-chart-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={1}
          particleDensity={10}
          className="w-full h-full"
          particleColor="#B4E1EF"
        />
      </div>

      <Card className="bg-gray-900/80 backdrop-blur-lg border-s border-sky-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-base font-normal text-gray-300">
            Transaction Overview
          </CardTitle>
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] bg-gray-800/50 border-sky-300/30 text-white">
              {" "}
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-sky-300 border-blue-700/30 text-black">
              {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="hover:bg-yellow-500/20"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mb-6 text-sm">
            <div className="text-center">
              <p className="text-gray-400">Total Income</p>
              <p className="text-lg font-bold text-green-400">
                ₹{totals.income.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Total Expenses</p>
              <p className="text-lg font-bold text-red-400">
                ₹{totals.expense.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Net</p>
              <p
                className={`text-lg font-bold ${
                  totals.income - totals.expense >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ₹{(totals.income - totals.expense).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#4B5563" // gray-600
                />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  stroke="#9CA3AF" // gray-400
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                  stroke="#9CA3AF" // gray-400
                />
                <Tooltip
                  formatter={(value) => [`₹${value}`, undefined]}
                  contentStyle={{
                    backgroundColor: "hsl(199, 89%, 20%)", // sky-800 (dark background for contrast)
                    border: "1px solid hsl(199, 89%, 80%)", // sky-300 border
                    borderRadius: "0.5rem",
                    color: "hsl(199, 89%, 80%)", // sky-300 text
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: "hsl(199, 89%, 80%)", // sky-300 text
                    paddingTop: "10px",
                  }}
                />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#4ADE80" // green-400
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#F87171" // red-400
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
