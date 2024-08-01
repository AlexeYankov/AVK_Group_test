import {PaginationType} from "@/types/types";
import {Box, ListItem, UnorderedList} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const Pagination = ({
    postsPerPage,
    totalPosts,
    paginate,
    setCurrentPage,
    currentPage
}: PaginationType) => {
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
                })}
            </UnorderedList>
            <div>
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
            <Box pl="8" display={["none", "block"]}>
                20 items per page
            </Box>
        </Box>
    );
};
