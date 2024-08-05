"use client";

import {SpinnerForClient} from "@/ui-kit/spinner";
import {Catalog} from "../catalog/catalog";
import {useGetComments} from "@/api/commentsApi";
import {useRouter} from "next/navigation";

export const CommentPage = ({id}: {id: string}) => {
    const router = useRouter();
    const {data, isLoading, isFetching} = useGetComments(id);
    if (+id > 101 || Number.isNaN(+id)) {
        router.push("/posts");
    }
    if (!data || isLoading || isFetching) {
        return <SpinnerForClient />;
    }
    return <Catalog posts={data} id={id} />;
};
