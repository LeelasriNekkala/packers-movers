import { useEffect, useState } from "react";
import API from "../../api/axios";

function ViewQuotes() {
  const [quotes, setQuotes] = useState([]);

  // Fetch all quotes
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await API.get("/quotes");
      setQuotes(res.data.quotes); // ✅ IMPORTANT FIX
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/quotes/${id}`, { status: newStatus });
      fetchQuotes(); // refresh after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">All Quotes</h1>

      {quotes.length === 0 && <p>No quotes found.</p>}

      {quotes.map((quote) => (
        <div key={quote._id} className="border p-4 mb-4 rounded shadow">
          <p>
            <strong>Name:</strong> {quote.name}
          </p>
          <p>
            <strong>Phone:</strong> {quote.phone}
          </p>
          <p>
            <strong>From:</strong> {quote.fromLocation}
          </p>
          <p>
            <strong>To:</strong> {quote.toLocation}
          </p>
          <p>
            <strong>Move Date:</strong>{" "}
            {new Date(quote.moveDate).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Message:</strong> {quote.message || "N/A"}
          </p>

          <div className="mt-3">
            <strong>Status:</strong>{" "}
            <select
              value={quote.status}
              onChange={(e) => handleStatusChange(quote._id, e.target.value)}
              className="border p-1 ml-2"
            >
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewQuotes;
