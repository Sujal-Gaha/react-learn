import { useEffect } from "react";

export function TodosList() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const jsonData = response.json();
        return jsonData;
      })
      .then((jsonData) => {
        console.log("JsonData ", jsonData);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  }, []);
  return (
    <div>
      <p>This is the actual todo list</p>
    </div>
  );
}
