import { useEffect, useState } from "react";

export function Data() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    })
      .then((response) => {
        const parsed = response.json();
        parsed.then((data) => {
          console.log("Data from server", data);
          setPosts(data);
        });
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  useEffect(fetchPosts, []);

  return (
    <div>
      <h1>Data loading from backend</h1>
      <div>{JSON.stringify(posts)}</div>
    </div>
  );
}
