// import reactLogo from './assets/react.svg';
import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { useFilter, useTodos } from './hooks';
import TodoFilter from './TodoFilter';
// useState useEffect useContext
// useReducer useCallback useMemo useRef ...

const STORAGE_KEY = 'todomvc-react';
export const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};
//初始化时打开，刷新前关闭
// todoStorage.save([
//   { id: 1, title: '创建项目', completed: true },
//   { id: 2, title: '组件化开发', completed: false },
//   { id: 3, title: '掌握JSX', completed: false },
//   { id: 4, title: '掌握hooks', completed: false },
// ]);
//========================
// className
// inline style
// css Module 
function App() {
  const { todos, addTodo, removeTodo, updateTodo } = useTodos(
    todoStorage.fetch()
  );
  const { visibility, setVisibility, filteredTodos } = useFilter(todos);
  const [newTodo, setNewTodo] = useState('');
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };
  // 用户回车且输入框有内容则添加一个新待办
  const onAddTodo = (e) => {
    if (e.code === 'Enter' && newTodo) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <>
      <h2>待办项</h2>
      {/* 新增待办 */}
      <div>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="该学啥了?"
          value={newTodo}
          onChange={changeNewTodo}
          onKeyUp={onAddTodo}
        />
      </div>
      {/* 待办列表 */}
      <TodoList {...{ todos: filteredTodos, removeTodo, updateTodo }} />
      {/* 过滤 */}
      <TodoFilter {...{ visibility, setVisibility }} />
    </>
  );
}

export default App;
