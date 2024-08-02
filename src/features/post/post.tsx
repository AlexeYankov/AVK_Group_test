"uce client";

import Link from "next/link";
import {CommentType, PostType} from "@/types/types";
import {Box, Center, ListItem} from "@chakra-ui/react";

const ListItemPage = (prop: {post: PostType | CommentType; isPost?: boolean}) => {
    return (
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
                {prop.isPost ? "post" : "comment"} id: {prop.post.id}
            </Box>
            {prop.post.title ?? prop.post.body}
        </ListItem>
    );
};

export const Post = (prop: {post: PostType | CommentType; isPost?: boolean}) => {
    const setPostInfo = () => localStorage.setItem("description", prop.post.body);
    return (
        <Center onClick={setPostInfo}>
            {prop.isPost ? (
                <Link href={"/posts/" + prop.post.id} style={{width: "100%"}}>
                    <ListItemPage post={prop.post} isPost={prop.isPost} />
                </Link>
            ) : (
                <Box width="100%">
                    <ListItemPage post={prop.post} isPost={prop.isPost} />
                </Box>
            )}
        </Center>
    );
};
