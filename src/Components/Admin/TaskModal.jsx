import { useState, useEffect } from "react";
import axios from "axios";

const TaskModal = ({ userId, onClose }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "", priority: "", dueDate: "" });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post(
          "https://task-management-backend-eight-kappa.vercel.app/displaytask",
          { id: userId },
          { withCredentials: true }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.split("T")[0],
    });
  };

  const handleSaveEdit = async (taskId) => {
    try {
      await axios.put(
        `https://task-management-backend-eight-kappa.vercel.app/updatetask/${taskId}`,
        editedTask,
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === taskId ? { ...task, ...editedTask } : task)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-management-backend-eight-kappa.vercel.app/deletetask/${taskId}`, { withCredentials: true });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-3/4">
        <h2 className="text-xl font-semibold mb-4">Manage Tasks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-t border-gray-700">
                  {editingTask === task._id ? (
                    <>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editedTask.title}
                          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                          className="bg-gray-700 p-1 rounded text-white w-full"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editedTask.description}
                          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                          className="bg-gray-700 p-1 rounded text-white w-full"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={editedTask.priority}
                          onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                          className="bg-gray-700 p-1 rounded text-white"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="date"
                          value={editedTask.dueDate}
                          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                          className="bg-gray-700 p-1 rounded text-white"
                        />
                      </td>
                      <td className="py-3 px-4 flex gap-2 justify-center">
                        <button
                          onClick={() => handleSaveEdit(task._id)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-white"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4">{task.title}</td>
                      <td className="py-3 px-4">{task.description}</td>
                      <td className="py-3 px-4">{task.priority}</td>
                      <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString("en-GB")}</td>
                      <td className="py-3 px-4 flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(task)}
                          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-black"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
