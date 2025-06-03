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
  const response = await axiosInstance.post("api/chat", {
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

// group chat
const createGroupChat = async (formData) => {
  const response = await axiosInstance.post("api/chat/group", formData);
  return response.data;
};

export const useCreateGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createGroupChat(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

// update group chat name
const updateGroupChatName = async (formData) => {
  const response = await axiosInstance.put("api/chat/group/rename", formData);
  return response.data;
};

export const useUpdateGroupChatName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateGroupChatName(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

// add user to group chat
const addUserToGroupChat = async (formData) => {
  const response = await axiosInstance.put("api/chat/group/add", formData);
  return response.data;
};
export const useAddUserToGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => addUserToGroupChat(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};

// remove user from group chat
const removeUserFromGroupChat = async (formData) => {
  const response = await axiosInstance.put("api/chat/group/remove", formData);
  return response.data;
};

export const useRemoveUserFromGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => removeUserFromGroupChat(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
