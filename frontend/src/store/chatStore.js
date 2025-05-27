// creating a store for user from zustand
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
  },
  initUser: () => {
    try {
      const userData = localStorage.getItem("userInfo");
      if (userData) {
        set({ user: JSON.parse(userData) });
        return true;
      }
      set({ user: null });
      return false;
    } catch {
      set({ user: null });
      return false;
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("userInfo");
  },
}));
