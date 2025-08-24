import { create } from "zustand";
import type { ITodo } from "./interfaces";
import { changeStatusTodo, getTodos } from "../api/api";

interface TodoState {
  todos: ITodo[];
  isLoading: boolean;
  currentPage: number;
  getTodos: () => void;
  changeStatusTodo: (id: number, status: ITodo["completed"]) => Promise<ITodo>;
  reset: () => void;
}

export const useTodosStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,
  currentPage: 1,
  getTodos: async () => {
    try {
      set({ isLoading: true });
      const response = await getTodos(get().currentPage);
      set({
        todos: [...get().todos, ...response],
      });
      set({ currentPage: get().currentPage + 1 });
    } catch (error: unknown) {
      console.error("Error on get todos:" + error);
    } finally {
      set({ isLoading: false });
    }
  },
  changeStatusTodo: async (id, status) => {
    try {
      const response = await changeStatusTodo(id, status);
      return response;
    } catch (error: unknown) {
      console.error("Error tp change todo status:" + error);
      throw new Error("Error to change todo status");
    }
  },
  reset: () => {
    set({
      currentPage: 1,
      todos: [],
    });
  },
}));
