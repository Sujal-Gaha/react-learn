export function PostCard(props: { title: string; description: string }) {
  return (
    <div
      style={{
        border: "2px solid #eee",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <h2
        style={{
          color: "#aaa",
        }}
      >
        {props.title}
      </h2>
      <p
        style={{
          color: "#000",
        }}
      >
        {props.description}
      </p>
    </div>
  );
}
