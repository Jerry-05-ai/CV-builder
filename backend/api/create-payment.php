<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/stripe.php';

$userId = require_auth();

$db = Database::getConnection();
$stmt = $db->prepare("SELECT email FROM users WHERE id = :id");
$stmt->execute(['id' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    send_json_response(['success' => false, 'message' => 'User not found.'], 404);
}

$checkout = create_stripe_checkout_session($userId, $user['email']);

if (!$checkout['success']) {
    send_json_response(['success' => false, 'message' => 'Failed to initialize payment session.'], 500);
}

send_json_response([
    'success' => true,
    'session_id' => $checkout['session_id'],
    'checkout_url' => $checkout['url']
]);
