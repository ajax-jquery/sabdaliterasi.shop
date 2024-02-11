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

$BasePath = $PSScriptRoot
$ResolvedDraftsPath = Join-Path -Path $BasePath -ChildPath $DraftsPath
$ResolvedPostsPath = Join-Path -Path $BasePath -ChildPath $PostsPath
$DateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$ShouldPublish = $false
$TimeZone = 'Asia/Jakarta'  # Tetapkan zona waktu Anda di sini

try {
    $CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date),$TimeZone)
}
catch {
    Write-Output "Gagal mengonversi zona waktu. Menggunakan waktu sistem."
    $CurrentDate = Get-Date
}

'::group::Set TimeZone'
$DefaultTimeZoneMessage = 'Setting TimeZone to default ''Coordinated Universal Time''.'
try {
    $configContent = Get-Content -Path $ResolvedConfigPath -Raw -ErrorAction Stop
    $config = $configContent | ConvertFrom-Yaml
    if ($config -and $config.timezone) {
        $TimeZone = $config.timezone
        'Setting TimeZone from {0} to ''{1}''.' -f $ConfigPath,$TimeZone
    } else {
        $DefaultTimeZoneMessage
        $TimeZone = 'UTC'  # Gunakan UTC sebagai default jika tidak ada zona waktu yang valid dalam konfigurasi
    }
}
catch {
    $DefaultTimeZoneMessage
    $TimeZone = 'UTC'  # Gunakan UTC sebagai default jika terjadi kesalahan dalam membaca konfigurasi
}
$CurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date),$TimeZone)
$FormattedDate = $CurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'

'::group::Draft Article Discovery'
if (-not (Test-Path -Path $ResolvedDraftsPath)) {
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

'::group::Renaming Draft Articles with Valid Date'
if (-not (Test-Path -Path $ResolvedPostsPath)) {
    '::error::The posts path ''{0}'' could not be found' -f $PostsPath
    OutputAction
    exit 1
}
foreach ($Article in $RenameArticleList) {
    $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
    if ($PreserveDateFileName.IsPresent) {
        '::warning::''PreserveDateFileName'' is enabled. The existing filename will be prepended with {0}.' -f $FormattedDate
    } else {
        $NewFileName = '{0}{1}' -f $FormattedDate, $Article.Name.Substring(11)
    }
    'Renaming {0} to {1}' -f $Article.Name, $NewFileName
    $NewFullPath = Join-Path -Path $ResolvedPostsPath -ChildPath $NewFileName
    try {
        Move-Item -Path $Article.FullName -Destination $NewFullPath
        $AddFilesToCommit += $NewFileName
        $RemoveFilesFromCommit += $Article.Name
        $ShouldPublish = $true
    } catch {
        OutputAction
    }
}
'::endgroup::'

OutputAction
