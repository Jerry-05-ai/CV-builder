<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();

$db = Database::getConnection();
$stmt = $db->prepare("SELECT id, name, email, free_cv_limit, free_cv_used, paid_cv_count, created_at FROM users WHERE id = :id");
$stmt->execute(['id' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    send_json_response(['success' => false, 'message' => 'User not found.'], 404);
}

// Fetch total count of user's CVs
$stmtCv = $db->prepare("SELECT COUNT(*) as total_cvs FROM cvs WHERE user_id = :user_id");
$stmtCv->execute(['user_id' => $userId]);
$cvStats = $stmtCv->fetch();

send_json_response([
    'success' => true,
    'user' => [
        'id' => (int)$user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'free_cv_limit' => (int)$user['free_cv_limit'],
        'free_cv_used' => (int)$user['free_cv_used'],
        'free_cv_remaining' => max(0, (int)$user['free_cv_limit'] - (int)$user['free_cv_used']),
        'paid_cv_count' => (int)$user['paid_cv_count'],
        'total_cvs' => (int)($cvStats['total_cvs'] ?? 0),
        'created_at' => $user['created_at']
    ]
]);
