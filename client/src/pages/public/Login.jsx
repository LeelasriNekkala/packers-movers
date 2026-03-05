import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] px-2 md:px-0">
      {/* Centered Login Card */}
      <div className="w-full max-w-sm md:max-w-md bg-[#2b2b2b] p-4 md:p-6 rounded-lg border border-gray-600 shadow-xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl md:text-3xl text-white mb-3 md:mb-5 text-center font-semibold">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm md:text-base mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@gmail.com"
              className="w-full bg-[#3a3a3a] text-white px-3 py-2 md:px-4 md:py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm md:text-base mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="w-full bg-[#3a3a3a] text-white px-3 py-2 md:px-4 md:py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm md:text-base"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-300 text-sm md:text-base mb-1">
              Role
            </label>
            <div className="flex items-center gap-3 text-gray-200 text-sm md:text-base">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  className="accent-teal-500"
                />
                Admin
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                  className="accent-teal-500"
                />
                Customer
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-2 mt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-200 text-black font-semibold py-2 md:py-3 rounded hover:bg-gray-300 transition text-sm md:text-base"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="reset"
              className="flex-1 bg-gray-200 text-black font-semibold py-2 md:py-3 rounded hover:bg-gray-300 transition text-sm md:text-base"
            >
              Reset
            </button>
          </div>
        </form>

        {/* SignUp Link */}
        <div className="mt-3 text-center text-gray-400 text-sm md:text-base">
          <p
            className="cursor-pointer hover:text-white underline"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
