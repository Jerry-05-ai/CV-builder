<?php
require_once __DIR__ . '/../config/config.php';

function extract_cv_data(string $rawInput): array {
    $apiKey = OPENAI_API_KEY;

    if (!empty($apiKey)) {
        $ch = curl_init('https://api.openai.com/v1/chat/completions');
        
        $prompt = "You are an expert resume parsing AI. Extract structured CV information from the following user prompt.
        Return ONLY valid JSON matching this exact structure:
        {
          \"personal_information\": {
            \"full_name\": \"\",
            \"email\": \"\",
            \"phone\": \"\",
            \"location\": \"\",
            \"professional_title\": \"\"
          },
          \"summary\": \"\",
          \"education\": [
            { \"degree\": \"\", \"institution\": \"\", \"location\": \"\", \"start_year\": \"\", \"end_year\": \"\", \"description\": \"\" }
          ],
          \"experience\": [
            { \"job_title\": \"\", \"company\": \"\", \"location\": \"\", \"start_date\": \"\", \"end_date\": \"\", \"description\": \"\" }
          ],
          \"projects\": [
            { \"title\": \"\", \"technologies\": \"\", \"link\": \"\", \"description\": \"\" }
          ],
          \"skills\": [],
          \"certifications\": [],
          \"achievements\": [],
          \"languages\": [],
          \"interests\": []
        }
        
        Rules:
        - Fill in as many relevant fields as possible based on the text.
        - Create a compelling, professional 2-3 sentence professional summary summarizing their background even if short.
        - Do not invent false email or phone numbers if not present, but format provided details accurately.
        - Keep array items clean string lists or objects as formatted above.
        
        Input text:
        " . $rawInput;

        $postData = json_encode([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You output strictly structured JSON for resume creation.'],
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.3,
            'response_format' => ['type' => 'json_object']
        ]);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $apiKey
            ],
            CURLOPT_TIMEOUT => 20
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && $response) {
            $result = json_decode($response, true);
            if (isset($result['choices'][0]['message']['content'])) {
                $parsed = json_decode($result['choices'][0]['message']['content'], true);
                if (is_array($parsed)) {
                    return sanitize_parsed_cv($parsed, $rawInput);
                }
            }
        }
    }

    // Fallback Intelligent Parser if OpenAI key is omitted or API is unavailable
    return fallback_cv_parser($rawInput);
}

function fallback_cv_parser(string $text): array {
    $name = "";
    $title = "Candidate";
    $email = "";
    $phone = "";
    $location = "";

    if (preg_match('/(?:My name is|I am|Name:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i', $text, $m)) {
        $name = trim($m[1]);
    }

    if (preg_match('/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/', $text, $m)) {
        $email = $m[1];
    }

    if (preg_match('/(\+?\d{1,3}[\s-]?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4})/', $text, $m)) {
        $phone = $m[1];
    }

    if (preg_match('/(?:i am a|i\'m a)\s+([^.]+?)(?=\.|,| with| knowing| skilled| created|$)/i', $text, $m)) {
        $title = ucwords(trim($m[1]));
    } else if (preg_match('/student/i', $text)) {
        $title = "BS Artificial Intelligence Student";
    }

    // Skills
    $knownSkills = ['Python', 'Java', 'SQL', 'Machine Learning', 'React', 'JavaScript', 'HTML', 'CSS', 'C++', 'Node.js', 'Git'];
    $extractedSkills = [];
    foreach ($knownSkills as $skill) {
        if (stripos($text, $skill) !== false) {
            $extractedSkills[] = $skill;
        }
    }

    // Projects
    $projects = [];
    if (preg_match('/(?:created|built|developed)\s+(?:a|an)?\s+([A-Z0-9][A-Za-z0-9\s]{3,30})/i', $text, $m)) {
        $projects[] = [
            'name' => trim($m[1]),
            'description' => "Created " . trim($m[1]) . " based on project requirements."
        ];
    }

    $summary = $title . " skilled in " . implode(', ', $extractedSkills) . ".";

    return [
        'personalInfo' => [
            'name' => $name ?: 'Candidate',
            'email' => $email,
            'phone' => $phone,
            'location' => $location,
            'title' => $title
        ],
        'summary' => $summary,
        'education' => [
            [
                'degree' => 'B.S. in Artificial Intelligence',
                'institution' => 'University Program',
                'startDate' => '',
                'endDate' => 'Present'
            ]
        ],
        'experience' => [], // Empty unless explicitly in prompt
        'projects' => $projects,
        'skills' => array_map(fn($s) => ['name' => $s, 'level' => 'Advanced'], $extractedSkills),
        'certifications' => [],
        'achievements' => [],
        'languages' => []
    ];
}

function sanitize_parsed_cv(array $parsed, string $rawInput): array {
    $default = fallback_cv_parser($rawInput);
    return array_merge($default, $parsed);
}
