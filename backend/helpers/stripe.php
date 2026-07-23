<?php
require_once __DIR__ . '/../config/config.php';

function create_stripe_checkout_session(int $userId, string $userEmail): array {
    $stripeKey = STRIPE_SECRET_KEY;
    $frontendUrl = FRONTEND_URL;

    if (!empty($stripeKey)) {
        $ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
        
        $postFields = http_build_query([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => 'CVForge AI - Additional CV Generation',
                            'description' => '1 Additional AI-Powered Professional CV Generation'
                        ],
                        'unit_amount' => 300, // $3.00 in cents
                    ],
                    'quantity' => 1,
                ]
            ],
            'mode' => 'payment',
            'success_url' => $frontendUrl . '/payment-success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $frontendUrl . '/payment-cancel',
            'customer_email' => $userEmail,
            'client_reference_id' => (string)$userId,
        ]);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postFields,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $stripeKey,
                'Content-Type: application/x-www-form-urlencoded'
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && $response) {
            $data = json_decode($response, true);
            if (isset($data['id']) && isset($data['url'])) {
                return [
                    'success' => true,
                    'session_id' => $data['id'],
                    'url' => $data['url']
                ];
            }
        }
    }

    // Stripe Test Mode Simulator for easy local testing
    $mockSessionId = 'cs_test_' . bin2hex(random_bytes(12));
    $mockUrl = $frontendUrl . '/payment-success?session_id=' . $mockSessionId . '&demo=true';

    return [
        'success' => true,
        'session_id' => $mockSessionId,
        'url' => $mockUrl,
        'is_simulated' => true
    ];
}
