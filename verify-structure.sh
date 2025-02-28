#!/bin/bash

echo "Verifying project structure..."

# Check for essential files
ESSENTIAL_FILES=(
  "src/main.tsx"
  "src/components/App.tsx"
  "index.html"
  "vite.config.js"
  "package.json"
)

for file in "${ESSENTIAL_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing essential file: $file"
  else
    echo "✅ Found essential file: $file"
  fi
done

# Check if entry points match
HTML_ENTRY=$(grep -o 'src="[^"]*"' index.html | grep -o '/[^"]*')
echo "Entry point in HTML: $HTML_ENTRY"

# Check for correct dependencies
DEPENDENCIES=(
  "react"
  "react-dom"
  "@vitejs/plugin-react"
  "vite"
)

for dep in "${DEPENDENCIES[@]}"; do
  if npm list "$dep" --depth=0 2>/dev/null | grep -q "$dep"; then
    echo "✅ Found dependency: $dep"
  else
    echo "❌ Missing dependency: $dep"
  fi
done

# Fix common issues
echo "Attempting to fix common issues..."

# Ensure index.html points to main.tsx
if ! grep -q 'src="/src/main.tsx"' index.html; then
  sed -i.bak 's|src="/src/[^"]*"|src="/src/main.tsx"|g' index.html
  echo "✅ Updated index.html to point to /src/main.tsx"
fi

# Ensure vite.config.js has the correct base path
if ! grep -q "base: " vite.config.js; then
  sed -i.bak '/plugins: \[react()\],/a \ \ base: `/awesome-scalability-talks/`,' vite.config.js
  echo "✅ Added base path to vite.config.js"
fi

echo "Structure verification complete!"
