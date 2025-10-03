import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  company?: { name: string };
  phone?: string;
  website?: string;
  address?: { street: string; city: string };
};

type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.items = [action.payload, ...state.items];
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.items = state.items.map(u =>
        u.id === action.payload.id ? action.payload : u
      );
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(u => u.id !== action.payload);
    },
  },
});

export const { setLoading, setError, setUsers, addUser, updateUser, deleteUser } =
  usersSlice.actions;
export default usersSlice.reducer;
