import { useEffect, useState } from "react";
import API from "../../api/axios";

function ViewOrders({ adminView = false }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Admin sees all orders, user sees only their own
        const endpoint = adminView ? "/orders" : "/orders/my";
        const { data } = await API.get(endpoint);

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to load orders ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [adminView]);

  if (loading) return <p className="text-white">Loading orders...</p>;

  if (!orders.length) return <p className="text-white">No orders found.</p>;

  return (
    <div className="p-6 bg-[#1f1f1f] min-h-screen rounded-3xl">
      <h2 className="text-white text-2xl mb-6">
        {adminView ? "All Orders (Admin)" : "My Orders"}
      </h2>

      <table className="min-w-full table-auto border-collapse border border-gray-700 text-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 p-2">Order ID</th>
            {!adminView && (
              <th className="border border-gray-600 p-2">Service</th>
            )}
            {adminView && <th className="border border-gray-600 p-2">User</th>}
            <th className="border border-gray-600 p-2">From</th>
            <th className="border border-gray-600 p-2">To</th>
            <th className="border border-gray-600 p-2">Move Date</th>
            <th className="border border-gray-600 p-2">Price</th>
            <th className="border border-gray-600 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="odd:bg-[#2a2a2a] even:bg-[#242424]">
              <td className="border border-gray-600 p-2">{order._id}</td>
              {adminView && (
                <td className="border border-gray-600 p-2">
                  {order.user.email}
                </td>
              )}
              {!adminView && (
                <td className="border border-gray-600 p-2">
                  {order.service.title}
                </td>
              )}
              <td className="border border-gray-600 p-2">
                {order.fromLocation}
              </td>
              <td className="border border-gray-600 p-2">{order.toLocation}</td>
              <td className="border border-gray-600 p-2">
                {new Date(order.moveDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-600 p-2">{order.price}</td>
              <td className="border border-gray-600 p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrders;
