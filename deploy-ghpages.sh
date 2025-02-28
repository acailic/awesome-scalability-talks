#!/bin/bash

echo "Building and deploying to GitHub Pages..."

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with underscore
touch dist/.nojekyll
touch public/.nojekyll

# Check if src/main.tsx exists
if [ ! -f "src/main.tsx" ]; then
  echo "Error: src/main.tsx does not exist. Creating a basic version..."
  mkdir -p src
  echo "import React from 'react'; import ReactDOM from 'react-dom/client'; const App = () => <div>Hello World</div>; ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);" > src/main.tsx
fi

# Update entry point in package.json
if ! grep -q '"type": "module"' package.json; then
  sed -i.bak '/"private": true,/a \ \ "type": "module",' package.json
fi

# Add @vitejs/plugin-react-refresh if not installed
npm list @vitejs/plugin-react-refresh || npm install --save-dev @vitejs/plugin-react-refresh

# Build with base path
npm run build

# Copy necessary files to dist directory
cp -f public/.nojekyll dist/

# Deploy to GitHub Pages
npx gh-pages -d dist

echo "Deployment complete!"
