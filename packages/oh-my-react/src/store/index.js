import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import todoReducer, { todoStorage } from "./todoSlice";
import visibilityReducer from "./visibilitySlice";
import user from './userSlice'
// 声明一个中间件：只要是和todos相关的action，我们都触发保存行为
const storageMiddleware = (store) => (next) => (action) => {
  if (action.type.startsWith("todos/")) {
    todoStorage.save(store.getState().todos.value);
  }
  next(action)
};

// configureStore()创建一个store实例
export const store = configureStore({
  middleware: (gDM) => gDM().concat(storageMiddleware),
  reducer: {
    // counter即为模块名称
    counter:counterReducer,
    todos:todoReducer,
    visibility:visibilityReducer,
    user
  },
});
