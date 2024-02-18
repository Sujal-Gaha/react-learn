import { posts } from "../data/posts.ts";
import { useParams } from "react-router-dom";

export function PostDetail() {
  const params = useParams();

  const postId = parseInt(params.postId || "");

  if (postId) {
    return (
      <div>
        <p>id: {posts.find((post) => post.id === postId)?.id}</p>
        <p>Title: {posts.find((post) => post.id === postId)?.title}</p>
      </div>
    );
  }

  return <div>Post id not found</div>;
}