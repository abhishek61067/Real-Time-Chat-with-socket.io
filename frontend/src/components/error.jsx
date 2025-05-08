import React from "react";
import { Text } from "@chakra-ui/react";

const Error = (message) => {
  return (
    <Text fontSize="2xl" textAlign="center" color="red.500">
      {message}
    </Text>
  );
};

export default Error;
