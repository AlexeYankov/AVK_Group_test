import { instance } from "./baseApi";
import {
  CreatePostResponseType,
  CreatePostType,
  PostType,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const postsApi = {
  getPosts() {
    return instance.get<Array<PostType>>("");
  },
  getPost(id: string) {
    return instance.get<PostType>("/" + id);
  },
  createPost(data: CreatePostType) {
    return instance.post<CreatePostType, CreatePostResponseType>("", data);
  },
};

const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () =>
      await postsApi.getPosts().then((res) => {
        return res.data;
      }),
    // }), enabled: false
  });
};
const useGetCurrentPost = (id: string) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      if (+id > 100) {
        return { body: "" } as PostType;
      }
      return await postsApi.getPost(id).then((res) => {
        return res.data;
      });
    },
    // }), enabled: false
  });
};

export { useGetPosts, useGetCurrentPost, postsApi };
