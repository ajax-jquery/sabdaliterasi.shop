[CmdletBinding()]
param(
    [string]$DraftsPath = '_drafts',
    [string]$DataPath = '_artikel',
    [string]$ConfigPath = '_config.yml',
    [string]$AMPDraftsPath = '_draftsamp',
    [string]$AMPDataPath = '_amp',
    [string]$AMPConfigPath = '_config.yml',
    [switch]$AMPAllowMultiplePostsPerDay,
    [switch]$AMPPreserveDateFileName
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
        # Mengambil tanggal dari front matter
        $ArticleDateTimeString = $FrontMatter['date']

        # Mengonversi string menjadi objek DateTime dengan zona waktu yang benar
        $ArticleDateTime = [datetime]::Parse($ArticleDateTimeString).ToUniversalTime()
        $ArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($ArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))

        # Memformat tanggal dan waktu untuk output
        $ArticleDate = $ArticleDateTime.ToString('yyyy-MM-dd')
        '{0}: DATE (from file): {1} - TIME: {2}' -f $FrontMatter['title'], $ArticleDate, $ArticleDateTime.ToString('HH:mm:ss')

        # Mendapatkan waktu saat ini dengan timezone Asia/Makassar
        $CurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $CurrentDate = $CurrentDateTime.ToString('yyyy-MM-dd')
        '{0}: CURRENT DATE: {1} - TIME: {2}' -f $FrontMatter['title'], $CurrentDate, $CurrentDateTime.ToString('HH:mm:ss')

        # Memeriksa apakah artikel tanggal sama dengan hari ini dan juga memeriksa waktu
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
    # Cek apakah nama file sudah dimulai dengan tanggal
    if ($Article.BaseName -match $DateRegex) {
        '::warning::Article filename {0} appears to start with a date format, YYYY-MM-dd.' -f $Article.Name
        
        # Jika PreserveDateFileName aktif, gunakan nama asli
        if ($PreserveDateFileName.IsPresent) {
            '::warning::''PreserveDateFileName'' is enabled. The existing filename will be retained as {0}.' -f $Article.Name
            $NewFileName = $Article.Name  # Tetap menggunakan nama asli
        } else {
            'Renaming the article filename from {0} to {1}.' -f $Article.Name, $NewFileName
            # Hapus tanggal dari nama file lama dan tambahkan tanggal baru
            $NewFileName = $Article.Name -replace $DateRegex, ''
            $NewFileName = '{0}-{1}' -f $FormattedDate, $NewFileName.TrimStart('-')  # Trim untuk menghindari karakter '-'
        }
    } else {
        # Jika tidak ada tanggal, tambahkan tanggal ke nama file
        $NewFileName = '{0}-{1}' -f $FormattedDate, $Article.Name
        'Renaming the article filename from {0} to {1}.' -f $Article.Name, $NewFileName
    }

    # Move the draft to the data path
    try {
        Move-Item -Path $Article.FullName -Destination (Join-Path -Path $ResolvedDataPath -ChildPath $NewFileName)
        $AddFilesToCommit.Add($NewFileName)
        'Article {0} has been moved to {1}.' -f $Article.Name, $ResolvedDataPath
        $ShouldPublish = $true
    } catch {
        '::error::Failed to move {0}. Error: {1}' -f $Article.Name, $_.Exception.Message
        $RemoveFilesFromCommit.Add($Article.Name)
    }
}
'::endgroup::'
#endregion

OutputAction

function AMPOutputAction {
    if ($AMPShouldPublish) {
        $AMPAddFileList = $AMPAddFilesToCommit -join ','
        $AMPRemoveFileList = $AMPRemoveFilesFromCommit -join ','
        'AMP_DRAFTS_ARTICLES_RENAMED=true' >> $env:GITHUB_ENV
        'AMP_DRAFTS_COMMIT_RENAMED_FILES={0}' -f $AMPAddFileList >> $env:GITHUB_ENV
        'AMP_DRAFTS_COMMIT_REMOVED_FILES={0}' -f $AMPRemoveFileList >> $env:GITHUB_ENV
    } else {
        'AMP_DRAFTS_ARTICLES_RENAMED=false' >> $env:GITHUB_ENV
        'AMP_DRAFTS_COMMIT_RENAMED_FILES=false' >> $env:GITHUB_ENV
        'AMP_DRAFTS_COMMIT_REMOVED_FILES=false' >> $env:GITHUB_ENV
    }
}

#region AMP Set Variables
$AMPBasePath = ($PSScriptRoot.Split([System.IO.Path]::DirectorySeparatorChar) | Select-Object -SkipLast 2) -join [System.IO.Path]::DirectorySeparatorChar
$AMPResolvedDraftsPath = Join-Path -Path $AMPBasePath -ChildPath $AMPDraftsPath -AdditionalChildPath '*'
$AMPResolvedDataPath = Join-Path -Path $AMPBasePath -ChildPath $AMPDataPath
$AMPResolvedConfigPath = Join-Path -Path $AMPBasePath -ChildPath $AMPConfigPath
$AMPRenameArticleList = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
$AMPAddFilesToCommit = [System.Collections.Generic.List[String]]::new()
$AMPRemoveFilesFromCommit = [System.Collections.Generic.List[String]]::new()
$AMPDateRegex = '^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])'
$AMPShouldPublish = $false
#endregion

#region AMP Set TimeZone
'::group::AMP Set TimeZone'
$AMPTimeZone = (Get-TimeZone).StandardName
$AMPDefaultTimeZoneMessage = 'Setting TimeZone to default ''{0}''.' -f $AMPTimeZone
try {
    if (Test-Path -Path $AMPResolvedConfigPath) {
        $AMPTimeZone = (Get-Content -Path $AMPResolvedConfigPath | ConvertFrom-Yaml).timezone
        if (-Not [string]::IsNullOrEmpty($AMPTimeZone)) {
            'Setting TimeZone from {0} to ''{1}''.' -f $AMPConfigPath, $AMPTimeZone
        } else {
            Write-Output $AMPDefaultTimeZoneMessage
        }
    } else {
        Write-Output $AMPDefaultTimeZoneMessage
    }
} catch {
    Write-Output $AMPDefaultTimeZoneMessage
}
$AMPCurrentDate = [System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId((Get-Date), $AMPTimeZone)
$AMPFormattedDate = $AMPCurrentDate.ToString('yyyy-MM-dd')
'::endgroup::'
#endregion

#region AMP Draft Article Discovery
'::group::AMP Draft Article Discovery'
if (-Not (Test-Path -Path $AMPResolvedDraftsPath)) {
    '::error::The draft path ''{0}'' could not be found' -f $AMPDraftsPath
    exit 1
}
$AMPDraftArticles = Get-ChildItem -Path $AMPResolvedDraftsPath -Include *.md -Exclude template.md
if ($AMPDraftArticles.Count -gt 0) {
    if ($AMPDraftArticles.Count -eq 1) {
        'Found 1 article in {0}.' -f $AMPDraftsPath
    } else {
        'Found {0} articles in {1}.' -f $AMPDraftArticles.Count, $AMPDraftsPath
    }
    $AMPDraftArticles.Name | ForEach-Object {
        '- {0}' -f $_
    }
} else {
    'No markdown files found in {0}.' -f $AMPDraftsPath
    AMPOutputAction
}
'::endgroup::'
#endregion

#region AMP Checking Draft Article Date
'::group::AMP Checking Draft Article Date'
foreach ($AMPArticle in $AMPDraftArticles) {
    $AMPFrontMatter = Get-Content -Path $AMPArticle.FullName -Raw | ConvertFrom-Yaml -ErrorAction Ignore
    if ($AMPFrontMatter.ContainsKey('date')) {
        $AMPArticleDateTimeString = $AMPFrontMatter['date']
        $AMPArticleDateTime = [datetime]::Parse($AMPArticleDateTimeString).ToUniversalTime()
        $AMPArticleDateTime = [System.TimeZoneInfo]::ConvertTimeFromUtc($AMPArticleDateTime, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $AMPArticleDate = $AMPArticleDateTime.ToString('yyyy-MM-dd')
        '{0}: DATE (from file): {1} - TIME: {2}' -f $AMPFrontMatter['title'], $AMPArticleDate, $AMPArticleDateTime.ToString('HH:mm:ss')
        $AMPCurrentDateTime = [System.TimeZoneInfo]::ConvertTime([DateTime]::Now, [System.TimeZoneInfo]::FindSystemTimeZoneById('Asia/Makassar'))
        $AMPCurrentDate = $AMPCurrentDateTime.ToString('yyyy-MM-dd')
        '{0}: CURRENT DATE: {1} - TIME: {2}' -f $AMPFrontMatter['title'], $AMPCurrentDate, $AMPCurrentDateTime.ToString('HH:mm:ss')

        if ($AMPArticleDate -eq $AMPCurrentDate -and $AMPCurrentDateTime -ge $AMPArticleDateTime) {
            $AMPRenameArticleList.Add($AMPArticle)
            '{0}: Including article to rename.' -f $AMPFrontMatter['title']
        } elseif ($AMPArticleDate -lt $AMPCurrentDate) { 
            $AMPRenameArticleList.Add($AMPArticle)
            '{0}: Including article to move to data folder.' -f $AMPFrontMatter['title']
        } else {
            '::warning:: {0}: Article ''date'' is set in the future. SKIPPED' -f $AMPFrontMatter['title']
        }
    } else {
        '{0}: Article does not contain a date value. SKIPPED' -f $AMPFrontMatter['title']
    }
}
'::endgroup::'
#endregion

