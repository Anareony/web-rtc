import { LoaderCircle } from "lucide-react";
import { useTodosStore, Todo } from "@/entities/Todo";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

export const TodoListPage = () => {
  const { todos, getTodos, reset, isLoading, currentPage } = useTodosStore();

  const loadMore = () => {
    const lastPage = 5; //Last page of jsonplaceholder
    if (!isLoading && currentPage <= lastPage) {
      getTodos();
    }
  };

  const infiniteScrollRef = useInfiniteScroll(loadMore, reset);

  return (
    <div className="h-full">
      <h5 className="text-3xl mb-3 font-bold">Ваш список задач</h5>
      <div className="flex flex-col bg-[#20232a] rounded-xl border border-gray-700 px-4 py-2 h-full">
        {!!todos.length &&
          todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        <div ref={infiniteScrollRef} />
        {isLoading && (
          <div className="flex justify-center p-4">
            <LoaderCircle color="#fff" className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
