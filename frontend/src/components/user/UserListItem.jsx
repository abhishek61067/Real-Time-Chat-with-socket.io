import {
  Box,
  Image,
  Text,
  VStack,
  Divider,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user }) => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const emailColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Box
      w="100%"
      p={3}
      bg={bg}
      cursor="pointer"
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ bg: hoverBg, boxShadow: "sm" }}
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
          borderColor={borderColor}
        />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold" fontSize="md" color={textColor}>
            {user.name}
          </Text>
          <Text noOfLines={1} color={emailColor} fontSize="sm">
            {user.email}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UserListItem;
