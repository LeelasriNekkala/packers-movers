import React from "react";

function Prices() {
  return (
    <div className="bg-[#1f1f1f] min-h-screen flex flex-col items-center px-4 py-6">
      <h1 className="text-3xl md:text-5xl text-white font-bold mb-6 text-center">
        Our Prices
      </h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#2a2a2a] p-6 rounded-xl border-2 border-gray-700 text-white">
          <h2 className="text-xl font-semibold mb-2">House Shifting</h2>
          <p>₹1500 per 1BHK</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-xl border-2 border-gray-700 text-white">
          <h2 className="text-xl font-semibold mb-2">Office Shifting</h2>
          <p>₹2500 per 500 sqft</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-xl border-2 border-gray-700 text-white">
          <h2 className="text-xl font-semibold mb-2">Vehicle Transport</h2>
          <p>₹1000 per vehicle</p>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-xl border-2 border-gray-700 text-white">
          <h2 className="text-xl font-semibold mb-2">Packing Services</h2>
          <p>₹500 per room</p>
        </div>
      </div>
    </div>
  );
}

export default Prices;
