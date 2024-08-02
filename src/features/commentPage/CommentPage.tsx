"use client";

import {SpinnerForClient} from "@/ui-kit/spinner";
import {Catalog} from "../catalog/Catalog";
import {useGetComments} from "@/api/commentsApi";

export const CommentPage = ({id}: {id: string}) => {
    const {data, isLoading} = useGetComments(id);
    if (!data || isLoading) {
        return <SpinnerForClient />;
    }
    return <Catalog posts={data} />;
};
