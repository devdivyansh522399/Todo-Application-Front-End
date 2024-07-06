import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAllCompletedUserTodos,
  deleteAllUserTodos,
  deleteTodo,
  getAllUserTodos,
  markTodoAsComplete,
  markTodoAsIncomplete,
} from "../services/operations/todoAPI";
import { logout } from "../services/operations/authAPI";
import AddTodoForm from "../components/core/AddTodoForm";


function isOverdue(datetimeStr) {

  let dueDate = new Date(datetimeStr);
  let currentDate = new Date();
  return dueDate < currentDate;
}

function shortenDescription(description) {
  let words = description.split(" ");
  if (words.length > 15) {
    return words.slice(0, 15).join(" ") + "...";
  }
  return description;
}

function parseDate(datetime) {
  let date = new Date(datetime);
  return (date = date.toLocaleDateString());
}

function parseTime(datetime) {
  let date = new Date(datetime);
  return (date = date.toLocaleTimeString());
}

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [todayDate, setTodayDate] = useState("");
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todo, setTodo] = useState(null);

  const fetchTodosFromAPI = async () => {
    setLoading(true);
    try {
      const todosData = await getAllUserTodos(token);
      setTodos(todosData); // Set the fetched todos in the state
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodosFromAPI();

    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setTodayDate(today.toLocaleDateString("en-US", options));
  }, []);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId, token);
    await fetchTodosFromAPI();
  };

  const handleTodoComplete = async (todoId) => {
    await markTodoAsComplete(todoId, token);
    await fetchTodosFromAPI();
  };

  const handleTodoIncomplete = async (todoId) => {
    await markTodoAsIncomplete(todoId, token);
    await fetchTodosFromAPI();
  };

  const handleDeleteAllTodos = async () => {
    await deleteAllUserTodos(token);
    await fetchTodosFromAPI();
  };

  const handleDeleteAllCompletedTodos = async () => {
    await deleteAllCompletedUserTodos(token);
    await fetchTodosFromAPI();
  };

  return (
    <>
      <div className="bg-[#E2B94F] min-h-screen flex flex-col items-center justify-center px-5 md:px-10 lg:px-16   pb-5 py-5">
        <div className="flex flex-col md:flex-row space-y-3 items-center justify-between w-full px-6 py-4">
          <div className="space-y-2">
            <h1 className="text-3xl text-[#181938] font-bold leading-none mb-3">
              Create a Todo Now
            </h1>
            <p className="text-lg text-[#181938]">{todayDate}</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="#"
              className="flex flex-row space-x-2 bg-[#181938] px-3 py-2 rounded-lg"
              size="icon"
              variant="outline"
              onClick={() => {
                setShowAddTodoForm(true);
                setIsAdd(true);
              }}
              title="Add Todo"
            >
              <span className="text-white text-xl font-bold">New Task</span>{" "}
              <PlusIcon className="h-6 sm:h-8 w-6 sm:w-8 mr-1 text-white" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex flex-row space-x-2 bg-[#181938] px-3 py-2 rounded-lg"
              size="icon"
              variant="outline"
              title="Log Out"
            >
              <span className="text-white text-xl font-bold">Logout</span>{" "}
              <LogOutIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </button>
          </div>
        </div>
        <div className="w-full py-4 border-t border-gray-700">
          <div className="flex flex-row sm:flex-row items-center justify-between">
            <p className="text-lg sm:text-xl font-semibold text-white bg-[#181938] p-3 rounded">
              {todos.length} items left
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="text-sm sm:text-md font-medium text-white bg-[#181938] p-3 rounded"
                onClick={() => handleDeleteAllTodos()}
              >
                Delete All Todos
              </button>
              <button
                className="text-sm sm:text-md font-medium text-white bg-[#181938] p-3 rounded"
                onClick={() => handleDeleteAllCompletedTodos()}
              >
                Delete All Completed
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 w-full px-2 sm:px-10 py-2  rounded-4xl bg-[#181938] rounded-lg">
          <div className="flex flex-col gap-px">
            {todos.length === 0 ? (
              <div className="py-10 sm:py-14 text-center text-white font-semibold text-lg flex flex-col">
                You do not have any pending work, create a new Todo now
                <button
                  onClick={() => {
                    setShowAddTodoForm(true);
                    setIsAdd(true);
                  }}
                  className="mt-6 mx-auto border border-richblack-50 hover:bg-black hover:opacity-70 hover:text-white rounded-lg px-4 py-2 bg-indigo-600 text-white "
                >
                  Create Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:py-4">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 rounded-xl ${todo.completed ? "bg-[#51ff4e]" : isOverdue(todo.datetime) ? "bg-[#eb6565]" : "bg-richblack-200"} flex flex-col justify-between`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold text-[#181938] ">
                        Title : {todo?.title}
                      </span>
                      <span className="text-md font-medium text-[#181938] py-1">
                        Description : {shortenDescription(todo?.description)}
                      </span>
                      <span className="text-md font-medium text-[#181938] py-1">
                        Priority : {shortenDescription(todo?.priority)}
                      </span>
                      <span className="text-md font-medium text-[#181938] py-1">
                        Created At :{" "}
                        {`${parseDate(todo.createdAt)} ${parseTime(
                          todo?.createdAt
                        )}`}
                      </span>

                      <span className="text-md font-medium text-[#181938] py-1">
                        Due Date:{" "}
                        {`${parseDate(todo?.datetime)} ${parseTime(
                          todo?.datetime
                        )}`}
                      </span>
                    </div>

                    <div className="flex flex-row justify-between space-x-3 mt-2">
                        <div className="flex flex-row justify-center items-center space-x-2 bg-[#181938] px-3 py-2 rounded-lg">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 border border-richblack-50"
                            id={`todo-${todo.id}`}
                            onChange={(e) =>
                              e.target.checked
                                ? handleTodoComplete(todo?._id)
                                : handleTodoIncomplete(todo?._id)
                            }
                          />
                          <label
                            className={`flex-1 text-sm font-semibold ${
                              todo.completed
                                ? "line-through text-white"
                                : "text-white"
                            }`}
                            htmlFor={`todo-${todo.id}`}
                          >
                            Status
                          </label>
                        </div>
                        <button
                          className="flex  flex-row justify-center items-center  space-x-2 bg-[#181938] px-3 py-2 rounded-lg"
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setShowAddTodoForm(true);
                            setIsAdd(false);
                            setTodoId(todo?._id);
                            setTodo(todo)
                          }}
                          title="Update Todo"
                        >
                          <UpdateIcon className="h-4 w-4 text-white" />
                          <span className="text-white text-sm font-medium">Update</span>
                        </button>
                        <button
                          className="flex  flex-row justify-center items-center space-x-2 bg-[#181938] px-3 py-2 rounded-lg"
                          size="icon"
                          variant="outline"
                          onClick={() => handleDelete(todo?._id)}
                          title="Delete Todo"
                        >
                          <TrashIcon className="h-4 w-4 text-white" />
                          <span className="text-white text-sm font-medium">Delete</span>
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {showAddTodoForm && (
          <AddTodoForm
            showAddTodoForm={showAddTodoForm}
            setShowAddTodoForm={setShowAddTodoForm}
            fetchTodosFromAPI={fetchTodosFromAPI}
            isAdd={isAdd}
            todoId={todoId}
            data = {!isAdd && todo}
          />
        )}
      </div>
    </>
  );
}


function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="60" // Adjust the width as needed
      height="60" // Adjust the height as needed
      viewBox="0 0 60 60" // Larger viewBox to make the icon bigger within the container
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        background: "linear-gradient(to right, #667EEA, #764BA2)",
        borderRadius: "8px", // Adjust the border radius as needed
        padding: "0px", // Adjust the padding as needed
      }}
    >
      <path d="M15 30h30" />{" "}
      {/* Adjust the path to position the smaller icon */}
      <path d="M30 15v30" />{" "}
      {/* Adjust the path to position the smaller icon */}
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UpdateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19h9M4.73 15l-2.26 2.26a2 2 0 0 0 0 2.83l8.49 8.5a2 2 0 0 0 2.83 0l2.26-2.26" />
      <path d="M16 3L2 17l6 6 14-14-6-6z" />
    </svg>
  );
}
