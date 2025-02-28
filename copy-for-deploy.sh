#!/bin/bash

echo "Preparing files for GitHub Pages deployment..."

# Ensure dist directory exists and is clean
rm -rf dist
mkdir -p dist

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with underscore
touch dist/.nojekyll

# Copy favicon if it exists
if [ -f "favicon.ico" ]; then
  echo "Copying favicon.ico..."
  cp -f favicon.ico dist/
fi

# Copy 404.html to dist directory
if [ -f "public/404.html" ]; then
  echo "Copying 404.html..."
  cp -f public/404.html dist/
elif [ -f "404.html" ]; then
  echo "Copying 404.html from root..."
  cp -f 404.html dist/
fi

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

# Copy src/react-learning directory to dist/src/react-learning
if [ -d "src/react-learning" ]; then
  echo "Copying src/react-learning directory..."
  mkdir -p dist/src/react-learning
  cp -rf src/react-learning/* dist/src/react-learning/ 2>/dev/null || :
fi

# Copy any other necessary source directories that contain static assets
if [ -d "src/assets" ]; then
  echo "Copying src/assets directory..."
  mkdir -p dist/src/assets
  cp -rf src/assets/* dist/src/assets/ 2>/dev/null || :
fi

# Get the latest JS file name - look for both main-*.js and index-*.js
JS_FILE=$(find dist/assets -name "index-*.js" -o -name "main-*.js" | head -n 1)
JS_FILENAME=$(basename "$JS_FILE")
echo "Found JS file: $JS_FILENAME"

# Get the latest CSS file name
CSS_FILE=$(find dist/assets -name "index-*.css" | head -n 1)
CSS_FILENAME=$(basename "$CSS_FILE")
echo "Found CSS file: $CSS_FILENAME"

# Directly edit the index.html file to ensure correct paths
echo "Directly editing index.html file..."
cat > dist/index.html << EOL
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/awesome-scalability-talks/favicon.ico" />
    <!-- Handle GitHub Pages routing -->
    <script>
      // Store the URL if we came from a redirect
      (function () {
        const redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;

        if (redirect && redirect !== location.href) {
          history.replaceState(null, null, redirect);
        }
      })();
    </script>
    <title>Awesome scalability talks</title>
    <script type="module" crossorigin src="/awesome-scalability-talks/assets/${JS_FILENAME}"></script>
    <link rel="stylesheet" href="/awesome-scalability-talks/assets/${CSS_FILENAME}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOL

# Create a simple verification file to confirm deployment
echo "Deployment timestamp: $(date)" > dist/deployment-info.txt
echo "Repository: awesome-scalability-talks" >> dist/deployment-info.txt

echo "Files prepared for deployment!"
echo "Contents of dist directory:"
ls -la dist/
echo "Contents of dist/src directory (if exists):"
ls -la dist/src/ 2>/dev/null || echo "No src directory found"
echo "Contents of dist/assets directory:"
ls -la dist/assets/ 2>/dev/null || echo "No assets directory found"
