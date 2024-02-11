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

# Set Variables
$BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath
$ResolvedPostsPath = Join-Path -Path $BasePath -ChildPath $PostsPath
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
$RenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
$AddFilesToCommit = [System.Collections.Generic.List[String]]::new()
$RemoveFilesFromCommit = [System.Collections.Generic.List[String]]::new()
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$ShouldPublish = $false

# Set TimeZone
'::group::Set TimeZone'
$TimeZone = (Get-TimeZone).StandardName
$DefaultTimeZoneMessage = 'Setting TimeZone to default ''{0}''.' -f $TimeZone
try {
    if (Test-Path -Path $ResolvedConfigPath) {
        $TimeZone = (Get-Content -Path $ResolvedConfigPath | ConvertFrom-Yaml).timezone
        if (-Not [string]::IsNullOrEmpty($TimeZone)) {
            'Setting TimeZone from {0} to ''{1}''.' -f $ConfigPath,$TimeZone
        } else {
            $DefaultTimeZoneMessage
        }
    } else {
        $DefaultTimeZoneMessage
    }
}
catch {
    $DefaultTimeZoneMessage
}
$CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date),$TimeZone)
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'

# Draft Article Discovery
'::group::Draft Article Discovery'
if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
    '::error::The draft path ''{0}'' could not be found' -f $DraftsPath
    exit 1
}
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Filter '*.md' | Where-Object { $_.BaseName -match $DateRegex }

if ($DraftArticles.Count -gt 0) {
    'Found {0} articles in {1}.' -f $DraftArticles.Count, $DraftsPath
    $RenameArticleList = @()
    foreach ($Article in $DraftArticles) {
        $ArticleDateFromFileName = [datetime]::ParseExact($Article.BaseName.Substring(0, 10), 'yyyy-MM-dd', $null)
        if ($ArticleDateFromFileName -le $CurrentDate) {
            $RenameArticleList += $Article
            'Article date is past or today. Including article to rename.'
        } else {
            '::warning::Article is scheduled for a future date according to filename. SKIPPED'
        }
    }
} else {
    'No markdown files found in {0}.' -f $DraftsPath
    OutputAction
}
'::endgroup::'

# Renaming Draft Articles with Valid Date
if (-Not (Test-Path -Path $ResolvedPostsPath)) {
    '::error::The posts path ''{0}'' could not be found' -f $PostsPath
    OutputAction
    exit 1
}
'::group::Renaming Draft Articles with Valid Date'
foreach ($Article in $RenameArticleList) {
    $NewFileName = '{0}-{1}' -f $FormattedDate,$Article.Name
    if ($Article.BaseName -match $DateRegex) {
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be prepended with {0}.' -f $FormattedDate
        } else {
            $NewFileName = '{0}{1}' -f $FormattedDate,$Article.Name.Replace($Matches[0],'')
        }
    }
    'Renaming {0} to {1}' -f $Article.Name,$NewFileName
    $NewFullPath = Join-Path -Path $ResolvedPostsPath -ChildPath $NewFileName
    try {
        Move-Item -Path $Article.FullName -Destination $NewFullPath
        $AddFilesToCommit.Add($NewFileName)
        $RemoveFilesFromCommit.Add($Article.Name)
        $ShouldPublish = $true
    }
    catch {
        OutputAction
    }
}
'::endgroup::'

OutputAction
