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
