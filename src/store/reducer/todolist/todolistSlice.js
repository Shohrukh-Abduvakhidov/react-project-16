import { createSlice } from "@reduxjs/toolkit";

export const todolistSlice = createSlice({
  name: "todolist",
  initialState: {
    data: [
      { id: "1", title: "title 1", description: "information1", status:true },
      { id: "2", title: "title 2", description: "information2", status:false },
      { id: "3", title: "title 3", description: "information3", status:true },
      { id: "4", title: "title 4", description: "information4", status:false },
      { id: "5", title: "title 5", description: "information5", status:false },
    ]
  },
  reducers: {
    del: (state,action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
	 add: (state,action) => {
		state.data = [...state.data, action.payload]
	 },
	 update:(state, action) => {
      state.data = state.data.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    },
	 completed: (state, action) => {
      state.data = state.data.map((todo) =>
        todo.id === action.payload
          ? { ...todo, status: !todo.status }
          : todo
      );
    },
  }
});

export default todolistSlice.reducer;
export const { del,add,update,completed } = todolistSlice.actions;