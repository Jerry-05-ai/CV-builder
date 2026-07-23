<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();
$data = get_json_input();
$cvId = isset($data['id']) ? (int)$data['id'] : (isset($_GET['id']) ? (int)$_GET['id'] : 0);

if ($cvId <= 0) {
    send_json_response(['success' => false, 'message' => 'Invalid CV ID.'], 400);
}

$db = Database::getConnection();
$stmt = $db->prepare("DELETE FROM cvs WHERE id = :id AND user_id = :user_id");
$stmt->execute(['id' => $cvId, 'user_id' => $userId]);

if ($stmt->rowCount() === 0) {
    send_json_response(['success' => false, 'message' => 'CV not found or already deleted.'], 404);
}

send_json_response([
    'success' => true,
    'message' => 'CV deleted successfully.'
]);
