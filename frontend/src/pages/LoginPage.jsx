import {
  Container,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { LuFolder, LuUser } from "react-icons/lu";
import Login from "../components/Login";
import SignUp from "./../components/SignUp";

const LoginPage = () => {
  // Use color mode values for backgrounds and text
  const containerBg = useColorModeValue("white.100", "dark.800");
  const textColor = useColorModeValue("dark.800", "white.100");

  return (
    <Box
      minH="100vh"
      minW="100vw"
      position="relative"
      bgGradient="linear(to-br, teal.100, purple.100, pink.100)"
    >
      <Flex justifyContent="center" alignItems="center" h="100vh" w="100vw">
        <Container
          shadow="lg"
          p={4}
          rounded="lg"
          maxW="container.xl"
          centerContent
          bg={containerBg}
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize="4xl" color={textColor}>
              Get Started
            </Text>
            <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
              <TabList>
                <Tab>
                  <LuUser style={{ marginRight: "8px" }} />
                  Login
                </Tab>
                <Tab>
                  <LuFolder style={{ marginRight: "8px" }} />
                  Signup
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Container>
      </Flex>
    </Box>
  );
};

export default LoginPage;
