/**
 * Utility function to get the base path for assets
 * This handles the difference between local development and GitHub Pages deployment
 */
export const getBasePath = (): string => {
  // Check if we're in production (GitHub Pages)
  const isProduction = import.meta.env.PROD;
  // The repository name used in GitHub Pages
  const repoName = "awesome-scalability-talks";

  // In production, prepend the repository name to the path
  // In development, use the path as is
  return isProduction ? `/${repoName}` : "";
};

/**
 * Get the full path for an asset, handling both development and production environments
 * @param path The relative path to the asset
 * @returns The full path with the correct base path
 */
export const getAssetPath = (path: string): string => {
  const basePath = getBasePath();
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
};
