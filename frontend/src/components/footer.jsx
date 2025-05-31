import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const bg = useColorModeValue("white.100", "gray.800");
  const color = useColorModeValue("gray.600", "white.100");

  return (
    <Box
      as="footer"
      w="100%"
      py={4}
      bg={bg}
      textAlign="center"
      boxShadow="sm"
      position="relative"
      bottom={0}
      fontSize="sm"
      color={color}
    >
      <Text>
        &copy; {new Date().getFullYear()} MERN Chat App. Made with ❤️ by Codeek
      </Text>
    </Box>
  );
};

export default Footer;
