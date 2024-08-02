import {CommentPage} from "@/features/commentPage/CommentPage";

const Post = async ({params}: {params: {id: string}}) => {
    return <CommentPage id={params.id} />;
};

export default Post;
