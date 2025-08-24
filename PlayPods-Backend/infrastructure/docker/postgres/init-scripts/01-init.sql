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
