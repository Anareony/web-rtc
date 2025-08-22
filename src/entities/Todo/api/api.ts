import { instance } from "@/shared/api/api";
import type { ITodo } from "../model/interfaces";

export const getTodos = async (page: number) => {
  const { data } = await instance.get<ITodo[]>("/todos", {
    params: {
      _page: page,
      _limit: 10,
    },
  });

  return data;
};

export const changeStatusTodo = async (
  id: number,
  status: ITodo["completed"]
) => {
  const { data } = await instance.put<ITodo>(
    `/todos/${id}`,
    JSON.stringify({ status })
  );

  return data;
};
