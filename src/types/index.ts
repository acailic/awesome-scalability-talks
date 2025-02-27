export interface VideoSummary {
  id: string;
  title: string;
  thumbnailUrl: string;
  youtubeId: string;
  description: string;
  category: VideoCategory;
  keyPoints: string[];
  tags: string[];
  dateAdded: string;
  duration: string;
}

export enum VideoCategory {
  REACT = "React",
  TYPESCRIPT = "TypeScript",
  FRONTEND = "Frontend",
  BACKEND = "Backend",
  ARCHITECTURE = "Architecture",
  SCALABILITY = "Scalability",
  PERFORMANCE = "Performance",
  UI_UX = "UI/UX",
  TESTING = "Testing",
}

export interface Filter {
  categories: VideoCategory[];
  searchTerm: string;
  tags: string[];
}

export interface Summary {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  date: string;



















}  fileName: string;  description: string;  title: string;  id: string;export interface DocArticle {}  articles: DocArticle[];  icon: string;  description: string;  title: string;  id: string;export interface DocSection {}  content: string;  author: string;
