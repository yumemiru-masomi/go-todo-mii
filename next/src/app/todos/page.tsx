"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // Todo取得
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:8090/todos");
    const data = await res.json();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    await fetch("http://localhost:8090/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        completed: false,
      }),
    });

    //入れた値をリセット
    setNewTitle("");
    //全Todoリストを再取得する
    fetchTodos();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-center text-white mb-6">
        📋 Todo List
      </h1>
      {/* 入力フォーム */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="新しいTodoを入力..."
          className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          追加
        </button>
      </div>

      {/* Todo一覧 */}
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
