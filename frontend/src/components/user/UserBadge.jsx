import { Badge, HStack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
const UserBadge = ({ user, handleFunction }) => {
  return (
    <Badge key={user._id} colorScheme="teal" mr={2}>
      <HStack spacing={2}>
        <Text>{user.name}</Text>
        <CloseIcon
          boxSize={3}
          cursor="pointer"
          onClick={() => handleFunction(user)}
          data-testid="close-icon"
        />{" "}
      </HStack>
    </Badge>
  );
};

export default UserBadge;
