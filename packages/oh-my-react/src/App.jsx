// import reactLogo from './assets/react.svg';
import { useEffect, useState } from 'react';
import './App.css';
// useState useEffect useContext
// useReducer useCallback useMemo useRef ...

const STORAGE_KEY = 'todomvc-react';
const todoStorage = {
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
function App() {
  // 将前面的`todos`创建为一个状态
  const [todos, setTodos] = useState(todoStorage.fetch());

  useEffect(() => {
    todoStorage.save(todos);
  }, [todos]);

  // 控制用户输入过程中表单发生的操作
  const changeState = (e, currentTodo) => {
    currentTodo.completed = e.target.checked;
    // 必须重新设置状态，否则组件不会重新渲染
    // 更新数组需要全新对象，否则组件不会重新渲染
    setTodos([...todos]);
  };
  const [newTodo, setNewTodo] = useState('');
  const changeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };
  // 用户回车且输入框有内容则添加一个新待办
  const addTodo = (e) => {
    if (e.code === 'Enter' && newTodo) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: newTodo,
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };
  const removeTodo = (todo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const initial = {
    title: '',
    completed: false,
  };
  // 正在编辑的办
  const [editedTodo, setEditedTodo] = useState(initial);

  let inputRef = null;
  const setEditInputRef = (el, todo) => {
    if (editedTodo.id === todo.id) {
      inputRef = el;
    }
  };
  useEffect(() => {
    // 如果editedTodo存在则设置焦点
    if (editedTodo && inputRef) {
      //设置输入框焦点
      inputRef.focus();
    }
  }, [editedTodo]);
  // 用户双击触发编辑模式
  const editTodo = (todo) => {
    // 克隆一个todo用于编辑
    // setBeforeEditCache(todo.title);
    setEditedTodo({ ...todo });
  };
  // 受控组件要求的事件处理
  const onEditing = (e) => {
    const title = e.target.value;
    if (title) {
      setEditedTodo({ ...editedTodo, title: e.target.value });
    } else {
      // title为空删除该项
      removeTodo(editedTodo);
    }
  };
  const onEdited = (e) => {
    // 监听enter
    if (e.code === 'Enter') {
      if (editedTodo.title) {
        // 获取对应待办并更新
        const todo = todos.find((todo) => todo.id === editedTodo.id);
        todo.title = editedTodo.title;
        setTodos([...todos]);
      }
      setEditedTodo(initial);
    }
  };
  const cancelEdit = () => {
    setEditedTodo(initial);
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
          onKeyUp={addTodo}
        />
      </div>
      {/* 列表 */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            className={[
              'todo',
              todo.completed ? 'completed' : '',
              editedTodo.title && editedTodo.id === todo.id ? 'editing' : '',
            ].join(' ')}
            key={todo.id.toString()}
          >
            <div className="view">
              {/* 受控组件：赋值和事件处理*/}
              <input
                className="toggle"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => changeState(e, todo)}
              />
              {/* 属性是动态值使用{xxx} */}
              {/* 渲染列表时务必指定key */}
              {/* 双击开启行内编辑：隐藏.view，显示.edit */}
              <span onDoubleClick={() => editTodo(todo)}>{todo.title}</span>
              <button className="destroy" onClick={() => removeTodo(todo)}>
                X
              </button>
            </div>
            {/* 声明editedTodo状态, onChange处理状态变化 */}
            {/* onKeyUp处理修改确认，onBlur退出编辑模式 */}
            <input
              className="edit"
              //设置一个函数到ref，根据上下文中todo的情况动态设置期望的input元素
              ref={(e) => setEditInputRef(e, todo)}
              type="text"
              value={editedTodo.title}
              onChange={onEditing}
              onKeyUp={onEdited}
              onBlur={cancelEdit}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
