"use client";

import { SpinnerForClient } from "@/ui-kit/spinner";
import { Catalog } from "../catalog/catalog";
import { useGetComments } from "@/api/commentsApi";

export const CommentPage = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching } = useGetComments(id);

  if (!data || isLoading || isFetching) {
    return <SpinnerForClient />;
  }
  return <Catalog posts={data} />;
};
