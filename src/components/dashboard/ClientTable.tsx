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
import { PauseIcon, PlayIcon } from "lucide-react";
import { useStore } from "@/lib/store";

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const updateClientStatus = useStore((state) => state.updateClientStatus);

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
          <TableHead>Компания</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Тариф</TableHead>
          <TableHead className="text-right">Цена/мес ($)</TableHead>
          <TableHead>Подключено</TableHead>
          <TableHead className="w-25">Действия</TableHead>
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
                  <Link href={`/dashboard/${client.id}`}>Подробнее</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title={
                    client.status === "active"
                      ? "Приостановить клиента"
                      : "Возобновить клиента"
                  }
                  onClick={() => {
                    const newStatus =
                      client.status === "active" ? "paused" : "active";

                    if (newStatus === "paused") {
                      const confirmed = confirm(
                        `Вы уверены, что хотите приостановить клиента?\n\n«${client.companyName}»\n\nЭто отключит доступ к платформе.`
                      );
                      if (!confirmed) return;
                    }

                    updateClientStatus(client.id, newStatus);
                  }}
                >
                  {client.status === "active" ? (
                    <PauseIcon className="h-4 w-4 text-orange-500" />
                  ) : (
                    <PlayIcon className="h-4 w-4 text-green-500" />
                  )}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
