import { useState, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  HStack,
  useToast,
  Spinner,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useSearchUsers } from "../../api/users";
import UserListItem from "../user/UserListItem";
import { useCreateChat } from "../../api/chat";
import { useChatStore, useSelectedChatStore } from "../../store/chatStore";

const SideDrawer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error } = useSearchUsers(search);
  const { mutateAsync: createChat, isLoading: createChatIsLoading } =
    useCreateChat();

  // Color mode values
  const drawerBg = useColorModeValue("white", "gray.800");
  const headerColor = useColorModeValue("teal.700", "teal.200");

  const handleSearch = () => {
    if (search === "") {
      toast({
        title: "Please enter a search term",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      // since search is used in useSearchUsers, it will automatically trigger the API call
      console.log(data);
    }
  };

  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);

  const accessOrCreateChat = (userId) => {
    createChat(userId)
      .then((chat) => {
        onClose();
        // append the new chat to the chats array if it doesn't already exist
        if (!chats.find((c) => c._id === chat._id)) {
          setChats([...chats, chat]);
        }
        setSelectedChat(chat);
        toast({
          title: "Chat created successfully",
          description: "You can now start chatting with the user.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Error creating chat:", err);
        toast({
          title: "Error creating chat",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button
        leftIcon={<LuSearch color="gray.300" />}
        ref={btnRef}
        colorScheme="transparent"
        variant="outline"
        onClick={onOpen}
        borderColor={"#CDC1FF"}
      >
        Search User
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerBg} borderRadius="md">
          <DrawerCloseButton />
          <DrawerHeader color={headerColor}>Create your account</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type here..."
              />
              <Button onClick={handleSearch}>GO</Button>
            </HStack>

            <Box mt={4}>
              {isLoading ? (
                <Spinner size="sm" color="teal.500" />
              ) : isError ? (
                <p>Error: {error.message}</p>
              ) : data && data.length > 0 ? (
                data.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    accessOrCreateChat={() => {
                      accessOrCreateChat(user._id);
                    }}
                  />
                ))
              ) : (
                <p>No users found</p>
              )}
            </Box>
            {createChatIsLoading && <Spinner size="sm" color="teal.500" />}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
