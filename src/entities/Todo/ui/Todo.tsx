import { useState, type ChangeEvent } from "react";
import { NavLink } from "react-router";
import { Video } from "lucide-react";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ROUTER_PATH } from "@/shared/router/path";
import type { ITodo } from "../model/interfaces";
import { useTodosStore } from "../model/todoStore";

interface ITodoProps {
  todo: ITodo;
}

export const Todo = ({ todo }: ITodoProps) => {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const { changeStatusTodo } = useTodosStore();

  const changeCheckboxState = async (e: ChangeEvent<HTMLInputElement>) => {
    const res = await changeStatusTodo(todo.id, e.target.checked);
    setIsChecked(res.completed);
  };

  return (
    <div className="flex py-4 gap-2 items-center border-b border-gray-600">
      <span className="text-gray-500 w-[30px] text-sm">#{todo.id}</span>
      <Checkbox
        type="checkbox"
        label={todo.title}
        checked={isChecked}
        onChange={changeCheckboxState}
      />
      <NavLink
        to={`${ROUTER_PATH.TODO_LIST}/${todo.id}`}
        className="flex gap-1 items-center ml-auto bg-cyan-500 px-2 py-2 text-sm rounded-full font-bold hover:bg-cyan-400"
      >
        <Video size={18} color="#fff" />
        <span>В видеочат</span>
      </NavLink>
    </div>
  );
};
