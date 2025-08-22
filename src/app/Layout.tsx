import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Outlet />
    </div>
  );
};
