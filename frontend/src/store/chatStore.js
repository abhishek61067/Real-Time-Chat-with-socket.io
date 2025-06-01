// creating a store for user from zustand
import { create } from "zustand";
import { removeToken, setToken } from "../utils/token";

// userStore
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
      removeToken(); // Clear any existing token
      setToken(user.token);
    } else {
      localStorage.removeItem("userInfo");
      removeToken();
    }
  },
  initUser: () => {
    try {
      const userData = localStorage.getItem("userInfo");
      console.log("🚀 ~ useUserStore ~ userData:", userData);

      if (userData) {
        set({ user: JSON.parse(userData) });
        removeToken();
        setToken(JSON.parse(userData).token);
        return true;
      } else {
        console.log("User data not found in localStorage");
        set({ user: null });
        removeToken();
        return false;
      }
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
