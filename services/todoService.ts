import axiosInstance from '@/app/plugin/axiosInstance';
import { ITodo } from '@/types/todo';



const todoService = {
  getAllTodos: async (): Promise<ITodo[]> => {
    try {
      const response = await axiosInstance.get<ITodo[]>(`/todos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTodoById: async (id: string): Promise<ITodo | null> => {
    try {
      const response = await axiosInstance.get<ITodo>(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTodo: async (title: string, description: string): Promise<ITodo> => {
    try {
      const response = await axiosInstance.post<ITodo>(`/todos`, {
        title,
        description,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTodo: async (
    id: string,
    title: string,
    description: string
  ): Promise<ITodo | null> => {
    try {
      const response = await axiosInstance.put<ITodo>(`/todos/${id}`, {
        title,
        description,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTodo: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default todoService;
