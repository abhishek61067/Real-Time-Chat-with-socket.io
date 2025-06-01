import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// read
const readChat = async () => {
  const response = await axiosInstance.get("api/chat/");
  return response.data;
};

export const useReadChat = () => {
  return useQuery({
    queryKey: ["chats"], // Unique key for the query
    queryFn: readChat, // Function to fetch data
  });
};

// create
const createChat = async (userId) => {
  const response = await axiosInstance.post("api/chats", {
    userId,
  });
  return response.data;
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => createChat(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
