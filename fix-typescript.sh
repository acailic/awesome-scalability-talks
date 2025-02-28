# Remove node_modules and lockfiles
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Clean npm cache
npm cache clean --force

# Install with the explicit typescript version
npm install --save-dev typescript@4.9.5
npm install
