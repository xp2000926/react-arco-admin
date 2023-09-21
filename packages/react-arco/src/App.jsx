import './App.css';
import {  Layout, Space, Button, Drawer } from '@arco-design/web-react';
import {  useState } from 'react';
const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={{ height: '400px' }}>
      <Header>
        <Space>
          <Button type="primary">Item1</Button>
          <Button type="primary">Item2</Button>
          <Button type="primary">Item3</Button>
          <Button type="primary">Item4</Button>
        </Space>
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Button
            onClick={() => {
              setVisible(true);
            }}
            type="primary"
          >
            新增
          </Button>
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
