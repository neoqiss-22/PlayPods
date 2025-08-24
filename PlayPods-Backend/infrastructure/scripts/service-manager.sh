#!/bin/bash

# PlayPods Service Manager
# Usage: ./service-manager.sh [command] [service-name]

case "$1" in
    "start-all")
        echo "🚀 Starting all PlayPods services..."
        cd ../docker && docker-compose up -d
        echo "✅ All services started!"
        ;;
    "stop-all")
        echo "🛑 Stopping all services..."
        cd ../docker && docker-compose down
        echo "✅ All services stopped!"
        ;;
    "start-service")
        if [ -z "$2" ]; then
            echo "❌ Please specify a service name"
            exit 1
        fi
        echo "🚀 Starting $2..."
        cd ../docker && docker-compose up -d $2
        ;;
    "stop-service")
        if [ -z "$2" ]; then
            echo "❌ Please specify a service name"
            exit 1
        fi
        echo "🛑 Stopping $2..."
        cd ../docker && docker-compose stop $2
        ;;
    "logs")
        if [ -z "$2" ]; then
            cd ../docker && docker-compose logs -f
        else
            cd ../docker && docker-compose logs -f $2
        fi
        ;;
    "rebuild")
        if [ -z "$2" ]; then
            echo "❌ Please specify a service name"
            exit 1
        fi
        echo "🔄 Rebuilding $2..."
        cd ../docker && docker-compose build $2 && docker-compose up -d $2
        ;;
    "status")
        echo "📊 Service Status:"
        cd ../docker && docker-compose ps
        ;;
    "shell")
        if [ -z "$2" ]; then
            echo "❌ Please specify a service name"
            exit 1
        fi
        cd ../docker && docker-compose exec $2 /bin/sh
        ;;
    *)
        echo "PlayPods Service Manager"
        echo ""
        echo "Usage: $0 {command} [service-name]"
        echo ""
        echo "Commands:"
        echo "  start-all         - Start all services"
        echo "  stop-all          - Stop all services"
        echo "  start-service     - Start a specific service"
        echo "  stop-service      - Stop a specific service"
        echo "  logs              - View logs (all or specific service)"
        echo "  rebuild           - Rebuild and restart a service"
        echo "  status            - Show status of all services"
        echo "  shell             - Open shell in a service container"
        echo ""
        echo "Available services:"
        echo "  - api-gateway"
        echo "  - auth-service"
        echo "  - video-service"
        echo "  - upload-service"
        echo "  - recommendation-service"
        echo "  - postgres"
        echo "  - redis"
        ;;
esac
