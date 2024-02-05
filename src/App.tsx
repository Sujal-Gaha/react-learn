import "./App.css";
import { Fragment } from "react";

function App() {
  const age = 10;
  const studentAge = `${age}`;

  const students = [];

  return (
    <Fragment>
      <div className="app-1">
        <p>This is my first app.</p>
      </div>
      <div className="app-2">
        <p>{studentAge}</p>

        <p>{students.length ? "hello students" : "no students"} </p>
      </div>

      <label htmlFor="">
        <input
          type="text"
          style={{
            backgroundColor: "red",
            color: "blue",
          }}
        />
      </label>
    </Fragment>
  );
}

export default App;
