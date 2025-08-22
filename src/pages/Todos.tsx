import { useEffect } from "react";
import { useTodosStore } from "@/entities/Todo";
import { Todo } from "@/entities/Todo";

export const TodosPage = () => {
  const { todos, getTodos } = useTodosStore();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex gap-2 flex-col">
      {todos.length ? (
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <></>
      )}
    </div>
  );
};
