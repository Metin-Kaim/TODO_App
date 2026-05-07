import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleTodo, updateTodo, }) {
    if (todos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">
                    📝
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Henüz görev yok
                </h2>

                <p className="text-gray-400">
                    İlk görevini ekleyerek başlayabilirsin.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    updateTodo={updateTodo}
                />
            ))}
        </div>
    );
}

export default TodoList;