import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/chatStore";
import { FaRegEye } from "react-icons/fa";
import { useSelectedChatStore } from "../../store/chatStore";
import UserBadge from "../user/UserBadge";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchUsers } from "../../api/users";
import UserListItem from "../user/UserListItem";
import {
  useAddUserToGroupChat,
  useRemoveUserFromGroupChat,
  useUpdateGroupChatName,
} from "../../api/chat";
import { set } from "mongoose";

// Validation schema using yup
const schema = yup.object().shape({
  groupName: yup.string().required("Group name is required"),
  searchedUser: yup.string(),
});

const GroupChatModal = ({ userInfo, displayText = true }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedChat = useSelectedChatStore((state) => state.selectedChat);
  const setSelectedChat = useSelectedChatStore(
    (state) => state.setSelectedChat
  );
  const user = useUserStore((state) => state.user);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: "",
      searchedUser: "",
    },
    resolver: yupResolver(schema),
  });

  const searchedUser = watch("searchedUser");

  // for searching user
  const { data, isLoading, isError, error } = useSearchUsers(searchedUser);

  // for updating group chat name
  const { mutateAsync: updateGroupChatName } = useUpdateGroupChatName();

  // for adding user to group chat
  const { mutateAsync: addUserToGroupChat } = useAddUserToGroupChat();

  // Handle delete user from group chat
  const { mutateAsync: removeUserFromGroupChat } = useRemoveUserFromGroupChat();

  const onUpdateGroupName = (data) => {
    // Here you would call your API to update the group name
    // For demo, just update the selectedChat in store

    const chatId = selectedChat._id;
    const newGroupName = data.groupName;
    updateGroupChatName({ chatId, chatName: newGroupName })
      .then((updatedChat) => {
        setSelectedChat(updatedChat);
        toast({
          title: "Group name updated",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating group name:", error);
        toast({
          title: "Error updating group name",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const addUser = (userToAdd) => {
    // Check if the user is already in the group
    const isUserAlreadyInGroup = selectedChat.users.some(
      (user) => user._id === userToAdd._id
    );
    if (isUserAlreadyInGroup) {
      toast({
        title: "User already in group",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only group admin can add users",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    console.log("Adding user to group chat:", userToAdd);

    const chatId = selectedChat._id;
    const userId = userToAdd._id;
    addUserToGroupChat({ chatId, userId })
      .then((updatedChat) => {
        setSelectedChat(updatedChat);
        toast({
          title: "User added to group",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset();
      })
      .catch((error) => {
        console.error("Error adding user to group chat:", error);
        toast({
          title: "Error adding user",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const removeUser = (userToRemove) => {
    // Check if the user is the group admin
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can remove users",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const chatId = selectedChat._id;
    const userId = userToRemove._id;
    removeUserFromGroupChat({ chatId, userId })
      .then((updatedChat) => {
        // if the user being removed is the current user, close the modal and reset selected chat
        if (userToRemove._id === user._id) {
          toast({
            title: "You have left the group",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setSelectedChat(null);
          onClose();
        } else {
          setSelectedChat(updatedChat);
          toast({
            title: "User removed from group",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error removing user from group chat:", error);
        toast({
          title: "Error removing user",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Box
        display={!displayText ? "none" : "block"}
        w={"100%"}
        onClick={onOpen}
      >
        My Profile
      </Box>

      <Button display={!displayText ? "block" : "none"} onClick={onOpen}>
        <FaRegEye />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            <Text fontSize="2xl" fontWeight="bold">
              {selectedChat.chatName.toUpperCase()}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            {/* Group Name Update Form */}
            <form
              onSubmit={handleSubmit(onUpdateGroupName)}
              style={{ width: "100%" }}
            >
              <FormControl isInvalid={!!errors.groupName} mb={4}>
                <FormLabel>Update Group Name</FormLabel>
                <HStack>
                  <Controller
                    name="groupName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="Enter new group name"
                        {...field}
                        defaultValue={selectedChat?.chatName || ""}
                      />
                    )}
                  />
                  <Button type="submit" colorScheme="teal">
                    Update
                  </Button>
                </HStack>
                <FormErrorMessage>
                  {errors.groupName && errors.groupName.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.searchedUser} mb={4}>
                <FormLabel>Add Users</FormLabel>
                <Controller
                  name="searchedUser"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Search users" {...field} />
                  )}
                />
                <FormErrorMessage>
                  {errors.searchedUser && errors.searchedUser.message}
                </FormErrorMessage>
              </FormControl>

              {/* {selectedUsers.length > 0 && (
                <HStack mb={3} spacing={2}>
                  {selectedUsers.map((user) => (
                    <UserBadge
                      key={user._id}
                      user={user}
                      handleFunction={handleDelete}
                    />
                  ))}
                </HStack>
              )} */}

              {isLoading && <Spinner size="md" color="teal.500" />}
              {isError && (
                <Box color="red.500" mb={2}>
                  Error fetching users: {error.message}
                </Box>
              )}
              {data && data.length > 0 && (
                <Box as="ul" mb={2}>
                  {data.slice(0, 5).map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={addUser}
                    />
                  ))}
                </Box>
              )}
              {data && data.length === 0 && (
                <Box color="red.500" mb={2}>
                  No users found
                </Box>
              )}
            </form>

            {/* User Badges */}
            <HStack spacing={4} mb={4} width={"100%"} flexWrap="wrap">
              {selectedChat.users.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  handleFunction={removeUser}
                />
              ))}
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => removeUser(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
