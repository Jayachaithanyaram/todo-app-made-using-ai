import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/api/todos", { title });
    setTitle("");
    fetchTodos();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "60px",
        background: "#f7f7f7",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ width: "320px" }}>
        <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>
          Todo App 🚀
        </h3>

        <div style={{ display: "flex", gap: "6px" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add task"
            style={{
              flex: 1,
              padding: "6px 8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "6px 10px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ marginTop: "10px", paddingLeft: "0", fontSize: "14px" }}>
  {todos.map((todo) => (
    <li
      key={todo._id}
      style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}
    >
      {/* LEFT SIDE */}
      {editingId === todo._id ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{
            flex: 1,
            padding: "4px 6px",
            fontSize: "14px",
          }}
        />
      ) : (
        <span
          onClick={async () => {
            await axios.put(
              `http://localhost:5000/api/todos/${todo._id}`,
              { completed: !todo.completed }
            );
            fetchTodos();
          }}
          style={{
            cursor: "pointer",
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#000",
            flex: 1,
          }}
        >
          {todo.title}
        </span>
      )}

      {/* RIGHT SIDE BUTTONS */}
      {editingId === todo._id ? (
        <button
          onClick={async () => {
            await axios.put(
              `http://localhost:5000/api/todos/${todo._id}`,
              { title: editText }
            );
            setEditingId(null);
            setEditText("");
            fetchTodos();
          }}
          style={{
            marginLeft: "6px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          💾
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingId(todo._id);
              setEditText(todo.title);
            }}
            style={{
              marginLeft: "6px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>

          <button
            onClick={async () => {
              await axios.delete(
                `http://localhost:5000/api/todos/${todo._id}`
              );
              fetchTodos();
            }}
            style={{
              marginLeft: "4px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>
        </>
      )}
    </li>
  ))}
</ul>



      </div>
    </div>
  );

}

export default App;
