import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../utils/userContext";
import Modal from "./Modal";
import useAuth from "../utils/useAuth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
    const { details } = useContext(UserContext);
    console.log(details);
  const id = details?.userId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/displaytask",
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
    try {
      if (editingTaskId) {
        await axios.put(
          `http://localhost:3000/updatetask/${editingTaskId}`,
          { ...newTask, userId: id },
          { withCredentials: true }
        );
        setTasks(tasks.map(task => 
            task._id === editingTaskId ? { ...task, ...newTask } : task
          ));
          
      } else {
        const response = await axios.post(
          "http://localhost:3000/addtask",
          { ...newTask, userId: id },
          { withCredentials: true }
        );
        setTasks([...tasks,response.data.tasks]);
      }

      setIsModalOpen(false);
      setEditingTaskId(null);
      setNewTask({ title: "", description: "", priority: "", dueDate: "" });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/deletetask/${taskId}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
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
    
    const isAuthenticate = useAuth();
    if (isAuthenticate == null) {
        return <h1>Loading..</h1>
    }
    if (isAuthenticate) {
        return (
            <div className='min-h-screen bg-gray-900 text-white px-4 py-6 sm:px-8'>
                <h1 className='text-3xl sm:text-4xl font-semibold text-center mb-6'>
                    Dashboard
                </h1>

                {/* Task Table with Add Task Button */}
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

                    {/* Task Table */}
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
                                            {new Date(task.dueDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className='py-3 px-4 flex gap-3 justify-center'>
                                            <button
                                                onClick={() => handleEditTask(task)}
                                                className='px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-medium'>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task._id)}
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
            </div>
        );
    } else {
        return <Navigate to="/login" replace/>
    }
};

export default Dashboard;
