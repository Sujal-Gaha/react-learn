import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../data/fetch-post-by-id";
import { TComment, TPost } from "../types";
import { fetchComments } from "../data/fetch-comments";

export function PostDetail() {
  const params = useParams();
  const postId = parseInt(params.postId || "");
  const [post, setPost] = useState<TPost | null>(null);

  if (postId) {
    return <Post postId={postId} post={post} setPost={setPost} />;
  }

  return <div>Post id not found</div>;
}

function Post({
  post,
  setPost,
  postId,
}: {
  post: TPost | null;
  setPost: React.Dispatch<React.SetStateAction<TPost | null>>;
  postId: number;
}) {
  const [comments, setComments] = useState<TComment[]>([]);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [commentButtonText, setCommentButtonText] = useState("Show Comments");

  useEffect(() => {
    async function fetchPost() {
      const result = await getPostById(postId);
      // ui logic here
      setPost(result);
    }
    fetchPost();
  }, [postId, setPost]);

  useEffect(() => {
    async function fetchCommentsFn() {
      const comments = await fetchComments(postId);
      setComments(comments);
    }
    fetchCommentsFn();
  }, [postId]);

  const handleCommentButtonClick = () => {
    if (isCommentVisible) {
      setIsCommentVisible(false);
      setCommentButtonText("Show Comments");
    } else {
      setIsCommentVisible(true);
      console.log(isCommentVisible);
      setCommentButtonText("Hide Comments");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        border: "2px solid gray",
        borderRadius: "4px",
        backgroundColor: "lightgray",
        margin: "60px auto",
        width: "50%",
        padding: "0 80px",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          color: "darkorange",
          padding: "10px 25px",
        }}
      >
        Post no. {post?.id}
      </h2>
      <h1
        style={{
          fontWeight: "bolder",
          padding: "25px",
          color: "darkorchid",
        }}
      >
        {post?.title}
      </h1>
      <p
        style={{
          textAlign: "center",
          padding: "28px 0",
        }}
      >
        {post?.body}
      </p>
      <p
        style={{
          textAlign: "end",
          paddingRight: "25px",
          color: "violet",
        }}
      >
        <u>---Posted by userId: {post?.userId}</u>
      </p>
      <hr
        style={{
          margin: "20px 25px 25px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <button
          onClick={() => {
            handleCommentButtonClick();
          }}
        >
          {commentButtonText}
        </button>
      </div>
      {isCommentVisible ? (
        <div>
          <h3>Comments</h3>

          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <h4>{comment.email}</h4>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
