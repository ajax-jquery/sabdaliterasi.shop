[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$ArtikelPath = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [switch]$AllowMultiplePostsPerDay = $true,
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

# Set timezone
$TimeZone = (Get-TimeZone).StandardName
try {
    if (Test-Path -Path $ResolvedConfigPath) {
        $TimeZone = (Get-Content -Path $ResolvedConfigPath | ConvertFrom-Yaml).timezone
    }
}
catch {
    Write-Host "Error occurred while setting timezone. Using default timezone."
}
$CurrentDate = Get-Date -Format 'yyyy-MM-dd'

# Discover draft articles
$DraftArticles = Get-ChildItem -Path $DraftsPath -Filter "*.md"

# Check draft article date and rename if necessary
foreach ($Article in $DraftArticles) {
    $FrontMatter = Get-Content -Path $Article.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter -and $FrontMatter.ContainsKey('date')) {
        $ArticleDate = Get-Date $FrontMatter['date'] -Format 'yyyy-MM-dd'
        if ($ArticleDate -lt $CurrentDate -or ($AllowMultiplePostsPerDay -and $ArticleDate -eq $CurrentDate)) {
            $NewFileName = if ($PreserveDateFileName) {
                "{0}-{1}" -f $ArticleDate, $Article.Name
            } else {
                $Article.Name
            }
            $NewArticlePath = Join-Path -Path $ArtikelPath -ChildPath $NewFileName
            Move-Item -Path $Article.FullName -Destination $NewArticlePath
            $AddFilesToCommit.Add($NewArticlePath)
            $RemoveFilesFromCommit.Add($Article.FullName)
            Write-Host "Article '$($Article.Name)' renamed and moved to '$NewArticlePath'."
            $ShouldPublish = $true
        }
    }
}

OutputAction
