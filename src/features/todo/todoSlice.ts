import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { TodoType } from "../../types/todoType";

const initialState: TodoType[] = [];

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}api/todo`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos:", error);
    return [];
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (_state, action) => {
      return action.payload;
    });
    builder.addCase(fetchTodos.rejected, (_state, action) => {
      console.error("Error al obtener todos:", action.error);
    });
  },
});

export default todoSlice.reducer;
