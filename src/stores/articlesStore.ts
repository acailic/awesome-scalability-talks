import { create } from "zustand";

export type TArticle = {
  id: string;
  title: string;
  content?: string;
  author?: string;
  date?: string;
  tags: string[];
};

type Store = {
  articles: TArticle[];
  isLoading: boolean;
  errorMessage: string;
  fetchArticles: () => Promise<void>;
  selectedTag?: string;
  getFilteredArticles: () => TArticle[];
  selectTag: (tag: string) => void;
};

export const useArticlesStore = create<Store>((set, get) => ({
  articles: [],
  isLoading: false,
  errorMessage: "",
  selectedTag: undefined,

  getFilteredArticles: () => {
    const state = get();

    return state.selectedTag
      ? state.articles.filter((article) =>
          article.tags.includes(state.selectedTag!)
        )
      : state.articles;
  },

  selectTag: (tag: string) => {
    set(() => ({
      selectedTag: tag,
    }));
  },

  fetchArticles: async () => {
    set(() => ({
      isLoading: true,
    }));

    try {
      // In a real app, this would be an API call
      // For now, we'll use sample data
      const sampleArticles: TArticle[] = [
        {
          id: "1",
          title: "Getting Started with React",
          content:
            "React is a JavaScript library for building user interfaces...",
          author: "Jane Doe",
          date: "2023-05-15",
          tags: ["react", "javascript", "beginners"],
        },
        {
          id: "2",
          title: "Understanding React Hooks",
          content: "Hooks are a new addition in React 16.8...",
          author: "John Smith",
          date: "2023-06-22",
          tags: ["react", "hooks", "advanced"],
        },
        {
          id: "3",
          title: "State Management in React",
          content:
            "As your application grows, managing state becomes more complex...",
          author: "Alex Johnson",
          date: "2023-07-10",
          tags: ["react", "state-management", "redux", "context-api"],
        },
        {
          id: "4",
          title: "Building Responsive UIs with React",
          content:
            "Creating responsive UIs is essential for modern web applications...",
          author: "Sarah Williams",
          date: "2023-08-05",
          tags: ["react", "ui", "responsive", "accessibility"],
        },
        {
          id: "5",
          title: "React Performance Optimization",
          content: "Performance is a critical aspect of user experience...",
          author: "Michael Brown",
          date: "2023-09-18",
          tags: ["react", "performance", "optimization"],
        },
      ];

      set(() => ({
        articles: sampleArticles,
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
