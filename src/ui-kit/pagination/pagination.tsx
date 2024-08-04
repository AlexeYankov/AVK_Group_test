import { PaginationType } from "@/types/types";
import { Box, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import React from "react";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationType) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box w="100%" display="flex" alignItems="center">
      <Box
        onClick={() => {
          paginate(currentPage > 1 ? currentPage - 1 : 1);
        }}
      >
        <Text cursor={"pointer"}>{"<"}</Text>
      </Box>
      <UnorderedList
        styleType="none"
        display="flex"
        alignItems="center"
        style={{ margin: 0, padding: 0 }}
      >
        {pageNumbers.map((number) => {
          return (
            <ListItem
              px="10px"
              py="20px"
              cursor={"pointer"}
              key={number}
              onClick={() => {
                paginate(number);
              }}
            >
              <span
                style={{
                  color: `${number === currentPage ? "gray" : "white"}`,
                  background: `${number === currentPage ? "white" : ""}`,
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                {number}
              </span>
            </ListItem>
          );
        })}
      </UnorderedList>
      <Box>
        <Text
          cursor={"pointer"}
          onClick={() => {
            paginate(
              currentPage < totalPosts / postsPerPage
                ? currentPage + 1
                : currentPage,
            );
          }}
        >
          {">"}
        </Text>
      </Box>
      <Box pl="8" display={["none", "block"]}>
        20 items per page
      </Box>
    </Box>
  );
};
