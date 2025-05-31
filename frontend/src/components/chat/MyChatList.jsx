import React from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Badge,
  Circle,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

// Dummy user data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    online: true,
    lastMessage:
      "Hey, i am making a tutorial on mainlayout in react that would speed up development by 10x",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    online: false,
    lastMessage: "See you tomorrow!",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    online: true,
    lastMessage: "Let's catch up soon.",
  },
];

const MyChatList = () => {
  const boxBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      w="320px"
      bg={boxBg}
      borderRadius="lg"
      boxShadow="md"
      p={4}
      h="500px"
      overflowY="auto"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color={textColor}>
        Chats
      </Text>
      <VStack spacing={3} align="stretch">
        {users.map((user) => (
          <HStack
            key={user.id}
            p={3}
            borderRadius="md"
            borderWidth="1px"
            borderColor={borderColor}
            _hover={{ bg: hoverBg, cursor: "pointer" }}
            spacing={4}
            align="center"
            position="relative"
          >
            <Box position="relative">
              <Avatar src={user.avatar} name={user.name} size="md" />
              {user.online && (
                <Circle
                  size="12px"
                  bg="green.400"
                  border="2px solid white"
                  position="absolute"
                  bottom={0}
                  right={0}
                />
              )}
            </Box>
            <Flex direction="column" flex="1">
              <Text fontWeight="medium" color={textColor}>
                {user.name}
              </Text>
              <Text fontSize="sm" color={subTextColor} noOfLines={1}>
                {user.lastMessage}
              </Text>
            </Flex>
            {user.online && (
              <Badge colorScheme="green" fontSize="0.7em">
                Online
              </Badge>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default MyChatList;
