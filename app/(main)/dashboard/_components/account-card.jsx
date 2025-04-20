"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="bg-gray-900/80 backdrop-blur-lg  border-sky-200 border-s hover:shadow-lg hover:shadow-yellow-500/10 transition-all group relative">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize text-gray-300">
            {name}
            {isDefault && (
              <Badge className="ml-2 bg-sky-500/20 text-sky-400 hover:bg-sky-700/30">
                Default
              </Badge>
            )}
          </CardTitle>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
            className="data-[state=checked]:bg-sky-300 data-[state=unchecked]:bg-gray-700"
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ₹{parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-gray-400">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <div className="flex items-center text-green-400">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Income
          </div>
          <div className="flex items-center text-red-400">
            <ArrowDownRight className="mr-1 h-4 w-4" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}