import React, { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
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
  Image,
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUp from "../api/auth/signUp";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "../routes/constant";
// Validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
  picture: Yup.mixed().required("Picture is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { mutateAsync: signUp } = useSignUp();

  const toast = useToast();

  // to show the preview of the image
  const [previewUrl, setPreviewUrl] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // to see if password matches to show tick
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  const onSubmit = (data) => {
    // lets add formdata
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("picture", data.picture);
    console.log(formData);
    signUp(formData)
      .then((data) => {
        console.log("User signed up successfully:", data);
        // Show success toast
        toast({
          title: "Sign Up Successful",
          description: "You have signed up successfully.",
          status: "success",
        });
        // Redirect to login page
        navigate(routes.CHATS);
      })

      .catch((error) => {
        console.error("Error signing up:", error);
        // Show error toast
        toast({
          title: "Sign Up Failed",
          description: error.response?.data?.message || "An error occurred.",
          status: "error",
        });
      });
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
          render={({ field }) => (
            <Input {...field} placeholder="Enter your name" />
          )}
        />
        <Text color="red.500" fontSize="sm">
          {errors.name?.message}
        </Text>
      </FormControl>

      {/* Email Field */}
      <FormControl isInvalid={errors.email}>
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
      <FormControl isInvalid={errors.password}>
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
              aria-label="Toggle Password Visibility"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        <Text color="red.500" fontSize="sm">
          {errors.password?.message}
        </Text>
      </FormControl>

      {/* Confirm Password Field */}
      <FormControl isInvalid={errors.confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
              />
            )}
          />
          <InputRightElement display="flex" alignItems="center">
            <IconButton
              aria-label="Toggle Confirm Password Visibility"
              icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              variant="ghost"
              size="sm"
              mr={passwordsMatch ? 2 : 0}
            />
          </InputRightElement>
        </InputGroup>
        <HStack mt={1} align={"center"} spacing={1}>
          <HStack
            bg={passwordsMatch ? "green.100" : "gray.100"}
            borderRadius="full"
            p={1}
            spacing={1}
          >
            <CheckIcon
              color={passwordsMatch ? "green.500" : "gray.500"}
              boxSize={3}
            />
          </HStack>
          <Text fontSize="xs" color={passwordsMatch ? "green.500" : "gray.500"}>
            {passwordsMatch ? "Password match" : "No match"}
          </Text>
        </HStack>
        <Text color="red.500" fontSize="sm">
          {errors.confirmPassword?.message}
        </Text>
      </FormControl>

      {/* Picture Upload Field */}
      <FormControl isInvalid={errors.picture}>
        <FormLabel>Upload Picture</FormLabel>
        <Controller
          name="picture"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <HStack align="center" spacing={4}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    field.onChange(file); // Update react-hook-form
                    setPreviewUrl(URL.createObjectURL(file)); // Show preview
                  }
                }}
              />
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="full"
                />
              )}
            </HStack>
          )}
        />
        <Text color="red.500" fontSize="sm">
          {errors.picture?.message}
        </Text>
      </FormControl>

      <Button type="submit" colorScheme="teal" width="full">
        Submit
      </Button>
    </VStack>
  );
};

export default SignUp;
