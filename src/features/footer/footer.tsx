import {PaginationType} from "@/types/types";
import {Pagination} from "@/ui-kit/pagination";

export const Footer = (prop: PaginationType) => {
    const {postsPerPage, totalPosts, paginate, setCurrentPage, currentPage} = prop;
    return (
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            currentPage={currentPage}
            paginate={paginate}
            setCurrentPage={setCurrentPage}
        />
    );
};
