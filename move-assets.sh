#!/bin/bash

# Create necessary directories in public
mkdir -p public/images
mkdir -p public/src/assets
mkdir -p public/src/react-learning

# Copy assets
cp src/assets/*.png public/src/assets/
cp src/assets/*.jpg public/src/assets/
cp src/assets/*.svg public/src/assets/
cp src/react-learning/docs.json public/src/react-learning/

# Copy images
cp images/*.png public/images/
cp images/*.jpg public/images/
