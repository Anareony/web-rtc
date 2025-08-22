import { Link, NavLink } from "react-router";
import type { ITodo } from "../model/interfaces";

interface TodoProps {
  todo: ITodo;
}

export const Todo = ({ todo }: TodoProps) => {
  return (
    <div className="flex gap-2 border rounded-sm p-2">
      <span>{todo.id}</span>
      <span>{todo.title}</span>
      <input type="checkbox" checked={todo.completed} />
      <NavLink to={`/todos/${todo.id}`}>Nav to VideoRoom</NavLink>
    </div>
  );
};
