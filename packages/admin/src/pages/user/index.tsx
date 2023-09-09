import React from 'react';
import { Button, Card, Space, Typography } from '@arco-design/web-react';
const { Title, Text } = Typography;

export default function UserPage() {
  return (
    //容器
    <Card>
      {/* 标题 */}
      <Title heading={6}>用户管理</Title>
      {/* 面包屑 */}
      {/* 过滤条件 */}
      {/* 操作暗流 */}
      <Space direction="vertical">
        {/* 操作按钮 */}
        <Button type="primary" style={{ marginBottom: 10 }}>
          新增
        </Button>
        {/* 页面内容 */}
        {/* 数据表格 */}
        {/* 分页 */}
        <Text>User Page</Text>
      </Space>
    </Card>
  );
}
