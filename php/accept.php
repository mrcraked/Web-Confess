<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond with a 200 status for preflight requests
    http_response_code(200);
    exit;
}

// Helper function to read JSON data
function readData($file) {
    if (file_exists($file)) {
        $data = file_get_contents($file);
        return json_decode($data, true);
    }
    return [];
}

// Helper function to write JSON data
function writeData($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Define the file to store the data
$file = 'confes.json';

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $postData = file_get_contents('php://input');
    $decodedData = json_decode($postData, true);

    // Validate and ensure data is properly formatted
    if (is_array($decodedData)) {
        // Read existing data
        $existingData = readData($file);
        
        // Append the new data
        $existingData[] = $decodedData;
        
        // Write back to the file
        writeData($file, $existingData);
        
        // Respond with success
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
    } else {
        // Invalid data response
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
    }
    exit;
}

// Handle GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Read and return the data
    $data = readData($file);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// If the request method is not supported
header('Content-Type: application/json');
http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
exit;
