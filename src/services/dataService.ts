import { Summary } from "../types";
import docsData from "../react-learning/docs.json";

export interface DocSection {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
}

export interface DocItem {
  id: string;
  title: string;
  fileName: string;
  description?: string;
  tags?: string[];
  content?: string;
}

export const fetchSummaries = async (): Promise<Summary[]> => {
  try {
    const response = await fetch("/data/summaries.json");
    if (!response.ok) {
      throw new Error("Failed to fetch summaries");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return [];
  }
};

export const fetchSummary = async (id: string): Promise<Summary | null> => {
  try {
    const summaries = await fetchSummaries();
    return summaries.find((summary) => summary.id === id) || null;
  } catch (error) {
    console.error(`Error fetching summary ${id}:`, error);
    return null;
  }
};

export const fetchDocSections = async (): Promise<DocSection[]> => {
  try {
    // Simulate API call with our local data
    return new Promise((resolve) => {
      setTimeout(() => {
        const sections = docsData.sections.map((section) => ({
          id: section.id,
          title: section.title,
          description: section.description || "",
        }));
        resolve(sections);
      }, 300); // Simulate network delay
    });
  } catch (error) {
    console.error("Error fetching doc sections:", error);
    throw error;
  }
};

export const fetchDocContent = async (
  sectionId: string
): Promise<DocItem[]> => {
  try {
    // Simulate API call with our local data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const section = docsData.sections.find((s) => s.id === sectionId);

        if (!section) {
          reject(new Error(`Section with ID ${sectionId} not found`));
          return;
        }

        resolve(section.items);
      }, 300); // Simulate network delay
    });
  } catch (error) {
    console.error(`Error fetching doc content for ${sectionId}:`, error);
    throw error;
  }
};

export const fetchDocFile = async (fileName: string): Promise<string> => {
  try {
    // In a real app, this would fetch the actual file content
    // For now, we'll simulate fetching the content
    const response = await fetch(`/react-learning/${fileName}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching doc file ${fileName}:`, error);
    throw error;
  }
};
