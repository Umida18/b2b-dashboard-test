"use client";

import React, { useEffect } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const router = useRouter();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const currentClient = useStore((state) => state.currentClient);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const fetchClient = useStore((state) => state.fetchClient);
  const updateClientStatus = useStore((state) => state.updateClientStatus);

  const { id } = React.use(params);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  useEffect(() => {
    fetchClient(id);
  }, [id, fetchClient]);

  const toggleStatus = () => {
    if (!currentClient) return;
    const newStatus = currentClient.status === "active" ? "paused" : "active";
    updateClientStatus(currentClient.id, newStatus);
  };

  if (loading) return <Skeleton className="h-96 w-full" />;
  if (error) return <div className="p-6 text-destructive">{error}</div>;
  if (!currentClient) return <div className="p-6">No client data</div>;

  return (
    <div className="p-6 space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        ← Назад к списку
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{currentClient.companyName}</h1>
          <p className="text-muted-foreground">
            Контакт: {currentClient.contactName} • {currentClient.contactEmail}
          </p>
        </div>
        <div className="flex gap-2">
          <StatusBadge status={currentClient.status} />
          <Button onClick={toggleStatus}>
            {currentClient.status === "active"
              ? "Приостановить"
              : "Возобновить"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Подписка</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Тариф</span>
              <div>
                <Badge>{currentClient.plan}</Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Цена в месяц
              </span>
              <div className="text-2xl font-bold">
                ${currentClient.monthlyPrice}
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Дата подключения
              </span>
              <div>
                {new Date(currentClient.connectedDate).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Подключённые объекты ({currentClient.devices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentClient.devices.length === 0 ? (
              <p className="text-muted-foreground">Нет подключённых объектов</p>
            ) : (
              <ul className="space-y-2">
                {currentClient.devices.slice(0, 5).map((d) => (
                  <li key={d.id} className="flex justify-between">
                    <span>{d.name}</span>
                    <Badge variant="secondary">{d.type}</Badge>
                  </li>
                ))}
                {currentClient.devices.length > 5 && (
                  <li className="text-muted-foreground text-sm">
                    + ещё {currentClient.devices.length - 5}...
                  </li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
