<?php
// Configuration File for CVForge AI Backend

// Allow CORS from Vite React Dev Server or any client origin
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials (Default XAMPP settings)
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'cvforge_ai');
define('DB_USER', 'root');
define('DB_PASS', '');

// OpenAI API Key (Can be set via environment variable or hardcoded here)
define('OPENAI_API_KEY', getenv('OPENAI_API_KEY') ?: '');

// Stripe Secret Key and Frontend URL for Redirection
define('STRIPE_SECRET_KEY', getenv('STRIPE_SECRET_KEY') ?: '');
define('FRONTEND_URL', getenv('FRONTEND_URL') ?: 'http://localhost:5173');
