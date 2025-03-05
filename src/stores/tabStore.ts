import { create } from "zustand";
import { TAB } from "./tabs";

interface TabState {
  activeTab: String;
  isInitialized: boolean;
  initializationTab: () => void;
  setActiveTab: (tab: String) => void;
}
const DEFAULT_TAB = TAB.TALKS;

export const useTabStore = create<TabState>((set, get) => ({
  activeTab: DEFAULT_TAB,
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
