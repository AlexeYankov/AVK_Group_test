export type PostType = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

export type CreatePostType = CreatePostFormType & {
    userId: string;
};
export type CreatePostFormType = {
    title: string;
    body: string;
};

export type PaginationType = {
    postsPerPage: number;
    totalPosts: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
    setCurrentPage: (value: number) => void;
};
