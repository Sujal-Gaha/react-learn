import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { TPost } from "../types";
import { fetchPosts } from "../data/fetch-posts";
import { GlobalTextPostList } from "./GlobalTextPostList";

export function PostList() {
  const [perPage, setPerPage] = useState(5);
  const [posts, setPosts] = useState<TPost[]>([]);

  const [numberOfPostsFromBackend, setNumberOfPostsFromBackend] = useState(0);
  const [page, setPage] = useState(1);

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
  }, [page, perPage]);

  const handlePageClicked = async (pageNumber: number) => {
    const posts = await fetchPosts();
    setNumberOfPostsFromBackend(posts.length);

    const startIndex = perPage * (pageNumber - 1);
    const endIndex = perPage * pageNumber;

    const slicedPosts = posts.slice(startIndex, endIndex);

    setPage(pageNumber);
    setPosts(slicedPosts);
  };

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
      </div>
      <div
        style={{
          padding: "20px 0px",
          display: "flex",
          justifyContent: "right",
        }}
      >
        <label htmlFor="per_page">Per Page</label>
        <select
          name="per_page"
          id="per_page"
          value={perPage}
          onChange={(event) => {
            setPerPage(parseInt(event.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <GlobalTextPostList />
    </div>
  );
}
