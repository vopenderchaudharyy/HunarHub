#!/bin/bash

# HunarHub Quick Start Script
# This script starts both the server and client

echo "======================================"
echo "🚀 HunarHub Quick Start"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting HunarHub Server...${NC}"
cd server
echo -e "${GREEN}✅ Server starting on http://localhost:5000${NC}"
npm run dev &
SERVER_PID=$!

echo ""
sleep 2

echo -e "${BLUE}Starting HunarHub Client...${NC}"
cd ../client
echo -e "${GREEN}✅ Client starting on http://localhost:3000${NC}"
npm start &
CLIENT_PID=$!

echo ""
echo "======================================"
echo "✨ HunarHub is running!"
echo "======================================"
echo -e "🌐 Client:  ${GREEN}http://localhost:3000${NC}"
echo -e "🔗 Server:  ${GREEN}http://localhost:5000${NC}"
echo -e "📊 API:     ${GREEN}http://localhost:5000/api${NC}"
echo "======================================"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $SERVER_PID $CLIENT_PID
