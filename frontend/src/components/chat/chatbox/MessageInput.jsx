import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const MessageInput = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  typingHandler,
  blurHandler,
}) => (
  <Box as="form" onSubmit={handleSubmit(onSubmit)}>
    <FormControl isInvalid={!!errors.message}>
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(e) => {
              field.onChange(e); // update form state
              if (typingHandler) typingHandler(e); // your custom logic
            }}
            onBlur={(e) => {
              if (blurHandler) blurHandler(e); // your custom logic
            }}
            placeholder="Type a message..."
            size="lg"
            mt={4}
          />
        )}
      />
      {errors.message && (
        <Text color="red.400" fontSize="sm" mt={1}>
          {errors.message.message}
        </Text>
      )}
    </FormControl>
    {/* Add a send button here if needed */}
  </Box>
);

export default MessageInput;
