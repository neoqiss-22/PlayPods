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
