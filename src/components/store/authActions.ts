// components/store/authActions.ts
import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction<{ email: string; password: string }>('auth/loginRequest');
