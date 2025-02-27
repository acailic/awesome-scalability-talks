import { VideoCategory, VideoSummary } from "../types";

export const summaries: VideoSummary[] = [
  {
    id: "1",
    title: "React Hooks Deep Dive",
    thumbnailUrl: "https://img.youtube.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
    youtubeId: "TNhaISOUy6Q",
    description:
      "A comprehensive explanation of React Hooks and their use cases.",
    category: VideoCategory.REACT,
    keyPoints: [
      "Understanding useState and useEffect",
      "Creating custom hooks",
      "Common hooks pitfalls and how to avoid them",
    ],
    tags: ["hooks", "useState", "useEffect", "functional components"],
    dateAdded: "2023-02-15",
    duration: "32:15",
  },
  {
    id: "2",
    title: "TypeScript for React Developers",
    thumbnailUrl: "https://img.youtube.com/vi/Z5iWr6Srsj8/maxresdefault.jpg",
    youtubeId: "Z5iWr6Srsj8",
    description: "Learn how to effectively use TypeScript in React projects.",
    category: VideoCategory.TYPESCRIPT,
    keyPoints: [
      "Setting up TypeScript with React",
      "Typing props and state",
      "Using generics in React components",
    ],
    tags: ["typescript", "types", "interfaces", "generics"],
    dateAdded: "2023-03-10",
    duration: "45:22",
  },
  {
    id: "3",
    title: "Scaling React Applications",
    thumbnailUrl: "https://img.youtube.com/vi/0JlZocHSTPY/maxresdefault.jpg",
    youtubeId: "0JlZocHSTPY",
    description: "Best practices for scaling large React applications.",
    category: VideoCategory.SCALABILITY,
    keyPoints: [
      "Component design patterns",
      "State management strategies",
      "Code splitting and lazy loading",
    ],
    tags: ["architecture", "performance", "state management", "lazy loading"],
    dateAdded: "2023-01-28",
    duration: "51:07",
  },
];
