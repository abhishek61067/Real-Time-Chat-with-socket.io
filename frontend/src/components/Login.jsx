import React from "react";
import {
  Container,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

const LoginPage = () => {
  const { control, handleSubmit, setValue } = useForm();

  const handleLogin = (data) => {
    console.log("Login with:", data);
    // Add your login logic here
  };

  const handleGuestLogin = () => {
    setValue("email", "guest@example.com");
    setValue("password", "guest123");
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
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="Enter your email" type="email" />
          )}
        />
      </FormControl>

      {/* Password Field */}
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter your password"
              type="password"
            />
          )}
        />
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
