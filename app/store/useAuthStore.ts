import { create } from "zustand";

type Store = {
  isAdmin: boolean;
  setAdmin: (val: boolean) => void;
};

export const useAuthStore = create<Store>((set) => ({
  isAdmin: false,
  setAdmin: (val) => set({ isAdmin: val }),
}));
