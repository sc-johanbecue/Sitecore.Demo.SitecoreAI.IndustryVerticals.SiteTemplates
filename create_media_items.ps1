$mapping = Get-Content image_mapping.json | ConvertFrom-Json
$parentId = "b1679b58-f116-4913-bbe1-ff30f4d6fac3"
$templateId = "daf085e8-602e-43a6-8299-038ff171349f"

$results = @()

$mapping.PSObject.Properties | ForEach-Object {
    $entry = $_.Value
    $imageUrl = $entry.imageUrl
    $name = $entry.name
    $newsItemId = $entry.itemId
    
    # Sanitize name for Sitecore item name
    $itemName = $name -replace '[^\w\s-]', '' -replace '\s+', ' ' -replace ' ', '-'
    if ($itemName.Length -gt 100) {
        $itemName = $itemName.Substring(0, 100)
    }
    
    # Extract extension from URL
    $ext = "jpg"
    if ($imageUrl -match '\.(jpg|jpeg|png|gif|webp)') {
        $ext = $matches[1]
        if ($ext -eq "jpeg") { $ext = "jpg" }
    }
    
    # Determine mime type
    $mimeType = "image/jpeg"
    if ($ext -eq "png") { $mimeType = "image/png" }
    elseif ($ext -eq "gif") { $mimeType = "image/gif" }
    elseif ($ext -eq "webp") { $mimeType = "image/webp" }
    
    $results += [PSCustomObject]@{
        NewsItemId = $newsItemId
        MediaItemName = "$itemName.$ext"
        ImageUrl = $imageUrl
        Extension = $ext
        MimeType = $mimeType
    }
}

$results | ConvertTo-Json -Depth 10 | Out-File media_items_to_create.json -Encoding UTF8
Write-Host "Created media_items_to_create.json with $($results.Count) items"
