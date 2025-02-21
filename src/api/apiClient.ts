import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const patchUserPhone = async (data: { id: number; phone: string }) => {
  return apiClient.patch(`/users/${data.id}`, { phone: data.phone });
}

