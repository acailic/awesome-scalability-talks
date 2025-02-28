import { create } from "zustand";
import { TArticle } from "../lib/types";

type Store = {
  articles: TArticle[];
  isLoading: boolean;
  errorMessage: string;
  selectedTag: string;
  getTagsList: () => string[];
  getFilteredArticles: () => TArticle[];
  selectTag: (tag: string) => void;
  fetchArticles: () => Promise<void>;
};

export const useArticlesStore = create<Store>((set, get) => ({
  articles: [],
  isLoading: false,
  errorMessage: "",
  selectedTag: "",

  getTagsList: () => {
    const allTags: string[] = [];
    get().articles.forEach((article) => {
      article.tags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  },

  getFilteredArticles: () => {
    const state = get();

    return state.selectedTag
      ? state.articles.filter((article) =>
          article.tags.includes(state.selectedTag)
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
          id: 1,
          title: "Getting Started with React",
          summary:
            "Learn the basics of React and how to set up your first project",
          content:
            "React is a JavaScript library for building user interfaces...",
          author: "Jane Doe",
          publishedDate: "2023-05-15",
          tags: ["react", "javascript", "beginners"],
        },
        {
          id: 2,
          title: "Understanding React Hooks",
          summary:
            "A deep dive into React hooks and how they can simplify your code",
          content: "Hooks are a new addition in React 16.8...",
          author: "John Smith",
          publishedDate: "2023-06-22",
          tags: ["react", "hooks", "advanced"],
        },
        {
          id: 3,
          title: "State Management in React",
          summary:
            "Explore different state management solutions for React applications",
          content:
            "As your application grows, managing state becomes more complex...",
          author: "Alex Johnson",
          publishedDate: "2023-07-10",
          tags: ["react", "state-management", "redux", "context-api"],
        },
        {
          id: 4,
          title: "Building Responsive UIs with React",
          summary:
            "Learn how to create responsive and accessible user interfaces with React",
          content:
            "Creating responsive UIs is essential for modern web applications...",
          author: "Sarah Williams",
          publishedDate: "2023-08-05",
          tags: ["react", "ui", "responsive", "accessibility"],
        },
        {
          id: 5,
          title: "React Performance Optimization",
          summary:
            "Tips and tricks to optimize your React application's performance",
          content: "Performance is a critical aspect of user experience...",
          author: "Michael Brown",
          publishedDate: "2023-09-18",
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
