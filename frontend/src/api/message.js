import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { use } from "react";

const fetchMessages = async (chatId) => {
  const response = await axiosInstance.get(`/api/message/${chatId}`);
  return response.data;
};

const useReadMessages = (chatId) => {
  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => fetchMessages(chatId),
    enabled: !!chatId,
  });
};

const sendMessage = async ({ content, chatId }) => {
  const response = await axiosInstance.post("/api/message", {
    content,
    chatId,
  });
  return response.data;
};

const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["messages", data.chatId]);
    },
  });
};

export { useReadMessages, useSendMessage };
