import { Box, Image, Text, VStack, Divider, HStack } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user }) => {
  return (
    <Box
      w="100%"
      p={3}
      bg={"gray.50"}
      cursor="pointer"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      _hover={{ bg: "gray.200", boxShadow: "sm" }}
      transition="all 0.2s"
      mb={2}
    >
      <HStack spacing={4} align="center">
        <Image
          src={
            user.pic?.startsWith("http")
              ? user.pic
              : `data:image;base64,${user.pic}`
          }
          boxSize="16"
          borderRadius="full"
          alt={user.name}
          border="2px solid"
          borderColor="gray.100"
        />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold" fontSize="md">
            {user.name}
          </Text>
          <Text noOfLines={1} color="gray.500" fontSize="sm">
            {user.email}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UserListItem;
