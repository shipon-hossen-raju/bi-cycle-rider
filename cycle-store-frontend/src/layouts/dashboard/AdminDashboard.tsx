import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 p-4 space-y-4 bg-gray-50">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
