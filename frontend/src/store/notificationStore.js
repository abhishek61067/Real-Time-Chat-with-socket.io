import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: [],
  setNotification: (notification) => set({ notification }),
}));

export default useNotificationStore;
