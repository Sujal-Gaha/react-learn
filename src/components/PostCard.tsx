import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { deletePost } from "../data/delete-post";
import { TPost } from "../types";

export function PostCard(props: {
  title: string;
  description: string;
  postId: number;
  setPosts: React.Dispatch<React.SetStateAction<TPost[]>>;
  posts: TPost[];
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const [failedDelete, setFailedDelete] = useState("");

  // TODO: make an state for error message

  const handlePostDelete = async (postId: number) => {
    // set the isDeleting state to true
    setIsDeleting(true);

    setFailedDelete("");

    // make api call to the backend to delete the post
    try {
      await deletePost(postId);

      // remove the post from the UI
      const filteredPosts = props.posts.filter((post) => post.id !== postId);
      props.setPosts(filteredPosts);
    } catch (error) {
      console.log("Error when deleting the post with id:", postId, error);

      // TODO: set the message that is shown to the user
      setFailedDelete("Failed to delete the post");
    }

    // set the isDeleting state to false
    setIsDeleting(false);
  };

  return (
    <div
      style={{
        border: "2px solid #eee",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <h2
        style={{
          color: "#aaa",
        }}
      >
        {props.title}
      </h2>
      <p
        style={{
          color: "#000",
        }}
      >
        {props.description}
      </p>
      {isDeleting ? (
        <p style={{ color: "blue" }}>Deleting...</p>
      ) : (
        <button
          onClick={() => {
            handlePostDelete(props.postId);
          }}
        >
          <MdDelete height={24} width={24} fill="red" />
          Delete
        </button>
      )}
      {failedDelete ? (
        <p style={{ color: "red" }}>Failed to delete the post!!!</p>
      ) : null}
      {/* TODO: show the error message here and make it red */}
    </div>
  );
}
