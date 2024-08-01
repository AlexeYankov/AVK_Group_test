import {Center, Text} from "@chakra-ui/react";
import {PostCreatePanel} from "../postCreatePanel";

export const Header = () => {
    return (
        <>
            <Center>
                <Text fontSize={["2xl", "3xl"]} pt={8}>
                    Welcome to AVK test app
                </Text>
            </Center>
            <PostCreatePanel />
        </>
    );
};
