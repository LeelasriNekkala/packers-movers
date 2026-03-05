import { useState } from "react";
import API from "../../api/axios";

function RequestService() {
  const [formData, setFormData] = useState({
    service: "",
    fromLocation: "",
    toLocation: "",
    moveDate: "",
    price: "",
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
      await API.post("/orders", formData);
      alert("Service Requested Successfully ✅");

      setFormData({
        service: "",
        fromLocation: "",
        toLocation: "",
        moveDate: "",
        price: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error requesting service ❌");
    }
  };

  const handleReset = () => {
    setFormData({
      service: "",
      fromLocation: "",
      toLocation: "",
      moveDate: "",
      price: "",
    });
  };

  return (
    <div className="bg-[#1f1f1f] min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 md:gap-8">
        {/* LEFT BOX */}
        <div className="w-full md:w-1/2 bg-[#2a2a2a] border-4 border-black rounded-[30px] p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-white text-2xl md:text-3xl mb-6 text-center md:text-left">
            Request For Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <input
              type="text"
              name="service"
              placeholder="Service ID"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 md:p-3 outline-none"
            />

            <input
              type="text"
              name="fromLocation"
              placeholder="From Location"
              value={formData.fromLocation}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 md:p-3 outline-none"
            />

            <input
              type="text"
              name="toLocation"
              placeholder="To Location"
              value={formData.toLocation}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 md:p-3 outline-none"
            />

            <input
              type="date"
              name="moveDate"
              value={formData.moveDate}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 md:p-3 outline-none"
            />

            <input
              type="number"
              name="price"
              placeholder="Estimated Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 md:p-3 outline-none"
            />
          </form>
        </div>

        {/* RIGHT BOX */}
        <div className="w-full md:w-1/2 bg-[#2a2a2a] border-4 border-black rounded-[30px] p-6 md:p-10 flex flex-col items-center">
          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center mb-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gray-200 text-black py-3 rounded-md font-semibold hover:bg-gray-300 transition"
            >
              Submit
            </button>

            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 text-black py-3 rounded-md font-semibold hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>

          {/* BEAUTIFUL SENTENCE */}
          <p className="text-center text-gray-300 text-sm md:text-base">
            Please ensure all details are correct before submitting your service
            request. ✅
          </p>
        </div>
      </div>
    </div>
  );
}

export default RequestService;
