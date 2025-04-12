import './globals.css';
import { ReactNode } from 'react';
import { metadata } from './metadata';
import ClientLayout from './client-layout';

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}