import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";
import { Truck, Menu, X } from "lucide-react";

function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-black text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-5">
          {/* LEFT SIDE */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-full shadow-md">
              <Truck size={26} className="text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-green-500">Moving</span>{" "}
                <span className="text-white">Company</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 uppercase tracking-wide">
                We Help You Move In Time
              </p>
            </div>
          </Link>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks
              isAuthenticated={isAuthenticated}
              user={user}
              handleLogout={handleLogout}
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-6 border-t border-gray-800 pt-4">
            <NavLinks
              isAuthenticated={isAuthenticated}
              user={user}
              handleLogout={handleLogout}
              closeMenu={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLinks({ isAuthenticated, user, handleLogout, closeMenu }) {
  const close = () => {
    if (closeMenu) closeMenu();
  };

  return (
    <>
      {[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Prices", path: "/prices" }, // Public Prices Page
        { name: "QuickQuote", path: "/quick-quote" },
        { name: "Contacts", path: "/contacts" }, // Public Contacts Page
      ].map((link) => (
        <Link
          key={link.name}
          to={link.path}
          onClick={close}
          className="hover:text-green-400 transition font-medium"
        >
          {link.name}
        </Link>
      ))}

      {!isAuthenticated && (
        <Link
          to="/login"
          onClick={close}
          className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition font-semibold"
        >
          Login
        </Link>
      )}

      {isAuthenticated && (
        <>
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              onClick={close}
              className="hover:text-green-400 font-medium"
            >
              Admin
            </Link>
          )}

          {user?.role === "user" && (
            <Link
              to="/user/dashboard"
              onClick={close}
              className="hover:text-green-400 font-medium"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="hover:text-red-400 font-medium text-left"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

export default Navbar;
