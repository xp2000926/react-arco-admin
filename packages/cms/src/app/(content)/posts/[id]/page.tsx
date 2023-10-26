'use client';
// import { getMenu, getMenuIds } from '../../libs/menu';
import { ArticleViewer } from './components/article-viewer';

// 为动态路由生成静态参数
export async function generateStaticParams() {
  const menu = await getMenu('http://localhost:3000/data-api/menus');
  return getMenuIds(menu);
}

// 获取菜单数据
export async function getArticle(id: string) {
  return fetch('http://localhost:3000/data-api/article/' + id)
    .then((res) => res.json())
    .then((json) => json.data);
}

export default async function Post({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  return (
    <div className="prose max-w-full">
      {article ? (
        <ArticleViewer article={article} />
      ) : (
        '没有内容可以显示，可以试试别的文章'
      )}
    </div>
  );
}