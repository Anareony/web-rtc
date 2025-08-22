import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";

import { TodosPage } from "@/pages/Todos";
import { VideoRoomPage } from "@/pages/VideoRoom";

export const router = createBrowserRouter([
  {
    path: "/todos",
    Component: Layout,
    children: [
      { index: true, Component: TodosPage },
      { path: ":id", Component: VideoRoomPage },
    ],
  },
]);
