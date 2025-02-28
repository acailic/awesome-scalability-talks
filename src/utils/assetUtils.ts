/**
 * Helper function to get correct asset paths regardless of environment
 * @param path - relative path from src/assets or public directory
 * @returns The correct URL for the asset
 */
export function getAssetPath(path: string): string {
  // Check if path already has a slash at the beginning
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // For GitHub Pages in production, prepend the repo name to the path
  if (import.meta.env.PROD) {
    return `/awesome-scalability-talks${normalizedPath}`;
  }

  // For development, return the path as is
  return normalizedPath;
}

/**
 * Helper for importing images directly in components
 * @param imageName - The image name including extension
 * @returns The correct URL for the image
 */
export function getImageUrl(imageName: string): string {
  // Use Vite's import.meta.url feature to handle asset imports
  return new URL(`../assets/${imageName}`, import.meta.url).href;
}
