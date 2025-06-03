import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  useToast,
  Spinner,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSearchUsers } from "../../api/users";
import UserListItem from "./../user/UserListItem";
import UserBadge from "../user/UserBadge";
import { useCreateGroupChat } from "../../api/chat";

// Validation schema using yup
const schema = yup.object().shape({
  groupName: yup.string().required("Group name is required"),
  searchedUser: yup.string().required("At least one user is required"),
});

const GroupChatModal = ({ isOpen, onClose }) => {
  const toast = useToast();

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

  const [selectedUsers, setSelectedUsers] = useState([]);

  const { data, isLoading, isError, error } = useSearchUsers(searchedUser);
  const { mutateAsync: createGroupChat } = useCreateGroupChat();

  const onSubmit = (formData) => {
    const users = selectedUsers.map((user) => user._id);
    const groupData = {
      name: formData.groupName,
      users,
    };
    console.log("Group Data:", groupData);

    createGroupChat(groupData)
      .then((response) => {
        toast({
          title: "Group chat created successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        reset();
        setSelectedUsers([]);
        onClose();
      })
      .catch((err) => {
        console.error("Error creating group chat:", err);
        toast({
          title: "Failed to create group chat",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const selectUser = (user) => {
    if (selectedUsers.some((u) => u._id === user._id)) {
      toast({
        title: "User already selected",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
    toast({
      title: `${user.name} added to group`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    toast({
      title: `${user.name} removed from group`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Group Chat</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl isInvalid={!!errors.groupName} mb={4}>
              <FormLabel>Group Name</FormLabel>
              <Controller
                name="groupName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Enter group name" {...field} />
                )}
              />
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

            {/* for displaying badges after user select on the searched user lists */}
            {selectedUsers.length > 0 && (
              <HStack mb={3} spacing={2}>
                {selectedUsers.map((user) => (
                  <UserBadge
                    key={user._id}
                    user={user}
                    handleFunction={handleDelete}
                  />
                ))}
              </HStack>
            )}

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
                    handleFunction={selectUser}
                  />
                ))}
              </Box>
            )}
            {data && data.length === 0 && (
              <Box color="red.500" mb={2}>
                No users found
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} type="submit">
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default GroupChatModal;
