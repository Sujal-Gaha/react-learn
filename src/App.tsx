import "./App.css";
import { Navbar } from "./components/Navbar";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import { posts } from "./data/posts";
import { PostDetail } from "./components/PostDetail";

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
            <h2>Home Page</h2>
          </div>
        ),
      },
      {
        path: "/posts",
        element: (
          <div>
            <h2>show list of posts</h2>
            <ul>
              {posts.map((post) => {
                return (
                  <li key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </li>
                );
              })}
            </ul>

            <div className="post-detail-container">
              <Outlet />
            </div>
          </div>
        ),
      },
    ],
  },

  {
    path: "/posts/:postId",
    element: <PostDetail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;