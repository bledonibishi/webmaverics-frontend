import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "../store/todos/actions";

const UserLayout = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  console.log("todos", todos && todos);
  return (
    <div>
      <span>
        <button
          onClick={() => dispatch(toggleTodo("bledon bossi", "asdasda", 1))}
        >
          Show todo
        </button>
        <button
          onClick={() => dispatch(addTodo("bledon", "Buy groceries", false))}
        >
          Add todo
        </button>
        <button onClick={() => dispatch(removeTodo(1))}>Remove todo</button>
      </span>
    </div>
  );
};

export default UserLayout;
