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
        style={{
          width: "150px",
        }}
        src="../../public/images/SkillPrompt-logo.png"
        alt="logo"
      />

      {/* input box for search */}
      <input
        style={{
          padding: "5px",
        }}
        placeholder="search posts"
        type="text"
        name="search"
      />
    </div>
  );
}
