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
    console.log("delete", id);

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
                  console.log("Edit:", todo.id);
                  console.log("Title:", todo.title);
                  console.log("Completed:", todo.completed);
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
          <h1
            style={{
              padding: "20px",
              color: "darkmagenta",
            }}
          >
            Todo modal (id: {selectedTodo?.id})
          </h1>
          <br />
          <br />
          {/* form */}
          {/* title field */}
          {/* toggle for completed field */}
          {/* button to update the data */}
          <form action="">
            <div>
              <label htmlFor="title" style={{ paddingRight: "40px" }}>
                Title:
              </label>
              <input
                type="text"
                id="title"
                style={{
                  width: "80%",
                }}
                defaultValue={selectedTodo?.title}
              />
            </div>
            <br />
            <div>
              <label htmlFor="comment">Completed:</label>
              {selectedTodo?.completed ? (
                <input type="checkbox" defaultChecked />
              ) : (
                <input type="checkbox" />
              )}
            </div>
          </form>
          <hr />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <button>Update</button>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Close Modal
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
