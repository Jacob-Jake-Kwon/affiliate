import * as React from 'react';
import './globals.css';

export const metadata = {
  title: 'Jake의 추천 링크',
  description: '써보고 괜찮았던 것만 모았어요!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
