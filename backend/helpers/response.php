<?php
require_once __DIR__ . '/../config/config.php';

function start_session_safe() {
    if (session_status() === PHP_SESSION_NONE) {
        // Set secure session parameters
        ini_set('session.cookie_httponly', 1);
        ini_set('session.use_only_cookies', 1);
        session_start();
    }
}

function send_json_response(array $data, int $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

function get_json_input(): array {
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return $_POST;
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function require_auth(): int {
    start_session_safe();
    if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
        send_json_response([
            'success' => false,
            'message' => 'Unauthorized access. Please log in.'
        ], 401);
    }
    return (int)$_SESSION['user_id'];
}
