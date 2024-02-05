import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { Score } from "./components/Counter";
import styles from "./components/main.module.css";
import { UserAge } from "./hooks/state";
import { Effect } from "./hooks/effect";
import { Data } from "./hooks/data";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    {/* <App /> */}
    <h2
      style={{
        textAlign: "center",
        padding: "10px",
        color: "blue",
      }}
    >
      Quiz Game
    </h2>

    <div className={styles.scores_container}>
      <Score teamName="A" counterName="Score" />
      <Score teamName="B" counterName="Score" />
    </div>

    <UserAge />
    <Effect />
    <Data />

    {/* <h2>Football</h2>
    <Score teamName="Liverpool" counterName="Goals" />
  <Score teamName="Chelsea" counterName="Goals" /> */}
  </>
  // </React.StrictMode>
);
