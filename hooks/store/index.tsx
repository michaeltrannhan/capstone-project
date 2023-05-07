import { configureStore } from "@reduxjs/toolkit";
import medicationReducer from "../slices/medications";
const store = configureStore({
  reducer: {
    // Add your reducers here
    medication: medicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
