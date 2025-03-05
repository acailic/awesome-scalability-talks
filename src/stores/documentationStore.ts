import { create } from "zustand";
import { TDocumentation } from "../lib/types";
import { getAssetPath } from "../utils/paths";

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
    // Use a direct path to access markdown files
    // This ensures we're looking in the correct location relative to the deployed app
    const response = await fetch(
      `${window.location.origin}${getAssetPath(
        `/src/react-learning/${fileName}`
      )}`,
      {
        // Add cache control headers
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      }
    );

    // Handle both 200 OK and 304 Not Modified as success cases
    if (response.ok || response.status === 304) {
      const content = await response.text();
      return content;
    } else {
      throw new Error(
        `Failed to fetch content: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching documentation item:", error);
    throw error;
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
      // Use getAssetPath to handle the correct path for both development and production
      const response = await fetch(
        getAssetPath("/src/react-learning/docs.json"),
        {
          // Add cache control headers
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      // Handle both 200 OK and 304 Not Modified as success cases
      if (response.ok || response.status === 304) {
        // For 304, the browser will use the cached response
        // For 200, we'll get new data
        // In both cases, we can try to parse the JSON
        try {
          const docsData = await response.json();
          // Set the documentation items in the store
          set(() => ({
            documentationItems: docsData,
            errorMessage: "", // Clear any previous error
          }));
        } catch (error) {
          // If we can't parse JSON (which might happen with 304),
          // but we have existing data, keep using it
          if (get().documentationItems.length > 0) {
            console.log("Using cached documentation items");
          } else {
            throw new Error("Failed to parse documentation data");
          }
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching documentation items:", error);
      set(() => ({
        errorMessage: "Something went wrong. Please try again later.",
      }));
    }

    set(() => ({
      isLoading: false,
    }));
  },
}));
