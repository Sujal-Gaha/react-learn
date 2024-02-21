import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TPost } from "../types";
import { getPost } from "../data/posts";

export function PostDetail() {
  const params = useParams();

  const postId = parseInt(params.postId || "");

  if (postId) {
    return (
      <div>
        <PostData postId={postId} />
      </div>
    );
  }

  return <div>Post id not found</div>;
}

function PostData(props: { postId: number }) {
  const [post, setPost] = useState<TPost | null>(null);

  useEffect(() => {
    async function getPostFromServer() {
      console.log("props", props);
      const post = await getPost(props.postId);
      setPost(post);
    }

    getPostFromServer();
  }, []);

  return (
    <div>
      <p>Id: {post?.id}</p>
      <p>Title: {post?.title}</p>
      <p>Body: {post?.body}</p>
    </div>
  );
}
