import { useEffect, useState } from "react";

type TTodoITem = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export function TodosList() {
  const [todos, setTodos] = useState<TTodoITem[]>([]);
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
        setTodos(jsonData);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  }, []);
  return (
    <div>
      <h2>List of Todos</h2>

      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              id: {todo.id}, userId: {todo.userId}, title: {todo.title},
              completed: {todo.completed}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
