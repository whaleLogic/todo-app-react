import { useEffect, useState } from "react";
import { listTodos, createTodo, updateTodo, deleteTodo } from "./api";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await listTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd(title) {
    const created = await createTodo(title);
    setTodos((prev) => [...prev, created]);
  }

  async function handleToggle(id, completed) {
    const updated = await updateTodo(id, { completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleEdit(id, title) {
    const updated = await updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main style={{ maxWidth: 600, margin: "64px auto", padding: 16 }}>
      <h1>Todo — CRUD over HTTP</h1>

      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <TodoForm onAdd={handleAdd} />
          <hr />
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </main>
  );
}

