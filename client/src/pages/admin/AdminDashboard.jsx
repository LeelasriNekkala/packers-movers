import { useEffect, useState } from "react";
import API from "../../api/axios";

import AddService from "./AddService";
import ViewServices from "./ViewServices";
import ViewMessages from "./ViewMessages";
import ViewQuotes from "./ViewQuotes";
import CreateOrders from "./CreateOrders"; // ✅ ADD THIS

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setAdmin(data.user);
      } catch (error) {
        console.error("Failed to fetch admin", error);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-[#2c2c2c] text-white flex flex-col justify-between">
      <div className="flex p-10 gap-8">
        {/* LEFT SIDEBAR */}
        <div className="w-64 bg-[#1f1f1f] rounded-2xl p-6 shadow-lg">
          {/* Profile Section */}
          <div className="bg-cyan-400 rounded-xl p-4 text-center mb-6">
            <div className="bg-white rounded-xl p-6 mb-2">
              <div className="w-16 h-16 bg-black rounded-full mx-auto"></div>
            </div>
            <p className="text-black font-semibold">
              {admin ? admin.email : "Admin"}
            </p>
          </div>

          {/* Sidebar Buttons */}
          <div className="flex flex-col gap-4">
            {[
              "Dashboard",
              "Add Service",
              "View Services",
              "View Message",
              "View Quote",
              "Create Orders",
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item)}
                className={`py-2 rounded-full font-medium transition ${
                  activeSection === item
                    ? "bg-white text-black"
                    : "bg-cyan-400 text-blue-900 hover:bg-cyan-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          <h1 className="text-3xl mb-6">
            Welcome to Admin Dashboard {admin ? admin.email : "Loading..."}
          </h1>

          {/* Dashboard */}
          {activeSection === "Dashboard" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <p>Select an option from the left menu.</p>
            </div>
          )}

          {/* Add Service */}
          {activeSection === "Add Service" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <AddService />
            </div>
          )}

          {/* View Services */}
          {activeSection === "View Services" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <ViewServices />
            </div>
          )}

          {/* View Message */}
          {activeSection === "View Message" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <ViewMessages />
            </div>
          )}

          {/* View Quote */}
          {activeSection === "View Quote" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <ViewQuotes />
            </div>
          )}

          {/* ✅ Create Orders Section (NOW LINKED) */}
          {activeSection === "Create Orders" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <CreateOrders /> {/* ✅ LINKED */}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-black text-center py-4 text-sm">
        ADMIN PANEL | SERVICES | ORDERS | SUPPORT
        <p className="mt-1 text-gray-400">Copyright © 2026 Packers & Movers.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
