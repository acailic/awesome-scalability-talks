export type TArticle = {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  imageUrl?: string;
};

export type TDocumentation = {
  id: string;
  title: string;
  content: string;
  icon?: string;
  tags: string[];
  category: string;
  fileName: string;
};

export type TTalk = {
  id: string;
  title: string;
  content?: string; 
  icon?: string;
  fileName: string;
  description: string;
  tags: string[];
  category: string;
};
