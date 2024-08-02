"use client";

import {useState} from "react";
import {SpinnerForClient} from "@/ui-kit/spinner";
import {useGetPosts} from "@/api/postsApi";
import {Footer} from "../footer";
import {Header} from "../header";
import {Catalog} from "../catalog/Catalog";

const postsPerPage = 20;

export const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {data, isLoading} = useGetPosts();
    if (!data || isLoading) {
        return <SpinnerForClient />;
    }
    const lastPaymentIndex = currentPage * postsPerPage;
    const firstPaymentIndex = lastPaymentIndex - postsPerPage;
    const currentData = data.length ? data.slice(firstPaymentIndex, lastPaymentIndex) : [];
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Catalog posts={currentData} />
            <Header />
            <Footer
                postsPerPage={postsPerPage}
                totalPosts={data.length ?? null}
                currentPage={currentPage}
                paginate={paginate}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};
