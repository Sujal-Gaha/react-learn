import { useEffect, useState } from "react";
import styles from "./TodosList.module.css";
import { FiTrash } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

type TTodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export function TodosList() {
  const [todos, setTodos] = useState<TTodoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

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
        console.log("jsonData", jsonData);
        setTodos(jsonData);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleDeleteTodo = (id: number) => {
    // delete the id 5
    console.log("delete", id);

    // TODO: backend integration
    // because there is no api

    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const selectedTodo = todos.find((todo) => todo.id === selectedId);

  return (
    <div className={styles.todos_list_container}>
      <h2>List of Todos</h2>

      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              id: {todo.id}, title: {todo.title}, completed: {todo.completed}
              <FiTrash
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              />
              <MdEdit
                onClick={() => {
                  console.log("Edit", todo.id);
                  setIsModalOpen(true);
                  setSelectedId(todo.id);
                }}
              />
            </li>
          );
        })}
      </ul>

      {isModalOpen ? (
        <div className="modal-todo">
          <h1>Todo modal (id: {selectedTodo?.id})</h1>

          {/* form */}
          {/* title field */}
          {/* toggle for completed field */}
          {/* button to update the data */}
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Close Modal
          </button>
        </div>
      ) : null}
    </div>
  );
}