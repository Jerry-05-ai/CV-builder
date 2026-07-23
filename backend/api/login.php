<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

start_session_safe();
$data = get_json_input();

$email = trim(strtolower($data['email'] ?? ''));
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    send_json_response(['success' => false, 'message' => 'Please enter both email and password.'], 400);
}

$db = Database::getConnection();
$stmt = $db->prepare("SELECT id, name, email, password, free_cv_limit, free_cv_used, paid_cv_count FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    send_json_response(['success' => false, 'message' => 'Invalid email or password.'], 401);
}

$_SESSION['user_id'] = (int)$user['id'];

send_json_response([
    'success' => true,
    'message' => 'Login successful!',
    'user' => [
        'id' => (int)$user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'free_cv_limit' => (int)$user['free_cv_limit'],
        'free_cv_used' => (int)$user['free_cv_used'],
        'paid_cv_count' => (int)$user['paid_cv_count']
    ]
]);
