"uce client";

import Link from "next/link";
import {CommentType, PostType} from "@/types/types";
import {Box, Center, ListItem} from "@chakra-ui/react";
import Image from "next/image";

export const Post = (prop: {post: PostType | CommentType; isPost?: boolean}) => {
    return (
        <Center>
            <Link href={prop.isPost ? "/posts/" + prop.post.id : "#"} style={{width: "100%"}}>
                <ListItem
                    p="4"
                    bgGradient="linear(gray.300, teal.400)"
                    rounded={"lg"}
                    mt="6"
                    minH={"80px"}
                    cursor={"pointer"}
                    _hover={{
                        shadow: "md",
                        transform: "translateY(-3px)",
                        transitionDuration: "0.2s",
                        transitionTimingFunction: "ease-in-out"
                    }}
                    color="black">
                    <Box>
                        {prop.isPost ? "author" : "comment"} id: {prop.post.id}
                    </Box>
                    {prop.post.title ?? prop.post.body}
                </ListItem>
            </Link>
        </Center>
    );
};
