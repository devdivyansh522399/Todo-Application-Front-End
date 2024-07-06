import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createTodo, updateTodo } from "../../services/operations/todoAPI";

export default function AddTodoForm({
  showAddTodoForm,
  setShowAddTodoForm,
  fetchTodosFromAPI,
  isAdd,
  todoId,
  data
}) {
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [datetime, setDatetime] = useState();
  const [priority, setPriority] = useState(data?.priority);
  const { token } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    setShowAddTodoForm(false);
  };

  const handleDateTimeChange = (e) => {
    setDatetime(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAdd) {
      await createTodo(title, description,datetime,priority, token);
    } else {
      await updateTodo(todoId, title, description,datetime,priority, token);
    }

    fetchTodosFromAPI();

    setShowAddTodoForm(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        showAddTodoForm ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full overflow-auto backdrop-blur-sm scroll`}
    >
      <div className="flex justify-center items-center h-full">
        <div
          className={`flex flex-col ${isMobile ? "order-1" : "order-2"} w-1/2`}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-[#fafa4f] p-6 rounded-lg shadow-md w-full"
          >
            <h2 className="text-3xl text-[#181938] font-semibold mb-6">
              {isAdd ? "Add Todo" : "Update Todo"}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block  text-md font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Title"
                onChange={handleTitleChange}
                className="mt-1 border px-4 py-3  block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-md  font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                placeholder="Description"
                onChange={handleDescriptionChange}
                className="mt-1 border px-4 py-3  block w-full shadow-sm sm:text-sm rounded-md resize-none h-48 my-5"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="dateTime"
                className="block text-md font-medium text-gray-700"
              >
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="dateTime"
                value={datetime}
                onChange={handleDateTimeChange}
                className="mt-1 border px-4 py-3 block w-full shadow-sm sm:text-sm rounded-md my-5"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="priority"
                className="block text-md font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={handlePriorityChange}
                className="mt-1 border px-4 py-3 block w-full shadow-sm sm:text-sm rounded-md my-5"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancelClick}
                className="flex flex-row space-x-2 bg-[#181938] px-3 py-2 rounded-lg text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex flex-row space-x-2 bg-[#181938] px-3 py-2 rounded-lg text-white"
              >
                {isAdd ? "Create" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
