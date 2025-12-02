import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Catalog.css'
import shackimg from '../assets/halalshack.png'
import RestaurantItem from '../components/RestaurantItem'
import toast from "react-hot-toast";
import api from "../lib/axios";

const Catalog = (props) => {
  const [mainVendors, setMainVendors] = useState([]);
  const [searchedVendors, setSearchedVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image_url: "",
  });

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = props.userInfo?.permission === "admin";

  const handleSelect = (location) => {
    setSelectedLocation(location);
  };

  // When page initially loads, get all vendors (catalog data)
  useEffect(() => {
    async function fetchMenu() {
      const result = await props.getVendors();
      if (result.success) {
        setMainVendors(result.data);
        setSearchedVendors(result.data);
      } else {
        console.log(result.message);
      }
    }

    fetchMenu();
  }, [props]);

  // TODO: Move search functionality to parent as search can occur on multiple pages
  // Recalculate searchedPosts when searchTerm changes, which occurs when user types something in search box  useEffect(() => {
  useEffect(() => {
    console.log("Recalculating searchedVendors");
    // If no search term, searchedVendors=mainVendors.
    if (!searchTerm) {
      setSearchedVendors(mainVendors);
    // If search term, then searchedVendors is set to all vendors matching the search
    } else {
      const results = mainVendors.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedVendors(results);
    }
  }, [searchTerm, mainVendors]);

  const handleOpenAdd = () => {
    if (!isAdmin) return;
    setEditingId(null);
    setFormData({
      name: "",
      location: "",
      description: "",
      image_url: "",
    });
    setShowForm(true);
  };

  const handleOpenEdit = (vendor) => {
    if (!isAdmin) return;
    setEditingId(vendor._id);
    setFormData({
      name: vendor.name || "",
      location: vendor.location || "",
      description: vendor.description || "",
      image_url: vendor.image_url || "",
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location) {
      toast.error("Name and location are required.");
      return;
    }

    try {
      if (editingId) {
        const res = await api.patch(
          `/admin/restaurants/${editingId}`,
          formData,
          { withCredentials: true }
        );
        const updated = res.data.restaurant || res.data;
        setMainVendors((prev) =>
          prev.map((v) => (v._id === editingId ? updated : v))
        );
        toast.success("Restaurant updated.")
      } else {
        const res = await api.post(
          `/admin/restaurants`,
          formData,
          { withCredentials: true }
        );
        const created = res.data.restaurant || res.data;
        setMainVendors((prev) => [...prev, created]);
        toast.success("Restaurant created.")
      }

      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      const msg = error.response?.data?.message || "Error saving restaurant";
      toast.error(msg);
    }
  };

  const handleOpenDelete = (vendor) => {
    if (!isAdmin) return;
    setDeleteTarget(vendor);
  };

  const handleConfirmDelete = async () => {
    if (!isAdmin || !deleteTarget) return;

    try {
      setIsDeleting(true);

      await api.delete(`/admin/restaurants/${deleteTarget._id}`, {
        withCredentials: true,
      });

      setMainVendors((prev) =>
        prev.filter((v) => v._id !== deleteTarget._id)
      );
      setDeleteTarget(null);
    } catch (error) {
      const msg = error.response?.data?.message || "Error deleting restaurant";
      console.log(msg);
      alert(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="catalog">
      <h1>The Catalog</h1>

      {isAdmin && (
        <div className="admin-actions">
          <button className="admin-btn" onClick={handleOpenAdd}>
            Add restaurant
          </button>
        </div>
      )}

      <div className='filters'>
        <div className="search-box">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a restaurant"
          />
        </div>

        <div className="dropdown">
          <button className="dropbtn">{selectedLocation === "" ? "All locations" : selectedLocation}</button>
          <div className="dropdown-content">
            <Link to="/catalog" onClick={() => handleSelect("")}>All</Link>
            <Link to="/catalog" onClick={() => handleSelect("Commons")}>Commons</Link>
            <Link to="/catalog" onClick={() => handleSelect("University Center")}>University Center</Link>
            <Link to="/catalog" onClick={() => handleSelect("AOK Library")}>AOK Library</Link>
          </div>
        </div>
      </div>

      <div className="container">
        {!searchedVendors ? (
          <p>Loading vendors...</p>
        ) : searchedVendors.length === 0 ? (
          <p>No vendors found.</p>
        ) : (
          searchedVendors
            .filter(
              (member) =>
                selectedLocation === "" || member.location === selectedLocation
            )
            .map((member, index) => (
              <div key={member._id || index} className="restaurant-row">
                <RestaurantItem
                  id={member._id}
                  name={member.name}
                  img={member.image_url}
                  loc={member.location}
                  desc={member.description}
                />

                {isAdmin && (
                  <div className="restaurant-admin-buttons">
                    <button
                      type="button"
                      className="admin-btn small"
                      onClick={() => handleOpenEdit(member)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-btn small danger"
                      onClick={() => handleOpenDelete(member)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {/* Add / Edit modal */}
      {isAdmin && showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingId ? "Edit restaurant" : "Add restaurant"}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Location
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select location</option>
                  <option value="Commons">Commons</option>
                  <option value="University Center">University Center</option>
                  <option value="AOK Library">AOK Library</option>
                </select>
              </label>

              <label>
                Image URL
                <input
                  name="image_url"
                  type="text"
                  value={formData.image_url}
                  onChange={handleFormChange}
                />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </label>

              <div className="modal-actions">
                <button type="submit" className="admin-btn">
                  {editingId ? "Save changes" : "Create"}
                </button>
                <button
                  type="button"
                  className="admin-btn secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {isAdmin && deleteTarget && (
        <div className="modal-overlay">
          <div className="modal modal-confirm">
            <h3>Delete restaurant?</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="admin-btn danger"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, delete"}
              </button>
              <button
                type="button"
                className="admin-btn secondary"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
