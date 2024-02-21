export async function getPost(postId: number) {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "GET",
    }
  );

  const data = await resp.json();

  console.log("Data to be shown with id ", postId);

  return data;
}
