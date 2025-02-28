#!/bin/bash

echo "Preparing files for GitHub Pages deployment..."

# Ensure dist directory exists
mkdir -p dist

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with underscore
touch dist/.nojekyll

# Copy 404.html to dist directory
cp -f public/404.html dist/

# Copy any other necessary files from public directory
if [ -d "public" ]; then
  echo "Copying files from public directory..."
  cp -rf public/* dist/ 2>/dev/null || :
fi

# Copy assets directory if it exists at the root level
if [ -d "assets" ]; then
  echo "Copying assets from root assets directory..."
  mkdir -p dist/assets
  cp -rf assets/* dist/assets/ 2>/dev/null || :
fi

# Copy images directory if it exists at the root level
if [ -d "images" ]; then
  echo "Copying images from root images directory..."
  mkdir -p dist/images
  cp -rf images/* dist/images/ 2>/dev/null || :
fi

# Ensure the base path is correctly set in the HTML files (but avoid duplicates)
echo "Fixing paths in HTML files..."

# First, revert any existing replacements to avoid duplicates
find dist -name "*.html" -type f -exec sed -i.bak "s|href=\"/awesome-scalability-talks/awesome-scalability-talks/|href=\"/awesome-scalability-talks/|g" {} \;
find dist -name "*.html" -type f -exec sed -i.bak "s|src=\"/awesome-scalability-talks/awesome-scalability-talks/|src=\"/awesome-scalability-talks/|g" {} \;

# Then apply the correct replacements, but only if they don't already have the prefix
find dist -name "*.html" -type f -exec sed -i.bak "s|href=\"/|href=\"/awesome-scalability-talks/|g" {} \;
find dist -name "*.html" -type f -exec sed -i.bak "s|src=\"/|src=\"/awesome-scalability-talks/|g" {} \;

# Also fix relative paths that don't start with / but should have the base path
find dist -name "*.html" -type f -exec sed -i.bak "s|href=\"assets/|href=\"/awesome-scalability-talks/assets/|g" {} \;
find dist -name "*.html" -type f -exec sed -i.bak "s|src=\"assets/|src=\"/awesome-scalability-talks/assets/|g" {} \;

# Clean up backup files
find dist -name "*.html.bak" -type f -delete

# Create a simple verification file to confirm deployment
echo "Deployment timestamp: $(date)" > dist/deployment-info.txt
echo "Repository: awesome-scalability-talks" >> dist/deployment-info.txt

echo "Files prepared for deployment!"
echo "Contents of dist directory:"
ls -la dist/
echo "Contents of dist/assets directory:"
ls -la dist/assets/ 2>/dev/null || echo "No assets directory found"
