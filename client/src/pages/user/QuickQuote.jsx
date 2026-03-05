import { useState } from "react";
import axios from "axios";

function QuickQuote() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fromLocation: "",
    toLocation: "",
    moveDate: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/quotes", formData, {
        withCredentials: true,
      });

      alert("Quote submitted successfully ✅");

      setFormData({
        name: "",
        phone: "",
        fromLocation: "",
        toLocation: "",
        moveDate: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting quote ❌");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      fromLocation: "",
      toLocation: "",
      moveDate: "",
      message: "",
    });
  };

  return (
    <div className="flex-1 p-6 bg-[#1f1f1f] min-h-screen">
      {/* Main Two Boxes */}
      <div className="flex gap-8">
        {/* LEFT FORM BOX */}
        <div className="w-1/2 bg-[#2a2a2a] border-4 border-black rounded-3xl p-6">
          <h2 className="text-white text-xl mb-6">Quick Quote</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />

            <input
              type="text"
              name="fromLocation"
              placeholder="Moving From"
              value={formData.fromLocation}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />

            <input
              type="text"
              name="toLocation"
              placeholder="Moving To"
              value={formData.toLocation}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />

            <input
              type="date"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />

            <textarea
              name="message"
              placeholder="Additional Message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />
          </form>
        </div>

        {/* RIGHT EMPTY BOX WITH BUTTONS */}
        <div className="w-1/2 bg-[#2a2a2a] border-4 border-black rounded-3xl p-6 relative">
          <div className="absolute top-6 right-6 flex gap-6">
            <button
              onClick={handleSubmit}
              className="bg-gray-200 text-black px-8 py-2 rounded-md font-semibold"
            >
              Submit
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-200 text-black px-8 py-2 rounded-md font-semibold"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickQuote;
