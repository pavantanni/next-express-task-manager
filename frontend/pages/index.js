import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;
    const res = await fetch("http://localhost:4000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span>{t.title}</span>
            <button onClick={() => deleteTask(t.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
