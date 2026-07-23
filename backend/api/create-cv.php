<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();
$data = get_json_input();

$title = trim($data['title'] ?? '');
$rawInput = $data['raw_input'] ?? '';
$structuredData = $data['structured_data'] ?? null;
$templateName = trim($data['template_name'] ?? 'modern');

if (empty($title) || empty($structuredData)) {
    send_json_response(['success' => false, 'message' => 'CV title and structured data are required.'], 400);
}

$db = Database::getConnection();
$db->beginTransaction();

try {
    // Check and update backend user limits
    $stmt = $db->prepare("SELECT free_cv_limit, free_cv_used, paid_cv_count FROM users WHERE id = :id FOR UPDATE");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch();

    if (!$user) {
        $db->rollBack();
        send_json_response(['success' => false, 'message' => 'User not found.'], 404);
    }

    $freeLimit = (int)$user['free_cv_limit'];
    $freeUsed = (int)$user['free_cv_used'];
    $paidCount = (int)$user['paid_cv_count'];

    $isPaidCV = 0;

    if ($freeUsed < $freeLimit) {
        // Use free generation slot
        $stmtUp = $db->prepare("UPDATE users SET free_cv_used = free_cv_used + 1 WHERE id = :id");
        $stmtUp->execute(['id' => $userId]);
    } else if ($paidCount > 0) {
        // Use paid generation slot
        $stmtUp = $db->prepare("UPDATE users SET paid_cv_count = paid_cv_count - 1 WHERE id = :id");
        $stmtUp->execute(['id' => $userId]);
        $isPaidCV = 1;
    } else {
        $db->rollBack();
        send_json_response([
            'success' => false,
            'limit_reached' => true,
            'message' => 'You have used all 3 free CV generations.'
        ], 403);
    }

    // Insert CV
    $jsonStructured = is_string($structuredData) ? $structuredData : json_encode($structuredData);
    $stmtInsert = $db->prepare("INSERT INTO cvs (user_id, title, raw_input, structured_data, template_name, is_paid) VALUES (:user_id, :title, :raw_input, :structured_data, :template_name, :is_paid)");
    $stmtInsert->execute([
        'user_id' => $userId,
        'title' => $title,
        'raw_input' => $rawInput,
        'structured_data' => $jsonStructured,
        'template_name' => $templateName,
        'is_paid' => $isPaidCV
    ]);

    $cvId = (int)$db->lastInsertId();
    $db->commit();

    send_json_response([
        'success' => true,
        'message' => 'CV created and saved successfully!',
        'cv_id' => $cvId
    ], 201);

} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    send_json_response(['success' => false, 'message' => 'Failed to save CV: ' . $e->getMessage()], 500);
}
