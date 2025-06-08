import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const bgImage =
  "https://plus.unsplash.com/premium_photo-1676057060928-c717a8e96784?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Dummy chat background

const Homepage = () => (
  <Box
    minH="100vh"
    bgImage={`url(${bgImage})`}
    bgSize="cover"
    bgPosition="center"
    display="flex"
    alignItems="center"
    justifyContent="center"
    _after={{
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      bg: "blackAlpha.700",
      zIndex: 0,
    }}
    position="relative"
  >
    <VStack
      spacing={6}
      p={10}
      borderRadius="xl"
      boxShadow="2xl"
      zIndex={1}
      maxW="2xl"
      w="full"
      bg={"transparent"}
      backdropFilter="blur(50px)"
    >
      <Heading color="teal.600" size="2xl" textAlign="center">
        Welcome to MERN Chat!
      </Heading>
      <Text fontSize="xl" color="teal.800" textAlign="center">
        Connect, chat, and share instantly with friends and colleagues.
        Experience real-time messaging in a modern, secure chat app.
      </Text>
      <Button
        as={RouterLink}
        to="/login"
        colorScheme="teal"
        size="lg"
        px={10}
        fontWeight="bold"
        shadow="md"
      >
        Get Started
      </Button>
    </VStack>
  </Box>
);

export default Homepage;
