<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$userId = require_auth();
$sessionId = $_GET['session_id'] ?? ($_POST['session_id'] ?? '');

if (empty($sessionId)) {
    send_json_response(['success' => false, 'message' => 'Stripe Session ID is missing.'], 400);
}

$db = Database::getConnection();

// Check if this payment session was already processed
$stmtCheck = $db->prepare("SELECT id FROM payments WHERE stripe_session_id = :session_id");
$stmtCheck->execute(['session_id' => $sessionId]);

if (!$stmtCheck->fetch()) {
    $db->beginTransaction();
    try {
        // Record payment
        $stmtInsert = $db->prepare("INSERT INTO payments (user_id, stripe_session_id, amount, currency, status) VALUES (:user_id, :session_id, 3.00, 'usd', 'completed')");
        $stmtInsert->execute([
            'user_id' => $userId,
            'session_id' => $sessionId
        ]);

        // Increment user's paid CV count by 1
        $stmtUser = $db->prepare("UPDATE users SET paid_cv_count = paid_cv_count + 1 WHERE id = :id");
        $stmtUser->execute(['id' => $userId]);

        $db->commit();
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        send_json_response(['success' => false, 'message' => 'Error recording payment: ' . $e->getMessage()], 500);
    }
}

// Redirect to frontend or send success JSON
if (isset($_GET['redirect'])) {
    header('Location: ' . FRONTEND_URL . '/dashboard?payment=success');
    exit();
}

send_json_response([
    'success' => true,
    'message' => 'Payment verified successfully! You have received 1 additional CV generation slot.'
]);
