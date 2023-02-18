import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontFamily: "Arial" }}>
        AI Islamic Scholar
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid black", padding: "1rem", borderRadius: "10px" }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: "10rem", width: "50%", padding: "0.5rem", fontSize: "1.2rem", marginBottom: "1rem" }}
          placeholder="Enter your question here..."
        ></textarea>
        <button type="submit" style={{ backgroundColor: "white", color: "black", padding: "0.5rem 1rem", borderRadius: "5px", border: "none", fontSize: "1rem", fontWeight: "bold", cursor: "pointer" }}>
          Submit
        </button>
      </form>
      {response && (
        <div style={{ marginTop: "2rem" }}>
          <b style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Scholar:</b>{" "}
          <span style={{ fontSize: "1.2rem" }}>{response}</span>
        </div>
      )}
    </div>
  );
}

export default App;
