import { useEffect, useState } from 'react';
import classnames from 'classnames';
export default function TodoList({ todos, removeTodo, updateTodo }) {
  // 控制用户输入过程中表单发生的操作
  const changeState = (e, currentTodo) => {
    currentTodo.completed = e.target.checked;
    // 必须重新设置状态，否则组件不会重新渲染
    // 更新数组需要全新对象，否则组件不会重新渲染
    updateTodo(currentTodo);
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
      removeTodo(editedTodo.id);
    }
  };
  const onEdited = (e) => {
    // 监听enter
    if (e.code === 'Enter') {
      if (editedTodo.title) {
        updateTodo(editedTodo);
      }
      setEditedTodo(initial);
    }
  };
  const cancelEdit = () => {
    setEditedTodo(initial);
  };
  return (
    <ul className="todo-list">
      {/* 列表 */}
      {todos.map((todo) => (
        <li
          className={classnames({
            todo: true,
            completed: todo.completed,
            editing: editedTodo.id === todo.id,
          })}
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
            <button className="destroy" onClick={() => removeTodo(todo.id)}>
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
  );
}
