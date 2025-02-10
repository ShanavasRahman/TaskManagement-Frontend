import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../utils/userContext";
import useAuth from "../../utils/useAuth";
import TaskModal from "./TaskModal";
import toast from "react-hot-toast";
import UserModal from "./UserModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);


  const { details,setDetails } = useContext(UserContext);
  const isAuthenticate = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://taskmanagement-backend-iv84.onrender.com/admin/getusers",
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const confirmDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(
        `https://taskmanagement-backend-iv84.onrender.com/admin/deleteuser/${selectedUser._id}`,
        {
          withCredentials: true,
        }
      );
      setUsers(users.filter((user) => user._id !== selectedUser._id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }

    setShowModal(false);
    setSelectedUser(null);
  };

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    const response = await axios.get("https://taskmanagement-backend-iv84.onrender.com/logout", {
      withCredentials: true,
    });
    sessionStorage.removeItem("userDetails");
    setDetails({
      userId: "",
      userName: "",
      role: "",
    });
    toast.success(response.data.message, { position: "top-right" });
    navigate("/login");
  };

  const handleManageTasks = (userId) => {
    setSelectedUser(userId);
    setShowTaskModal(true);
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
  };
  if (isAuthenticate == null) {
    return (
      <div className="p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="w-full border border-gray-300 rounded-lg shadow-md">
            <div className="animate-pulse">
              <div className="flex bg-gray-200 p-3 rounded-t-lg">
                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded ml-4"></div>
              </div>
              
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex p-3 border-t border-gray-300">
                  <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-1/4 h-4 bg-gray-200 rounded ml-4"></div>
                  <div className="w-1/4 h-4 bg-gray-200 rounded ml-4"></div>
                  <div className="w-1/4 h-4 bg-gray-200 rounded ml-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticate || details?.role !== "admin") {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white px-4 py-6 sm:px-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl sm:text-4xl font-semibold text-center'>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium'>
          Logout
        </button>
      </div>

      {/* Users Table */}
      <div className='bg-gray-800 rounded-lg shadow-lg p-4'>
        <h2 className='text-xl font-semibold mb-4'>User List</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm text-center'>
            <thead className='bg-gray-700 text-white'>
              <tr>
                <th className='py-3 px-4'>Name</th>
                <th className='py-3 px-4'>Email</th>
                <th className='py-3 px-4'>Manage Task</th>
                <th className='py-3 px-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className='border-t border-gray-700'>
                  <td className='py-3 px-4'>{user.name}</td>
                  <td className='py-3 px-4'>{user.email}</td>
                  <td className='py-3 px-4'>
                    <button
                      onClick={() => handleManageTasks(user._id)}
                      className='px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white'>
                      Manage
                    </button>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteUser(user)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Delete</h2>
            <p className='mb-4'>
              Are you sure you want to delete{" "}
              <span className='font-bold'>{selectedUser?.name}</span>?
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={handleDeleteUser}
                className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium'>
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showTaskModal && (
        <TaskModal
          userId={selectedUser}
          onClose={() => setShowTaskModal(false)}
        />
      )}

     {showUserModal && <UserModal user={selectedUser} onClose={() => setShowUserModal(false)} onUserUpdated={handleUserUpdated} />}

    </div>
  );
};

export default AdminDashboard;
