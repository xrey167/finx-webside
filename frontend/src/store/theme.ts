"use client";
import { create } from "zustand";

type ThemeState = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useUiStore = create<ThemeState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
