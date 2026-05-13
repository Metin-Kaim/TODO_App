import { useState } from "react";

function TodoForm({ addTodo }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // boş todo engelle
        if (!input.trim()) return;

        addTodo(input);

        setInput("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mb-6"
        >
            <input
                type="text"
                placeholder="Yeni görev ekle..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none transition-all duration-200 hover:border-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg text-white px-5 py-3 rounded-xl transition-all duration-200 sm:w-auto w-full shrink-0 hover:scale-105  hover:shadow-md  active:scale-95"
            >
                Ekle
            </button>
        </form>
    );
}

export default TodoForm;