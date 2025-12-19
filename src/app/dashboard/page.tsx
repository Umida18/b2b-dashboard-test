"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { ClientTable } from "@/components/dashboard/ClientTable";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const filteredClients = useStore((state) => state.filteredClients);
  const searchTerm = useStore((state) => state.searchTerm);
  const statusFilter = useStore((state) => state.statusFilter);
  const sortKey = useStore((state) => state.sortKey);
  const sortDir = useStore((state) => state.sortDir);
  const setSearchTerm = useStore((state) => state.setSearchTerm);
  const setStatusFilter = useStore((state) => state.setStatusFilter);
  const setSort = useStore((state) => state.setSort);
  const applyFilters = useStore((state) => state.applyFilters);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, sortKey, sortDir, applyFilters]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Панель управления B2B-клиентами</h1>
        <Button>+ Добавить клиента</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Клиенты ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <FiltersBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortKey={sortKey}
            sortDir={sortDir}
            onSortChange={setSort}
          />
          <div className="mt-6">
            <ClientTable clients={filteredClients} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
