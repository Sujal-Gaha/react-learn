import { TPost } from "../types";

export function fetchPosts(): Promise<TPost[]> {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    })
      .then((data) => {
        return data.json();
      })
      .then((jsonData: TPost[]) => {
        resolve(jsonData);
      })
      .catch((error) => {
        console.log("Error when fetching data from server", error);
        reject("Error when fetching data from server");
      });
  });
}