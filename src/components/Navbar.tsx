import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
      }}
    >
      <Link
        style={{
          border: "1px solid red",
          padding: "5px",
        }}
        to="/"
      >
        Home
      </Link>
      <Link
        style={{
          border: "1px solid red",
          padding: "5px",
        }}
        to="/posts"
      >
        Posts
      </Link>
    </div>
  );
}
