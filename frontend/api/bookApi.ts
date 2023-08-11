import axios from 'axios';

const bookApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getBooks = async ({ pageParam = 1 }) => {
  const response = await bookApi.get(`/books?page=${pageParam}&pageSize=10`);
  return response.data;
};
export default bookApi;
