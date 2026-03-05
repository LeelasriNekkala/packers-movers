import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1f1f1f] text-white">
      {/* ===== Top Green Line ===== */}
      <div className="h-1 bg-green-500 mx-32 md:mx-40 rounded"></div>
      {/* ===== Navbar ===== */}
      <Navbar />

      {/* ===== Main Content (FULL WIDTH — NO MAX WIDTH) ===== */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* ===== Footer (FULL WIDTH) ===== */}
      <Footer />
    </div>
  );
}

export default MainLayout;
