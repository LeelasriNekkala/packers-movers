import { useEffect, useState } from "react";
import API from "../../api/axios";
import QuickQuote from "./QuickQuote";
import NewInquiry from "./NewInquiry";
import RequestService from "./RequestService";
import ViewOrders from "./ViewOrders"; // ✅ ADDED

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/me");
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#2c2c2c] text-white flex flex-col justify-between">
      <div className="flex p-10 gap-8">
        {/* LEFT SIDEBAR */}
        <div className="w-64 bg-[#1f1f1f] rounded-2xl p-6 shadow-lg">
          <div className="bg-cyan-400 rounded-xl p-4 text-center mb-6">
            <div className="bg-white rounded-xl p-6 mb-2">
              <div className="w-16 h-16 bg-black rounded-full mx-auto"></div>
            </div>
            <p className="text-black font-semibold">
              {user ? user.name : "User"}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              "Dashboard",
              "Req For Service",
              "Quick Quote",
              "New Inquiry",
              "View Orders",
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
            Welcome to dashboard user {user ? user.name : "Loading..."}
          </h1>

          {activeSection === "Dashboard" && (
            <div className="bg-[#1f1f1f] p-8 rounded-3xl">
              <p>Select an option from the left menu.</p>
            </div>
          )}

          {activeSection === "Quick Quote" && <QuickQuote />}

          {activeSection === "New Inquiry" && <NewInquiry />}

          {activeSection === "Req For Service" && <RequestService />}

          {/* ✅ NOW IT LOADS REAL VIEW ORDERS COMPONENT */}
          {activeSection === "View Orders" && <ViewOrders />}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
