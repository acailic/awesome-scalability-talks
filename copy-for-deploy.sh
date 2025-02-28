#!/bin/bash

echo "Preparing files for GitHub Pages deployment..."

# Ensure dist directory exists
mkdir -p dist

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with underscore
touch dist/.nojekyll

# Copy 404.html to dist directory
cp -f public/404.html dist/

# Copy any other necessary files
if [ -d "public" ]; then
  cp -rf public/* dist/ 2>/dev/null || :
fi

# Ensure the base path is correctly set in the HTML files
find dist -name "*.html" -type f -exec sed -i.bak "s|href=\"/|href=\"/awesome-scalability-talks/|g" {} \;
find dist -name "*.html" -type f -exec sed -i.bak "s|src=\"/|src=\"/awesome-scalability-talks/|g" {} \;
find dist -name "*.html.bak" -type f -delete

echo "Files prepared for deployment!"
