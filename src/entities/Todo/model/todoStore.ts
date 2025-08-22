import { create } from "zustand";
import type { ITodo } from "./interfaces";
import { changeStatusTodo, getTodos } from "../api/api";

interface TodoState {
  todos: ITodo[];
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
  currentPage: number;
  getTodos: () => Promise<void>;
  changeStatusTodo: (id: number, status: ITodo["completed"]) => ITodo;
}

export const useTodosStore = create<TodoState>((set, get) => ({
  todos: [],
  favTodos: [],
  error: null,
  isLoading: false,
  isSuccess: false,
  currentPage: 0,
  getTodos: async () => {
    set({ currentPage: get().currentPage + 1 });
    try {
      set({ isLoading: true });
      const response = await getTodos(get().currentPage);

      set(() => ({
        todos: [...get().todos, ...response],
      }));
    } catch (error: unknown) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  changeStatusTodo: async (id, status) => {
    try {
      const response = await changeStatusTodo(id, status);
      return response;
    } catch (error: unknown) {
      set({ error: error });
    }
  },
}));
