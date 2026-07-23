<?php
require_once __DIR__ . '/../helpers/response.php';

if (isset($_GET['redirect'])) {
    header('Location: ' . FRONTEND_URL . '/pricing?payment=cancelled');
    exit();
}

send_json_response([
    'success' => false,
    'message' => 'Payment checkout was cancelled.'
]);
