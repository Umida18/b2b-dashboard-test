import { create } from "zustand";
import { mockClients, mockClientDetails } from "@/lib/mock-data";
import { Client, ClientDetail } from "@/lib/types";

interface AppState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  clients: Client[];
  filteredClients: Client[];
  searchTerm: string;
  statusFilter: "all" | "active" | "paused";
  sortKey: "connectedDate" | "monthlyPrice";
  sortDir: "asc" | "desc";

  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: "all" | "active" | "paused") => void;
  setSort: (key: "connectedDate" | "monthlyPrice", dir: "asc" | "desc") => void;
  applyFilters: () => void;

  currentClient: ClientDetail | null;
  loading: boolean;
  error: string | null;
  fetchClient: (id: string) => void;
  updateClientStatus: (id: string, status: "active" | "paused") => void;
}

export const useStore = create<AppState>((set, get) => ({
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("auth") : false,
  login: (email, password) => {
    if (email.endsWith("@b2b.com") && password === "admin") {
      localStorage.setItem("auth", "true");
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem("auth");
    set({ isAuthenticated: false });
  },

  clients: mockClients,
  filteredClients: mockClients,
  searchTerm: "",
  statusFilter: "all",
  sortKey: "connectedDate",
  sortDir: "desc",

  setSearchTerm: (term) => set({ searchTerm: term }, false),
  setStatusFilter: (status) => set({ statusFilter: status }, false),
  setSort: (key, dir) => set({ sortKey: key, sortDir: dir }, false),

  applyFilters: () => {
    const { clients, searchTerm, statusFilter, sortKey, sortDir } = get();
    let result = [...clients];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((c) => c.companyName.toLowerCase().includes(term));
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    result.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (sortKey === "connectedDate") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    set({ filteredClients: result });
  },

  currentClient: null,
  loading: false,
  error: null,

  fetchClient: (id) => {
    set({ loading: true, error: null });
    setTimeout(() => {
      const client = mockClientDetails[id];
      if (client) {
        set({ currentClient: client, loading: false });
      } else {
        set({ error: "Client not found", loading: false });
      }
    }, 300);
  },

  updateClientStatus: (id, status) => {
    set((state) => {
      const updatedClients = state.clients.map((c) =>
        c.id === id ? { ...c, status } : c
      );
      const updatedFiltered = state.filteredClients.map((c) =>
        c.id === id ? { ...c, status } : c
      );

      let updatedCurrent = state.currentClient;
      if (updatedCurrent && updatedCurrent.id === id) {
        updatedCurrent = { ...updatedCurrent, status };
      }

      return {
        clients: updatedClients,
        filteredClients: updatedFiltered,
        currentClient: updatedCurrent,
      };
    });
  },
}));
