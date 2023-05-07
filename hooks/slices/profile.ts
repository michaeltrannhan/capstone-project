import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Profile } from "../../components/utils/commons";
import ProfileServices from "../../services/profileServices";

interface ProfileState {
  isLoading: boolean;
  profile: Profile[];
}

const initialState: ProfileState = {
  isLoading: false,
  profile: [],
};

export const fetchProfile = createAsyncThunk(
  "user-accounts/profile",
  async (uuid: string, thunkAPI) => {
    try {
      const profile = await ProfileServices.fetchProfileByUUID(uuid);
      return profile?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("");
    }
  }
);

const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    clearProfile: (state) => {
      state.isLoading = false;
      state.profile = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
        state.profile = [];
      });
  },
});
