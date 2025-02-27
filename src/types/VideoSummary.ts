export interface VideoSummary {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl: string;
  description: string;
  summary: string;
  category: Category;
  tags: string[];
  duration: string;
  publishedDate: string;
  featured?: boolean;
}

export type Category =
  | "React"
  | "TypeScript"
  | "JavaScript"
  | "CSS"
  | "Performance"
  | "State Management"
  | "Testing"
  | "Architecture"
  | "Backend"
  | "DevOps"
  | "Career";
