export default function TaskList({ tasks, deleteTask }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>
          {t.title} <button onClick={() => deleteTask(t.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}
