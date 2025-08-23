import { instance } from "@/shared/api/api";
import type { ITodo } from "../model/interfaces";

export const getTodos = async (page: number) => {
  const { data } = await instance.get<ITodo[]>("/todos", {
    params: {
      _page: page,
      _limit: 20,
    },
  });

  return data;
};

export const changeStatusTodo = async (
  id: number,
  status: ITodo["completed"]
) => {
  const { data } = await instance.patch<ITodo>(`/todos/${id}`, {
    completed: status,
  });

  return data;
};
