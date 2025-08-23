import { createBrowserRouter, redirect } from "react-router";
import { Layout } from "./Layout";

import { ROUTER_PATH } from "@/shared/router/path";
import { TodoListPage } from "@/pages/TodoList";
import { VideoChatPage } from "@/pages/VideoChat";

export const router = createBrowserRouter([
  {
    path: "*",
    loader: () => redirect(ROUTER_PATH.TODO_LIST),
  },
  {
    path: ROUTER_PATH.TODO_LIST,
    Component: Layout,
    children: [
      { index: true, Component: TodoListPage },
      { path: ":id", Component: VideoChatPage },
    ],
  },
]);
