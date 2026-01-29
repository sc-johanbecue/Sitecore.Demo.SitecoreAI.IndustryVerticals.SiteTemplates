# PowerShell script to download images and prepare for Sitecore upload
$json = Get-Content news_items_processed.json -Raw | ConvertFrom-Json
$mediaParentId = "b1679b58-f116-4913-bbe1-ff30f4d6fac3" # FromWebsite folder ID
$imageTemplateId = "daf085e8-602e-43a6-8299-038ff171349f" # Image template ID

$results = @()

foreach ($item in $json) {
    $imageUrl = $item.ImageUrl
    $mediaItemName = $item.MediaItemName
    $extension = $item.Extension
    $mimeType = $item.MimeType
    $itemName = $item.ItemName
    
    Write-Host "Downloading: $imageUrl"
    
    try {
        $response = Invoke-WebRequest -Uri $imageUrl -UseBasicParsing
        $imageBytes = $response.Content
        $base64 = [Convert]::ToBase64String($imageBytes)
        
        $results += [PSCustomObject]@{
            NewsItemName = $itemName
            MediaItemName = $mediaItemName
            ImageUrl = $imageUrl
            Extension = $extension
            MimeType = $mimeType
            Base64Data = $base64
            Size = $imageBytes.Length
        }
        
        Write-Host "Downloaded: $mediaItemName ($($imageBytes.Length) bytes)"
    } catch {
        Write-Host "Error downloading $imageUrl : $($_.Exception.Message)"
    }
}

$results | ConvertTo-Json -Depth 10 | Out-File images_for_upload.json -Encoding UTF8
Write-Host ""
Write-Host "Downloaded $($results.Count) images. Data saved to images_for_upload.json"
