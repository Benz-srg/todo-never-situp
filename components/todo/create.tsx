"use client";

import React, { useState, useEffect } from "react";
import todoService from "@/services/todoService";
import { ITodo } from "@/types/todo";
import { FaTimes } from "react-icons/fa";
import { msgError, msgSuccess } from "@/app/utils/swal";

interface CreateEditTodoModalProps {
  todo?: ITodo | null; 
  onClose: () => void;
  onTodoCreatedOrUpdated: (updatedTodo: ITodo) => void;
}

const CreateEditTodoModal: React.FC<CreateEditTodoModalProps> = ({
  todo,
  onClose,
  onTodoCreatedOrUpdated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  const handleCreateOrUpdateTodo = async () => {
    if (!title.trim()) {
      setValidationError("Title is required.");
      return;
    }
    try {
      let updatedTodo;
      if (!todo) {
        updatedTodo = await todoService.createTodo(title, description);
        msgSuccess("Create TODO List Success!");
      } else {
        if (todo) {
          updatedTodo = await todoService.updateTodo(todo._id, title, description);
          msgSuccess("Update TODO List Success!");
        }
      }

      onTodoCreatedOrUpdated(updatedTodo as ITodo);
      onClose();
    } catch (error: any) {
      msgError(error.message);
    }
  };

  return (
    <div className="fixed inset-x-0 top-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-black p-8 rounded-lg shadow-lg w-full sm:w-96 relative" style={{ boxShadow: '0px 4px 6px rgba(0.2, 0.1, 0, 0.1)' }}>
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-red-500 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 focus:outline-none"
          onClick={onClose}
        >
          <FaTimes className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-3xl font-semibold mb-4">
          {todo? "Edit Todo" : "Create Todo"}
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 pl-2 pr-2"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValidationError("");
            }}
          />
          {validationError && (
            <p className="text-red-500 text-sm mt-1">{validationError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50 pl-2 pr-2"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mr-2"
            onClick={handleCreateOrUpdateTodo}
          >
            {todo ? "Update" : "Create"}
          </button>
          <button
            className="text-gray-500 hover:text-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditTodoModal;
