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

// Dummy chat messages
const initialMessages = [
  {
    id: 3,
    sender: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "what are you upto these days codeek?",
    self: false,
  },
  {
    id: 4,
    sender: "You",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "Hey, i am making a tutorial on mainlayout in react that would speed up development by 10x",
    self: true,
  },
];

const ChatBox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Color mode values
  const boxBg = useColorModeValue("white", "gray.800");
  const msgBgSelf = useColorModeValue("blue.400", "blue.600");
  const msgBgOther = useColorModeValue("gray.200", "gray.700");
  const msgColorSelf = useColorModeValue("white", "white");
  const msgColorOther = useColorModeValue("black", "gray.100");
  const inputBg = useColorModeValue("white", "gray.700");

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
      bg={boxBg}
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
              bg={msg.self ? msgBgSelf : msgBgOther}
              color={msg.self ? msgColorSelf : msgColorOther}
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
          bg={inputBg}
        />
        <Button colorScheme="blue" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatBox;
