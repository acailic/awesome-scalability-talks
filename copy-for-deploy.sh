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
    <script type="module" crossorigin src="/awesome-scalability-talks/assets/main-f9765e71.js"></script>
    <link rel="stylesheet" href="/awesome-scalability-talks/assets/index-34376656.css">
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
