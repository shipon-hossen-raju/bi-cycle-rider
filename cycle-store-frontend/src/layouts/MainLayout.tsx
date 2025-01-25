import { Outlet } from "react-router";
import Header from "./header/Header";

export default function MainLayout() {
  return (
    <>
      {/* app header */}
      <Header />

      {/* main content */}
      <main>
        <Outlet />
      </main>

      {/* app footer */}
      <footer>this is footer</footer>
    </>
  );
}
