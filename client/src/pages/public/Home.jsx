import { Link } from "react-router-dom";
import movingBanner from "../../assets/images/packers-movers.png";

function Home() {
  return (
    <div className="bg-[#111] text-gray-300">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mt-2 bg-[#1a1a1a] shadow-lg flex justify-center items-center h-48 md:h-64">
        <img
          src={movingBanner}
          alt="Packers & Movers Banner"
          className="max-w-full max-h-full object-contain opacity-80"
        />
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Latest News */}
          <div className="bg-[#1a1a1a] p-4 shadow-md">
            <h3 className="text-white text-lg font-bold border-b border-gray-700 pb-1">
              LATEST NEWS
            </h3>

            <div className="mt-2 space-y-2 text-sm">
              <div>
                <p>
                  <span className="text-green-400 font-semibold">20.01.08</span>{" "}
                  Consectetur sadipscing elit, sed diam nonumy eirmod tempor{" "}
                  <span className="text-yellow-400 cursor-pointer">| more</span>
                </p>
              </div>

              <div>
                <p>
                  <span className="text-green-400 font-semibold">19.01.08</span>{" "}
                  Consectetur sadipscing elit, sed diam nonumy eirmod tempor{" "}
                  <span className="text-yellow-400 cursor-pointer">| more</span>
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-[#1a1a1a] p-4 shadow-md">
            <h3 className="text-yellow-400 text-lg font-bold pb-1">
              TESTIMONIALS
            </h3>

            <div className="flex items-start gap-3 mt-2 text-sm">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Customer"
                className="w-16 h-16 rounded-full object-contain"
              />
              <p>
                Reg Packers and Movers provided excellent service. They handled
                our household items with great care, were punctual,
                professional, and made our office relocation smooth and
                stress-free. Highly recommended for anyone looking for reliable
                packing and moving services.
              </p>
            </div>
          </div>
        </div>

        {/* Middle + Right Content */}
        <div className="md:col-span-2 space-y-4">
          {/* Welcome Section */}
          <div className="bg-[#1a1a1a] p-4 shadow-md">
            <h3 className="text-yellow-400 text-lg font-bold">
              WELCOME <span className="text-white">TO OUR COMPANY!</span>
            </h3>

            <div className="flex flex-col md:flex-row items-center mt-2 gap-4">
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
                  alt="House Moving"
                  className="max-w-full max-h-32 md:max-h-40 object-contain rounded-lg shadow-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                {/* New green sentence above */}
                <p className="text-green-400 text-sm">
                  We provide professional, reliable, efficient packing, moving,
                  and transportation services across cities and states
                </p>

                {/* Existing welcome paragraph */}
                <p className="text-sm leading-5">
                  This is a professional packers and movers company providing
                  reliable household shifting, office relocation, and vehicle
                  transportation services{" "}
                  <span className="text-yellow-400 cursor-pointer">| more</span>
                </p>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div className="bg-[#1a1a1a] p-4 shadow-md">
            <h3 className="text-green-400 text-lg font-bold">
              OUR <span className="text-white">SERVICES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
              <ul className="space-y-1">
                <li>➤ Packing & Unpacking</li>
                <li>➤ Household Shifting</li>
                <li>➤ Office Relocation</li>
                <li>➤ Local & Interstate Moving</li>
              </ul>

              <ul className="space-y-1">
                <li>➤ Car Transportation</li>
                <li>➤ Warehouse Storage</li>
                <li>➤ Insurance Coverage</li>
                <li>➤ 24/7 Customer Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
