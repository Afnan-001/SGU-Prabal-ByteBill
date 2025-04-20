"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export function TransactionTable({ transactions }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = typeFilter
        ? transaction.type === typeFilter
        : true;
      const matchesRecurring =
        recurringFilter === "recurring"
          ? transaction.isRecurring
          : recurringFilter === "non-recurring"
          ? !transaction.isRecurring
          : true;
      return matchesSearch && matchesType && matchesRecurring;
    });
  }, [transactions, searchTerm, typeFilter, recurringFilter]);

  const sortedTransactions = useMemo(() => {
    const sortableItems = [...filteredTransactions];
    if (sortConfig.field) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredTransactions, sortConfig]);

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, sortedTransactions]);

  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedTransactions.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const deleteFn = async (ids) => {
    setDeleteLoading(true);
    try {
      await bulkDeleteTransactions(ids);
      toast.success("Transactions deleted successfully");
      setSelectedIds(selectedIds.filter((id) => !ids.includes(id)));
      // You might want to add a refresh function here if needed
    } catch (error) {
      toast.error("Failed to delete transactions");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    deleteFn(selectedIds);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-4">
      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#F59E0B" />
      )}
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-sky-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 bg-gray-800/50 border-sky-200 focus:border-sky-300 text-white"
          />
        </div>
        
        <div className="flex gap-2">
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px] bg-gray-800/50 border-sky-200 text-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-sky-300 border-blue-700/30 text-black">
              <SelectItem value="INCOME" className="hover:bg-sky-400">Income</SelectItem>
              <SelectItem value="EXPENSE" className="hover:bg-sky-400">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px] bg-gray-800/50 border-sky-200 text-white">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent className="bg-sky-300 border-blue-700/30 text-black">
              <SelectItem value="recurring" className="hover:bg-sky-400">Recurring Only</SelectItem>
              <SelectItem value="non-recurring" className="hover:bg-sky-400">Non-recurring Only</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            </div>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear filters"
              className="border-sky-200 text-black hover:bg-blue-500/20 hover:text-white"
            >
              <X className="h-4 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-md border border-sky-500/30 bg-gray-800/80 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-sky-500/10 border-b border-sky-500/30">
            <TableRow className="hover:bg-sky-500/10">
              <TableHead className="w-[50px] border-r border-sky-500/30">
                <Checkbox
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  className="border-sky-300/50 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer text-sky-400 border-r border-sky-500/30"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-sky-400 border-r border-sky-500/30">Description</TableHead>
              <TableHead
                className="cursor-pointer text-sky-400 border-r border-sky-500/30"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right text-sky-400 border-r border-sky-500/30"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-sky-400 border-r border-sky-500/30">Recurring</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sky-400/70"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-sky-500/10 border-b border-sky-500/30">
                  <TableCell className="border-r border-sky-500/30">
                    <Checkbox
                      checked={selectedIds.includes(transaction.id)}
                      onCheckedChange={() => handleSelect(transaction.id)}
                      className="border-sky-300/50 data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                    />
                  </TableCell>
                  <TableCell className="text-white border-r border-sky-500/30">
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>
                  <TableCell className="text-white border-r border-sky-500/30">{transaction.description}</TableCell>
                  <TableCell className="capitalize border-r border-sky-500/30">
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="px-2 py-1 rounded text-white text-sm"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium border-r border-sky-500/30",
                      transaction.type === "EXPENSE"
                        ? "text-red-400"
                        : "text-green-400"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}₹
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="border-r border-sky-500/30">
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="secondary"
                              className="gap-1 bg-sky-500/20 text-sky-400 hover:bg-sky-500/30"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-sky-500/30 text-sky-400">
                            <div className="text-sm">
                              <div className="font-medium">Next Date:</div>
                              <div>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  "PPP"
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge variant="outline" className="gap-1 border-sky-200 text-sky-400">
                        <Clock className="h-3 w-3" />
                        One-time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-sky-500/20">
                          <MoreHorizontal className="h-4 w-4 text-sky-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-sky-500/30">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                          className="text-sky-400 hover:bg-sky-500/20"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-sky-500/30" />
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-500/20"
                          onClick={() => deleteFn([transaction.id])}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-sky-500/30 text-sky-400 hover:bg-sky-500/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-sky-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-sky-500/30 text-sky-400 hover:bg-sky-500/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}