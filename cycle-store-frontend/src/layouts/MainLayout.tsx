import { Outlet } from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
      <Footer />
    </>
  );
}
