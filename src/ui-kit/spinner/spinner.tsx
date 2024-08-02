import { Center, Spinner } from "@chakra-ui/react";

export const SpinnerForClient = () => (
  <Center h="100dvh" color="white" w="100%">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Center>
);
