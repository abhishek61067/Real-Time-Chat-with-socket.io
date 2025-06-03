import React, { useEffect, useState } from "react";
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
  useToast,
  Button,
} from "@chakra-ui/react";
import {
  useChatStore,
  useSelectedChatStore,
  useUserStore,
} from "../../store/chatStore";
import { useReadChat } from "../../api/chat";
import { IoIosAdd } from "react-icons/io";
import { getSenderName } from "./../../utils/chat/chat";
import GroupChatModal from "./GroupChatModal";

const MyChatList = () => {
  const boxBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  const user = useUserStore((state) => state.user);

  // selected chat state
  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );

  useEffect(() => {
    console.log("Selected chat changed:", selectedChat);
  }, [selectedChat, setSelectedChat]);

  // chats state
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);

  const toast = useToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useReadChat();

  React.useEffect(() => {
    if (data) {
      setChats(data);
    } else if (isError) {
      toast({
        title: "Error fetching chats",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [data, setChats]);

  const handleCreateGroup = (groupName) => {
    // TODO: Add your group chat creation logic here
    toast({
      title: `Group "${groupName}" created!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      w={{ base: "100%", md: "30%" }}
      bg={boxBg}
      borderRadius="lg"
      boxShadow="md"
      p={4}
      h={"100vh"}
      overflowY="auto"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      justify={"start"}
    >
      <HStack justify={"space-between"} mb={4}>
        <Text fontSize="xl" fontWeight="bold" color={textColor}>
          Chats
        </Text>
        <Button
          rightIcon={<IoIosAdd />}
          colorScheme="teal"
          variant="outline"
          onClick={() => setModalOpen(true)}
        >
          <Text fontSize="sm" color={subTextColor}>
            New Group Chat
          </Text>
        </Button>
      </HStack>
      <VStack spacing={3} align="stretch">
        {chats.map((chat) => (
          <Box
            key={chat._id}
            p={3}
            borderRadius="md"
            bg={selectedChat?._id === chat._id ? "gray.700" : boxBg}
            borderWidth={1}
            borderColor={
              selectedChat?._id === chat._id ? "teal.200" : borderColor
            }
            _hover={{ bg: hoverBg, cursor: "pointer" }}
            onClick={() => setSelectedChat(chat)}
          >
            {!chat.isGroupChat ? (
              <HStack>
                <Avatar name={chat.users[0].name || "Abhishek"} size="sm" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" color={textColor}>
                    {getSenderName(user, chat.users)}
                  </Text>
                  <Text fontSize="sm" color={subTextColor}>
                    {chat.latestMessage?.content || "No messages yet"}
                  </Text>
                </VStack>
                <Flex align="center" justify="center">
                  <Circle size="3" bg="green.300" />
                </Flex>
              </HStack>
            ) : (
              <HStack>
                <Avatar name={chat.chatName} size="sm" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold" color={textColor}>
                    {chat.chatName}
                  </Text>
                  <Text fontSize="sm" color={subTextColor}>
                    {chat.latestMessage?.content || "No messages yet"}
                  </Text>
                </VStack>
                <Flex align="center" justify="center">
                  <Circle size="20px" bg="green.300" />
                </Flex>
              </HStack>
            )}
          </Box>
        ))}
        {isLoading && (
          <Text color={subTextColor} textAlign="center">
            Loading chats...
          </Text>
        )}
        {chats.length === 0 && !isLoading && (
          <Text color={subTextColor} textAlign="center">
            No chats available
          </Text>
        )}
      </VStack>

      {/* Group Chat Modal */}
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </Box>
  );
};

export default MyChatList;
