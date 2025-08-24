#!/bin/bash

echo "📦 Installing PlayPods dependencies..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Install Node.js dependencies for API Gateway
echo "📦 Installing API Gateway dependencies..."
cd ../../services/api-gateway
npm install

# Install Python dependencies for Recommendation Service
echo "🐍 Installing Recommendation Service dependencies..."
cd ../recommendation-service
pip install -r requirements.txt

echo "✅ All dependencies installed!"
echo ""
echo "Next steps:"
echo "1. Start the services: ./service-manager.sh start-all"
echo "2. Check status: ./service-manager.sh status"
echo "3. View logs: ./service-manager.sh logs"
