import { useEffect, useState } from "react";

// Function based React lifecycle
// 1. Component mount
// 2. Component Unmount

// Class based react lifecycle
// ComponentDidMount
// ComponentDidUpdate
// ComponentWillUnmount

// file a -> a* => 5kb memory address abc123
// delete a* = null

export function Data() {
  const [isPostVisible, setIsPostVisible] = useState(false);

  const [posts, setPosts] = useState<
    { id: number; userId: number; body: string; title: string }[]
  >([]);

  const fetchPosts = () => {
    console.log("fetch posts is mounted", isPostVisible);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      // get, post, patch, put, delete
      method: "GET",
    })
      .then((response) => {
        const parsed = response.json();
        parsed.then((data) => {
          setPosts(data);
        });
      })
      .catch((error) => {
        console.log("error", error);
      });

    return () => {
      console.log("fetchPosts is unmounted.");
    };
  };

  useEffect(fetchPosts, [isPostVisible]);

  const handlePostToggle = () => {
    setIsPostVisible(!isPostVisible);
  };

  return (
    <div>
      <h1
        style={{
          margin: "16px 0",
        }}
      >
        Posts
      </h1>

      <div>
        <button onClick={handlePostToggle}>Toggle Posts</button>
      </div>

      {isPostVisible ? (
        <div>
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "16px",
                  boxShadow: "1px 2px 3px #eee",
                }}
              >
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Post is not visible.</p>
      )}
    </div>
  );
}