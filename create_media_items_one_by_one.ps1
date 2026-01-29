# PowerShell script to create media items one by one
$json = Get-Content news_items_processed.json -Raw | ConvertFrom-Json
$mediaParentId = "b1679b58-f116-4913-bbe1-ff30f4d6fac3"
$imageTemplateId = "daf085e8-602e-43a6-8299-038ff171349f"

$results = @()

foreach ($item in $json) {
    $imageUrl = $item.ImageUrl
    $mediaItemName = $item.MediaItemName
    $extension = $item.Extension
    $mimeType = $item.MimeType
    $itemName = $item.ItemName
    
    Write-Host "Processing: $mediaItemName"
    
    try {
        $response = Invoke-WebRequest -Uri $imageUrl -UseBasicParsing
        $imageBytes = $response.Content
        $base64 = [Convert]::ToBase64String($imageBytes)
        
        $results += [PSCustomObject]@{
            NewsItemName = $itemName
            MediaItemName = $mediaItemName
            Extension = $extension
            MimeType = $mimeType
            Size = $imageBytes.Length
            Base64Data = $base64.Substring(0, [Math]::Min(100, $base64.Length)) + "..." # Just preview
        }
        
        Write-Host "  Size: $($imageBytes.Length) bytes"
        Write-Host "  Base64 length: $($base64.Length) chars"
    } catch {
        Write-Host "  Error: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "Summary: $($results.Count) images ready for upload"
$results | Format-Table NewsItemName, MediaItemName, Extension, Size -AutoSize
