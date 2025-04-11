import * as React from 'react';
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'OOO의 추천 링크',
  description: '내가 써보고 추천하는 링크 모음',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
