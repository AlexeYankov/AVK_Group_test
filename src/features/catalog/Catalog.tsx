"use client";

import Image from "next/image";
import { CommentType, PostType } from "@/types/types";
import { Center, List, Text } from "@chakra-ui/react";
import { Post } from "../post";
import { usePathname } from "next/navigation";

type CatalodType<T> = {
  posts: Array<T>;
};

export const Catalog = (prop: CatalodType<CommentType | PostType>) => {
  const pathname = usePathname();
  const pathnameId = pathname.slice(7);
  const commentOrPostType = !pathname.slice(6).length;
  const getDescription = localStorage.getItem("description");
  return (
    <List w={"100%"}>
      {!commentOrPostType && (
        <Center pt="16" position={"relative"}>
          <Image
            src={`https://via.assets.so/furniture.png?id=${pathnameId}&q=95&w=360&h=360&fit=fill`}
            alt={"image-collection"}
            height={182}
            width={180}
            style={{ zIndex: 2, background: "black" }}
          />
        </Center>
      )}
      <Text pt="6">{!commentOrPostType && getDescription}</Text>
      {prop.posts.length
        ? prop.posts.map((post) => {
            return (
              <Post key={post.id} post={post} isPost={commentOrPostType} />
            );
          })
        : null}
    </List>
  );
};
