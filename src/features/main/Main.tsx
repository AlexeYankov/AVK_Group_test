"use client";

import {useState} from "react";
import {useGetPosts} from "@/api/postsApi";
import {SpinnerForClient} from "@/ui-kit/spinner";
import {Header} from "../header/header";
import {Footer} from "../footer";
import {Center} from "@chakra-ui/react";

const postsPerPage = 20;

export const MainPage = () => {
    const [pabeNumber, setPageNumber] = useState(1);
    const {data, isLoading} = useGetPosts(pabeNumber);
    console.log(data);
    if (!data || isLoading) {
        return <SpinnerForClient />;
    }
    return (
        <Center>
            <Center
                display={"flex"}
                flexDirection={"column"}
                maxW={"1440px"}
                w={"100%"}
                px={"20px"}>
                <Header />
                <Footer
                    postsPerPage={postsPerPage}
                    totalPosts={data.length ?? null}
                    currentPage={pabeNumber}
                    paginate={setPageNumber}
                    setCurrentPage={setPageNumber}
                />
            </Center>
        </Center>
    );
};
