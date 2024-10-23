#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Please provide a commit message."
  exit 1
fi

# Add changes to git
echo "Adding changes to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "$1"

# Push changes to the main branch
echo "Pushing changes to the main branch..."
git push origin main

echo "Changes have been pushed successfully."
