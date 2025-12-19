import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";

interface FiltersBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: "all" | "active" | "paused";
  onStatusFilterChange: (status: "all" | "active" | "paused") => void;
  sortKey: "connectedDate" | "monthlyPrice";
  sortDir: "asc" | "desc";
  onSortChange: (
    key: "connectedDate" | "monthlyPrice",
    dir: "asc" | "desc"
  ) => void;
}

export function FiltersBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortKey,
  sortDir,
  onSortChange,
}: FiltersBarProps) {
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="space-y-2">
        <Label>Поиск</Label>
        <Input
          placeholder="Company name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Статус</Label>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="paused">На паузе</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Сортировка</Label>
        <div className="flex gap-2">
          <Select
            value={sortKey}
            onValueChange={(v) => onSortChange(v as any, sortDir)}
          >
            <SelectTrigger className="w-25">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="connectedDate">Дата подключения</SelectItem>
              <SelectItem value="monthlyPrice">Цена подписки</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              onSortChange(sortKey, sortDir === "asc" ? "desc" : "asc")
            }
          >
            {sortDir === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </div>
    </div>
  );
}
