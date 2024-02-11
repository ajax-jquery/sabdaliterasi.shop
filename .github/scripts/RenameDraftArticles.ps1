# Ambil path dari direktori root proyek
$BasePath = Split-Path -Parent -Path $PSScriptRoot

# Set path ke direktori _drafts dan _artikel
$DraftsPath = '_drafts'
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath
$ArticlesPath = '_artikel'
$ResolvedArticlesPath = Join-Path -Path $BasePath -ChildPath $ArticlesPath

# Get current date
$CurrentDate = Get-Date -Format "yyyy-MM-dd"

# Get all draft articles
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Filter *.md

# Loop through each draft article
foreach ($Article in $DraftArticles) {
    # Get the scheduled date from the file name
    $ScheduledDate = $Article.BaseName.Substring(0,10) # assuming the date format is yyyy-MM-dd

    # Check if the article is scheduled for today or has missed its scheduled date
    if ($ScheduledDate -eq $CurrentDate -or $ScheduledDate -lt $CurrentDate) {
        # Generate new file name by appending the scheduled date to the original file name
        $NewFileName = $ScheduledDate + "-" + $Article.Name

        # Move the draft article to the articles directory
        $NewFilePath = Join-Path -Path $ResolvedArticlesPath -ChildPath $NewFileName
        Move-Item -Path $Article.FullName -Destination $NewFilePath -Force

        Write-Host "Moved '$($Article.FullName)' to '$NewFilePath'"
    }
}

# Output success message
Write-Host "All scheduled or missed draft articles moved to the articles directory successfully."
