'use client';

import React from 'react';
import { ViewModeProvider, ViewModeContext } from './view-mode-context';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewModeProvider>
      <header className="flex items-center justify-between max-w-xl mx-auto px-4 py-4">
        <h1 className="text-lg font-bold">📌 연예인들의 꿀템 리스트</h1>
        <CompactViewToggle />
      </header>
      {children}
    </ViewModeProvider>
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