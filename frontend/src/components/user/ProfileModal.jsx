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
  Image,
  Text,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/chatStore";
import { FaRegEye } from "react-icons/fa";

const ProfileModal = ({ user, displayText = true }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              {user.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={
                user.pic?.startsWith("http")
                  ? user.pic
                  : `data:image;base64,${user.pic}`
              }
              alt={user.name}
              mb={4}
            />
            <Text>Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
