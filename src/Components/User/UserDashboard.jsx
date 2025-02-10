import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../../utils/userContext";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { details,setDetails } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const id = details?.userId;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post(
          "https://taskmanagement-backend-iv84.onrender.com/displaytask",
          { id },
          { withCredentials: true }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [id]);

  const handleAddOrEditTask = async () => {
    if (newTask.title.length > 30) {
      toast.error("Title must be within 30 characters.", { position: "top-right" });
      return;
    }

    if (newTask.description.length > 100) {
      toast.error("Description must be within 100 characters.", { position: "top-right" });
      return;
    }

    try {
      if (editingTaskId) {
        await axios.put(
          `https://taskmanagement-backend-iv84.onrender.com/updatetask/${editingTaskId}`,
          { ...newTask, userId: id },
          { withCredentials: true }
        );
        setTasks(
          tasks.map((task) =>
            task._id === editingTaskId ? { ...task, ...newTask } : task
          )
        );
      } else {
        const response = await axios.post(
          "https://taskmanagement-backend-iv84.onrender.com/addtask",
          { ...newTask, userId: id },
          { withCredentials: true }
        );
        setTasks([...tasks, response.data.tasks]);
      }

      setIsModalOpen(false);
      setEditingTaskId(null);
      setNewTask({ title: "", description: "", priority: "", dueDate: "" });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`https://taskmanagement-backend-iv84.onrender.com/deletetask/${taskToDelete}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== taskToDelete));
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.split("T")[0],
    });
    setEditingTaskId(task._id);
    setIsModalOpen(true);
  };

  const handleInput = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.get("https://taskmanagement-backend-iv84.onrender.com/logout", {
      withCredentials: true,
    });
    sessionStorage.removeItem("userDetails");
    setDetails({
      userId: "",
      userName:"",
      role: "",
    })
    toast.success(response.data.message, { position: "top-right" });
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white px-4 py-6 sm:px-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl sm:text-4xl font-semibold'>User Dashboard</h1>
        <button
          onClick={handleLogout}
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md'>
          Logout
        </button>
      </div>

      <div className='bg-gray-800 rounded-lg shadow-lg p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Tasks</h2>
          <button
            onClick={() => {
              setNewTask({
                title: "",
                description: "",
                priority: "",
                dueDate: "",
              });
              setEditingTaskId(null);
              setIsModalOpen(true);
            }}
            className='px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                       rounded-lg shadow-md text-white font-medium transition duration-300 transform hover:scale-105'>
            + Add Task
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm text-center'>
            <thead className=' bg-gray-700 text-white text-center'>
              <tr>
                <th className='py-3 px-4'>Title</th>
                <th className='py-3 px-4'>Description</th>
                <th className='py-3 px-4'>Priority</th>
                <th className='py-3 px-4'>Due Date</th>
                <th className='py-3 px-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className='border-t border-gray-700'>
                  <td className='py-3 px-4'>{task.title}</td>
                  <td className='py-3 px-4'>{task.description}</td>
                  <td className='py-3 px-4'>{task.priority}</td>
                  <td className='py-3 px-4'>
                    {new Date(task.dueDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className='py-3 px-4 flex gap-3 justify-center'>
                    <button
                      onClick={() => handleEditTask(task)}
                      className='px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-medium'>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setTaskToDelete(task._id);
                        setIsDeleteModalOpen(true);
                      }}
                      className='px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white font-medium'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newTask={newTask}
          handleInput={handleInput}
          handleAddTask={handleAddOrEditTask}
          isEditing={!!editingTaskId}
        />
      )}

{isDeleteModalOpen && (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
    <div className='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
      <h2 className='text-xl font-semibold mb-4'>Confirm Delete</h2>
      <p className='mb-4'>
        Are you sure you want to delete this task?
      </p>
      <div className='flex justify-center gap-4'>
        <button
          onClick={() => {
            handleDeleteTask(editingTaskId);  // Pass the correct task ID
            setIsDeleteModalOpen(false);
          }}
          className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium'>
          Confirm
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className='px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium'>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserDashboard;
