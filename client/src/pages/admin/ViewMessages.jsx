import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInquiries,
  deleteInquiry,
} from "../../features/orders/orderSlice";

function ViewMessages() {
  const dispatch = useDispatch();
  const { inquiries, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this inquiry?")) {
      dispatch(deleteInquiry(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">All Inquiries</h2>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {inquiries.length === 0 && !loading && (
        <p className="text-white">No inquiries found.</p>
      )}

      <div className="grid gap-6">
        {inquiries.map((msg) => (
          <div
            key={msg._id}
            className="bg-white text-black shadow-md rounded-lg p-5 border"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">{msg.name}</h3>
              <span className="text-sm bg-yellow-200 px-3 py-1 rounded">
                {msg.status}
              </span>
            </div>

            <p>
              <strong>Phone:</strong> {msg.phone}
            </p>
            <p>
              <strong>From:</strong> {msg.fromLocation}
            </p>
            <p>
              <strong>To:</strong> {msg.toLocation}
            </p>
            <p>
              <strong>Move Date:</strong>{" "}
              {new Date(msg.moveDate).toLocaleDateString()}
            </p>
            <p>
              <strong>House Size:</strong> {msg.houseSize}
            </p>

            <div className="mt-4 text-right">
              <button
                onClick={() => handleDelete(msg._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMessages;
