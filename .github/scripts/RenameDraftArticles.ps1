# Set the path to the drafts directory
$DraftsPath = '_drafts'
$ResolvedDraftsPath = Join-Path -Path $PSScriptRoot -ChildPath $DraftsPath

# Display the resolved path for debugging
Write-Host "Resolved drafts path: $ResolvedDraftsPath"

# Check if the drafts directory exists
if (-not (Test-Path -Path $ResolvedDraftsPath)) {
    Write-Host "Drafts directory not found at $ResolvedDraftsPath"
    Write-Host "Please make sure the drafts directory exists and try again."
    exit 1
}

# Set the path to the articles directory
$ArticlesPath = '_artikel'
$ResolvedArticlesPath = Join-Path -Path $PSScriptRoot -ChildPath $ArticlesPath

# Get the current date in the format "YYYY-MM-DD"
$FormattedDate = Get-Date -Format "yyyy-MM-dd"

# Get a list of draft articles
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Filter *.md

# Loop through each draft article
foreach ($Article in $DraftArticles) {
    # Generate the new file name by adding the current date to the original file name
    $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
    
    # Set the full path for the new file in the articles directory
    $NewFilePath = Join-Path -Path $ResolvedArticlesPath -ChildPath $NewFileName

    # Move the draft article to the articles directory and rename it
    Move-Item -Path $Article.FullName -Destination $NewFilePath

    # Output the renamed file
    Write-Host "Moved '$($Article.FullName)' to '$NewFilePath'"
}

# Output success message
Write-Host "All draft articles moved to the articles directory successfully."
