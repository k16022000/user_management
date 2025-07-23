import { api } from '../api/api';
import { API_URLS } from '../api/urls';

export const userService = {
  login: (credentials: { email: string; password: string }) =>
    api.post(API_URLS.login, credentials),

  getUsers: () => api.get(API_URLS.userList),

  getUserById: (id: number) => api.get(API_URLS.userDetails(id)),

  getSingleUser: (id: string) => api.get(API_URLS.singleUser(id)),

  updateUser: (
    id: string,
    data: {
      first_name: string;
      last_name: string;
      email: string;
      avatar: string;
    }
  ) => api.put(API_URLS.updateUser(id), data),

  deleteUser: (id: string) => api.delete(API_URLS.deleteUser(id)),

  createUser: (credentials: {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }) => api.post(API_URLS.createUser, credentials),
};
