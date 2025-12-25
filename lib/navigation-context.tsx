"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavigationContextType {
  isInitialLoad: boolean;
}

const NavigationContext = createContext<NavigationContextType>({
  isInitialLoad: true,
});

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [initialPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== initialPathname) {
      setIsInitialLoad(false);
    }
    const timer = setTimeout(() => setIsInitialLoad(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname, initialPathname]);

  return (
    <NavigationContext.Provider value={{ isInitialLoad }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
