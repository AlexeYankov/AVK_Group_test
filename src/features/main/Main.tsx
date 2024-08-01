"use client";

import {useGetPosts} from "@/api/postsApi";
import {SpinnerForClient} from "@/ui-kit/spinner";
import {toastWrapper} from "@/ui-kit/toast";
import {useState} from "react";

export const MainPage = () => {
    const [pabeNumber, setPageNumber] = useState(1);
    const {data, isLoading, isError} = useGetPosts(pabeNumber);
    console.log(data);
    if (!data || isLoading) {
        return <SpinnerForClient />;
    }
    if (isError) {
        toastWrapper("при загрузке постов что-то пошло не так... попробуйте еще", true);
    }
    return <>{data?.id}</>;
};
