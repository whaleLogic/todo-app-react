import { useState } from "react";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  async function save() {
    if (draft.trim() && draft !== todo.title) {
      await onEdit(todo.id, draft.trim());
    }
    setIsEditing(false);
  }

  return (
    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        aria-label={`Toggle ${todo.title}`}
      />

      {isEditing ? (
        <>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={() => { setIsEditing(false); setDraft(todo.title); }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
