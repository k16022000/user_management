import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
interface UserListState {
  userList: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
  };
  isLoading: boolean;
  userDetails: {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    id: string;
  };
}

const initialState: UserListState = {
  userList: {
    page: 1,
    per_page: 5,
    total: 0,
    total_pages: 0,
    data: [],
  },
  isLoading: false,
  userDetails: {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    id: '',
  },
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSingleUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});
export const { setUserList, setLoading, setSingleUser } = userListSlice.actions;
export default userListSlice.reducer;
