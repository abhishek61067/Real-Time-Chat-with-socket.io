import { Text, Button, HStack } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import ProfileModal from "@/components/user/ProfileModal";
import GroupChatModal from "@/components/group/UpdateGroupChatModal";
import { getSenderInfo, getSenderName } from "@/utils/chat/chat";

const ChatHeader = ({ user, selectedChat, setSelectedChat }) => (
  <Text fontSize="2xl" fontWeight="bold">
    <Button
      size={"lg"}
      display={{ base: "block", md: "none" }}
      onClick={() => setSelectedChat(null)}
    >
      <BiArrowBack />
    </Button>
    {!selectedChat.isGroupChat ? (
      <HStack spacing={2}>
        <Text>{getSenderName(user, selectedChat.users)}</Text>
        <ProfileModal
          displayText={false}
          user={getSenderInfo(user, selectedChat.users)}
        />
      </HStack>
    ) : (
      <HStack spacing={2}>
        <Text>{selectedChat.chatName.toUpperCase()}</Text>
        <GroupChatModal displayText={false} />
      </HStack>
    )}
  </Text>
);

export default ChatHeader;
