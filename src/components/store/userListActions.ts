import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction<{ email: string; password: string }>('userList/login');
export const getUsersRequest = createAction<number>('userList/getUsers');
export const createUserRequest = createAction<any>('userList/createUser');
export const updateUserRequest = createAction<{ id: string; data: any }>('userList/updateUser');
export const deleteUserRequest = createAction<string>('userList/deleteUser');
