import {instanceComments} from "./baseApi";
import {CommentType} from "@/types/types";
import {useQuery} from "@tanstack/react-query";

const commentsApi = {
    getComments(postId: string) {
        return instanceComments.get<Array<CommentType>>("", {params: {postId}});
    }
};

const useGetComments = (postId: string) => {
    return useQuery({
        queryKey: ["comments"],
        queryFn: async () =>
            await commentsApi.getComments(postId).then((res) => {
                return res.data;
            })
        // }), enabled: false
    });
};

export {useGetComments, commentsApi};
