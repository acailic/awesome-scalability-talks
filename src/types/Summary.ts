export enum VideoCategory {
  DISTRIBUTED_SYSTEMS = "Distributed Systems",
  DATABASES = "Databases",
  CLOUD_INFRASTRUCTURE = "Cloud Infrastructure",
  PERFORMANCE = "Performance",
  ARCHITECTURE = "Architecture",
  OTHER = "Other",
}

export interface Summary {
  id: string;
  title: string;
  description: string;
  date: string;
  category: VideoCategory;
  tags: string[];
  content: string; // Added the missing content property
}
