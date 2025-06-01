import { useEffect } from "react";
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
} from "@chakra-ui/react";
import {
  useChatStore,
  useSelectedChatStore,
  useUserStore,
} from "../../store/chatStore";
import { useReadChat } from "../../api/chat";

// Dummy user data

const MyChatList = () => {
  const boxBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  const user = useUserStore((state) => state.user);
  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);

  const toast = useToast();

  const { data, isLoading, isError, error } = useReadChat();

  useEffect(() => {
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
    </Box>
  );
};

export default MyChatList;
