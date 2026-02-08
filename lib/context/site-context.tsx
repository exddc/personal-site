"use client";

import React, { createContext, useContext } from "react";
import type { SiteSettingsData } from "@/app/cms/schema";

const SiteSettingsContext = createContext<SiteSettingsData | null>(null);

interface SiteSettingsProviderProps {
  settings: SiteSettingsData;
  children: React.ReactNode;
}

export function SiteSettingsProvider({
  settings,
  children,
}: SiteSettingsProviderProps) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  }
  return context;
}
