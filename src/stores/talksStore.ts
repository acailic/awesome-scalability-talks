import { create } from "zustand";
import { TTalk } from "../lib/types";
import { getAssetPath } from "../utils/paths";

type Store = {
  talks: TTalk[];
  isLoading: boolean;
  errorMessage: string;
  selectedTag: string;
  getTagsList: () => string[];
  getFilteredTalks: () => TTalk[];
  selectTag: (tag: string) => void;
  fetchTalks: () => Promise<void>;
};

// Function to get content for one talk by filename
export const getTalkContentByFileName = async (
  fileName: string
): Promise<string> => {
  try {
    // Use a direct path to access markdown files
    const response = await fetch(
      `${window.location.origin}${getAssetPath(`/src/talks/${fileName}`)}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Error fetching talk content:", error);
    throw error;
  }
};

export const useTalksStore = create<Store>((set, get) => ({
  talks: [],
  isLoading: false,
  errorMessage: "",
  selectedTag: "",
  getTagsList: () => {
    const allTags: string[] = [];
    get().talks.forEach((talk) => {
      talk.tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  },
  getFilteredTalks: () => {
    const state = get();
    return state.selectedTag
      ? state.talks.filter((talk) =>
          talk.tags.includes(state.selectedTag)
        )
      : state.talks;
  },
  selectTag: (tag: string) => {
    set(() => ({
      selectedTag: tag,
    }));
  },
  fetchTalks: async () => {
    set(() => ({
      isLoading: true,
    }));
    try {
      // Use getAssetPath to handle the correct path for both development and production
      const response = await fetch(
        getAssetPath("/src/talks/talks.json")
      );
      
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the JSON response
      const talksData = await response.json();
      
      // Set the talks items in the store
      set(() => ({
        talks: talksData,
        errorMessage: "", // Clear any previous error
      }));
    } catch (error) {
      set(() => ({
        errorMessage: "Something went wrong. Please try again later.",
      }));
    }
    set(() => ({
      isLoading: false,
    }));
  },
}));