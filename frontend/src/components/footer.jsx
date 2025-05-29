import { Box, Text } from "@chakra-ui/react";

const Footer = () => (
  <Box
    as="footer"
    w="100%"
    py={4}
    bg="whiteAlpha.800"
    textAlign="center"
    boxShadow="sm"
    position="relative"
    bottom={0}
    fontSize="sm"
    color="gray.600"
  >
    <Text>
      &copy; {new Date().getFullYear()} MERN Chat App. Made with ❤️ by Codeek
    </Text>
  </Box>
);

export default Footer;
