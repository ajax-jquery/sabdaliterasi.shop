[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$PostsPath = '_artikel',  # Mengubah folder tujuan menjadi _artikel
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
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
$ResolvedPostsPath = Join-Path -Path $BasePath -ChildPath $PostsPath  # Mengubah path tujuan menjadi _artikel
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
$RenameArticleList = @()
$AddFilesToCommit = @()
$RemoveFilesFromCommit = @()
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$ShouldPublish = $false

# Set TimeZone
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

# Draft Article Discovery
if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
    Write-Host "The draft path '$DraftsPath' could not be found" -ForegroundColor Red
    exit 1
}
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Include *.md -Exclude template.md
if ($DraftArticles.Count -gt 0) {
    if ($DraftArticles.Count -eq 1) {
        Write-Host "Found 1 article in $DraftsPath."
    } else {
        Write-Host "Found $($DraftArticles.Count) articles in $DraftsPath."
    }
    $DraftArticles.Name | ForEach-Object {
        Write-Host "- $_"
    }
} else {
    Write-Host "No markdown files found in $DraftsPath."
    OutputAction
    exit 1
}

# Checking Draft Article Date
foreach ($Article in $DraftArticles) {
    $FileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($Article.Name)
    $DatePart = $FileNameWithoutExtension -split '-', 2 | Select-Object -First 1
    if ($DatePart -match $DateRegex) {
        $ArticleDateFromFileName = [datetime]::ParseExact($Matches[0], 'yyyy-MM-dd', $null)
    }

    # Memeriksa apakah tanggal artikel yang diekstraksi sudah terlewatkan atau sesuai hari ini
    if ($ArticleDateFromFileName -lt $CurrentDate -or $ArticleDateFromFileName -eq $CurrentDate) {
        'Article date is past or today. Proceeding with publishing.'
        $ShouldPublish = $true
    }

    $FrontMatter = Get-Content -Path $Article.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        $ArticleDate = [datetime]::Parse($FrontMatter['date']).ToShortDateString()
        '{0}: DATE : {1}' -f $FrontMatter['title'],$ArticleDate
        if ($ArticleDate -eq $CurrentDate.ToShortDateString()) {
            $RenameArticleList += $Article
            '{0}: Including article to rename.' -f $FrontMatter['title']
        } else {
            if ($ArticleDate.Ticks -lt [datetime]::Now.Ticks) {
                '{0}: Article is scheduled for a future date. SKIPPED' -f $FrontMatter['title']
            } else {
                '::warning:: {0}: Article ''date'' is set in the past. Please update the ''date'' value to a future date. SKIPPED' -f $FrontMatter['title']
            }
        }
    } else {
        '{0}: Article does not contain a date value. SKIPPED' -f $FrontMatter['title']
    }
}

# Handling Multiple Draft Articles with Current Date
switch ($RenameArticleList.Count) {
    0 {
        'No articles matched the criteria to be renamed and published.'
        OutputAction
        return
    }
    1 {
        'Found 1 article to rename.'
    }
    default {
        '::warning::More than one draft article found with front matter date value of {0}.' -f $FormattedDate
        $RenameArticleList = $RenameArticleList | Sort-Object -Property LastWriteTimeUtc
        if ($AllowMultiplePostsPerDay.IsPresent) {
            '::warning::Multiple draft articles will be published per day chronologically.'
        } else {
            '::warning::Multiple draft article with today''s date and ''AllowMultiplePostsPerDay'' is not enabled. The last edited file will be published.'
            $RenameArticleList = $RenameArticleList | Select-Object -Last 1
        }
    }
}

# Renaming Draft Articles with Valid Date
if (-Not (Test-Path -Path $ResolvedPostsPath)) {
    Write-Host "The posts path '$PostsPath' could not be found" -ForegroundColor Red
    OutputAction
    exit 1
}
foreach ($Article in $RenameArticleList) {
    $NewFileName = '{0}-{1}' -f $FormattedDate,$Article.Name
    if ($Article.BaseName -match $DateRegex) {
        '::warning::Article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $Article.Name
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be prepended with {0}.' -f $FormattedDate
        } else {
            '::warning::''PreserveDateFileName'' is not enabled. The exiting date {0} will be removed from the filename and it will be prepended with {1}.' -f $Matches[0],$FormattedDate
            $NewFileName = '{0}{1}' -f $FormattedDate,$Article.Name.Replace($Matches[0],'')
        }
    }
    'Renaming {0} to {1}' -f $Article.Name,$NewFileName
    $NewFullPath = Join-Path -Path $ResolvedPostsPath -ChildPath $NewFileName
    try {
        Move-Item -Path $Article.FullName -Destination $NewFullPath
        $AddFilesToCommit += $NewFileName
        $RemoveFilesFromCommit += $Article.Name
        $ShouldPublish = $true
    }
    catch {
        OutputAction
    }
}

OutputAction
 
