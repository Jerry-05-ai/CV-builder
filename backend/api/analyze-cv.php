<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/openai.php';

$userId = require_auth();
$data = get_json_input();
$text = trim($data['text'] ?? '');

if (empty($text)) {
    send_json_response(['success' => false, 'message' => 'Text content is required for AI CV generation.'], 400);
}

// Check user quota on the PHP backend!
$db = Database::getConnection();
$stmt = $db->prepare("SELECT free_cv_limit, free_cv_used, paid_cv_count FROM users WHERE id = :id");
$stmt->execute(['id' => $userId]);
$user = $stmt->fetch();

if (!$user) {
    send_json_response(['success' => false, 'message' => 'User account not found.'], 404);
}

$freeLimit = (int)$user['free_cv_limit'];
$freeUsed = (int)$user['free_cv_used'];
$paidCount = (int)$user['paid_cv_count'];

$totalAllowed = $freeLimit + $paidCount;
if ($freeUsed >= $totalAllowed) {
    send_json_response([
        'success' => false,
        'limit_reached' => true,
        'message' => 'You have used all your free CV generations. Create another professional CV for $3.',
        'free_cv_used' => $freeUsed,
        'free_cv_limit' => $freeLimit,
        'paid_cv_count' => $paidCount
    ], 403);
}

// Process with OpenAI Helper
$structuredData = extract_cv_data($text);

send_json_response([
    'success' => true,
    'message' => 'AI structured CV extracted successfully.',
    'data' => $structuredData
]);
