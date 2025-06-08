import { Box, Text, Button, VStack, Icon } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routes from "../routes/constant";

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, pink.100, purple.100, teal.100)"
    >
      <VStack
        spacing={6}
        p={10}
        bg="whiteAlpha.900"
        borderRadius="xl"
        boxShadow="2xl"
        align="center"
      >
        <Icon as={FaLock} boxSize={16} color="purple.400" />
        <Text fontSize="3xl" fontWeight="bold" color="purple.700">
          Unauthorized Access
        </Text>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          You do not have permission to view this page.
          <br />
          Please log in as an <b>admin</b> to get access.
        </Text>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => navigate(routes.LOGIN)}
        >
          Go to Login
        </Button>
      </VStack>
    </Box>
  );
};

export default UnAuthorized;
