// import reactLogo from './assets/react.svg';
import './App.css';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { Counter } from './Store';
import AddTodo from './AddTodo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRole, setRole } from './store/userSlice';
import AuthWrapper from './AuthWrapper';
// useState useEffect useContext
// useReducer useCallback useMemo useRef ...

// redux
// mobx vue reactibity
// recoil
// zustand 简版redux
// jotaoi  hooks
// valtio 基于 proxy
// resso rn ssr 小程序

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
  const role = useSelector(selectRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onLogout() {
    // 清空角色
    dispatch(setRole(''));
    // 跳转登录页
    navigate('/login');
  }
  return (
    <>
      <div>
        你好, {role}
        <button onClick={onLogout}>注销</button>
      </div>

      <h2>待办项</h2>
      <Counter />
      {/* 新增待办 */}
      <AuthWrapper roles={['admin']}>
        <AddTodo />
      </AuthWrapper>
      {/* 待办列表 */}
      <TodoList />
      {/* 过滤 */}
      <TodoFilter />
    </>
  );
}

export default App;
