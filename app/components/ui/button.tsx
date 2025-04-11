import { ReactNode } from 'react';

export function Button({ children, asChild = false }: { children: ReactNode; asChild?: boolean }) {
  if (asChild) {
    return <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">{children}</span>;
  }
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      {children}
    </button>
  );
}
