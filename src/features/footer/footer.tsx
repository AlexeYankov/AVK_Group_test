import { PaginationType } from "@/types/types";
import { Pagination } from "@/ui-kit/pagination";

export const Footer = (prop: PaginationType) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = prop;
  return (
    <Pagination
      postsPerPage={postsPerPage}
      totalPosts={totalPosts}
      currentPage={currentPage}
      paginate={paginate}
    />
  );
};
