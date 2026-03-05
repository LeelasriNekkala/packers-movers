import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  deleteService,
  updateService,
  clearServiceState,
} from "../../features/services/servicesSlice";

function ViewServices() {
  const dispatch = useDispatch();
  const {
    services = [],
    loading,
    error,
    success,
  } = useSelector((state) => state.services);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    price: "",
    isActive: true,
  });

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(fetchServices()); // refresh after update/delete
    }
  }, [success, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearServiceState());
    };
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(id));
    }
  };

  const handleEditClick = (service) => {
    setEditId(service._id);
    setEditData({
      title: service.title,
      description: service.description,
      price: service.price,
      isActive: service.isActive,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateService({ id: editId, formData: editData }));
    setEditId(null);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2>Manage Services</h2>

      {loading && <p>Processing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {services.length === 0 && <p>No services available</p>}

      {services.map((service) => (
        <div
          key={service._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          {editId === service._id ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                required
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <label>
                Active:
                <input
                  type="checkbox"
                  checked={editData.isActive}
                  onChange={(e) =>
                    setEditData({ ...editData, isActive: e.target.checked })
                  }
                  style={{ marginLeft: "10px" }}
                />
              </label>

              <br />

              <button type="submit" style={{ marginTop: "10px" }}>
                Save
              </button>

              <button
                type="button"
                onClick={() => setEditId(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <strong>₹ {service.price}</strong>

              <p>
                Status:{" "}
                <strong
                  style={{
                    color: service.isActive ? "green" : "red",
                  }}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </strong>
              </p>

              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  width="150"
                  style={{ marginTop: "10px", borderRadius: "5px" }}
                />
              )}

              <p style={{ fontSize: "12px", marginTop: "10px" }}>
                Created: {new Date(service.createdAt).toLocaleDateString()}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleEditClick(service)}>Edit</button>

                <button
                  onClick={() => handleDelete(service._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ViewServices;
