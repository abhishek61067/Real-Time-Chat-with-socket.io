import { Center, Text } from "@chakra-ui/react";
import React from "react";

const EmptyChat = () => {
  return (
    <Center h="100%">
      <Text color="gray.400" fontSize="xl">
        Select a chat to start messaging.
      </Text>
    </Center>
  );
};

export default EmptyChat;
