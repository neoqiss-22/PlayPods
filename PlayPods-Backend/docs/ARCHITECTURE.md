# PlayPods Microservices Architecture

## Overview
PlayPods uses a microservices architecture to ensure scalability, maintainability, and security.

## Services

### Core Services (Rust)
- **auth-service** (Port 3001): Authentication & authorization
- **video-service** (Port 3002): Video metadata & management
- **upload-service** (Port 3003): Video upload & processing
- **streaming-service** (Port 3004): Video streaming & CDN
- **user-service** (Port 3005): User profiles & preferences

### AI/ML Services (Python)
- **recommendation-service** (Port 3006): Content recommendations

### Gateway & Routing
- **api-gateway** (Port 3000): Request routing & rate limiting

### Infrastructure
- **PostgreSQL** (Port 5432): Primary database
- **Redis** (Port 6379): Caching & sessions

## Security Architecture

### Service Isolation
Each service runs in its own container with minimal permissions.

### Authentication Flow
1. Client authenticates with auth-service
2. Auth-service returns JWT token
3. Subsequent requests include JWT in Authorization header
4. API Gateway validates JWT before forwarding requests

### Data Protection
- Sensitive operations isolated in auth-service
- Database access limited per service
- Inter-service communication secured with service tokens

## Development Workflow

### Starting Services
```bash
# Start all services
./infrastructure/scripts/service-manager.sh start-all

# Start specific service
./infrastructure/scripts/service-manager.sh start-service auth-service
```

### Monitoring
```bash
# View all logs
./infrastructure/scripts/service-manager.sh logs

# View specific service logs
./infrastructure/scripts/service-manager.sh logs auth-service
```

### Development
Each service can be developed independently. Changes to one service don't require rebuilding others.
