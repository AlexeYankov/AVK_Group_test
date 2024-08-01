import {instance} from "./baseApi";
import {CreatePostType, PostType} from "@/types/types";
import {useQuery} from "@tanstack/react-query";

const baseGetPosts = (pageNumber: string) => "/" + pageNumber + "0";

const postsApi = {
    getPosts(pageNumber: string) {
        // return instance.get<PostType>(baseGetPosts(pageNumber));
        return instance.get<Array<PostType>>("");
    },
    createPost(data: CreatePostType) {
        return instance.post<CreatePostType>('', data);
      },
};

const useGetPosts = (pageNumber: number) => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: async () =>
            await postsApi.getPosts(pageNumber.toString()).then((res) => {
                return res.data;
            })
        // }), enabled: false
    });
};

export {useGetPosts, postsApi};
