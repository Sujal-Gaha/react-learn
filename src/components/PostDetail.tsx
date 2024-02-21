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
          color: "lightpink",
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
      <label
        htmlFor="comment"
        style={{
          margin: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <textarea
          name="comment"
          id="comment"
          cols={60}
          rows={2}
          placeholder="Add a comment..."
          style={{
            resize: "none",
            boxSizing: "border-box",
            width: "45%",
          }}
        ></textarea>
        <button style={{ width: "80px", height: "22px", alignSelf: "end" }}>
          Comment
        </button>
        <button style={{ width: "80px", height: "22px", alignSelf: "end" }}>
          Cancel
        </button>
      </label>
    </div>
  );
}
