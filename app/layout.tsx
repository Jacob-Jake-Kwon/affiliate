import * as React from 'react';
import './globals.css';

export const metadata = {
  title: '연예인들의 꿀템 추천 링크',
  description: '연예인들이 직접 추천한 꿀템들만 모았어요!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
