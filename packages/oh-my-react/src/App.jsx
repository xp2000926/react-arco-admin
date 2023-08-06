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
import { useTitle, useRequest } from 'ahooks';
import { useEffect } from 'react';
import { setTodos } from './store/todoSlice';
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

// ahooks 分类
// useRequest：数据请求
// Scene：表格、滚动、翻页等
// LifeCycle：挂载、卸载等
// State：状态管理，cookie，localStorage等
// Effect：定时器、防抖、节流等
// Dom：操作dom
// Advanced：响应式、事件等

// 数据获取
// - 传统axios
//   axios.get(url,{}).then(res=>res.xxx)
// - hooks
//   { data, loading, error }= useRequest(getTodos)
function getTodos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: '创建项目', completed: true },
        { id: 2, title: '组件和JSX', completed: true },
        { id: 3, title: 'react hooks', completed: false },
      ]);
    }, 2000);
  });
  // return Promise.resolve([
  //   { id: 1, title: '创建项目', completed: true },
  //   { id: 2, title: '组件和JSX', completed: true },
  //   { id: 3, title: 'react hooks', completed: false },
  // ]);
}

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
  useTitle('TodoMVC');
  // 获取todos数据 获取 loading 状态
  const { data, loading, error } = useRequest(getTodos);
  // 数据获取到之后填充到 redux 中
  useEffect(() => {
    if (data) {
      dispatch(setTodos(data));
    }
  }, [data]);
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
      {loading ? <div>loading...</div> : <TodoList />}
      {error && <div>{error}</div>}
      {/* 过滤 */}
      <TodoFilter />
    </>
  );
}

export default App;
