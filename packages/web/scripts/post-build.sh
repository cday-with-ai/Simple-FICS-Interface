#!/bin/bash

# Post-build script to copy build output to root
echo "Copying build output to root directory..."

# Remove old dist if exists
rm -rf dist

# Copy the entire dist folder from packages/web to root
cp -r packages/web/dist .

# Update paths in index.html to use dist/ prefix
sed -i '' 's|src="/|src="dist/|g' dist/index.html
sed -i '' 's|href="/|href="dist/|g' dist/index.html

# Copy the modified index.html to root
cp dist/index.html index.html

echo "Build output copied to root directory!"
echo "You can now open index.html directly."