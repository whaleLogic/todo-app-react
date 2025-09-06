import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd(title.trim());
    setTitle("");
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add your task here!"
        aria-label="New todo title"
      />
      <button type="submit">Add</button>
    </form>
  );
}
