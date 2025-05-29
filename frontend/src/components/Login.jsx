import React, { use, useState } from "react";
import {
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useLogin from "./../api/auth/login";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import routes from "./../routes/constant";
import { useUserStore } from "../store/chatStore";

// Define Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { state } = useLocation();
  console.log("🚀 ~ LoginPage from:", state?.from ?? null);
  const { setUser } = useUserStore();
  const toast = useToast();
  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log("Login with:", data);
    login(data)
      .then((response) => {
        console.log("Login successful:", response);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setUser(response);
        navigate(state.from || routes.HOME);
        // Handle successful login (e.g., redirect, show message)
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle login error (e.g., show error message)
      });
    // Add your login logic here
  };

  const handleGuestLogin = () => {
    setValue("email", "guest@example.com");
    setValue("password", "guest@123");
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(handleLogin)}
      spacing={4}
      align="stretch"
    >
      <Text fontSize="4xl" color="black">
        Login
      </Text>

      {/* Email Field */}
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="Enter your email" type="email" />
          )}
        />
        <Text color="red.500" fontSize="sm">
          {errors.email?.message}
        </Text>
      </FormControl>

      {/* Password Field */}
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
              />
            )}
          />
          <InputRightElement>
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword((prev) => !prev)}
              variant="ghost"
              tabIndex={-1}
            />
          </InputRightElement>
        </InputGroup>
        <Text color="red.500" fontSize="sm">
          {errors.password?.message}
        </Text>
      </FormControl>

      {/* Login Button */}
      <Button type="submit" colorScheme="teal">
        Login
      </Button>

      {/* Guest Login Button */}
      <Button variant="outline" colorScheme="teal" onClick={handleGuestLogin}>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default LoginPage;
