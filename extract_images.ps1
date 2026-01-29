$urls = @(
    "https://matthey.com/media/2025/half-year-results-2025-26",
    "https://matthey.com/media/2025/leadership-update-nov-25",
    "https://matthey.com/media/2025/ct-re-classification-and-pre-close-trading-update",
    "https://matthey.com/media/2025/usa-bioenergy-secures-jm-and-honeywell-technologies-for-new-saf-facility-in-texas-usa",
    "https://matthey.com/media/2025/johnson-matthey-to-open-its-first-hydrogen-internal-combustion-engine-testing-facility-in-gothenburg",
    "https://matthey.com/media/2025/appointment-of-andrew-cosslett-as-chair",
    "https://matthey.com/media/2025/jm-publishes-annual-report-and-accounts-2025",
    "https://matthey.com/media/2025/honeywell-johnson-matthey-gidara-energy-and-samsung-e-a-form-saf-technology-alliance",
    "https://matthey.com/media/2025/agreement-to-sell-catalyst-technologies-business",
    "https://matthey.com/media/2025/fy2024-25",
    "https://matthey.com/media/2025/johnson-matthey-publishes-2025-pgm-market-report",
    "https://matthey.com/media/2025/sungas",
    "https://matthey.com/media/2025/willis-sustainable-fuels",
    "https://matthey.com/media/2025/board-changes",
    "https://matthey.com/media/2025/jm-bosch-collaboration-hydrogen-tech",
    "https://matthey.com/media/2025/establishment-of-investment-committee",
    "https://matthey.com/media/2025/delivering-against-strategic-objectives",
    "https://matthey.com/media/2025/jm-and-reolum-partnership",
    "https://matthey.com/media/2025/response-to-letter-from-standard-investments-dated-7-january-2025",
    "https://matthey.com/media/2025/johnson-matthey-officially-opens-first-hydrogen-internal-combustion-engine-facility-in-gothenburg"
)

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        $html = $response.Content
        
        # Look for jmarticle__hero divs with background images
        if ($html -match 'class="[^"]*jmarticle__hero[^"]*"[^>]*style="[^"]*background[^"]*url\(([^\)]+)\)') {
            $imageUrl = $matches[1].Trim("'`"")
            Write-Host "$url|$imageUrl"
        } elseif ($html -match 'jmarticle__hero[^>]*>[\s\S]{0,500}background[^:]*:\s*url\(([^\)]+)\)') {
            $imageUrl = $matches[1].Trim("'`"")
            Write-Host "$url|$imageUrl"
        } else {
            Write-Host "$url|NOT_FOUND"
        }
    } catch {
        Write-Host "$url|ERROR: $($_.Exception.Message)"
    }
}
