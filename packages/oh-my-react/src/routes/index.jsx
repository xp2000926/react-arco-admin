import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import EditTodo from '../EditTodo';
import Login from '../Login';
import { redirect } from 'react-router-dom';
import { updateTodo } from '../store/todoSlice';
import { store } from '../store/index';
import RequireAuth from '../RequireAuth';
import ErrorPage from '../ErrorPage';

export async function editTodoAction({ request, params }) {
  // 获取表单数据
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  // 类型转换
  updates.id = +params.id;
  updates.completed = !!updates.compaleted;
  // 修改数据
  store.dispatch(updateTodo(updates));
  // 实际场景中是请求接口
  // await updateTodo(params.id, updates);
  // 操作成功重定向
  return redirect(`/`);
}

// /login Login.jsx
// /edit/id EditTodo.jsx
// /App.jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
    // 加在这里
    errorElement: <ErrorPage />,
  },
  {
    path: '/edit/:id',
    element: <EditTodo />,
    action: editTodoAction,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;