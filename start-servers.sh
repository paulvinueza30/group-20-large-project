#!/bin/bash

# Start backend server
echo "Starting backend (Express) server..."
cd backend
npm run dev &

# Start frontend server
echo "Starting frontend (Next.js) server..."
cd ../frontend
npm run dev &

echo "Both backend and frontend servers are running."



