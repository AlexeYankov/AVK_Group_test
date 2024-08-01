import {Box, ListItem, UnorderedList} from "@chakra-ui/react";
import Link from "next/link";
import React, {ChangeEvent} from "react";

export const Pagination = ({
    postsPerPage,
    totalPosts,
    paginate,
    setCurrentPage,
    currentPage
}: {
    postsPerPage: number;
    totalPosts: number;
    paginate: (pageNumber: number) => void;
    setCurrentPage: (value: number) => void;
    currentPage: number;
}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <Box w="100%" display="flex" alignItems="center">
            <div onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
                <Link href={"#"}>{"<"}</Link>
            </div>
            <UnorderedList
                styleType="none"
                display="flex"
                alignItems="center"
                style={{margin: 0, padding: 0}}>
                {pageNumbers.map((number) => {
                    if (number <= 5 && currentPage <= 5) {
                        return (
                            <ListItem
                                px="10px"
                                py="20px"
                                key={number}
                                onClick={() => {
                                    paginate(number);
                                }}>
                                <Link
                                    href={"#"}
                                    style={{
                                        color: `${number === currentPage ? "gray" : "white"}`,
                                        background: `${number === currentPage ? "white" : ""}`,
                                        padding: "5px 10px",
                                        borderRadius: "4px"
                                    }}>
                                    {number}
                                </Link>
                            </ListItem>
                        );
                    }
                    if (
                        currentPage !== 1 &&
                        currentPage + 1 <= number + 2 &&
                        number - 3 <= currentPage - 2 &&
                        currentPage !== 5 &&
                        totalPosts - 4 !== currentPage
                    ) {
                        return (
                            <ListItem
                                key={number}
                                onClick={() => {
                                    paginate(number);
                                }}>
                                <Link href={"#"}>{number}</Link>
                            </ListItem>
                        );
                    }
                })}
            </UnorderedList>

            <div className={"flex items-center"}>
                <Link
                    href={"#"}
                    onClick={() =>
                        setCurrentPage(
                            currentPage < totalPosts / postsPerPage ? currentPage + 1 : currentPage
                        )
                    }>
                    {">"}
                </Link>
            </div>
        </Box>
    );
};
