/**
 * Utility functions for sharing content
 */

import { getBasePath } from "./paths";

/**
 * Generates a shareable URL for a specific talk
 * This ensures that when someone clicks on a shared link, they'll be directed to the specific talk
 *
 * @param talkId The ID of the talk to generate a URL for
 * @returns A URL that can be used to directly access the talk
 */
export const generateTalkShareUrl = (talkId: string): string => {
  const basePath = getBasePath();
  const baseUrl = window.location.origin;

  // Create a URL with a query parameter for the talk ID
  // This can be used to automatically select the talk when the page loads
  return `${baseUrl}${basePath}/?talkId=${encodeURIComponent(talkId)}`;
};
