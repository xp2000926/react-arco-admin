<h1 align="center">react-arco-admin</h1>
<p align="center">
基于Typscript、React 、NestJS 、NextJS、Docker的企业级实战课程
</p>

## 服务端启动方法

### 开发环境

```bash
# 需要 Docker环境
# 数据库管理
# 启动Mongo + Redis
pnpm db:start
# 访问 localhost:8081
# 停止Mongo + Redis
pnpm db:stop
## 备份数据到dump文件
# 数据会存储到mongodb/dump中
pnpm db:dump
# 从dump中恢复数据
pnpm db:restore
# 启动服务端
# API地址： http://localhost:4000
pnpm dev:server
# 启动前端admin项目
pnpm dev:admin
# 启动前端cms项目 Nest SSR
pnpm dev:cms
```
