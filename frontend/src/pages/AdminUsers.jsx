import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null); 

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await api.get("/admin/users", { withCredentials: true });
        const data = res.data.users || res.data;
        setUsers(data);
      } catch (err) {
        console.log("Error loading users:", err);
        toast.error("Error loading users");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleChangePermission(id, permission) {
    try {
      const res = await api.patch(
        `/admin/users/${id}/permission`,
        { permission },
        { withCredentials: true }
      );

      const updated = res.data.user || res.data;

      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
      toast.success("Role updated");
    } catch (err) {
      console.log("Error updating permission:", err);
      toast.error("Error updating permission");
    }
  }

  function handleRemoveClick(id) {
    setConfirmId(id);
  }

  async function handleConfirmRemove(id) {
    try {
      await api.delete(`/admin/users/${id}`, { withCredentials: true });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setConfirmId(null);
      toast.success("User removed");
    } catch (err) {
      console.log("Error removing user:", err);
      toast.error("Error removing user");
    }
  }

  function handleCancelRemove() {
    setConfirmId(null);
  }

  return (
    <div className="admin-users">
      <h1>Manage Users</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.permission}
                    onChange={(e) =>
                      handleChangePermission(u._id, e.target.value)
                    }
                  >
                    <option value="user">user</option>
                    <option value="retriever">retriever</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="admin-users-actions">
                  {confirmId === u._id ? (
                    <>
                      <button
                        className="admin-btn small danger"
                        onClick={() => handleConfirmRemove(u._id)}
                      >
                        Yes
                      </button>
                      <button
                        className="admin-btn small secondary"
                        onClick={handleCancelRemove}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="admin-btn small danger"
                      onClick={() => handleRemoveClick(u._id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;