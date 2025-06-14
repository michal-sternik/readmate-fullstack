import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../types/usertypes";

import { UserService } from "../api/services/userService";
import { convertAndDisplayError } from "../lib/utils";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

export const fetchUserProfile = createAsyncThunk<User>(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserProfile();

      return response as User;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(convertAndDisplayError(err));
      }
      return rejectWithValue("Wystąpił błąd");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.initialized = true;
          state.user = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
