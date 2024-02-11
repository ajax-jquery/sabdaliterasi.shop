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

$BasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath -AdditionalChildPath '*'
$ResolvedPostsPath = Join-Path -Path $BasePath -ChildPath $PostsPath
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$ShouldPublish = $false
'::group::Set TimeZone'
$DefaultTimeZoneMessage = 'Setting TimeZone to default ''Coordinated Universal Time''.'
try {
    $configContent = Get-Content -Path $ResolvedConfigPath -Raw -ErrorAction Stop
    $config = $configContent | ConvertFrom-Yaml
    if ($config -and $config.timezone) {
        $TimeZone = 'Asia/Jakarta'
        'Setting TimeZone from {0} to ''{1}''.' -f $ConfigPath,$TimeZone
    } else {
        $DefaultTimeZoneMessage
        $TimeZone = 'UTC'  # Jika tidak ada zona waktu yang valid dalam konfigurasi, kita gunakan UTC sebagai default
    }
}
catch {
    $DefaultTimeZoneMessage
    $TimeZone = 'UTC'  # Jika terjadi kesalahan dalam membaca konfigurasi, kita gunakan UTC sebagai default
}
$CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date),$TimeZone)
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'

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
        if ($_.BaseName -match $DateRegex) {
            $ArticleDateFromFileName = [datetime]::ParseExact($Matches[0], 'yyyy-MM-dd', $null)
            if ($ArticleDateFromFileName -le $CurrentDate) {
                $RenameArticleList.Add($_)
                'Article date is past or today. Including article to rename.'
            } else {
                '::warning::Article is scheduled for a future date according to filename. SKIPPED'
            }
        }
    }
} else {
    'No markdown files found in {0}.' -f $DraftsPath
    OutputAction
}
'::endgroup::'

'::group::Renaming Draft Articles with Valid Date'
if (-Not (Test-Path -Path $ResolvedPostsPath)) {
    '::error::The posts path ''{0}'' could not be found' -f $PostsPath
    OutputAction
    exit 1
}
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
