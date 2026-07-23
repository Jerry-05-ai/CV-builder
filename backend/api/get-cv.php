<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();
$cvId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($cvId <= 0) {
    send_json_response(['success' => false, 'message' => 'Invalid CV ID.'], 400);
}

$db = Database::getConnection();
$stmt = $db->prepare("SELECT id, user_id, title, raw_input, structured_data, template_name, is_paid, created_at, updated_at FROM cvs WHERE id = :id AND user_id = :user_id");
$stmt->execute(['id' => $cvId, 'user_id' => $userId]);
$cv = $stmt->fetch();

if (!$cv) {
    send_json_response(['success' => false, 'message' => 'CV not found or access denied.'], 404);
}

$structuredData = json_decode($cv['structured_data'], true);
if ($structuredData === null) {
    $structuredData = [];
}

send_json_response([
    'success' => true,
    'cv' => [
        'id' => (int)$cv['id'],
        'user_id' => (int)$cv['user_id'],
        'title' => $cv['title'],
        'raw_input' => $cv['raw_input'],
        'structured_data' => $structuredData,
        'template_name' => $cv['template_name'],
        'is_paid' => (bool)$cv['is_paid'],
        'created_at' => $cv['created_at'],
        'updated_at' => $cv['updated_at']
    ]
]);
