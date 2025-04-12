'use client';

import { createContext, useState, useContext } from 'react';

export const ViewModeContext = createContext({
  isCompactView: false,
  toggleCompactView: () => {},
});

export const ViewModeProvider = ({ children }) => {
  const [isCompactView, setIsCompactView] = useState(false);
  const toggleCompactView = () => setIsCompactView(prev => !prev);

  return (
    <ViewModeContext.Provider value={{ isCompactView, toggleCompactView }}>
      {children}
    </ViewModeContext.Provider>
  );
};