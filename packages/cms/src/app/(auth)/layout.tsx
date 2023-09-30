import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'auth',
  description: 'auth trlation ',
}
// 定义了服务器返回的初始化的html内容
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 必须加入html和body
  return (
    <html lang="zh_cn">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
