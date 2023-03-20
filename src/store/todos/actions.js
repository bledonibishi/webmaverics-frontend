import { createAction } from "@reduxjs/toolkit";

export const addTodo = createAction("todos/add", (id, text, completed) => {
  return { payload: { id, text, completed } };
});

export const removeTodo = createAction("todos/remove", (id) => {
  console.log("id", id);
  return { payload: id };
});

export const toggleTodo = createAction("todos/toggle", (fs, sc, th) => {
  return { payload: { fs, sc, th } };
});
