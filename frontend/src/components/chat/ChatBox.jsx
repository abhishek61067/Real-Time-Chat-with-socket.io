import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelectedChatStore } from "../../store/chatStore";
import SingleChat from "./SingleChat";

// Dummy chat messages

const ChatBox = () => {
  const boxBg = useColorModeValue("white", "gray.800");

  const selectedChat = useSelectedChatStore((state) => state.selectedChat);

  return (
    <Box
      w={{ base: "100%", md: "70%" }}
      h="75vh"
      bg={boxBg}
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
