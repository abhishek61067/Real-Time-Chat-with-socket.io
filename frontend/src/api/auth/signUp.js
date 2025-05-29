// lets add mutation for register
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const signUpUser = async (userData) => {
  const response = await axiosInstance.post("api/user/register/", userData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the correct Content-Type for FormData
    },
  });
  return response.data;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: signUpUser,
  });
};

export default useSignUp;
