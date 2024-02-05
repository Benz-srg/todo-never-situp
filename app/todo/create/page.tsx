import React, { useState, ChangeEvent, FormEvent } from 'react';

interface CreateTodoFormProps {
  onCreate: (newTodo: Todo) => void;
}

interface Todo {
  title: string;
  description: string;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onCreate }) => {
  const [newTodo, setNewTodo] = useState<Todo>({ title: '', description: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.title.trim() === '' || newTodo.description.trim() === '') {
      alert('Please fill in both title and description fields.');
      return;
    }

    onCreate(newTodo);

    setNewTodo({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full p-2 border rounded-md"
          value={newTodo.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full p-2 border rounded-md"
          value={newTodo.description}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
      >
        Create Todo
      </button>
    </form>
  );
};

export default CreateTodoForm;
