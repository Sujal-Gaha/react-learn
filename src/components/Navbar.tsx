export function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <img
        src="../../public/images/SkillPrompt-logo.png"
        alt="Logo"
        style={{
          width: "250px",
        }}
      />
      <div style={{}}>
        <input
          style={{
            padding: "5px",
          }}
          type="text"
          name="search"
          placeholder="search posts"
        />
      </div>
    </div>
  );
}
