import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserModal = ({ user, onClose, onUserUpdated }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "user"); // Default role
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async () => {
    if (!name.trim() || !email.trim() || !role.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `https://taskmanagement-backend-iv84.onrender.com/admin/updateuser/${user._id}`,
        { name, email, role },
        { withCredentials: true }
      );

      toast.success("User updated successfully");
      onUserUpdated(response.data.user);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        {/* Name Input */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleUpdateUser}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
          >
            {loading ? "Updating..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
