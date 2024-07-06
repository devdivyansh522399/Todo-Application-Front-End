import { toast } from "react-hot-toast";

import { todoEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
const user = JSON.parse(localStorage.getItem("user"));
const {
  CREATE_TODO_API,
  UPDATE_TODO_API,
  DELETE_TODO_API,
  GET_ALL_USER_TODOS_API,
  DELETE_ALL_USER_TODOS_API,
  DELETE_ALL_COMPLETED_USER_TODOS_API,
  MARK_COMPLETE_API,
  MARK_INCOMPLETE_API,
} = todoEndpoints;

// Function to create a new todo
export const createTodo = async (title, description,datetime,priority, token) => {
  const toastId = toast.loading("Creating todo...");
  let result = null;
  try {
    const response = await apiConnector("POST", CREATE_TODO_API, {
      title,
      description,
      datetime,
      priority,
      user
    }, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE TODO RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to create todo");
    }

    result = response.data.savedTodo;
    toast.success("Todo created successfully");
  } catch (error) {
    console.error("CREATE TODO ERROR:", error);
    toast.error(error.message || "Failed to create todo");
  }
  toast.dismiss(toastId);
  return result;
};

// Function to update a todo
export const updateTodo = async (todoId, title, description,datetime,priority,token) => {
  const toastId = toast.loading("Updating todo...");
  let result = null;
  try {
    const response = await apiConnector("POST", UPDATE_TODO_API, {
      todoId,
      title,
      description,
      datetime,
      priority,
    }, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE TODO RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Invalid response format");
    }
    result = response.data.updatedTodo;
    toast.success("Todo updated successfully");
  }
  catch (error) {
    console.error("UPDATE TODO ERROR:", error);
    toast.error("Failed to update todo");
  }
  toast.dismiss(toastId);
  return result;
};

// Function to delete a single todo
export const deleteTodo = async (todoId, token) => {
  const toastId = toast.loading("Deleting todo...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_TODO_API, { todoId }, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE TODO RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Invalid response format");
    }

    result = response.data.deletedTodo;
    toast.success("Todo deleted successfully");
  }
  catch (error) {
    console.error("DELETE TODO ERROR:", error);
    toast.error("Failed to delete todo");
  }
  toast.dismiss(toastId);
  return result;
};

// Function to get all user todos
export const getAllUserTodos = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    // console.log("Printing Token in API func -> ", token);
    const response = await apiConnector("GET", GET_ALL_USER_TODOS_API, {user}, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch user todos");
    }
    result = response?.data?.userTodos;
  } catch (error) {
    console.log("GET_ALL_USER_TODOS API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// Function to delete all user todos
export const deleteAllUserTodos = async (token) => {
  const toastId = toast.loading("Deleting all todos...");
  let result = [];
  try {
    const response = await apiConnector("DELETE", DELETE_ALL_USER_TODOS_API, {user}, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE ALL USER TODOS RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Failed to delete all todos");
    }

    result = response?.data?.message;

    toast.success("All todos deleted successfully");
  }
  catch (error) {
    console.log("DELETE ALL USER TODOS ERROR:", error);
    toast.error("Failed to delete all todos");
  }
  toast.dismiss(toastId);
  return result;
};


// Function to delete all user todos
export const deleteAllCompletedUserTodos = async (token) => {
  const toastId = toast.loading("Deleting all todos...");
  let result = [];
  try {
    const response = await apiConnector("DELETE", DELETE_ALL_COMPLETED_USER_TODOS_API, {user}, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE ALL USER TODOS RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Failed to delete all todos");
    }

    result = response?.data?.message;

    toast.success("All todos deleted successfully");
  }
  catch (error) {
    console.log("DELETE ALL USER TODOS ERROR:", error);
    toast.error("Failed to delete all todos");
  }
  toast.dismiss(toastId);
  return result;
};


// Function to mark a todo as complete
export const markTodoAsComplete = async (todoId, token) => {
  const toastId = toast.loading("Marking todo as complete...");
  let result = null;
  try {
    // console.log("Printing todo id in api func ", todoId);
    const response = await apiConnector("PUT", MARK_COMPLETE_API, {todoId}, {
      Authorization: `Bearer ${token}`,
    });

    console.log("MARK TODO AS COMPLETE RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response.data.todo;
    toast.success("Todo marked as complete");
  } catch (error) {
    console.error("MARK TODO AS COMPLETE ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// Function to mark a todo as incomplete
export const markTodoAsIncomplete = async (todoId, token) => {
  const toastId = toast.loading("Marking todo as incomplete...");
  let result = null;
  try {
    const response = await apiConnector("PUT", MARK_INCOMPLETE_API, { todoId }, {
      Authorization: `Bearer ${token}`,
    });

    console.log("MARK TODO AS INCOMPLETE RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response.data.todo;
    toast.success("Todo marked as incomplete");
  } catch (error) {
    console.error("MARK TODO AS INCOMPLETE ERROR:", error);
    toast.error(error.message || "Failed to mark todo as incomplete");
  }
  toast.dismiss(toastId);
  return result;
};
