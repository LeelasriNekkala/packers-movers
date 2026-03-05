import { useState } from "react";
import API from "../../api/axios";

function AddService() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("isActive", formData.isActive ? "true" : "false");
      if (formData.image) data.append("image", formData.image);

      await API.post("/services", data);
      alert("Service Added Successfully ✅");

      setFormData({
        title: "",
        description: "",
        price: "",
        image: null,
        isActive: true,
      });
    } catch (error) {
      console.error(error.response || error);
      alert(
        `Error Adding Service ❌ ${
          error.response?.data?.message || error.message
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      image: null,
      isActive: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#2c2c2c] text-white flex items-start justify-center pt-10 pb-10">
      <div className="flex bg-[#1f1f1f] rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl">
        {/* LEFT BOX: Form Inputs */}
        <div className="w-1/2 p-6 border-4 border-black rounded-3xl bg-[#2a2a2a]">
          <h2 className="text-2xl mb-4 font-semibold">Add New Service</h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Service Title"
              value={formData.title}
              onChange={handleChange}
              className="p-3 rounded-lg bg-[#2c2c2c] border border-gray-600"
              required
            />
            <textarea
              name="description"
              placeholder="Service Description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded-lg bg-[#2c2c2c] border border-gray-600"
              rows="3"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Service Price"
              value={formData.price}
              onChange={handleChange}
              className="p-3 rounded-lg bg-[#2c2c2c] border border-gray-600"
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="p-3 rounded-lg bg-[#2c2c2c] border border-gray-600"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              Service Active
            </label>
          </form>
        </div>

        {/* RIGHT BOX: Buttons at top like CreateOrders */}
        <div className="w-1/2 p-6 border-4 border-black rounded-3xl bg-[#2a2a2a]">
          <div className="flex gap-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`py-3 px-6 rounded-full font-semibold transition ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-cyan-400 text-black hover:bg-cyan-300"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddService;
