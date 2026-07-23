<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();
$data = get_json_input();

$cvId = isset($data['id']) ? (int)$data['id'] : 0;
$title = trim($data['title'] ?? '');
$structuredData = $data['structured_data'] ?? null;
$templateName = trim($data['template_name'] ?? '');

if ($cvId <= 0 || empty($title) || empty($structuredData)) {
    send_json_response(['success' => false, 'message' => 'CV ID, title, and structured data are required for updating.'], 400);
}

$db = Database::getConnection();

// Verify ownership
$stmt = $db->prepare("SELECT id FROM cvs WHERE id = :id AND user_id = :user_id");
$stmt->execute(['id' => $cvId, 'user_id' => $userId]);
if (!$stmt->fetch()) {
    send_json_response(['success' => false, 'message' => 'CV not found or access denied.'], 404);
}

$jsonStructured = is_string($structuredData) ? $structuredData : json_encode($structuredData);

$updateFields = [
    'title' => $title,
    'structured_data' => $jsonStructured,
    'id' => $cvId,
    'user_id' => $userId
];

$sql = "UPDATE cvs SET title = :title, structured_data = :structured_data";
if (!empty($templateName)) {
    $sql .= ", template_name = :template_name";
    $updateFields['template_name'] = $templateName;
}
$sql .= " WHERE id = :id AND user_id = :user_id";

$stmtUpdate = $db->prepare($sql);
$stmtUpdate->execute($updateFields);

send_json_response([
    'success' => true,
    'message' => 'CV updated successfully!'
]);
