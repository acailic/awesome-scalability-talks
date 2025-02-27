import { VideoSummary } from "../types/VideoSummary";

export const videos: VideoSummary[] = [
  {
    id: "1",
    title: "React Hooks Explained",
    youtubeId: "dpw9EHDh2bM",
    thumbnailUrl: "https://i.ytimg.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
    description: "A deep dive into React Hooks and how they work.",
    summary: `
      React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class.

      Key points from this video:
      - useState allows functional components to manage state
      - useEffect replaces lifecycle methods like componentDidMount
      - Custom hooks let you extract and reuse stateful logic
      - Rules of hooks: only call at the top level, only call from React functions

      The presenter demonstrates several practical examples and common pitfalls when using hooks.
    `,
    category: "React",
    tags: ["hooks", "functional components", "useState", "useEffect"],
    duration: "25:14",
    publishedDate: "2021-05-15",
    featured: true,
  },
  {
    id: "2",
    title: "TypeScript for React Developers",
    youtubeId: "Z5iWr6Srsj8",
    thumbnailUrl: "https://i.ytimg.com/vi/Z5iWr6Srsj8/maxresdefault.jpg",
    description: "How to use TypeScript effectively in React applications.",
    summary: `
      This video covers the essentials of using TypeScript with React.

      Main topics covered:
      - Setting up a React project with TypeScript
      - Type definitions for props and state
      - Generic components and hooks
      - Common type patterns and utilities
      - Using interfaces vs types
      - Type narrowing with discriminated unions

      The presenter shows how TypeScript improves developer experience with better autocomplete, catch errors early, and improve code quality.
    `,
    category: "TypeScript",
    tags: ["typescript", "types", "interfaces", "generics"],
    duration: "32:47",
    publishedDate: "2022-01-20",
  },
  {
    id: "3",
    title: "State Management in 2023",
    youtubeId: "HRPDUQyxg6g",
    thumbnailUrl: "https://i.ytimg.com/vi/HRPDUQyxg6g/maxresdefault.jpg",
    description: "Modern approaches to state management in React.",
    summary: `
      This comprehensive overview compares different state management solutions for React applications.

      State management options discussed:
      - React Context + useReducer for simpler applications
      - Redux and Redux Toolkit for complex, global state
      - Zustand as a minimalistic approach
      - Recoil for atomic state management
      - Jotai and its atomic approach
      - React Query for server state

      The video provides decision criteria for when to use each option and practical code examples.
    `,
    category: "State Management",
    tags: ["redux", "context", "zustand", "recoil", "jotai"],
    duration: "41:23",
    publishedDate: "2023-02-10",
    featured: true,
  },
];
