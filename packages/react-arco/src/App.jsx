import './App.css';
import { Button, Tag, Layout, Space, Switch } from '@arco-design/web-react';
const Header = Layout.Header;
const Content = Layout.Content;
const Sider = Layout.Sider;
const Footer = Layout.Footer;

function App() {
  return (
    <Layout style={{ height: '400px' }}>
      <Header>
        <Space>
          <Tag color="arcoblue">Tag</Tag>
          <Button type="primary">Item1</Button>
          <Button type="primary">Item2</Button>
          <Switch defaultChecked />
        </Space>
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}
export default App;
