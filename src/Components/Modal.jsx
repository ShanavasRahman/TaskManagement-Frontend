const Modal = ({ isOpen, onClose, newTask, handleInput, handleAddTask, isEditing }) => {
    if (!isOpen) return null; 
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-white mb-4">{isEditing ? "Edit Task" : "Add Task"}</h2>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInput}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInput}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-300">Priority</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleInput}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
  
          <div className="mb-3">
            <label className="block text-sm text-gray-300">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInput}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
  
          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  