import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) navigate("/login");
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1c1c1c]">
      {/* Card container */}
      <div className="w-full max-w-sm md:max-w-md bg-[#4a4a4a] p-4 md:p-6 rounded-lg border border-gray-500 shadow-xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-white text-2xl md:text-3xl mb-3 md:mb-5 text-center font-semibold">
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full bg-[#5a5a5a] text-white px-3 py-2 md:px-4 md:py-2 rounded-md outline-none text-sm md:text-base"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full bg-[#5a5a5a] text-white px-3 py-2 md:px-4 md:py-2 rounded-md outline-none text-sm md:text-base"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-[#5a5a5a] text-white px-3 py-2 md:px-4 md:py-2 rounded-md outline-none text-sm md:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-[#5a5a5a] text-white px-3 py-2 md:px-4 md:py-2 rounded-md outline-none text-sm md:text-base"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-[#5a5a5a] text-white px-3 py-2 md:px-4 md:py-2 rounded-md outline-none text-sm md:text-base"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e5e5e5] text-black font-semibold py-2 md:py-3 rounded-md hover:bg-gray-300 transition text-sm md:text-base"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <div
            className="text-center mt-2 md:mt-3 text-white text-sm md:text-base cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign In
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
