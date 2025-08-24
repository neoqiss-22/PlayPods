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
