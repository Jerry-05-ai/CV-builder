<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();

$db = Database::getConnection();
$stmt = $db->prepare("SELECT id, user_id, title, template_name, is_paid, created_at, updated_at FROM cvs WHERE user_id = :user_id ORDER BY updated_at DESC");
$stmt->execute(['user_id' => $userId]);
$cvs = $stmt->fetchAll();

send_json_response([
    'success' => true,
    'cvs' => array_map(function($cv) {
        return [
            'id' => (int)$cv['id'],
            'title' => $cv['title'],
            'template_name' => $cv['template_name'],
            'is_paid' => (bool)$cv['is_paid'],
            'created_at' => $cv['created_at'],
            'updated_at' => $cv['updated_at']
        ];
    }, $cvs)
]);
