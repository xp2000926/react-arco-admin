import './App.css';
import {
  Layout,
  Space,
  Button,
  Drawer,
  Form,
  Input,
} from '@arco-design/web-react';
import { useState } from 'react';
const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const fill = () => {
    form.setFieldsValue({
      username: 'admin',
      password: 'adminpassword',
    });
  };
  return (
    <Layout style={{ height: '400px' }}>
      <Header>
        <Space>表单</Space>
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Button onClick={fill}>填充</Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
          {/* 基本 */}
          {/* 提交 */}
          <Form
            onSubmit={(v) => {
              console.log(v);
            }}
            form={form}
          >
            <Form.Item
              label="用户名"
              field="username"
              rules={[
                { required: true, message: '用户名必填' },
                { minLength: 6, message: '用户名至少6位' },
              ]}
            >
              <Input placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item label="密码" field="password">
              <Input type="password" placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
          {/* 交互 */}

          {/* 校验 */}
        </Content>
      </Layout>
      <Footer>Footer</Footer>

      <Drawer
        width={332}
        title={<span>Basic Information </span>}
        visible={visible}
        okText="确定"
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </Layout>
  );
}
export default App;
