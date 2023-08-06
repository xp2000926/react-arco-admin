import { createSelector, createSlice } from "@reduxjs/toolkit";
import { VisibilityFilters } from "./visibilitySlice";

const STORAGE_KEY = "todomvc-react";
export const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

const initialState = {
  value: [], // 初始为空
};

// 创建todoSlice保存todos状态
// 将之前修改方法移至reducers中用来修改todos状态
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // 添加 setTodos Reducer
    setTodos(state, { payload }) {
      state.value = payload
    },
    addTodo: ({ value: todos }, { payload: title }) => {
      const id = Math.floor(Math.random() * 10000)
      todos.push({
        id,
        title,
        completed: false,
      });
    },
    removeTodo: ({ value: todos }, { payload: id }) => {
      const idx = todos.findIndex((todo) => todo.id === id);
      todos.splice(idx, 1);
    },
    updateTodo: ({ value: todos }, { payload: editTodo }) => {
      const todo = todos.find((todo) => todo.id === editTodo.id);
      Object.assign(todo, editTodo);
    },
  },
});

// selector用于选出想要的数据
export const selectTodos = (state) => state.todos.value;
export const selectTodoById = (state,id) => state.todos.value.find(todo=>todo.id=== +id);
export const selectFilteredTodos = createSelector(
  (state) => state.visibility, // 选出所需状态作为输入
  (state) => state.todos.value,// 选出所需状态作为输入
  (visibility, todos) => { // 接收输入并执行派生逻辑
    switch (visibility) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => todo.completed === false);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.completed === true);
      default:
        return todos;
    }
  }
);
// actionCreator用于创建dispatch()需要的action
export const { addTodo, removeTodo, updateTodo,setTodos } = todoSlice.actions;
export default todoSlice.reducer;