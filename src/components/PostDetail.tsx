import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../data/fetch-post-by-id";
import { TComment, TPost } from "../types";
import { fetchComments } from "../data/fetch-comments";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const result = await getPostById(postId);
      // ui logic here
      setPost(result);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    async function fetchCommentsFn() {
      const comments = await fetchComments(postId);
      setComments(comments);
    }
    fetchCommentsFn();
  }, []);

  const handleCommentButtonClick = () => {
    if (isCommentVisible) {
      setIsCommentVisible(false);
      setCommentButtonText("Show Comments");
    } else {
      setIsCommentVisible(true);
      setCommentButtonText("Hide Comments");
    }
  };

  const handleCommentDelete = (commentId: number) => {
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(filteredComments);
    console.log("Deleted commentId: ", commentId);
    console.log(filteredComments);
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
                <h4>
                  {comment.id}. {comment.email}
                </h4>
                <div
                  style={{
                    display: "flex",
                    padding: "15px",
                  }}
                >
                  <p>{comment.body}</p>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "20px",
                    }}
                  >
                    <FaEdit
                      onClick={() => {
                        setIsCommentModalOpen(true);
                      }}
                    />
                    <MdDelete
                      onClick={() => {
                        handleCommentDelete(comment.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {isCommentModalOpen ? (
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "darkgray",
            height: "500px",
            width: "600px",
            border: "1px solid black",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <h1>This is the Comment Modal</h1>
          <button
            onClick={() => {
              setIsCommentModalOpen(false);
            }}
          >
            Close Modal
          </button>
        </div>
      ) : null}
    </div>
  );
}
