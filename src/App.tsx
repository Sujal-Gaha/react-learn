import "./App.css";
import { Navbar } from "./components/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { PostDetail } from "./components/PostDetail";
import { PostList } from "./components/PostList";
import { TodosList } from "./components/TodosList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: (
          <div>
            <PostList />
          </div>
        ),
      },
      {
        path: "/posts",
        element: (
          <div>
            <PostList />
          </div>
        ),
      },
      {
        path: "/posts/:postId",
        element: <PostDetail />,
      },
      {
        path: "/todos",
        element: (
          <div>
            <TodosList />
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
