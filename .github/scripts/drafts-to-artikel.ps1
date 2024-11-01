[CmdletBinding()] 
param(
    [string]$DraftsAmpPath = '_draftsamp',
    [string]$AmpPath = '_amp',
    [string]$DraftsPath = '_drafts',
    [string]$ArtikelPath = '_artikel',
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
$ResolvedDraftsAmpPath = Join-Path -Path $BasePath -ChildPath $DraftsAmpPath -AdditionalChildPath '*'
$ResolvedAmpPath = Join-Path -Path $BasePath -ChildPath $AmpPath
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
$ResolvedArtikelPath = Join-Path -Path $BasePath -ChildPath $ArtikelPath
$RenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
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

#region Draft Articles Discovery for AMP
'::group::Draft Articles Discovery for AMP'
if (-Not (Test-Path -Path $ResolvedDraftsAmpPath)) {
    '::error::The draft path ''{0}'' could not be found' -f $DraftsAmpPath
    exit 1
}
$DraftArticlesAmp = Get-ChildItem -Path $ResolvedDraftsAmpPath -Include *.md -Exclude template.md
if ($DraftArticlesAmp.Count -gt 0) {
    if ($DraftArticlesAmp.Count -eq 1) {
        'Found 1 article in {0}.' -f $DraftsAmpPath
    } else {
        'Found {0} articles in {1}.' -f $DraftArticlesAmp.Count, $DraftsAmpPath
    }
    $DraftArticlesAmp.Name | ForEach-Object {
        '- {0}' -f $_
    }
} else {
    'No markdown files found in {0}.' -f $DraftsAmpPath
    OutputAction
}
'::endgroup::'
#endregion

#region Checking Draft Article Date for AMP
'::group::Checking Draft Article Date for AMP'
foreach ($Article in $DraftArticlesAmp) {
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

#region Handling Multiple Draft Articles with Current Date for AMP
'::group::Handling Multiple Draft Articles with Current Date for AMP'
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

#region Moving Draft Articles to AMP folder
if (-Not (Test-Path -Path $ResolvedAmpPath)) {
    '::error::The data path ''{0}'' could not be found' -f $AmpPath
    OutputAction
    exit 1
}
'::group::Moving Draft Articles to AMP folder'
foreach ($Article in $RenameArticleList) {
    if ($Article.BaseName -match $DateRegex) {
        '::warning::Article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $Article.Name
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be retained as {0}.' -f $Article.Name
            $NewFileName = $Article.Name
        } else {
            # Hapus tanggal dari nama file lama dan tambahkan tanggal baru
            $NewFileName = $Article.Name -replace $DateRegex, ''
            $NewFileName = '{0}-{1}' -f $FormattedDate, $NewFileName.TrimStart('-')
        }
    } else {
        $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
        'Renaming the article filename from {0} to {1}.' -f $Article.Name, $NewFileName
    }

    try {
        Move-Item -Path $Article.FullName -Destination (Join-Path -Path $ResolvedAmpPath -ChildPath $NewFileName)
        $AddFilesToCommit.Add($NewFileName)
        $ShouldPublish = $true
        'Moved article: {0}' -f $Article.FullName
    } catch {
        '::error::Unable to move {0} to {1}' -f $Article.FullName, $NewFileName
    }
}
'::endgroup::'
#endregion

#region Draft Articles Discovery
'::group::Draft Articles Discovery'
if (-Not (Test-Path -Path $ResolvedDraftsPath)) {
    '::error::The draft path ''{0}'' could not be found' -f $DraftsPath
    exit 1
}
$DraftArticles = Get-ChildItem -Path $ResolvedDraftsPath -Include *.md -Exclude template.md
if ($DraftArticles.Count -gt 0) {
    if ($DraftArticles.Count -eq 1) {
        'Found 1 article in {0}.' -f $DraftsPath
    } else {
        'Found {0} articles in {1}.' -f $DraftsPath
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

#region Moving Draft Articles to Artikel folder
if (-Not (Test-Path -Path $ResolvedArtikelPath)) {
    '::error::The data path ''{0}'' could not be found' -f $ArtikelPath
    OutputAction
    exit 1
}
'::group::Moving Draft Articles to Artikel folder'
foreach ($Article in $RenameArticleList) {
    if ($Article.BaseName -match $DateRegex) {
        '::warning::Article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $Article.Name
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be retained as {0}.' -f $Article.Name
            $NewFileName = $Article.Name
        } else {
            $NewFileName = $Article.Name -replace $DateRegex, ''
            $NewFileName = '{0}-{1}' -f $FormattedDate, $NewFileName.TrimStart('-')
        }
    } else {
        $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
        'Renaming the article filename from {0} to {1}.' -f $Article.Name, $NewFileName
    }

    try {
        Move-Item -Path $Article.FullName -Destination (Join-Path -Path $ResolvedArtikelPath -ChildPath $NewFileName)
        $AddFilesToCommit.Add($NewFileName)
        $ShouldPublish = $true
        'Moved article: {0}' -f $Article.FullName
    } catch {
        '::error::Unable to move {0} to {1}' -f $Article.FullName, $NewFileName
    }
}
'::endgroup::'
#endregion

# Output action to environment variables
OutputAction
