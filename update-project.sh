#!/bin/bash

# Pull latest changes
echo "Pulling latest changes from git..."
git pull origin main

# Update backend dependencies
echo "Updating backend dependencies..."
cd backend
npm install
cd ..

# Update frontend dependencies
echo "Updating frontend dependencies..."
cd frontend
npm install
cd ..

echo "Git pull and dependency updates completed."
