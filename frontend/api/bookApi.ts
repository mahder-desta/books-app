import axios from 'axios';

const bookApi = axios.create({
  baseURL: 'http://15.165.74.54:3000',
});

export const getBooks = async ({ pageParam = 1 }) => {
  const response = await bookApi.get(`?page=${pageParam}`);
  return response.data;
};
export default bookApi;
