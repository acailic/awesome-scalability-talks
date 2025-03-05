import { create } from "zustand";
import { TAB } from "./tabs.ts";

interface TabState {
  activeTab: String;
  isInitialized: boolean;
  initializationTab: () => void;
  setActiveTab: (tab: String) => void;
}
const DEFAULT_TAB = TAB.ARTICLES;

export const useTabStore = create<TabState>((set, get) => ({
  activeTab: "talks",
  isInitialized: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  initializationTab: () => {
    const { activeTab, isInitialized } = get();
    if (!isInitialized) {
      if (!activeTab) {
        set({ activeTab: DEFAULT_TAB });
      }
      set({ isInitialized: true });
    }
  },
}));
