#!/bin/bash

# PlayPods Microservices Architecture Scaffold Script
# This script creates the complete microservices backend structure

echo "🚀 Creating PlayPods Microservices Architecture..."

# Create main backend directory
mkdir -p PlayPods-Backend
cd PlayPods-Backend

echo "📁 Creating microservices directory structure..."

# Create main service directories
mkdir -p services/{api-gateway,auth-service,user-service,video-service,upload-service,streaming-service,recommendation-service,search-service,analytics-service,notification-service,comment-service,subscription-service,payment-service}

# Create shared infrastructure
mkdir -p shared/{database/{postgres/{auth,videos,users},redis,clickhouse},message-queue/{redis,rabbitmq,kafka},monitoring,security/{rust/src,certificates,policies,secrets},common}

# Create infrastructure
mkdir -p infrastructure/{docker/{nginx/ssl,redis,postgres/init-scripts,monitoring/grafana},kubernetes/{namespaces,services,deployments,configmaps,secrets,ingress,monitoring},terraform,scripts}

# Create docs
mkdir -p docs

echo "🔐 Setting up Auth Service (Rust - Your Vault)..."
cd services/auth-service

# Create Rust project structure
cat > Cargo.toml << 'EOF'
[package]
name = "auth-service"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.0", features = ["full"] }
axum = "0.7"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "postgres", "chrono", "uuid"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1.0", features = ["v4", "serde"] }
bcrypt = "0.15"
jsonwebtoken = "9.2"
tracing = "0.1"
tracing-subscriber = "0.3"
anyhow = "1.0"
thiserror = "1.0"
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "trace"] }
dotenv = "0.15"
redis = { version = "0.24", features = ["tokio-comp"] }
argon2 = "0.5"
EOF

# Create source structure
mkdir -p src/{handlers,models,services,database/{migrations},utils,config}
mkdir -p tests/{integration,unit}

cat > src/main.rs << 'EOF'
use axum::{
    routing::{get, post},
    Router,
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use tracing_subscriber;

mod handlers;
mod models;
mod services;
mod database;
mod utils;
mod config;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    service: String,
    version: String,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        service: "auth-service".to_string(),
        version: "0.1.0".to_string(),
    })
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::init();

    // Load environment variables
    dotenv::dotenv().ok();

    // Build our application with routes
    let app = Router::new()
        .route("/health", get(health))
        .route("/auth/login", post(handlers::auth::login))
        .route("/auth/register", post(handlers::auth::register))
        .route("/auth/refresh", post(handlers::auth::refresh_token))
        .route("/auth/logout", post(handlers::auth::logout))
        .layer(CorsLayer::permissive());

    // Run it
    let addr = SocketAddr::from(([0, 0, 0, 0], 3001));
    println!("🔐 Auth Service listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
EOF

cat > src/lib.rs << 'EOF'
pub mod handlers;
pub mod models;
pub mod services;
pub mod database;
pub mod utils;
pub mod config;
EOF

cat > src/handlers/mod.rs << 'EOF'
pub mod auth;
EOF

cat > src/handlers/auth.rs << 'EOF'
use axum::{Json, http::StatusCode};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    pub username: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub access_token: String,
    pub refresh_token: String,
    pub user_id: String,
}

pub async fn login(Json(payload): Json<LoginRequest>) -> Result<Json<AuthResponse>, StatusCode> {
    // TODO: Implement login logic
    println!("Login attempt: {}", payload.email);
    
    // Placeholder response
    Ok(Json(AuthResponse {
        access_token: "mock_access_token".to_string(),
        refresh_token: "mock_refresh_token".to_string(),
        user_id: "mock_user_id".to_string(),
    }))
}

pub async fn register(Json(payload): Json<RegisterRequest>) -> Result<Json<AuthResponse>, StatusCode> {
    // TODO: Implement registration logic
    println!("Registration attempt: {}", payload.email);
    
    Ok(Json(AuthResponse {
        access_token: "mock_access_token".to_string(),
        refresh_token: "mock_refresh_token".to_string(),
        user_id: "mock_user_id".to_string(),
    }))
}

pub async fn refresh_token() -> Result<Json<AuthResponse>, StatusCode> {
    // TODO: Implement token refresh logic
    Ok(Json(AuthResponse {
        access_token: "new_mock_access_token".to_string(),
        refresh_token: "new_mock_refresh_token".to_string(),
        user_id: "mock_user_id".to_string(),
    }))
}

pub async fn logout() -> Result<StatusCode, StatusCode> {
    // TODO: Implement logout logic
    Ok(StatusCode::OK)
}
EOF

cat > src/models/mod.rs << 'EOF'
pub mod user;
pub mod session;
pub mod token;
EOF

cat > src/models/user.rs << 'EOF'
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub username: String,
    pub password_hash: String,
    pub is_verified: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateUser {
    pub email: String,
    pub username: String,
    pub password: String,
}
EOF

# Create environment file
cat > .env << 'EOF'
# Auth Service Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/playpods_auth
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
PORT=3001
RUST_LOG=info
EOF

cat > Dockerfile << 'EOF'
FROM rust:1.75 as builder

WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN cargo build --release

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/target/release/auth-service /app/auth-service

EXPOSE 3001
CMD ["./auth-service"]
EOF

echo "🎥 Setting up Video Service (Rust - Core Business Logic)..."
cd ../video-service

cat > Cargo.toml << 'EOF'
[package]
name = "video-service"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.0", features = ["full"] }
axum = "0.7"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "postgres", "chrono", "uuid"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1.0", features = ["v4", "serde"] }
tracing = "0.1"
tracing-subscriber = "0.3"
anyhow = "1.0"
thiserror = "1.0"
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "trace"] }
dotenv = "0.15"
reqwest = { version = "0.11", features = ["json"] }
EOF

mkdir -p src/{handlers,models,services,database/{repositories},utils,config}

cat > src/main.rs << 'EOF'
use axum::{
    routing::{get, post, put, delete},
    Router,
    Json,
};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

mod handlers;
mod models;
mod services;
mod database;
mod utils;
mod config;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    service: String,
    version: String,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        service: "video-service".to_string(),
        version: "0.1.0".to_string(),
    })
}

#[tokio::main]
async fn main() {
    tracing_subscriber::init();
    dotenv::dotenv().ok();

    let app = Router::new()
        .route("/health", get(health))
        .route("/videos", get(handlers::video::get_videos))
        .route("/videos", post(handlers::video::create_video))
        .route("/videos/:id", get(handlers::video::get_video))
        .route("/videos/:id", put(handlers::video::update_video))
        .route("/videos/:id", delete(handlers::video::delete_video))
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([0, 0, 0, 0], 3002));
    println!("🎥 Video Service listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
EOF

cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres:password@localhost:5432/playpods_videos
PORT=3002
RUST_LOG=info
AUTH_SERVICE_URL=http://localhost:3001
UPLOAD_SERVICE_URL=http://localhost:3003
EOF

echo "📤 Setting up Upload Service (Rust - Video Processing)..."
cd ../upload-service

cat > Cargo.toml << 'EOF'
[package]
name = "upload-service"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.0", features = ["full"] }
axum = "0.7"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
sqlx = { version = "0.7", features = ["runtime-tokio-rustls", "postgres", "chrono", "uuid"] }
chrono = { version = "0.4", features = ["serde"] }
uuid = { version = "1.0", features = ["v4", "serde"] }
tracing = "0.1"
tracing-subscriber = "0.3"
anyhow = "1.0"
thiserror = "1.0"
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "trace"] }
dotenv = "0.15"
aws-sdk-s3 = "1.0"
tokio-util = "0.7"
futures = "0.3"
EOF

mkdir -p src/{handlers,services/{processing},workers,models,storage,queue,config}

cat > src/main.rs << 'EOF'
use axum::{
    routing::{get, post},
    Router,
    Json,
};
use serde::Serialize;
use std::net::SocketAddr;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    service: String,
    version: String,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        service: "upload-service".to_string(),
        version: "0.1.0".to_string(),
    })
}

#[tokio::main]
async fn main() {
    tracing_subscriber::init();
    dotenv::dotenv().ok();

    let app = Router::new()
        .route("/health", get(health))
        .route("/upload/initiate", post(|| async { "Upload initiation endpoint" }))
        .route("/upload/chunk", post(|| async { "Chunk upload endpoint" }))
        .route("/upload/complete", post(|| async { "Upload completion endpoint" }));

    let addr = SocketAddr::from(([0, 0, 0, 0], 3003));
    println!("📤 Upload Service listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
EOF

echo "🌐 Setting up API Gateway (Node.js)..."
cd ../api-gateway

cat > package.json << 'EOF'
{
  "name": "playpods-api-gateway",
  "version": "1.0.0",
  "description": "PlayPods API Gateway",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "http-proxy-middleware": "^2.0.6",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "dotenv": "^16.3.1",
    "winston": "^3.11.0",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "redis": "^4.6.10"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
EOF

mkdir -p src/{routes,middleware,utils,config}

cat > src/app.js << 'EOF'
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'api-gateway',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Service proxies
const services = {
  auth: 'http://localhost:3001',
  videos: 'http://localhost:3002',
  upload: 'http://localhost:3003',
  streaming: 'http://localhost:3004',
  users: 'http://localhost:3005',
  recommendations: 'http://localhost:3006',
  search: 'http://localhost:3007',
  analytics: 'http://localhost:3008',
  notifications: 'http://localhost:3009',
  comments: 'http://localhost:3010',
  subscriptions: 'http://localhost:3011',
  payments: 'http://localhost:3012',
};

// Proxy routes
Object.keys(services).forEach(service => {
  app.use(`/api/${service}`, createProxyMiddleware({
    target: services[service],
    changeOrigin: true,
    pathRewrite: {
      [`^/api/${service}`]: '',
    },
    onError: (err, req, res) => {
      console.error(`Proxy error for ${service}:`, err.message);
      res.status(503).json({ 
        error: 'Service temporarily unavailable',
        service: service
      });
    }
  }));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 API Gateway listening on port ${PORT}`);
  console.log('Available services:');
  Object.keys(services).forEach(service => {
    console.log(`  - ${service}: /api/${service} -> ${services[service]}`);
  });
});
EOF

cat > .env << 'EOF'
PORT=3000
NODE_ENV=development

# Service URLs
AUTH_SERVICE_URL=http://localhost:3001
VIDEO_SERVICE_URL=http://localhost:3002
UPLOAD_SERVICE_URL=http://localhost:3003
STREAMING_SERVICE_URL=http://localhost:3004
USER_SERVICE_URL=http://localhost:3005

# Redis
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secret-jwt-key
EOF

cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]
EOF

echo "🐍 Setting up Recommendation Service (Python + Rust)..."
cd ../recommendation-service

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
pandas==2.1.3
numpy==1.25.2
scikit-learn==1.3.2
tensorflow==2.15.0
redis==5.0.1
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pydantic==2.5.0
python-dotenv==1.0.0
celery==5.3.4
aioredis==2.0.1
httpx==0.25.2
EOF

mkdir -p src/{models,api,training,utils,rust_core/src}

cat > src/main.py << 'EOF'
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="PlayPods Recommendation Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "recommendation-service",
        "version": "1.0.0"
    }

@app.get("/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    # TODO: Implement recommendation logic
    return {
        "user_id": user_id,
        "recommendations": [
            {"video_id": "1", "score": 0.95},
            {"video_id": "2", "score": 0.87},
            {"video_id": "3", "score": 0.82}
        ]
    }

@app.post("/recommendations/train")
async def train_model():
    # TODO: Implement model training
    return {"message": "Model training initiated"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 3006)),
        reload=True
    )
EOF

# Create Rust core for performance-critical parts
cd src/rust_core
cat > Cargo.toml << 'EOF'
[package]
name = "recommendation-core"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
pyo3 = { version = "0.20", features = ["extension-module"] }
numpy = "0.20"
ndarray = "0.15"
EOF

cat > src/lib.rs << 'EOF'
use pyo3::prelude::*;
use numpy::{PyArray1, PyReadonlyArray1};

/// Calculate similarity between two vectors using cosine similarity
#[pyfunction]
fn cosine_similarity(a: PyReadonlyArray1<f64>, b: PyReadonlyArray1<f64>) -> f64 {
    let a = a.as_array();
    let b = b.as_array();
    
    let dot_product = a.iter().zip(b.iter()).map(|(x, y)| x * y).sum::<f64>();
    let norm_a = a.iter().map(|x| x * x).sum::<f64>().sqrt();
    let norm_b = b.iter().map(|x| x * x).sum::<f64>().sqrt();
    
    if norm_a == 0.0 || norm_b == 0.0 {
        0.0
    } else {
        dot_product / (norm_a * norm_b)
    }
}

#[pymodule]
fn recommendation_core(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(cosine_similarity, m)?)?;
    Ok(())
}
EOF

cd ../../

cat > .env << 'EOF'
PORT=3006
DATABASE_URL=postgresql://postgres:password@localhost:5432/playpods_recommendations
REDIS_URL=redis://localhost:6379
ML_MODEL_PATH=./models/
BATCH_SIZE=32
LEARNING_RATE=0.001
EOF

echo "🐳 Setting up Docker Infrastructure..."
cd ../../infrastructure/docker

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # Databases
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: playpods
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init-scripts:/docker-entrypoint-initdb.d

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # Services
  api-gateway:
    build: ../../services/api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - auth-service
      - video-service
      - upload-service

  auth-service:
    build: ../../services/auth-service
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/playpods
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  video-service:
    build: ../../services/video-service
    ports:
      - "3002:3002"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/playpods
    depends_on:
      - postgres

  upload-service:
    build: ../../services/upload-service
    ports:
      - "3003:3003"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/playpods
    depends_on:
      - postgres

  recommendation-service:
    build: ../../services/recommendation-service
    ports:
      - "3006:3006"
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/playpods
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
EOF

# Create database initialization scripts
mkdir -p postgres/init-scripts
cat > postgres/init-scripts/01-init.sql << 'EOF'
-- Create databases for each service
CREATE DATABASE playpods_auth;
CREATE DATABASE playpods_videos;
CREATE DATABASE playpods_users;
CREATE DATABASE playpods_analytics;
CREATE DATABASE playpods_recommendations;

-- Create users for each service (in production, use different passwords)
CREATE USER auth_user WITH ENCRYPTED PASSWORD 'auth_password';
CREATE USER video_user WITH ENCRYPTED PASSWORD 'video_password';
CREATE USER user_service_user WITH ENCRYPTED PASSWORD 'user_password';
CREATE USER analytics_user WITH ENCRYPTED PASSWORD 'analytics_password';
CREATE USER recommendation_user WITH ENCRYPTED PASSWORD 'recommendation_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE playpods_auth TO auth_user;
GRANT ALL PRIVILEGES ON DATABASE playpods_videos TO video_user;
GRANT ALL PRIVILEGES ON DATABASE playpods_users TO user_service_user;
GRANT ALL PRIVILEGES ON DATABASE playpods_analytics TO analytics_user;
GRANT ALL PRIVILEGES ON DATABASE playpods_recommendations TO recommendation_user;
EOF

echo "🔧 Creating service management scripts..."
cd ../scripts

cat > service-manager.sh << 'EOF'
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
EOF

chmod +x service-manager.sh

cat > install-dependencies.sh << 'EOF'
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
EOF

chmod +x install-dependencies.sh

echo "📚 Creating documentation..."
cd ../../docs

cat > ARCHITECTURE.md << 'EOF'
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
EOF

cat > API.md << 'EOF'
# PlayPods API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.playpods.com/api
```

## Authentication
All endpoints (except auth endpoints) require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Auth Service (/api/auth)

### POST /auth/login
Login user and get access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

### POST /auth/register
Register new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "username": "newuser"
}
```

## Video Service (/api/videos)

### GET /videos
Get list of videos with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `category` (optional): Filter by category

### GET /videos/:id
Get specific video details.

### POST /videos
Create new video metadata (after upload).

### PUT /videos/:id
Update video metadata.

### DELETE /videos/:id
Delete video.

## Upload Service (/api/upload)

### POST /upload/initiate
Initiate video upload session.

### POST /upload/chunk
Upload video chunk.

### POST /upload/complete
Complete video upload and trigger processing.

## Recommendation Service (/api/recommendations)

### GET /recommendations/:user_id
Get personalized video recommendations for user.
EOF

cat > DEPLOYMENT.md << 'EOF'
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
EOF

cat > DEVELOPMENT.md << 'EOF'
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
EOF

echo "🎯 Creating final setup files..."
cd ..

cat > README.md << 'EOF'
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
EOF

cat > .gitignore << 'EOF'
# Dependencies
node_modules/
target/
__pycache__/
venv/
.env

# Database
*.db
*.sqlite

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Docker
.docker/

# Secrets
secrets/
*.pem
*.key
!shared/security/certificates/.gitkeep

# Build artifacts
dist/
build/
*.exe
*.dll

# Python
*.pyc
*.pyo
*.egg-info/

# Rust
Cargo.lock

# Node.js
package-lock.json
EOF

echo ""
echo "✅ PlayPods Microservices Architecture created successfully!"
echo ""
echo "🎉 Your backend empire is ready! Here's what you got:"
echo ""
echo "📁 Project Structure:"
echo "   ├── services/           # All microservices"
echo "   │   ├── auth-service/   # 🔐 Your security vault (Rust)"
echo "   │   ├── video-service/  # 🎥 Core business logic (Rust)"  
echo "   │   ├── upload-service/ # 📤 Video processing (Rust)"
echo "   │   ├── api-gateway/    # 🌐 Request routing (Node.js)"
echo "   │   └── recommendation-service/ # 🧠 AI/ML (Python + Rust)"
echo "   ├── shared/             # Common utilities & configs"
echo "   ├── infrastructure/     # Docker, K8s, deployment"
echo "   └── docs/               # Complete documentation"
echo ""
echo "🚀 Next steps:"
echo "   1. cd PlayPods-Backend"
echo "   2. cd infrastructure/scripts"  
echo "   3. ./install-dependencies.sh"
echo "   4. ./service-manager.sh start-all"
echo "   5. curl http://localhost:3000/health"
echo ""
echo "🔥 Features included:"
echo "   • JWT authentication with your Rust vault"
echo "   • Docker containerization"
echo "   • Service management scripts"
echo "   • Database setup with migrations"
echo "   • API Gateway with rate limiting"
echo "   • Python + Rust hybrid recommendation engine"
echo "   • Complete documentation"
echo ""
echo "💎 Your PlayPods kingdom awaits! Time to build the future! 🚀"
