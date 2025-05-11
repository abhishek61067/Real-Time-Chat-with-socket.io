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
} from "@chakra-ui/react";
import React from "react";
import { LuFolder, LuUser } from "react-icons/lu";
import Login from "../components/Login";
import SignUp from "./../components/SignUp";

const LoginPage = () => {
  return (
    <Flex justifyContent="center" alignItems="center" h="100vh" w={"100vw"}>
      <Container
        shadow={"lg"}
        p={4}
        rounded={"lg"}
        maxW="container.xl"
        centerContent
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="4xl" color="black">
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
  );
};

export default LoginPage;
