import { useState } from "react";
import axios from "axios";

function NewInquiry() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    fromLocation: "",
    toLocation: "",
    moveDate: "",
    houseSize: "",
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
      await axios.post("http://localhost:3000/api/inquiries", formData, {
        withCredentials: true,
      });

      alert("Inquiry submitted successfully ✅");

      setFormData({
        name: "",
        phone: "",
        fromLocation: "",
        toLocation: "",
        moveDate: "",
        houseSize: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting inquiry ❌");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      fromLocation: "",
      toLocation: "",
      moveDate: "",
      houseSize: "",
    });
  };

  return (
    <div className="flex-1 p-6 bg-[#1f1f1f] min-h-screen">
      {/* Two Box Layout */}
      <div className="flex gap-8">
        {/* LEFT FORM BOX */}
        <div className="w-1/2 bg-[#2a2a2a] border-4 border-black rounded-3xl p-6">
          <h2 className="text-white text-xl mb-6">New Inquiry</h2>

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

            <select
              name="houseSize"
              value={formData.houseSize}
              onChange={handleChange}
              required
              className="w-1/2 bg-gray-200 text-black p-1 rounded"
            >
              <option value="">--Select House Size--</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="Villa">Villa</option>
            </select>
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

export default NewInquiry;
