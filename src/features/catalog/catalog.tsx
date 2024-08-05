"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { CommentType, PostType } from "@/types/types";
import { Center, List, Text } from "@chakra-ui/react";
import { Post } from "../post";
import { useGetCurrentPost } from "@/api/postsApi";
import { SpinnerForClient } from "@/ui-kit/spinner";

type CatalodType<T> = {
  posts: Array<T>;
  id?: string;
};

export const Catalog = (prop: CatalodType<CommentType | PostType>) => {
  const { data, isFetching, isLoading } = useGetCurrentPost(prop.id ?? "");
  let description = data?.body;
  const pathname = usePathname();
  const pathnameId = pathname.slice(7);
  const commentOrPostType = !pathname.slice(6).length;
  if (isFetching || isLoading) {
    return <SpinnerForClient />;
  }
  if (prop.id && +prop.id > 100) {
    description = localStorage.getItem("description") ?? "";
  }
  return (
    <List w={"100%"}>
      {commentOrPostType && (
        <Text fontSize="2xl" pt="8">
          Posts list:
        </Text>
      )}
      {!commentOrPostType && (
        <Center pt="12" position={"relative"}>
          <Image
            src={`https://via.assets.so/furniture.png?id=${pathnameId}&q=95&w=360&h=360&fit=fill`}
            alt={"image-collection"}
            height={182}
            width={180}
          />
        </Center>
      )}
      {!commentOrPostType && <Text pt="6"> {description}</Text>}
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
