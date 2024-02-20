import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { TPost } from "../types";
import { fetchPosts } from "../data/fetch-posts";

export function PostList() {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    async function getPosts() {
      const posts = await fetchPosts();
      setPosts(posts);
    }

    getPosts();
  }, []);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            postId={post.id}
            title={post.title}
            description={post.body}
            posts={posts}
            setPosts={setPosts}
          />
        );
      })}
    </div>
  );
}
