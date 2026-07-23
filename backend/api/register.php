<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

start_session_safe();
$data = get_json_input();

$name = trim($data['name'] ?? '');
$email = trim(strtolower($data['email'] ?? ''));
$password = $data['password'] ?? '';
$confirmPassword = $data['confirm_password'] ?? '';

if (empty($name) || empty($email) || empty($password)) {
    send_json_response(['success' => false, 'message' => 'Please fill in all required fields.'], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json_response(['success' => false, 'message' => 'Please provide a valid email address.'], 400);
}

if (strlen($password) < 6) {
    send_json_response(['success' => false, 'message' => 'Password must be at least 6 characters long.'], 400);
}

if (!empty($confirmPassword) && $password !== $confirmPassword) {
    send_json_response(['success' => false, 'message' => 'Passwords do not match.'], 400);
}

$db = Database::getConnection();

// Check if user exists
$stmt = $db->prepare("SELECT id FROM users WHERE email = :email");
$stmt->execute(['email' => $email]);
if ($stmt->fetch()) {
    send_json_response(['success' => false, 'message' => 'An account with this email already exists.'], 409);
}

// Hash password securely
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$stmt = $db->prepare("INSERT INTO users (name, email, password, free_cv_limit, free_cv_used, paid_cv_count) VALUES (:name, :email, :password, 3, 0, 0)");
$stmt->execute([
    'name' => $name,
    'email' => $email,
    'password' => $hashedPassword
]);

$userId = (int)$db->lastInsertId();
$_SESSION['user_id'] = $userId;

send_json_response([
    'success' => true,
    'message' => 'Account created successfully!',
    'user' => [
        'id' => $userId,
        'name' => $name,
        'email' => $email,
        'free_cv_limit' => 3,
        'free_cv_used' => 0,
        'paid_cv_count' => 0
    ]
], 201);
