import { useEffect } from "react";
import { useTodosStore, Todo } from "@/entities/Todo";

export const TodoListPage = () => {
  const { todos, getTodos } = useTodosStore();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h3 className="text-3xl mb-3 font-bold">Ваш список задач</h3>
      <div className="flex flex-col bg-[#20232a] rounded-xl border border-gray-700 px-4">
        {todos.length ? (
          todos.map((todo) => <Todo key={todo.id} todo={todo} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
