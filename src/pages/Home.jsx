import { useEffect, useState } from "react";
import { createTodo } from "../interfaces/Todo";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function Home() {
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem("todos");

        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const addTodo = (text) => {
        const newTodo = createTodo(text);

        setTodos((prev) => [...prev, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id)
        );
    };

    const updateTodo = (id, newText) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, text: newText }
                    : todo
            )
        );
    };

    const filteredTodos = [...todos]
        .sort((a, b) => a.completed - b.completed)
        .filter((todo) => {
            if (filter === "active") {
                return !todo.completed;
            }

            if (filter === "completed") {
                return todo.completed;
            }

            return true;
        });

    const completedCount = todos.filter(
        (todo) => todo.completed
    ).length;

    const clearCompleted = () => {
        setTodos((prev) =>
            prev.filter((todo) => !todo.completed)
        );
    };

    const activeCount = todos.length - completedCount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Todo App
                    </h1>

                    <p className="text-gray-500">
                        Günlük görevlerini organize et
                    </p>
                </div>

                <TodoForm addTodo={addTodo} />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-lg  transition-all duration-200  hover:scale-105  hover:shadow-md  active:scale-95  ${filter === "all" ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Tümü
                        </button>

                        <button
                            onClick={() => setFilter("active")}
                            className={`px-4 py-2 rounded-lg  transition-all duration-200  hover:scale-105  hover:shadow-md  active:scale-95  ${filter === "active" ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Aktif
                        </button>

                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-2 rounded-lg transition-all duration-200  hover:scale-105  hover:shadow-md  active:scale-95  ${filter === "completed" ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Tamamlanan
                        </button>
                    </div>

                    <div className="text-sm text-gray-500">
                        <span className="mr-4">
                            Aktif: {activeCount}
                        </span>

                        <span>
                            Tamamlanan: {completedCount}
                        </span>
                    </div>
                </div>

                {completedCount > 0 && filter !== "active" && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={clearCompleted}
                            className="bg-red-100 text-red-500 hover:bg-red-200 px-4 py-2 rounded-lg transition-all duration-200  hover:scale-105  hover:shadow-md  active:scale-95">
                            Tamamlananları Temizle
                        </button>
                    </div>
                )}

                <TodoList
                    todos={filteredTodos}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    updateTodo={updateTodo}
                />

            </div>
        </div>
    );
}

export default Home;