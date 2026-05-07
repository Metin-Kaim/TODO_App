import { useState } from "react";

function TodoItem({
    todo,
    deleteTodo,
    toggleTodo,
    updateTodo,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleUpdate = () => {
        if (!editText.trim()) return;

        updateTodo(todo.id, editText);

        setIsEditing(false);
    };

    return (<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-xl hover:shadow-md hover:-translate-y-[1px] transition">
        <div className="flex items-start gap-3 flex-1 min-w-0">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className=" w-5 h-5 cursor-pointer accent-blue-500 hover:scale-110 transition-transform duration-150"
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className=" flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none transition-all duration-200 hover:border-blue-300 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
            ) : (
                <p
                    className={`text-lg break-words whitespace-pre-wrap ${todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                        }`}
                >
                    {todo.text}
                </p>
            )}
        </div>

        <div className="flex gap-2 md:ml-4 shrink-0">
            {isEditing ? (
                <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Kaydet
                </button>
            ) : (
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Düzenle
                </button>
            )}

            <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
                Sil
            </button>
        </div>
    </div>
    );
}

export default TodoItem;