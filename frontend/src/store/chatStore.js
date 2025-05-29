// creating a store for user from zustand
import { create } from "zustand";
import { removeToken, setToken } from "../utils/token";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
      setToken(user.token);
    } else {
      localStorage.removeItem("userInfo");
      removeToken();
    }
  },
  initUser: () => {
    try {
      const userData = localStorage.getItem("userInfo");
      if (userData) {
        set({ user: JSON.parse(userData) });
        setToken(JSON.parse(userData).token);
        return true;
      }
      set({ user: null });
      removeToken();
      return false;
    } catch {
      set({ user: null });
      removeToken();
      return false;
    }
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("userInfo");
  },
}));
