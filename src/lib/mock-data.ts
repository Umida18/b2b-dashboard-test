import { Client, ClientDetail } from "@/lib/types";

export const mockClients: Client[] = [
  {
    id: "eco-ride",
    companyName: "EcoRide",
    status: "active",
    plan: "Pro",
    monthlyPrice: 299,
    connectedDate: "2025-11-01",
  },
  {
    id: "city-trans",
    companyName: "CityTrans",
    status: "paused",
    plan: "Starter",
    monthlyPrice: 99,
    connectedDate: "2025-08-12",
  },
  {
    id: "green-logistics",
    companyName: "Green Logistics",
    status: "active",
    plan: "Enterprise",
    monthlyPrice: 999,
    connectedDate: "2025-03-04",
  },
];

export const mockClientDetails: Record<string, ClientDetail> = {
  "eco-ride": {
    ...mockClients[0],
    contactEmail: "admin@ecoride.com",
    contactName: "Alex Morgan",
    devices: [
      { id: "car-001", type: "car", name: "Tesla Model Y #1" },
      { id: "user-101", type: "user", name: "Driver: Maria K." },
      { id: "qr-205", type: "qr", name: "QR: Parking Zone A" },
    ],
  },
  "city-trans": {
    ...mockClients[1],
    contactEmail: "ops@citytrans.com",
    contactName: "Dmitriy Sokolov",
    devices: [
      { id: "car-045", type: "car", name: "Gazelle Next #7" },
      { id: "device-gps-12", type: "device", name: "GPS Tracker v3" },
    ],
  },
  "green-logistics": {
    ...mockClients[2],
    contactEmail: "ceo@greenlogistics.net",
    contactName: "Elena Petrova",
    devices: Array.from({ length: 42 }, (_, i) => ({
      id: `auto-${i + 1}`,
      type: "car",
      name: `Truck #${i + 1}`,
    })),
  },
};
