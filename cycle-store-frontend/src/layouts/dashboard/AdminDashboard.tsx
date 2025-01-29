import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen h-max overflow-hidden flex flex-col bg-brand/5">
      {/* Header */}
      <Header />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 p-4 space-y-4 bg-gray-50 bg-brand/10">
          {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}

          <div className="max-h-[calc(100vh-110px)] h-full overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
