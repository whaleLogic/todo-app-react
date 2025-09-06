import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos?.length) return <p>No todos yet. Add one!</p>;
  return (
    <ul style={{ display: "grid", gap: 16, padding: 8, listStyle: "none" }}>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
