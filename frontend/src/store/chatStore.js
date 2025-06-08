// creating a store for user from zustand
import { create } from "zustand";
import { removeToken, setToken } from "../utils/token";

// userStore
export const useUserStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => {
    set({ user, error: null, loading: false });
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
        set({ user: JSON.parse(userData), loading: false, error: null });
        return true;
      } else {
        set({ user: null, loading: false, error: null });
        return false;
      }
    } catch (err) {
      set({
        user: null,
        loading: false,
        error: err?.message || "Failed to initialize user",
      });
      return false;
    }
  },
  logout: () => {
    set({ user: null, error: null });
    localStorage.removeItem("userInfo");
  },
}));

//selectedChatStore
export const useSelectedChatStore = create((set) => ({
  selectedChat: null,
  setSelectedChat: (selectedChat) => set({ selectedChat }),
}));

// chatStore
export const useChatStore = create((set) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
}));
