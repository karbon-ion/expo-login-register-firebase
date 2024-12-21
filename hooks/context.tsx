import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface AppContextType {
  user: UserModal | null;
  setUser: React.Dispatch<React.SetStateAction<UserModal | null>>;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

// Create a provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserModal | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
