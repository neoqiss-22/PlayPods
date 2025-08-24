# PlayPods Development Guide

## Getting Started

### 1. Clone and Setup
```bash
# Run the scaffold script to create the project structure
./scaffold-microservices.sh

# Navigate to project
cd PlayPods-Backend

# Install dependencies
cd infrastructure/scripts
./install-dependencies.sh
```

### 2. Development Workflow

#### Starting Services
```bash
# Start all services for development
./service-manager.sh start-all

# Or start services individually
./service-manager.sh start-service postgres
./service-manager.sh start-service redis
./service-manager.sh start-service auth-service
```

#### Making Changes
1. Make changes to service code
2. Rebuild the service: `./service-manager.sh rebuild service-name`
3. Check logs: `./service-manager.sh logs service-name`

#### Adding New Services
1. Create service directory in `services/`
2. Add service to `docker-compose.yml`
3. Update API Gateway routing
4. Add service to documentation

## Service Development

### Rust Services
```bash
# Create new Rust service
cargo new services/my-service
cd services/my-service

# Add common dependencies to Cargo.toml
# Build and test
cargo build
cargo test
```

### Python Services
```bash
# Create new Python service
mkdir services/my-python-service
cd services/my-python-service

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn
```

### Node.js Services
```bash
# Create new Node.js service
mkdir services/my-node-service
cd services/my-node-service

# Initialize npm project
npm init -y
npm install express cors helmet
```

## Testing

### Unit Tests
Each service should have comprehensive unit tests.

### Integration Tests
Test inter-service communication:
```bash
# Test auth flow
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Test video service
curl http://localhost:3000/api/videos \
  -H "Authorization: Bearer <token>"
```

### Load Testing
Use tools like Apache Bench or Locust to test service performance.

## Security Best Practices

### Service-to-Service Auth
- Each service validates requests through auth-service
- Use service-specific JWT tokens
- Implement rate limiting

### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS in production
- Rotate secrets regularly

### Input Validation
- Validate all inputs at service boundaries
- Use parameterized queries
- Implement CORS properly

## Monitoring & Logging

### Structured Logging
All services use structured logging (JSON format).

### Metrics
Services expose metrics endpoints for monitoring.

### Error Tracking
Use service like Sentry for error tracking in production.
