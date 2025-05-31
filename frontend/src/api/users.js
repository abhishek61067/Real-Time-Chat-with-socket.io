import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

const fetchUsers = async (search) => {
  const response = await axiosInstance.get("api/user/?search=" + search);
  return response.data;
};
export const useSearchUsers = (search) => {
  return useQuery({
    queryKey: ["users", search], // Unique key for the query
    queryFn: () => fetchUsers(search), // Function to fetch data
  });
};
