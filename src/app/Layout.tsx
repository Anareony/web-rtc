import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="max-w-[1028px] mx-auto my-[10px] h-full">
      <Outlet />
    </div>
  );
};
