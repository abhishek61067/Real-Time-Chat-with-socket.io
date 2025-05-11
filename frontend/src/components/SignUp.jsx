import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      align="stretch"
    >
      <Text fontSize="2xl" fontWeight="bold">
        SignUp
      </Text>

      {/* Name Field */}
      <FormControl isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your name" />
          )}
        />
        {errors.name && (
          <Text color="red.500" fontSize="sm">
            {errors.name.message}
          </Text>
        )}
      </FormControl>

      {/* Email Field */}
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your email" type="email" />
          )}
        />
        {errors.email && (
          <Text color="red.500" fontSize="sm">
            {errors.email.message}
          </Text>
        )}
      </FormControl>

      {/* Password Field */}
      <FormControl isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
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
              aria-label="Toggle Password Visibility"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <Text color="red.500" fontSize="sm">
            {errors.password.message}
          </Text>
        )}
      </FormControl>

      {/* Confirm Password Field */}
      <FormControl isInvalid={errors.confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Confirm Password is required",
              validate: (value) =>
                value === control._formValues.password ||
                "Passwords do not match",
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
              />
            )}
          />
          <InputRightElement>
            <IconButton
              aria-label="Toggle Confirm Password Visibility"
              icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        {errors.confirmPassword && (
          <Text color="red.500" fontSize="sm">
            {errors.confirmPassword.message}
          </Text>
        )}
      </FormControl>

      {/* Picture Upload Field */}
      <FormControl>
        <FormLabel>Upload Picture</FormLabel>
        <Controller
          name="picture"
          control={control}
          defaultValue=""
          rules={{ required: "Picture is required" }}
          render={({ field }) => (
            <Input {...field} type="file" accept="image/*" />
          )}
        />
        {errors.picture && (
          <Text color="red.500" fontSize="sm">
            {errors.picture.message}
          </Text>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" colorScheme="teal" width="full">
        Submit
      </Button>
    </VStack>
  );
};

export default SignUp;
