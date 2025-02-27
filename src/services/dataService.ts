import { Summary, DocSection } from "../types";

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
    const response = await fetch("/data/docs.json");
    if (!response.ok) {
      throw new Error("Failed to fetch documentation sections");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching doc sections:", error);
    return [];
  }
};

export const fetchDocContent = async (fileName: string): Promise<string> => {
  try {
    const response = await fetch(`/docs/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch documentation: ${fileName}`);
    }
    return response.text();
  } catch (error) {
    console.error(`Error fetching doc content ${fileName}:`, error);
    return "# Error loading documentation";
  }
};
