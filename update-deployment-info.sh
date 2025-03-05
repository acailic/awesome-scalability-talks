#!/bin/bash

# Get the current timestamp in ISO format
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Define the repository URL with GitHub Pages path
REPO_URL="https://github.com/acailic/awesome-scalability-talks"
DEPLOYED_URL="https://acailic.github.io/awesome-scalability-talks"

# Create or update the deployment-info.txt file
echo "Timestamp: $TIMESTAMP" > public/deployment-info.txt
echo "Repository: $REPO_URL" >> public/deployment-info.txt
echo "DeployedAt: $DEPLOYED_URL" >> public/deployment-info.txt
echo "Version: $(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')" >> public/deployment-info.txt

echo "Deployment info updated with timestamp: $TIMESTAMP"