# Set the path to the drafts directory
$DraftsPath = '_drafts'
$PostsPath = '_artikel'

# Get the current date in the format "YYYY-MM-DD"
$FormattedDate = Get-Date -Format "yyyy-MM-dd"

# Set the full paths for drafts and posts directories
$ResolvedDraftsPath = Join-Path -Path $PSScriptRoot -ChildPath $DraftsPath
$ResolvedPostsPath = Join-Path -Path $PSScriptRoot -ChildPath $PostsPath

# Get a list of draft articles
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Filter *.md

# Loop through each draft article
foreach ($Article in $DraftArticles) {
    # Generate the new file name by adding the current date to the original file name
    $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
    
    # Set the full path for the new file
    $NewFilePath = Join-Path -Path $ResolvedPostsPath -ChildPath $NewFileName

    # Move the draft article to the posts directory and rename it
    Move-Item -Path $Article.FullName -Destination $NewFilePath

    # Add the new file to the list of files to commit
    $AddFilesToCommit += $NewFileName

    # Remove the original draft file from the list of files to commit
    $RemoveFilesFromCommit += $Article.Name
}

# Output the results for GitHub Actions
if ($AddFilesToCommit.Count -gt 0) {
    Write-Host "Draft articles renamed and published:"
    foreach ($file in $AddFilesToCommit) {
        Write-Host "- $file"
    }
    'DRAFTS_ARTICLES_RENAMED=true' >> $env:GITHUB_ENV
    'DRAFTS_COMMIT_RENAMED_FILES={0}' -f ($AddFilesToCommit -join ',') >> $env:GITHUB_ENV
    'DRAFTS_COMMIT_REMOVED_FILES={0}' -f ($RemoveFilesFromCommit -join ',') >> $env:GITHUB_ENV
} else {
    Write-Host "No draft articles found to publish."
    'DRAFTS_ARTICLES_RENAMED=false' >> $env:GITHUB_ENV
    'DRAFTS_COMMIT_RENAMED_FILES=false' >> $env:GITHUB_ENV
    'DRAFTS_COMMIT_REMOVED_FILES=false' >> $env:GITHUB_ENV
}
