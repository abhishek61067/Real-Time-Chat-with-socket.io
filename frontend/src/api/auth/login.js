// lets add mutation for register
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const loginUser = async (userData) => {
  const response = await axiosInstance.post("api/user/login/", userData, {
    headers: {
      // for json
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;
