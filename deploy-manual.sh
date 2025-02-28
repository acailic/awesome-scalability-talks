# Install gh-pages package if not already installed
npm install --save-dev gh-pages

# Build project
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist
