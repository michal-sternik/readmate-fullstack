import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../lib/constants";
import axios from "axios";
import { User } from "../types/usertypes";

import { UserService } from "../api/services/userService";
import { convertAndDisplayError } from "../lib/utils";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<User>(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      //   const token = localStorage.getItem("token");
      const response = await UserService.getUserProfile();
      //   await axios.get(
      // `${API_BASE_URL}/user/profile`
      //     {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      //   );
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
          state.user = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
