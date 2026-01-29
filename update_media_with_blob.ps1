# Script to update media items with blob data
$json = Get-Content news_items_processed.json -Raw | ConvertFrom-Json
$mediaItemId = "68c408f1-88bd-4a86-b7ed-60a01bfd985c" # First media item ID
$imageUrl = $json[0].ImageUrl

Write-Host "Downloading image from: $imageUrl"
$response = Invoke-WebRequest -Uri $imageUrl -UseBasicParsing
$imageBytes = $response.Content
$base64 = [Convert]::ToBase64String($imageBytes)

Write-Host "Image size: $($imageBytes.Length) bytes"
Write-Host "Base64 length: $($base64.Length) characters"
Write-Host "First 100 chars: $($base64.Substring(0, 100))"

# Note: The base64 data is too large to pass directly via MCP tool
# We'll need to use a different approach - possibly chunking or using a file upload API
