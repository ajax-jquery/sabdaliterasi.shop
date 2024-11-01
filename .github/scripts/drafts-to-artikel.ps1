[CmdletBinding()]
param(
    [string]$DraftsPathAMP = '_drafts',
    [string]$DataPathAMP = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [switch]$AllowMultiplePostsPerDay,
    [switch]$PreserveDateFileName
)

function OutputActionAMP {
    if ($ShouldPublish) {
        $AddFileList = $AddFilesToCommit -join ','
        $RemoveFileList = $RemoveFilesFromCommit -join ','
        'DRAFTS_AMP_ARTICLES_RENAMED=true' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_RENAMED_FILES={0}' -f $AddFileList >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_REMOVED_FILES={0}' -f $RemoveFileList >> $env:GITHUB_ENV
    } else {
        'DRAFTS_AMP_ARTICLES_RENAMED=false' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_RENAMED_FILES=false' >> $env:GITHUB_ENV
        'DRAFTS_COMMIT_REMOVED_FILES=false' >> $env:GITHUB_ENV
    }
}

#region Set Variables
$BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
$ResolvedDraftsPathAMP = Join-Path -Path $BasePath -ChildPath $DraftsPathAMP -AdditionalChildPath '*'
$ResolvedDataPathAMP = Join-Path -Path $BasePath -ChildPath $DataPathAMP
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
$RenameAMPArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
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
        $TimeZoneFromConfig = (Get-Content -Path $ResolvedConfigPath | ConvertFrom-Yaml).timezone
        if (-Not [string]::IsNullOrEmpty($TimeZoneFromConfig)) {
            $TimeZone = $TimeZoneFromConfig
            'Setting TimeZone from config: ''{0}''.' -f $TimeZone
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
'::endgroup::AMP'
#endregion

#region Draft AMPArticle Discovery
'::group::Draft AMPArticle Discovery'
if (-Not (Test-Path -Path $ResolvedDraftsPathAMP)) {
    '::error::The draft path ''{0}'' could not be found' -f $DraftsPathAMP
    exit 1
}

$DraftAMPArticles = Get-ChildItem -Path $ResolvedDraftsPathAMP -Include *.md -Exclude template.md
if ($DraftAMPArticles.Count -gt 0) {
    'Found {0} AMPArticles in {1}.' -f $DraftAMPArticles.Count, $DraftsPathAMP
    $DraftAMPArticles.Name | ForEach-Object { '- {0}' -f $_ }
} else {
    'No markdown files found in {0}.' -f $DraftsPathAMP
    OutputActionAMP
}
'::endgroup::AMP'
#endregion

#region Checking Draft AMPArticle Date
'::group::Checking Draft AMPArticle Date'
foreach ($AMPArticle in $DraftAMPArticles) {
    $FrontMatter = Get-Content -Path $AMPArticle.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($FrontMatter.ContainsKey('date')) {
        $AMPArticleDateTimeString = $FrontMatter['date']
        $AMPArticleDateTime = [datetime]::Parse($AMPArticleDateTimeString).ToUniversalTime()
        $AMPArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($AMPArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))

        $AMPArticleDate = $AMPArticleDateTime.ToString('yyyy-MM-dd')
        '{0}: DATE (from file): {1} - TIME: {2}' -f $FrontMatter['title'], $AMPArticleDate, $AMPArticleDateTime.ToString('HH:mm:ss')

        $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $CurrentDate = $CurrentDateTime.ToString('yyyy-MM-dd')
        '{0}: CURRENT DATE: {1} - TIME: {2}' -f $FrontMatter['title'], $CurrentDate, $CurrentDateTime.ToString('HH:mm:ss')

        if ($AMPArticleDate -eq $CurrentDate -and $CurrentDateTime -ge $AMPArticleDateTime) {
            $RenameAMPArticleList.Add($AMPArticle)
            '{0}: Including AMPArticle to rename.' -f $FrontMatter['title']
        } elseif ($AMPArticleDate -lt $CurrentDate) { 
            $RenameAMPArticleList.Add($AMPArticle)
            '{0}: Including AMPArticle to move to data folder.' -f $FrontMatter['title']
        } else {
            '::warning:: {0}: AMPArticle ''date'' is set in the future. SKIPPED' -f $FrontMatter['title']
        }
    } else {
        '{0}: AMPArticle does not contain a date value. SKIPPED' -f $FrontMatter['title']
    }
}
'::endgroup::AMP'
#endregion

#region Handling Multiple Draft AMPArticles with Current Date
'::group::Handling Multiple Draft AMPArticles with Current Date'
switch ($RenameAMPArticleList.Count) {
    0 {
        'No AMPArticles matched the criteria to be renamed and published.'
        OutputActionAMP
        return
    }
    1 {
        'Found 1 AMPArticle to rename.'
    }
    default {
        '::warning::More than one draft AMPArticle found with front matter date value of {0}.' -f $FormattedDate
        $RenameAMPArticleList = $RenameAMPArticleList | Sort-Object -Property LastWriteTimeUtc
        if ($AllowMultiplePostsPerDay.IsPresent) {
            '::warning::Multiple draft AMPArticles will be published per day chronologically.'
        } else {
            '::warning::Multiple draft AMPArticles with today''s date and ''AllowMultiplePostsPerDay'' is not enabled. The last edited file will be published.'
            $RenameAMPArticleList = $RenameAMPArticleList | Select-Object -Last 1
        }
    }
}
'::endgroup::AMP'
#endregion

#region Moving Draft AMPArticles to Data folder
if (-Not (Test-Path -Path $ResolvedDataPathAMP)) {
    '::error::The data path ''{0}'' could not be found' -f $DataPathAMP
    OutputActionAMP
    exit 1
}

'::group::Moving Draft AMPArticles to Data folder'
foreach ($AMPArticle in $RenameAMPArticleList) {
    if ($AMPArticle.BaseName -match $DateRegex) {
        '::warning::AMPArticle filename {0} appears to start with a date format, YYYY-MM-dd.' -f $AMPArticle.Name
        
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be retained as {0}.' -f $AMPArticle.Name
            $NewFileName = $AMPArticle.Name
        } else {
            $NewFileName = $AMPArticle.Name -replace $DateRegex, ''
            $NewFileName = '{0}-{1}' -f $FormattedDate, $NewFileName.TrimStart('-')
            'Renaming the AMPArticle filename from {0} to {1}.' -f $AMPArticle.Name, $NewFileName
        }
    } else {
        $NewFileName = '{0}-{1}' -f $FormattedDate, $AMPArticle.Name
        'Renaming the AMPArticle filename from {0} to {1}.' -f $AMPArticle.Name, $NewFileName
    }

    try {
        Move-Item -Path $AMPArticle.FullName -Destination (Join-Path -Path $ResolvedDataPathAMP -ChildPath $NewFileName)
        $AddFilesToCommit.Add($NewFileName)
        'AMPArticle {0} has been moved to {1}.' -f $AMPArticle.Name, $DataPathAMP
    } catch {
        '::error::Error occurred while moving the AMPArticle: {0}' -f $_.Exception.Message
        $RemoveFilesFromCommit.Add($NewFileName)
    }
}
'::endgroup::AMP'
#endregion

# Final Action
OutputActionAMP
