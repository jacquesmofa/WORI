<?php
/**
 * WORI Admin — Content Save Backend
 * 
 * Handles saving site content changes from the admin dashboard
 * by committing directly to the GitHub repository.
 * 
 * SETUP: Replace the two values below with your actual credentials.
 */
 
// ──────────────────────────────────────────────
// CONFIGURE THESE TWO VALUES
// ──────────────────────────────────────────────
$GITHUB_TOKEN = 'PASTE_YOUR_GITHUB_TOKEN_HERE';      // Your GitHub Personal Access Token
$ADMIN_PASSWORD = 'CHOOSE_A_STRONG_PASSWORD_HERE';    // Staff will use this to log into /admin
// ──────────────────────────────────────────────

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

// Read raw JSON input
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

if (!$payload) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload.']);
    exit;
}

// Validate password
$password = isset($payload['password']) ? $payload['password'] : '';
if (empty($ADMIN_PASSWORD) || $password !== $ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized. Invalid admin password.']);
    exit;
}

// Validate repo details
$repoOwner = isset($payload['repoOwner']) ? $payload['repoOwner'] : '';
$repoName  = isset($payload['repoName']) ? $payload['repoName'] : '';
$updatedContent = isset($payload['updatedContent']) ? $payload['updatedContent'] : null;

if (empty($repoOwner) || empty($repoName) || !$updatedContent) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: repoOwner, repoName, updatedContent.']);
    exit;
}

if (empty($GITHUB_TOKEN) || $GITHUB_TOKEN === 'PASTE_YOUR_GITHUB_TOKEN_HERE') {
    http_response_code(500);
    echo json_encode(['error' => 'Server not configured. GitHub token is missing.']);
    exit;
}

// Path to the content file in the repo
$pathToFile = 'src/data/site-content.json';
$apiUrl = "https://api.github.com/repos/{$repoOwner}/{$repoName}/contents/{$pathToFile}";

// Step 1: Get current file SHA (needed for update)
$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $GITHUB_TOKEN,
        'User-Agent: WORI-Admin-PHP-Backend',
        'Accept: application/vnd.github.v3+json',
    ],
    CURLOPT_TIMEOUT => 15,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$sha = '';
if ($httpCode === 200) {
    $fileData = json_decode($response, true);
    $sha = isset($fileData['sha']) ? $fileData['sha'] : '';
} elseif ($httpCode !== 404) {
    http_response_code(502);
    echo json_encode([
        'error' => 'Failed to fetch current file from GitHub.',
        'details' => "HTTP {$httpCode}: " . substr($response, 0, 300)
    ]);
    exit;
}
// 404 means file doesn't exist yet — that's fine, we'll create it

// Step 2: Prepare content and commit
$contentString = json_encode($updatedContent, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$base64Content = base64_encode($contentString);

$commitMessage = 'Content updated via WORI Admin Dashboard';

$putData = json_encode([
    'message' => $commitMessage,
    'content' => $base64Content,
    'sha'     => $sha ?: null,
    'branch'  => 'main',
]);

$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST  => 'PUT',
    CURLOPT_POSTFIELDS     => $putData,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $GITHUB_TOKEN,
        'User-Agent: WORI-Admin-PHP-Backend',
        'Accept: application/vnd.github.v3+json',
        'Content-Type: application/json',
        'Content-Length: ' . strlen($putData),
    ],
    CURLOPT_TIMEOUT => 15,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode([
        'success' => true,
        'message' => 'Published! Your site will update in about 60 seconds.'
    ]);
} else {
    http_response_code(502);
    $errorData = json_decode($response, true);
    $errorMsg = isset($errorData['message']) ? $errorData['message'] : "HTTP {$httpCode}";
    echo json_encode([
        'error' => 'Failed to update GitHub repository.',
        'details' => $errorMsg
    ]);
}