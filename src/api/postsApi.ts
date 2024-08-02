import { instance } from "./baseApi";
import { CreatePostType, PostType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const postsApi = {
  getPosts() {
    return instance.get<Array<PostType>>("");
  },
  createPost(data: CreatePostType) {
    return instance.post<CreatePostType>("", data);
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

export { useGetPosts, postsApi };
