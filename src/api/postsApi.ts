import {instance} from "./baseApi";
import {PostType} from "@/types/types";
import { toastWrapper } from "@/ui-kit/toast";
import {useQuery} from "@tanstack/react-query";

const baseGetPosts = (pageNumber: string) => "/" + pageNumber + "0";

const postsApi = {
    getPosts(pageNumber: string) {
        return instance.get<PostType>(baseGetPosts(pageNumber));
    }
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
