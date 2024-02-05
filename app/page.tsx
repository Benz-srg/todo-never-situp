"use client";

import React, { useState, useEffect } from "react";
import todoService from "@/services/todoService";
import { ITodo } from "@/types/todo";
import CreateTodoModal from "@/components/todo/create";
import { FaTrash } from "react-icons/fa";
import { confirm, msgError } from "./utils/swal";

const TodoListPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  const handleEditTodo = (todo: ITodo) => {
    setSelectedTodo(todo);
    setModal(true);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todoData = await todoService.getAllTodos();
      setTodos(todoData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const handleDeleteTodo = async (data: ITodo) => {
    try {
      const result = await confirm(data.title);
      if (!result) return;
      await todoService.deleteTodo(data._id ||'');
      setTodos(todos.filter((todo) => todo._id !== data._id));
      fetchTodos();
    } catch (error: any) {
      msgError(error.message);
    }
  };

  const handleCreatedOrUpdated = (newTodo: ITodo) => {
    fetchTodos();
  };
  const onClose = () => {
    setSelectedTodo(null);
    setModal(false);
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      {todos.length === 0 ? (
        <div className="bg-white dark:bg-black p-8 rounded-lg shadow-lg w-full sm:w-96">
          <span className="text-md text-gray-400">
            {`Empty, press 'Create' to add a new todo`}
          </span>
        </div>
      ) : (
        <>
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center bg-white dark:bg-black p-8 rounded-lg shadow-lg w-full sm:w-96 mb-2"
            >
              <div className="flex items-center" onClick={() => handleEditTodo(todo)}>
                <h5 className="text-xl font-semibold">{todo.title}</h5>
                <p className="ml-2">{todo.description}</p>
              </div>

              <button
                className="ml-auto text-red-500 hover:text-red-600 focus:outline-none"
                onClick={() => handleDeleteTodo(todo)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </>
      )}
      <div className="flex-grow"></div>
      <div className="flex justify-between gap-3">
      <button
        className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2 px-4 rounded-full mt-4"
        onClick={() => setModal(true)}
      >
        table +
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4"
        onClick={() => setModal(true)}
      >
        Create +
      </button>
      </div>
     

      {modal && (
        <CreateTodoModal
          onClose={() => onClose()}
          onTodoCreatedOrUpdated={handleCreatedOrUpdated}
          todo={selectedTodo}
        />
      )}
    </div>
  );
};

export default TodoListPage;
