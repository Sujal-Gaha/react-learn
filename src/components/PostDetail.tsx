import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../data/fetch-post-by-id";
import { TComment, TPost } from "../types";
import { fetchComments } from "../data/fetch-comments";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

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
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null);

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

  const handleCommentChange = (updatedComment: string) => {
    setSelectedComment((prevValue) => {
      if (prevValue) {
        return {
          ...prevValue,
          body: updatedComment,
        };
      } else {
        return prevValue;
      }
    });
  };

  const handleFormSubmission = () => {
    const updatedComment = comments.map((comment) => {
      if (comment.id === selectedComment?.id) {
        return selectedComment;
      } else {
        return comment;
      }
    });

    setComments(updatedComment);
    setIsCommentModalOpen(false);
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
        padding: "20px 80px",
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
        Title: {post?.title}
      </h1>
      <p
        style={{
          textAlign: "left",
          padding: "28px",
        }}
      >
        <span style={{ fontWeight: "bolder" }}>Body: </span>
        {post?.body}
      </p>
      <p
        style={{
          textAlign: "end",
          paddingRight: "25px",
          color: "darkviolet",
        }}
      >
        <u>----Posted by userId: {post?.userId}</u>
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
          style={{
            cursor: "pointer",
            margin: "22px",
          }}
          onClick={() => {
            handleCommentButtonClick();
          }}
        >
          {commentButtonText}
        </button>
      </div>
      {isCommentVisible ? (
        <div>
          <h3
            style={{
              paddingBottom: "10px",
            }}
          >
            Comments
          </h3>

          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <h4>
                  {comment.id}. {comment.email}
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 36px",
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
                      style={{
                        cursor: "pointer",
                        color: "darkmagenta",
                      }}
                      onClick={() => {
                        setIsCommentModalOpen(true);
                        setSelectedComment({
                          body: comment.body,
                          postId: comment.postId,
                          id: comment.id,
                          email: comment.email,
                          name: comment.name,
                        });
                      }}
                    />
                    <MdDelete
                      style={{
                        cursor: "pointer",
                        color: "purple",
                      }}
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
            height: "450px",
            width: "850px",
            border: "1px solid black",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <IoIosCloseCircle
            style={{
              float: "right",
              margin: "-2px",
              fontSize: "25px",
              color: "darkmagenta",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsCommentModalOpen(false);
            }}
          />
          <h3
            style={{
              padding: "20px 20px 0",
              color: "purple",
            }}
          >
            Edit the comment
          </h3>
          <p
            style={{
              textAlign: "right",
              paddingRight: "125px",
              color: "white",
            }}
          >
            Post Id: {selectedComment?.postId}
          </p>
          <hr />
          <div
            style={{
              textAlign: "left",
              padding: "40px 120px",
              color: "darkmagenta",
              fontWeight: "lighter",
            }}
          >
            <h2>Id: {selectedComment?.id}</h2>
            <h2>Commented by: {selectedComment?.email}</h2>
          </div>
          <form
            action=""
            style={{
              padding: "15px 90px",
              textAlign: "center",
            }}
            onSubmit={(event) => {
              event.preventDefault();
              handleFormSubmission();
            }}
          >
            <label
              htmlFor="body"
              style={{
                paddingLeft: "33px",
                float: "left",
                marginBottom: "5px",
                fontWeight: "bolder",
              }}
            >
              Enter the new comment here:
            </label>
            <br />
            <input
              type="text"
              id="body"
              value={selectedComment?.body}
              style={{
                width: "90%",
                height: "30px",
              }}
              onChange={(event) => {
                const comment = event.target.value;
                handleCommentChange(comment);
              }}
            />
            <button
              style={{
                margin: "35px 0",
                width: "90%",
                backgroundColor: "springgreen",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
