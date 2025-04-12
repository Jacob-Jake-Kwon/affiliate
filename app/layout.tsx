'use client';

import * as React from 'react';
import './globals.css';
import { ViewModeProvider, ViewModeContext } from './view-mode-context';

export const metadata = {
  title: '연예인들의 꿀템 추천 링크',
  description: '연예인들이 직접 추천한 꿀템들만 모았어요!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics 삽입 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3LEV1VJQM1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3LEV1VJQM1');
            `,
          }}
        />
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ViewModeProvider>
          <header className="flex items-center justify-between max-w-xl mx-auto px-4 py-4">
            <h1 className="text-lg font-bold">📌 연예인들의 꿀템 리스트</h1>
            <CompactViewToggle />
          </header>
          {children}
        </ViewModeProvider>
      </body>
    </html>
  );
}

function CompactViewToggle() {
  const { isCompactView, toggleCompactView } = React.useContext(ViewModeContext);

  return (
    <label className="flex items-center space-x-2 cursor-pointer border px-3 py-1 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white shadow-sm">
      <span className="text-sm">🧾 컴팩트 뷰</span>
      <input
        type="checkbox"
        checked={isCompactView}
        onChange={toggleCompactView}
        className="accent-black"
      />
    </label>
  );
}