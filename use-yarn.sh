# Install yarn if not already installed
npm install -g yarn

# Remove node_modules and lockfiles
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Install dependencies using yarn
yarn install
