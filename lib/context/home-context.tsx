"use client";

import React, { createContext, useContext } from "react";
import type { HomePageData } from "@/app/cms/schema";

const HomePageContext = createContext<HomePageData | null>(null);

interface HomePageProviderProps {
  settings: HomePageData;
  children: React.ReactNode;
}

export function HomePageProvider({
  settings,
  children,
}: HomePageProviderProps) {
  return (
    <HomePageContext.Provider value={settings}>
      {children}
    </HomePageContext.Provider>
  );
}

export function useHomePage() {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePage must be used within HomePageProvider");
  }
  return context;
}
