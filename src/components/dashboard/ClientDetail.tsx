import Link from "next/link";
import { Client } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Клиенты не найдены. Попробуйте изменить фильтры.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead className="text-right">Monthly ($)</TableHead>
          <TableHead>Connected</TableHead>
          <TableHead className="w-25">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.companyName}</TableCell>
            <TableCell>
              <StatusBadge status={client.status} />
            </TableCell>
            <TableCell>
              <Badge variant="outline">{client.plan}</Badge>
            </TableCell>
            <TableCell className="text-right font-mono">
              {client.monthlyPrice}
            </TableCell>
            <TableCell>
              {new Date(client.connectedDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/${client.id}`}>👁️ View</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newStatus =
                      client.status === "active" ? "paused" : "active";
                    alert(`Would toggle ${client.companyName} to ${newStatus}`);
                  }}
                >
                  {client.status === "active" ? "⏸" : "▶️"}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
