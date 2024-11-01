[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$DataPath = '_artikel',
    [string]$DraftAmpPath = '_draftsamp',
    [string]$AmpPath = '_amp',
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

#region Set Variables
$BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
$ResolvedDataPath = Join-Path -Path $BasePath -ChildPath $DataPath
$ResolvedDraftAmpPath = Join-Path -Path $BasePath -ChildPath $DraftAmpPath -AdditionalChildPath '*'
$ResolvedAmpPath = Join-Path -Path $BasePath -ChildPath $AmpPath
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
$RenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
$RenameAmpList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
$AddFilesToCommit = [System.Collections.Generic.List[String]]::new()
$RemoveFilesFromCommit = [System.Collections.Generic.List[String]]::new()
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$ShouldPublish = $false
#endregion

#region Set TimeZone
'::group::Set TimeZone'
$TimeZone = (Get-TimeZone).StandardName
$DefaultTimeZoneMessage = 'Setting TimeZone to default ''{0}''.' -f $TimeZone
try {
    if (Test-Path -Path $ResolvedConfigPath) {
        $TimeZone = (Get-Content -Path $ResolvedConfigPath | ConvertFrom-Yaml).timezone
        if (-Not [string]::IsNullOrEmpty($TimeZone)) {
            'Setting TimeZone from {0} to ''{1}''.' -f $ConfigPath, $TimeZone
        } else {
            Write-Output $DefaultTimeZoneMessage
        }
    } else {
        Write-Output $DefaultTimeZoneMessage
    }
} catch {
    Write-Output $DefaultTimeZoneMessage
}
$CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date), $TimeZone)
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'
#endregion

#region Draft Article Discovery
'::group::Draft Article Discovery'
if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
    '::error::The draft path ''{0}'' could not be found' -f $DraftsPath
    exit 1
}
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Include *.md -Exclude template.md
if ($DraftArticles.Count -gt 0) {
    if ($DraftArticles.Count -eq 1) {
        'Found 1 article in {0}.' -f $DraftsPath
    } else {
        'Found {0} articles in {1}.' -f $DraftArticles.Count, $DraftsPath
    }
    $DraftArticles.Name | ForEach-Object {
        '- {0}' -f $_
    }
} else {
    'No markdown files found in {0}.' -f $DraftsPath
    OutputAction
}
'::endgroup::'
#endregion

#region Checking Draft Article Date
'::group::Checking Draft Article Date'
foreach ($Article in $DraftArticles) {
    $FrontMatter = Get-Content -Path $Article.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        $ArticleDateTimeString = $FrontMatter['date']
        $ArticleDateTime = [datetime]::Parse($ArticleDateTimeString).ToUniversalTime()
        $ArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($ArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $ArticleDate = $ArticleDateTime.ToString('yyyy-MM-dd')
        '{0}: DATE (from file): {1} - TIME: {2}' -f $FrontMatter['title'], $ArticleDate, $ArticleDateTime.ToString('HH:mm:ss')

        $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $CurrentDate = $CurrentDateTime.ToString('yyyy-MM-dd')
        '{0}: CURRENT DATE: {1} - TIME: {2}' -f $FrontMatter['title'], $CurrentDate, $CurrentDateTime.ToString('HH:mm:ss')

        if ($ArticleDate -eq $CurrentDate -and $CurrentDateTime -ge $ArticleDateTime) {
            $RenameArticleList.Add($Article)
            '{0}: Including article to rename.' -f $FrontMatter['title']
        } elseif ($ArticleDate -lt $CurrentDate) { 
            $RenameArticleList.Add($Article)
            '{0}: Including article to move to data folder.' -f $FrontMatter['title']
        } else {
            '::warning:: {0}: Article ''date'' is set in the future. SKIPPED' -f $FrontMatter['title']
        }
    } else {
        '{0}: Article does not contain a date value. SKIPPED' -f $FrontMatter['title']
    }
}
'::endgroup::'
#endregion

#region Handling Multiple Draft Articles with Current Date
'::group::Handling Multiple Draft Articles with Current Date'
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
            '::warning::Multiple draft articles with today''s date and ''AllowMultiplePostsPerDay'' is not enabled. The last edited file will be published.'
            $RenameArticleList = $RenameArticleList | Select-Object -Last 1
        }
    }
}
'::endgroup::'
#endregion

#region Moving Draft Articles to Data folder
if (-Not (Test-Path -Path $ResolvedDataPath)) {
    '::error::The data path ''{0}'' could not be found' -f $DataPath
    OutputAction
    exit 1
}
'::group::Moving Draft Articles to Data folder'
foreach ($Article in $RenameArticleList) {
    if ($Article.BaseName -match $DateRegex) {
        '::warning::Article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $Article.Name
        
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be retained as {0}.' -f $Article.Name
            $NewFileName = $Article.Name  # Tetap menggunakan nama asli
        } else {
            $NewFileName = $Article.Name -replace $DateRegex, ''
            $NewFileName = '{0}-{1}' -f $FormattedDate, $NewFileName.TrimStart('-')  # Trim untuk menghindari karakter '-'
            'Renaming the article filename from {0} to {1}.' -f $Article.Name, $NewFileName
        }
    } else {
        $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
        'Renaming the article filename from {0} to {1}.' -f $Article.Name, $NewFileName
    }

    try {
        Move-Item -Path $Article.FullName -Destination (Join-Path -Path $ResolvedDataPath -ChildPath $NewFileName) -Force -ErrorAction Stop
        $AddFilesToCommit.Add((Join-Path -Path $ResolvedDataPath -ChildPath $NewFileName))
    } catch {
        Write-Output '::error::Unable to move article {0} to {1}: {2}' -f $Article.FullName, $ResolvedDataPath, $_.Exception.Message
        $RemoveFilesFromCommit.Add($Article.FullName)
    }
}
'::endgroup::'
#endregion

#region Draft AMP Article Discovery
'::group::Draft AMP Article Discovery'
if (-Not (Test-Path -Path $ResolvedDraftAmpPath)) {
    '::error::The draft AMP path ''{0}'' could not be found' -f $DraftAmpPath
    exit 1
}
$DraftAmpArticles = Get-ChildItem -Path $ResolvedDraftAmpPath -Include *.md

# Debugging output
Write-Output "Draft AMP Path: $ResolvedDraftAmpPath"
Write-Output "Draft AMP Articles Count: $($DraftAmpArticles.Count)"

if ($DraftAmpArticles.Count -gt 0) {
    if ($DraftAmpArticles.Count -eq 1) {
        'Found 1 AMP article in {0}.' -f $DraftAmpPath
    } else {
        'Found {0} AMP articles in {1}.' -f $DraftAmpArticles.Count, $DraftAmpPath
    }
    $DraftAmpArticles.Name | ForEach-Object {
        '- {0}' -f $_
    }
} else {
    'No markdown files found in {0}.' -f $DraftAmpPath
}
'::endgroup::'
#endregion

#region Checking Draft AMP Article Date
'::group::Checking Draft AMP Article Date'
foreach ($AmpArticle in $DraftAmpArticles) {
    $FrontMatter = Get-Content -Path $AmpArticle.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        $AmpArticleDateTimeString = $FrontMatter['date']
        $AmpArticleDateTime = [datetime]::Parse($AmpArticleDateTimeString).ToUniversalTime()
        $AmpArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($AmpArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $AmpArticleDate = $AmpArticleDateTime.ToString('yyyy-MM-dd')
        '{0}: DATE (from file): {1} - TIME: {2}' -f $FrontMatter['title'], $AmpArticleDate, $AmpArticleDateTime.ToString('HH:mm:ss')

        $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $CurrentDate = $CurrentDateTime.ToString('yyyy-MM-dd')
        '{0}: CURRENT DATE: {1} - TIME: {2}' -f $FrontMatter['title'], $CurrentDate, $CurrentDateTime.ToString('HH:mm:ss')

        if ($AmpArticleDate -eq $CurrentDate -and $CurrentDateTime -ge $AmpArticleDateTime) {
            $RenameAmpList.Add($AmpArticle)
            '{0}: Including AMP article to rename.' -f $FrontMatter['title']
        } elseif ($AmpArticleDate -lt $CurrentDate) {
            $RenameAmpList.Add($AmpArticle)
            '{0}: Including AMP article to move to AMP folder.' -f $FrontMatter['title']
        } else {
            '::warning:: {0}: AMP article ''date'' is set in the future. SKIPPED' -f $FrontMatter['title']
        }
    } else {
        '{0}: AMP article does not contain a date value. SKIPPED' -f $FrontMatter['title']
    }
}
'::endgroup::'
#endregion

#region Handling Multiple Draft AMP Articles with Current Date
'::group::Handling Multiple Draft AMP Articles with Current Date'
switch ($RenameAmpList.Count) {
    0 {
        'No AMP articles matched the criteria to be renamed and published.'
        OutputAction
        return
    }
    1 {
        'Found 1 AMP article to rename.'
    }
    default {
        '::warning::More than one draft AMP article found with front matter date value of {0}.' -f $FormattedDate
        $RenameAmpList = $RenameAmpList | Sort-Object -Property LastWriteTimeUtc
        if ($AllowMultiplePostsPerDay.IsPresent) {
            '::warning::Multiple draft AMP articles will be published per day chronologically.'
        } else {
            '::warning::Multiple draft AMP articles with today''s date and ''AllowMultiplePostsPerDay'' is not enabled. The last edited file will be published.'
            $RenameAmpList = $RenameAmpList | Select-Object -Last 1
        }
    }
}
'::endgroup::'
#endregion

#region Moving Draft AMP Articles to AMP folder
if (-Not (Test-Path -Path $ResolvedAmpPath)) {
    '::error::The AMP path ''{0}'' could not be found' -f $AmpPath
    OutputAction
    exit 1
}
'::group::Moving Draft AMP Articles to AMP folder'
foreach ($AmpArticle in $RenameAmpList) {
    if ($AmpArticle.BaseName -match $DateRegex) {
        '::warning::AMP article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $AmpArticle.Name
        
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be retained as {0}.' -f $AmpArticle.Name
            $NewAmpFileName = $AmpArticle.Name  # Tetap menggunakan nama asli
        } else {
            $NewAmpFileName = $AmpArticle.Name -replace $DateRegex, ''
            $NewAmpFileName = '{0}-{1}' -f $FormattedDate, $NewAmpFileName.TrimStart('-')  # Trim untuk menghindari karakter '-'
            'Renaming the AMP article filename from {0} to {1}.' -f $AmpArticle.Name, $NewAmpFileName
        }
    } else {
        $NewAmpFileName = '{0}-{1}' -f $FormattedDate, $AmpArticle.Name
        'Renaming the AMP article filename from {0} to {1}.' -f $AmpArticle.Name, $NewAmpFileName
    }

    try {
        Move-Item -Path $AmpArticle.FullName -Destination (Join-Path -Path $ResolvedAmpPath -ChildPath $NewAmpFileName) -Force -ErrorAction Stop
        $AddFilesToCommit.Add((Join-Path -Path $ResolvedAmpPath -ChildPath $NewAmpFileName))
    } catch {
        Write-Output '::error::Unable to move AMP article {0} to {1}: {2}' -f $AmpArticle.FullName, $ResolvedAmpPath, $_.Exception.Message
        $RemoveFilesFromCommit.Add($AmpArticle.FullName)
    }
}
'::endgroup::'
#endregion

#region Handling Output
OutputAction
#endregion
