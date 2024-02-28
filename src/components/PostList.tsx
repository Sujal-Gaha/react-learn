import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { TPost } from "../types";
import { fetchPosts } from "../data/fetch-posts";
import { GlobalTextPostList } from "./GlobalTextPostList";  

const DEFAULT_NUMBER_OF_POSTS = 5;

export function PostList() {
  const [posts, setPosts] = useState<TPost[]>([]);

  const [numberOfPostsFromBackend, setNumberOfPostsFromBackend] = useState(0);

  const [page, setPage] = useState(1);

  const numberOfPages = Math.ceil(
    numberOfPostsFromBackend / DEFAULT_NUMBER_OF_POSTS
  );

  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });

  useEffect(() => {
    async function getPosts() {
      const posts = await fetchPosts();
      setNumberOfPostsFromBackend(posts.length);

      // formula
      //  DEFAULT_NUMBER_OF_POSTS  * (page - 1) : DEFAULT_NUMBER_OF_POSTS * page
      // page: 1
      // 0 + 0

      // page: 2
      // 1+:9
      //
      // page: 3
      // 2:14

      // 2 => 5:9
      // 3 => 10:14
      const startIndex = DEFAULT_NUMBER_OF_POSTS * (page - 1);
      const endIndex = DEFAULT_NUMBER_OF_POSTS * page;

      const slicedPosts = posts.slice(startIndex, endIndex);
      setPosts(slicedPosts);
    }

    getPosts();
  }, []);

  const handlePageClicked = async (pageNumber: number) => {
    setPage(pageNumber);
    const posts = await fetchPosts();
    setNumberOfPostsFromBackend(posts.length);

    const startIndex = DEFAULT_NUMBER_OF_POSTS * (pageNumber - 1);
    const endIndex = DEFAULT_NUMBER_OF_POSTS * pageNumber;

    const slicedPosts = posts.slice(startIndex, endIndex);

    setPosts(slicedPosts);
  };

  console.log("page", page);

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
          gap: "5px",
        }}
      >
        {pages.map((pageElement) => {
          return (
            <button
              style={{
                background: page === pageElement ? "green" : "transparent",
              }}
              onClick={() => handlePageClicked(pageElement)}
            >
              {pageElement}
            </button>
          );
        })}

        <div>
          <label htmlFor="per_page">Per Page</label>
          <select name="per_page" id="per_page">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
      </div>

      <GlobalTextPostList />
    </div>
  );
}
