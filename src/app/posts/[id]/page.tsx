import { CommentPage } from "@/features/commentPage/CommentPage";
import NotFoundPage from "@/features/notFoundPage/NotFound";

const Post = async ({ params }: { params: { id: string } }) => {
  return <CommentPage id={params.id} />;
};

export default Post;
