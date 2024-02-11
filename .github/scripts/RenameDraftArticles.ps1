[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$PostsPath = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [switch]$AllowMultiplePostsPerDay,
    [switch]$PreserveDateFileName
)

function OutputAction {
    if ($ShouldPublish) {
        $AddFileList = $AddFilesToCommit -join ','
        $RemoveFileList = $RemoveFilesFromCommit -join ','
        'DRAFTS_ARTICLES_RENAMED=true' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_RENAMED_FILES={0}' -f $AddFileList >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_REMOVED_FILES={0}' -f $RemoveFileList >> $env:GITHUB_ENV
    } else {
        'DRAFTS_ARTICLES_RENAMED=false' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_RENAMED_FILES=false' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_REMOVED_FILES=false' >> $env:GITHUB_ENV
    }
}

# Resolve paths
$BasePath = Join-Path -Path $PSScriptRoot -ChildPath ".."
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath
$ResolvedPostsPath = Join-Path -Path $BasePath -ChildPath $PostsPath

# Get current date
$CurrentDate = Get-Date
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')

# Set default time zone
$TimeZone = 'Asia/Jakarta'

# Try to get timezone from config if available
try {
    $ConfigContent = Get-Content -Path $ConfigPath -Raw -ErrorAction Stop
    $Config = $ConfigContent | ConvertFrom-Yaml
    if ($Config -and $Config.timezone) {
        $TimeZone = $Config.timezone
    }
} catch {
    Write-Host "Failed to get timezone from config. Using default timezone: $TimeZone"
}

try {
    $CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId($CurrentDate, $TimeZone)
} catch {
    Write-Host "Failed to convert timezone. Using system time."
}

# Initialize lists
$RenameArticleList = @()
$AddFilesToCommit = @()
$RemoveFilesFromCommit = @()

# Discover draft articles
if (-not (Test-Path -Path $ResolvedDraftsPath)) {
    Write-Host "The draft path '$DraftsPath' could not be found"
    exit 1
}

$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Filter *.md | Where-Object { -not $_.Name.StartsWith("template") }

if ($DraftArticles.Count -eq 0) {
    Write-Host "No markdown files found in $DraftsPath."
    OutputAction
    exit
}

Write-Host "Found $($DraftArticles.Count) articles in $DraftsPath."
foreach ($Article in $DraftArticles) {
    $FileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($Article.Name)
    $DatePart = $FileNameWithoutExtension -split '-', 2 | Select-Object -First 1

    if ($DatePart -match '^\d{4}-\d{2}-\d{2}$') {
        $ArticleDateFromFileName = [datetime]::ParseExact($DatePart, 'yyyy-MM-dd', $null)

        if ($ArticleDateFromFileName -lt $CurrentDate -or $ArticleDateFromFileName -eq $CurrentDate) {
            Write-Host "Article date is past or today. Proceeding with publishing."
            $RenameArticleList.Add($Article)
        } else {
            Write-Host "$($Article.Name): Article is scheduled for a future date. SKIPPED"
        }
    } else {
        Write-Host "$($Article.Name): Failed to extract date from filename. SKIPPED"
    }
}

# Handle renaming and moving of draft articles
if (-not (Test-Path -Path $ResolvedPostsPath)) {
    Write-Host "The posts path '$PostsPath' could not be found."
    OutputAction
    exit 1
}

foreach ($Article in $RenameArticleList) {
    $NewFileName = "$FormattedDate-$($Article.Name)"
    
    if ($PreserveDateFileName) {
        Write-Host "'PreserveDateFileName' is enabled. The existing filename will be preserved."
    } else {
        Write-Host "'PreserveDateFileName' is not enabled. Prepending $FormattedDate to filename."
        $NewFileName = "$FormattedDate-$($Article.Name)"
    }

    Write-Host "Renaming $($Article.Name) to $NewFileName"
    $NewFullPath = Join-Path -Path $ResolvedPostsPath -ChildPath $NewFileName

    try {
        Move-Item -Path $Article.FullName -Destination $NewFullPath
        $AddFilesToCommit.Add($NewFileName)
        $RemoveFilesFromCommit.Add($Article.Name)
        $ShouldPublish = $true
    } catch {
        Write-Host "Failed to move $($Article.Name) to $NewFullPath"
        OutputAction
    }
}

OutputAction
