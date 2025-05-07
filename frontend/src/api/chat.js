import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const fetchChats = async () => {
  const response = await axiosInstance.get("http://localhost:5000/api/chats");
  return response.data;
};

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"], // Unique key for the query
    queryFn: fetchChats, // Function to fetch data
  });
};
