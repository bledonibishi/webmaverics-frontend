import {
  createAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = [
  {
    id: "",
    text: "",
    completed: false,
    todos: [
      { id: 1, text: "first one " },
      { id: 2, text: "second one " },
      { id: 2, text: "third one " },
    ],
    name: "",
    value: "",
    email: "",
    age: 0,
    surname: "",
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action) => {
      const data = action.payload;
      state[0].todos.push(data);
    },
    toggle: (state, action) => {
      console.log("text", action);
    },
    reset: () => initialState,
  },
});

export default todosSlice.reducer;
