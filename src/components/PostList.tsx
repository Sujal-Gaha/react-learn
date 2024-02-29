import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { fetchPosts } from "../data/fetch-posts";
import { GlobalTextPostList } from "./GlobalTextPostList";
import { PerPageSelector } from "./PerPageSelector";
import { usePaginationPostCtx } from "../store/pagination-posts";

export function PostList() {
  const { page, setPage, posts, setPosts, perPage } = usePaginationPostCtx();

  const [numberOfPostsFromBackend, setNumberOfPostsFromBackend] = useState(0);

  const numberOfPages = Math.ceil(numberOfPostsFromBackend / perPage);

  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });

  useEffect(() => {
    async function getPosts() {
      const posts = await fetchPosts();
      setNumberOfPostsFromBackend(posts.length);

      const startIndex = perPage * (page - 1);
      const endIndex = perPage * page;

      const slicedPosts = posts.slice(startIndex, endIndex);
      setPosts(slicedPosts);
    }

    getPosts();
  }, []);

  const handlePageClicked = async (pageNumber: number) => {
    const posts = await fetchPosts();
    setNumberOfPostsFromBackend(posts.length);

    const startIndex = perPage * (pageNumber - 1);
    const endIndex = perPage * pageNumber;

    const slicedPosts = posts.slice(startIndex, endIndex);

    setPage(pageNumber);
    setPosts(slicedPosts);
  };

  console.log("pages", pages);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {pages.map((pageElement) => {
          return (
            <button
              style={{
                background: page === pageElement ? "green" : "transparent",
                height: "25px",
                width: "30px",
                cursor: "pointer",
              }}
              onClick={() => handlePageClicked(pageElement)}
            >
              {pageElement}
            </button>
          );
        })}

        <PerPageSelector />
      </div>

      <GlobalTextPostList />
    </div>
  );
}
