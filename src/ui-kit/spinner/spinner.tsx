import {Center, Spinner} from "@chakra-ui/react";

export const SpinnerForClient = () => (
    <Center bg="gray" h="100dvh" color="white">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Center>
);
