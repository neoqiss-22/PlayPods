# PlayPods Microservices Backend

A scalable, secure microservices architecture for the PlayPods video platform.

## 🏗️ Architecture

PlayPods uses a microservices architecture with the following services:

- **API Gateway** (Node.js) - Request routing and rate limiting
- **Auth Service** (Rust) - Authentication and authorization 🔐
- **Video Service** (Rust) - Video metadata and management 🎥
- **Upload Service** (Rust) - Video upload and processing 📤
- **Streaming Service** (Rust) - Video streaming and CDN 📺
- **User Service** (Rust) - User profiles and preferences 👤
- **Recommendation Service** (Python) - AI/ML recommendations 🧠
- **Search Service** (Elasticsearch/Rust) - Search and discovery 🔍
- **Analytics Service** (Rust) - Analytics and metrics 📊
- **Notification Service** (Rust) - Push notifications 🔔

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.9+
- Rust 1.75+

### Setup
```bash
# Install dependencies
cd infrastructure/scripts
./install-dependencies.sh

# Start all services
./service-manager.sh start-all

# Check service status
./service-manager.sh status
```

### Test the API
```bash
# Test API Gateway
curl http://localhost:3000/health

# Test Auth Service
curl http://localhost:3001/health

# Register new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@playpods.com","password":"test123","username":"testuser"}'
```

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Development Guide](docs/DEVELOPMENT.md)

## 🛠️ Service Management

```bash
# Start all services
./infrastructure/scripts/service-manager.sh start-all

# Start specific service
./infrastructure/scripts/service-manager.sh start-service auth-service

# View logs
./infrastructure/scripts/service-manager.sh logs auth-service

# Rebuild service
./infrastructure/scripts/service-manager.sh rebuild video-service

# Stop all services
./infrastructure/scripts/service-manager.sh stop-all
```

## 🔒 Security Features

- **Service Isolation**: Each service runs independently
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive request validation
- **Encrypted Communication**: HTTPS in production

## 📊 Service Ports

| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 3000 | Main entry point |
| Auth Service | 3001 | Authentication |
| Video Service | 3002 | Video management |
| Upload Service | 3003 | Video uploads |
| Streaming Service | 3004 | Video streaming |
| User Service | 3005 | User management |
| Recommendation Service | 3006 | AI recommendations |
| Search Service | 3007 | Search & discovery |
| Analytics Service | 3008 | Analytics |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache & sessions |

## 🏃‍♂️ Development Workflow

1. **Make Changes**: Edit service code
2. **Rebuild**: `./service-manager.sh rebuild service-name`
3. **Test**: Check logs and test endpoints
4. **Iterate**: Repeat as needed

## 🚀 Production Deployment

See [Deployment Guide](docs/DEPLOYMENT.md) for production deployment instructions.

## 📈 Scaling

Services can be scaled independently:
```bash
# Scale upload processing
docker-compose up -d --scale upload-service=3

# Scale video streaming
docker-compose up -d --scale streaming-service=5
```

## 🤝 Contributing

1. Follow the service patterns established
2. Add comprehensive tests
3. Update documentation
4. Use structured logging
5. Implement proper error handling

## 📄 License

This project is proprietary software. All rights reserved.
