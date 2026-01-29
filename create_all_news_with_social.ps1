# Script to create all news items with images and social media links
$json = Get-Content complete_news_data.json | ConvertFrom-Json
$parentId = "e8617a60-2961-498e-bef8-9751cd2b35ff" # News folder ID
$mediaParentId = "b1679b58-f116-4913-bbe1-ff30f4d6fac3" # FromWebsite folder ID
$templateId = "950b7f23-903c-447b-b2fd-63dfd4d7b296" # News Page template ID
$imageTemplateId = "daf085e8-602e-43a6-8299-038ff171349f" # Image template ID

$results = @()

foreach ($item in $json.newsItems) {
    $url = $item.url
    $title = $item.title
    $imageUrl = $item.imageUrl
    $publicationDate = $item.publicationDate
    $downloadLink = $item.downloadLink
    $body = $item.body
    
    # Sanitize name for Sitecore
    $itemName = $title -replace '[^\w\s-]', '' -replace '\s+', ' ' -replace ' ', '-'
    if ($itemName.Length -gt 100) { $itemName = $itemName.Substring(0, 100) }
    
    # Generate social media links
    $encodedUrl = [System.Web.HttpUtility]::UrlEncode($url)
    $encodedTitle = [System.Web.HttpUtility]::UrlEncode($title)
    
    $xUrl = "<link linktype=`"external`" url=`"https://twitter.com/share?url=$encodedUrl&amp;text=$encodedTitle`" target=`"`" text=`"`" title=`"`" class=`"`"/>"
    $linkedInUrl = "<link linktype=`"external`" url=`"https://linkedin.com/shareArticle?url=$encodedUrl&amp;title=$encodedTitle`" target=`"`" text=`"`" title=`"`" class=`"`"/>"
    
    # Determine image extension and MIME type
    $ext = "jpg"
    if ($imageUrl -match '\.(jpg|jpeg|png|gif|webp)', 'IgnoreCase') {
        $ext = $matches[1]
        if ($ext -eq "jpeg") { $ext = "jpg" }
    }
    
    $mimeType = "image/jpeg"
    if ($ext -eq "png") { $mimeType = "image/png" }
    elseif ($ext -eq "gif") { $mimeType = "image/gif" }
    elseif ($ext -eq "webp") { $mimeType = "image/webp" }
    
    $mediaItemName = "$itemName.$ext"
    
    # Format download link if exists
    $downloadLinkFormatted = ""
    if ($downloadLink -and $downloadLink.Trim() -ne "") {
        $downloadLinkFormatted = "<link linktype=`"external`" url=`"$downloadLink`" target=`"_blank`" text=`"Download full release`" title=`"`" class=`"`"/>"
    }
    
    $results += [PSCustomObject]@{
        Url = $url
        Title = $title
        ItemName = $itemName
        ImageUrl = $imageUrl
        MediaItemName = $mediaItemName
        Extension = $ext
        MimeType = $mimeType
        PublicationDate = $publicationDate
        DownloadLink = $downloadLinkFormatted
        Body = $body
        XUrl = $xUrl
        LinkedInUrl = $linkedInUrl
    }
}

$results | ConvertTo-Json -Depth 10 | Out-File news_items_processed.json -Encoding UTF8
Write-Host "Processed $($results.Count) news items. Output saved to news_items_processed.json"
