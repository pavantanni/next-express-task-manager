const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, title });
    }
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Task deleted" });
    }
  });
});

app.listen(4000, () =>
  console.log("Backend running with SQLite on http://localhost:4000")
);
