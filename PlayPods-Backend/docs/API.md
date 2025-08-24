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
