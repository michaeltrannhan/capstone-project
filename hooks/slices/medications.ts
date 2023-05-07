import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Medication } from "../../components/utils/commons";
import MedicationService from "../../services/medicationServices";
import { create } from "domain";
import axios from "axios";
interface MedicationState {
  isLoading: boolean;
  medications: Medication[];
}
export const fetchMedication = createAsyncThunk<
  Medication[],
  { keyword: string }
>("medications/fetchByKeyword", async ({ keyword }, thunkAPI) => {
  try {
    const medications = await MedicationService.fetchMedicationByKeyword(
      keyword
    );
    return medications;
  } catch (error) {
    return thunkAPI.rejectWithValue("");
  }
});

const initialState: MedicationState = {
  isLoading: false,
  medications: [],
};

const medicationSlice = createSlice({
  initialState,
  name: "medication",
  reducers: {
    clearMedication: (state) => {
      state.isLoading = false;
      state.medications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMedication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medications = action.payload;
      })
      .addCase(fetchMedication.rejected, (state) => {
        state.isLoading = false;
        state.medications = [];
      })
      .addDefaultCase((state) => {
        state.isLoading = false;
        state.medications = [];
      });
  },
});

export const selectMedications = (state: RootState) => state.medication;

const { reducer, actions } = medicationSlice;
export const { clearMedication } = actions;
export default reducer;
