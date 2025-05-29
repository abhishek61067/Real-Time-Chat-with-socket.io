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
} from "@chakra-ui/react";

// Dummy chat messages
const initialMessages = [
  {
    id: 1,
    sender: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Hey, how are you?",
    self: false,
  },
  {
    id: 2,
    sender: "You",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "I'm good! How about you?",
    self: true,
  },
  {
    id: 3,
    sender: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Doing great, thanks! And what's new with you?",
    self: false,
  },
  {
    id: 4,
    sender: "You",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "I am trying to make a tutorial on mainlayout in react that would speed up development by 10x",
    self: true,
  },
];

const ChatBox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "You",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        text: input,
        self: true,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Box
      flex="1"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      p={4}
      h="500px"
      display="flex"
      flexDirection="column"
    >
      <VStack
        spacing={3}
        align="stretch"
        flex="1"
        overflowY="auto"
        mb={2}
        pr={2}
      >
        {messages.map((msg) => (
          <Flex
            key={msg.id}
            align="flex-end"
            justify={msg.self ? "flex-end" : "flex-start"}
          >
            {!msg.self && (
              <Avatar
                src={msg.avatar}
                name={msg.sender}
                size="sm"
                mr={2}
                alignSelf="flex-end"
              />
            )}
            <Box
              bg={msg.self ? "blue.400" : "gray.200"}
              color={msg.self ? "white" : "black"}
              px={4}
              py={2}
              borderRadius="lg"
              maxW="70%"
              mb={1}
            >
              <Text fontSize="sm">{msg.text}</Text>
            </Box>
            {msg.self && (
              <Avatar
                src={msg.avatar}
                name={msg.sender}
                size="sm"
                ml={2}
                alignSelf="flex-end"
              />
            )}
          </Flex>
        ))}
        <div ref={messagesEndRef} />
      </VStack>
      <HStack mt={2}>
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme="blue" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatBox;
