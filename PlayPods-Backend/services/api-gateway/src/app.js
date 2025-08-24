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
