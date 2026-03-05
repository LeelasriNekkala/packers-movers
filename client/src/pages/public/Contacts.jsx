import React, { useState } from "react";

function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! ✅");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#1f1f1f] min-h-screen flex flex-col items-center px-4 py-6">
      <h1 className="text-3xl md:text-5xl text-white font-bold mb-6 text-center">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#2a2a2a] p-6 rounded-xl border-2 border-gray-700 text-white flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-3 rounded-md bg-transparent border-b border-gray-600 outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 rounded-md bg-transparent border-b border-gray-600 outline-none"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="p-3 rounded-md bg-transparent border-b border-gray-600 outline-none"
        ></textarea>
        <button
          type="submit"
          className="bg-gray-200 text-black py-3 rounded-md font-semibold hover:bg-gray-300 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contacts;
