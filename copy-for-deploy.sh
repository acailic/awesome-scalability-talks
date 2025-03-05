#!/bin/bash

echo "Preparing files for GitHub Pages deployment..."

# Store the current build assets
echo "Backing up build assets..."
mkdir -p temp_assets
if [ -d "dist/assets" ]; then
  cp -rf dist/assets/* temp_assets/
fi

# Ensure dist directory exists and is clean
rm -rf dist
mkdir -p dist
mkdir -p dist/assets

# Restore the build assets
echo "Restoring build assets..."
cp -rf temp_assets/* dist/assets/ 2>/dev/null || :
rm -rf temp_assets

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

# Copy the entire public directory structure
if [ -d "public" ]; then
  echo "Copying public directory structure..."
  cp -rf public/* dist/ 2>/dev/null || :
fi

# Copy the entire src directory structure for static files
echo "Copying src directory structure..."
mkdir -p dist/src

# Copy react-learning directory
if [ -d "src/react-learning" ]; then
  echo "Copying src/react-learning directory..."
  mkdir -p dist/src/react-learning
  cp -rf src/react-learning/* dist/src/react-learning/
fi

## copy deployment-info.txt
if [ -f "deployment-info.txt" ]; then
  echo "Copying deployment-info.txt..."
  cp -f deployment-info.txt dist/
fi

# Copy talks directory
if [ -d "src/talks" ]; then
  echo "Copying src/talks directory..."
  mkdir -p dist/src/talks
  cp -rf src/talks/* dist/src/talks/
fi

# Copy assets directory with all subdirectories
if [ -d "src/assets" ]; then
  echo "Copying src/assets directory with all subdirectories..."
  mkdir -p dist/src/assets
  cp -rf src/assets/* dist/src/assets/
fi

# Copy images directory if it exists at the root level
if [ -d "images" ]; then
  echo "Copying images directory..."
  mkdir -p dist/images
  cp -rf images/* dist/images/ 2>/dev/null || :
fi

# Get the latest JS file name
JS_FILE=$(find dist/assets -name "main-*.js" | head -n 1)
if [ -z "$JS_FILE" ]; then
  JS_FILE=$(find dist/assets -name "index-*.js" | head -n 1)
fi
if [ -n "$JS_FILE" ]; then
  JS_FILENAME=$(basename "$JS_FILE")
  echo "Found JS file: $JS_FILENAME"
else
  echo "Warning: No JS file found!"
  exit 1
fi

# Get the latest CSS file name
CSS_FILE=$(find dist/assets -name "main-*.css" | head -n 1)
if [ -z "$CSS_FILE" ]; then
  CSS_FILE=$(find dist/assets -name "index-*.css" | head -n 1)
fi
if [ -n "$CSS_FILE" ]; then
  CSS_FILENAME=$(basename "$CSS_FILE")
  echo "Found CSS file: $CSS_FILENAME"
else
  echo "Warning: No CSS file found!"
  exit 1
fi

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
echo "Contents of dist/assets directory:"
ls -la dist/assets/ 2>/dev/null || echo "No assets directory found"
echo "Contents of dist/src directory:"
ls -la dist/src/ 2>/dev/null || echo "No src directory found"
echo "Contents of dist/src/assets directory:"
ls -la dist/src/assets/ 2>/dev/null || echo "No src/assets directory found"
echo "Contents of dist/src/react-learning directory:"
ls -la dist/src/react-learning/ 2>/dev/null || echo "No src/react-learning directory found"
echo "Contents of dist/src/talks directory:"
ls -la dist/src/talks/ 2>/dev/null || echo "No src/talks directory found"
