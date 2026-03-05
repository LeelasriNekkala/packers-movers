import { useState } from "react";
import API from "../../api/axios";

function CreateOrders() {
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

      alert("Order submitted successfully ✅");

      setFormData({
        service: "",
        fromLocation: "",
        toLocation: "",
        moveDate: "",
        price: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting order ❌");
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
    <div className="flex-1 p-6 bg-[#1f1f1f] min-h-screen">
      <div className="flex gap-8">
        {/* LEFT FORM BOX */}
        <div className="w-1/2 bg-[#2a2a2a] border-4 border-black rounded-3xl p-6">
          <h2 className="text-white text-xl mb-6">Create Order</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="service"
              placeholder="Service ID"
              value={formData.service}
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

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-600 text-white p-2 outline-none"
            />
          </form>
        </div>

        {/* RIGHT BOX WITH BUTTONS */}
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

export default CreateOrders;
