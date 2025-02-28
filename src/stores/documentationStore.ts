import { create } from "zustand";
import { TDocumentation } from "../lib/types";
import { getAssetPath } from '../utils/assetUtils';

type Store = {
  documentationItems: TDocumentation[];
  isLoading: boolean;
  errorMessage: string;
  selectedTag: string;
  getTagsList: () => string[];
  getFilteredDocumentationItems: () => TDocumentation[];
  selectTag: (tag: string) => void;
  fetchDocumentationItems: () => Promise<void>;
};

// get content for one document by filename
export const getDocumentationContentByFileName = async (
  fileName: string
): Promise<string> => {
  try {
    // read from react-learning/{fileName}.md
    const response = await fetch(`/src/react-learning/${fileName}`);
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Error fetching documentation item:", error);
    throw error;
  }
};

export const fetchDocumentationItems = async () => {
  try {
    // Use the helper for correct path in both dev and production
    const response = await fetch(getAssetPath('/src/react-learning/docs.json'));

    if (!response.ok) {
      throw new Error(`Failed to fetch documentation: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching documentation:', error);
    return [];
  }
};

export const useDocumentationStore = create<Store>((set, get) => ({
  documentationItems: [],
  isLoading: false,
  errorMessage: "",
  selectedTag: "",

  getTagsList: () => {
    const allTags: string[] = [];
    get().documentationItems.forEach((doc) => {
      doc.tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  },

  getFilteredDocumentationItems: () => {
    const state = get();

    return state.selectedTag
      ? state.documentationItems.filter((doc) =>
          doc.tags.includes(state.selectedTag)
        )
      : state.documentationItems;
  },

  selectTag: (tag: string) => {
    set(() => ({
      selectedTag: tag,
    }));
  },

  fetchDocumentationItems: async () => {
    set(() => ({
      isLoading: true,
    }));

    try {
      // Fetch the docs.json file from the react-learning directory
      const response = await fetch("/src/react-learning/docs.json");
      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the JSON response
      const docsData = await response.json();
      // Set the documentation items in the store
      set(() => ({
        documentationItems: docsData,
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
