import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/auth`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};