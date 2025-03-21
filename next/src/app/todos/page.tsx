"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("http://localhost:8090/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-center text-white mb-6">
        📋 Todo List
      </h1>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <span className="text-lg font-medium text-white">{todo.title}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold
            ${
              todo.completed
                ? "bg-green-600 text-white"
                : "bg-yellow-500 text-black"
            }`}
            >
              {todo.completed ? "✅ 完了" : "💭 未完了"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
