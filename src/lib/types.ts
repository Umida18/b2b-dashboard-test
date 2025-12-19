export type SubscriptionPlan = "Starter" | "Pro" | "Enterprise";

export interface Client {
  id: string;
  companyName: string;
  status: "active" | "paused";
  plan: SubscriptionPlan;
  monthlyPrice: number;
  connectedDate: string;
}

export interface Device {
  id: string;
  type: "car" | "user" | "qr" | "device";
  name: string;
  lastSeen?: string;
}

export interface ClientDetail extends Client {
  contactEmail: string;
  contactName: string;
  devices: Device[];
}
