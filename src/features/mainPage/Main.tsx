"use client";

import { useEffect, useState } from "react";
import { SpinnerForClient } from "@/ui-kit/spinner";
import { useGetPosts } from "@/api/postsApi";
import { Footer } from "../footer";
import { Header } from "../header";
import { Catalog } from "../catalog/catalog";
import { useRouter, useSearchParams } from "next/navigation";

const postsPerPage = 20;

export const MainPage = () => {
  const router = useRouter();
  const url = useSearchParams()!;
  const currentParams = new URLSearchParams(url);
  const currentPageFromUrl = currentParams.get("currentPage");

  const [currentPage, setCurrentPage] = useState(
    currentPageFromUrl ? Number(currentPageFromUrl) : 1,
  );
  const { data, isLoading } = useGetPosts();
  useEffect(() => {
    if (!data?.length) {
      return;
    }
    const maxPages = Math.ceil(data?.length / postsPerPage);
    if (Number(currentPageFromUrl) >= maxPages) {
      router.push("?currentPage=" + maxPages);
      setCurrentPage(5);
    }
    if (
      Number(currentPageFromUrl) < 1 ||
      Number.isNaN(Number(currentPageFromUrl))
    ) {
      setCurrentPage(1);
      router.push("?currentPage=" + 1);
    }
  }, [data, currentPageFromUrl, router]);

  if (!data || isLoading) {
    return <SpinnerForClient />;
  }

  const lastPageIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPostsData = data.length
    ? data.slice(firstPageIndex, lastPageIndex)
    : [];
  const paginate = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
      router.push("?currentPage=" + pageNumber);
      return;
    }
  };

  return (
    <>
      <Catalog posts={currentPostsData} />
      <Header />
      <Footer
        postsPerPage={postsPerPage}
        totalPosts={data.length ?? null}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};
