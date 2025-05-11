import { Container, Text } from "@chakra-ui/react";
import React from "react";

const LoginPage = () => {
  return (
    <Container
      shadow={"sm"}
      p={4}
      rounded={"lg"}
      maxW="container.xl"
      centerContent
    >
      <Text fontSize="4xl" color="white">
        Get Started{" "}
      </Text>
    </Container>
    // tabs for login and signup
  );
};

export default LoginPage;
