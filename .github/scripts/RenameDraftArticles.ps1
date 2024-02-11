[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$ArtikelPath = '_artikel',
    [string]$AmpPath = '_amp',
    [string]$DraftsampPath = '_draftsamp',
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
$ResolvedArtikelPath = Join-Path -Path $BasePath -ChildPath $ArtikelPath
$ResolvedAmpPath = Join-Path -Path $BasePath -ChildPath $AmpPath
$ResolvedDraftsampPath = Join-Path -Path $BasePath -ChildPath $DraftsampPath -AdditionalChildPath '*'
$ResolvedConfigPath = Join-Path -Path $BasePath -ChildPath $ConfigPath
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
        'Found {0} articles in {1}.' -f $DraftArticles.Count,$DraftsPath
    }
    $DraftArticles | ForEach-Object {
        $FrontMatter = Get-Content -Path $_.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
        if ($FrontMatter.ContainsKey('date')) {
            $ArticleDate = [datetime]::Parse($FrontMatter['date']).ToShortDateString()
            '{0}: DATE : {1}' -f $FrontMatter['title'],$ArticleDate
            if ($ArticleDate -eq $CurrentDate.ToShortDateString()) {
                $RenameArticleList.Add($_)
                '{0}: Including article to rename.' -f $FrontMatter['title']
            } else {
                if ($ArticleDate -lt $CurrentDate.ToShortDateString()) {
                    $NewArticlePath = Join-Path -Path $ResolvedArtikelPath -ChildPath $_.Name
                    if (Test-Path -Path $NewArticlePath) {
                        $NewArticlePath = Join-Path -Path $ResolvedArtikelPath -ChildPath ("{0}-{1}" -f $FormattedDate, $_.Name)
                    }
                    Move-Item -Path $_.FullName -Destination $NewArticlePath
                    'Moved {0} to {1}.' -f $_.FullName, $NewArticlePath
                    $ShouldPublish = $true
                }
            }
        } else {
            '{0}: Article does not contain a date value. SKIPPED' -f $FrontMatter['title']
        }
    }
} else {
    'No markdown files found in {0}.' -f $DraftsPath
    OutputAction
}
'::endgroup::'
#endregion

#region Moving Draft AMP Articles
'::group::Moving Draft AMP Articles'
if (-Not (Test-Path -Path $ResolvedDraftsampPath)) {
    'No AMP draft articles found in {0}.' -f $DraftsampPath
} else {
    $DraftAmpArticles = Get-ChildItem -Path $ResolvedDraftsampPath -Include *.md -Exclude template.md
    if ($DraftAmpArticles.Count -gt 0) {
        if ($DraftAmpArticles.Count -eq 1) {
            'Found 1 AMP draft article in {0}.' -f $DraftsampPath
        } else {
            'Found {0} AMP draft articles in {1}.' -f $DraftAmpArticles.Count,$DraftsampPath
        }
        $DraftAmpArticles | ForEach-Object {
            $NewAmpArticlePath = Join-Path -Path $ResolvedAmpPath -ChildPath $_.Name
            if (Test-Path -Path $NewAmpArticlePath) {
                $NewAmpArticlePath = Join-Path -Path $ResolvedAmpPath -ChildPath ("{0}-{1}" -f $FormattedDate, $_.Name)
            }
            Move-Item -Path $_.FullName -Destination $NewAmpArticlePath
            'Moved {0} to {1}.' -f $_.FullName, $NewAmpArticlePath
            $ShouldPublish = $true
        }
    } else {
        'No AMP markdown files found in {0}.' -f $DraftsampPath
    }
}
'::endgroup::'
#endregion

OutputAction
