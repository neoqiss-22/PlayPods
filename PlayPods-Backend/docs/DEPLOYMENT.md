# PlayPods Deployment Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.9+
- Rust 1.75+

## Local Development

### 1. Install Dependencies
```bash
cd infrastructure/scripts
./install-dependencies.sh
```

### 2. Start Services
```bash
./service-manager.sh start-all
```

### 3. Verify Services
```bash
# Check service status
./service-manager.sh status

# Test API Gateway
curl http://localhost:3000/health

# Test Auth Service
curl http://localhost:3001/health
```

## Production Deployment

### Using Docker Compose
```bash
# Production docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
Create `.env.production` files for each service with production values:

```bash
# auth-service/.env.production
DATABASE_URL=postgresql://user:pass@prod-db:5432/playpods_auth
JWT_SECRET=your-production-jwt-secret
REDIS_URL=redis://prod-redis:6379
```

### Database Migrations
```bash
# Run migrations for each service
docker-compose exec auth-service ./migrations/run.sh
docker-compose exec video-service ./migrations/run.sh
```

### Health Checks
All services expose `/health` endpoints for monitoring.

### Scaling
Scale individual services based on load:
```bash
# Scale video processing
docker-compose up -d --scale upload-service=3

# Scale streaming
docker-compose up -d --scale streaming-service=5
```
